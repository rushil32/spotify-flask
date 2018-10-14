import axios from 'axios';
import { removeHashParams } from './url';
import { getRequestOptions } from './general';

const config = { 
  headers: {  
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

export function getLoginRedirect() {
  return new Promise((resolve, reject) => {
    axios
      .get('/auth/redirect-spotify')
      .then(res => resolve(res.data), err => reject(err));
  });
}

export function registerSpotify(code) {
  return new Promise((resolve, reject) => {
    axios
      .post('/auth/user', { code: removeHashParams(code) }, config)
      .then(
        res => resolve(res.data),
        err => reject(err)
      );
  });
}

export function getSpotifyUser() {
  return new Promise((resolve, reject) => {
    axios
      .get('/auth/user')
      .then(
        res => resolve(res.data),
        err => reject(err)
      );
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    axios
      .get('/auth/logout')
      .then(
        res => resolve(res),
        err => reject(err)
      );
  });
}