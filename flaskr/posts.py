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
                (g.user['id'], body, track_id, track_name, artist, album,
                 room, album_cover_sm, album_cover_md, album_cover_lg)
            )
            db.commit()

            return get_posts(room)

    return 'What?'


@bp.route("/get/<room_id>")
def get_posts(room_id):
    db = get_db()

    posts = db.execute(
        'SELECT p.*, u.display_image, u.full_name, p.album_cover_md'
        ' FROM posts p'
        ' JOIN users u ON p.author_id = u.id'
        ' WHERE p.room=?'
        ' ORDER BY created DESC',
        (room_id, )
    ).fetchall()

    for post in posts:
      post['comments'] = get_comments(post['id'])

    return jsonify(posts)


def get_comments(post_id):
    db = get_db()

    comments = db.execute(
        'SELECT c.*, u.*'
        ' FROM comments c'
        ' JOIN users u ON u.id = c.author_id'
        ' WHERE c.post_id=?'
        ' ORDER BY created ASC',
        (post_id, )
    ).fetchall()

    return comments


@bp.route('/comment', methods=('GET', 'POST'))
def comment():
    if request.method == 'POST':
        body = request.form.get('body')
        room_id = request.form.get('room')
        post_id = request.form.get('post')
        error = None

        if not body:
            error = 'Body is required.'
        else:
            db = get_db()
            cursor = db.cursor()
            cursor.execute(
                'INSERT INTO comments '
                '(author_id, body, post_id)'
                ' VALUES (?, ?, ?)',
                (g.user['id'], body, post_id)
            )
            db.commit()

            return get_posts(room_id)

    return 'What?'
