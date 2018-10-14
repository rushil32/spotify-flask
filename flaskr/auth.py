import functools
import requests
from urllib.parse import quote

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, json, jsonify, make_response
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

from flaskr.config import config

bp = Blueprint('auth', __name__, url_prefix='/auth')

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

# Server-side Parameters
REDIRECT_URI = "http://localhost:3000/login"
SCOPE = "playlist-modify-public playlist-modify-private streaming user-read-birthdate user-read-email user-read-private"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    # "state": STATE,
    # "show_dialog": SHOW_DIALOG_str,
    "client_id": config['client_id']
}


def get_auth_header(token):
    return {"Authorization": "Bearer {}".format(token)}


def auth_payload(token):
    return {
        "grant_type": "authorization_code",
        "code": str(token),
        "redirect_uri": REDIRECT_URI,
        "client_id": config['client_id'],
        "client_secret": config['client_secret'],
    }

def get_user_profile(token):
    user_profile_api_endpoint = "{}/me".format(SPOTIFY_API_URL)
    profile_response = requests.get(
        user_profile_api_endpoint, headers=get_auth_header(token)
    )

    return json.loads(profile_response.text)



@bp.route("/redirect-spotify")
def index():
    url_args = "&".join(["{}={}".format(key, quote(val))
                         for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return auth_url


@bp.route('/user', methods=('GET', 'POST'))
def get_user():
    access_token = ''

    if request.method == 'POST':
        data = request.json
        auth_token = data['code']

        post_request = requests.post(SPOTIFY_TOKEN_URL, data=auth_payload(auth_token))

        response_data = json.loads(post_request.text)
        access_token = response_data["access_token"]
        refresh_token = response_data["refresh_token"]

        session['access_token'] = access_token
        session['refresh_token'] = refresh_token

    elif 'access_token' in session:
        access_token = session['access_token']

    profile_data = get_user_profile(access_token)

    if 'error' in profile_data:
        return 'Not logged in'
      
    session['user_id'] = profile_data['id']
    
    create_user(profile_data)

    res = make_response(jsonify(profile_data), 200)
    res.set_cookie('access_token', access_token)

    return res


def create_user(data):
    db = get_db()

    if db.execute(
        'SELECT spotify_id FROM users WHERE spotify_id = ?', (data['id'],)
    ).fetchone() is None:
        db.execute(
            'INSERT INTO users (spotify_id, full_name, display_image) VALUES (?, ?, ?)',
            (data['id'], data['display_name'], data['images'][0]['url'])
        )
        db.commit()


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM users WHERE spotify_id = ?', (user_id,)
        ).fetchone()


@bp.route('/logout')
def logout():
    session.clear()
    return 'True'
