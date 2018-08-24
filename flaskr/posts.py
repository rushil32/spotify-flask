from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, json, jsonify
)

from flaskr.db import (get_db, dict_factory)

bp = Blueprint('posts', __name__, url_prefix='/posts')


@bp.route('/create', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        body = request.form.get('body')
        track_id = request.form.get('track_id')
        track_name = request.form.get('track_name')
        artist = request.form.get('artist')
        album = request.form.get('album')
        room = request.form.get('room')
        album_cover_sm = request.form.get('album_cover_sm')
        album_cover_md = request.form.get('album_cover_md')
        album_cover_lg = request.form.get('album_cover_lg')
        error = None

        if not track_id:
            error = 'Track is required.'
        else:
            db = get_db()
            cursor = db.cursor()
            cursor.execute(
                'INSERT INTO posts '
                '(author_id, body, track_id, track_name, artist, album, room, album_cover_sm, album_cover_md, album_cover_lg)'
                ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                (g.user['id'], body, track_id, track_name, artist, album, room, album_cover_sm, album_cover_md, album_cover_lg)
            )
            db.commit()
            
            return get_posts(room)

    return 'What?'


@bp.route("/get/<room_id>")
def get_posts(room_id):
    db = get_db()
    
    posts = db.execute(
        'SELECT p.body, p.track_name, p.artist, u.display_image, u.full_name, p.album_cover_md'
        ' FROM posts p JOIN users u ON p.author_id = u.id'
        ' WHERE p.room=?'
        ' ORDER BY created DESC',
        (room_id, )
    ).fetchall()

    return jsonify(posts)


