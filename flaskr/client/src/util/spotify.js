import axios from 'axios';
import cookie from 'js-cookie';

function getHeader() {
  return {
    Authorization: `Bearer ${cookie.get('access_token')}`,
    'Content-Type': 'application/json',
  };
}

export function search(searchString) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/search?q=${searchString}&type=track&limit=5`,
      headers: getHeader(),
    }).then(
      res => resolve(res.data.tracks.items),
      err => reject(err),
    );
  });
}

export function getTrack(id) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/tracks/${id}`,
      headers: getHeader(),
    }).then(
      res => resolve(res.data),
      err => reject(err),
    );
  });
}