from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, json, jsonify
)

from flaskr.db import (get_db, dict_factory)

bp = Blueprint('rooms', __name__, url_prefix='/rooms')

@bp.route('/create', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        name = request.form.get('name')
        is_private = request.form.get('isPrivate')
        error = None

        if not name:
            error = 'Title is required.'
        else:
            db = get_db()
            cursor = db.cursor()
            cursor.execute(
                'INSERT INTO rooms (room_name, is_private, host)'
                ' VALUES (?, ?, ?)',
                (name, is_private, g.user['id'])
            )
            db.commit()
            
            return str(cursor.lastrowid)

    return 'What?'
    

@bp.route("/all")
def all_rooms():
    db = get_db()
    
    rooms = db.execute(
        'SELECT r.id, host, created, room_name, u.display_image, u.full_name'
        ' FROM rooms r JOIN users u ON r.host = u.id'
        ' WHERE r.is_private="false"'
        ' ORDER BY created DESC'
    ).fetchall()

    return jsonify(rooms)


@bp.route("/get/<room_id>")
def get_rooms(room_id):
    db = get_db()
    
    rooms = db.execute(
        'SELECT r.id, host, created, room_name, u.display_image, u.full_name'
        ' FROM rooms r JOIN users u ON r.host = u.id'
        ' WHERE r.id=?'
        ' ORDER BY created DESC',
        (room_id, )
    ).fetchone()

    return jsonify(rooms)

