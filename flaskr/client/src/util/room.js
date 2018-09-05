import axios from 'axios';
import { createFormData } from '../util/general';

const config = { 
  headers: {  
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
  }
};

export function createRoom(name, isPrivate) {
  return new Promise((resolve, reject) => {
    axios.post('/rooms/create', createFormData({
      name,
      isPrivate
    }), config).then(
      res => resolve(res),
      err => reject(err)
    );
  });
}

function formatTrackData(track) {
  return {
    track_id: track.id,
    track_name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    album_cover_lg: track.album.images[0].url,
    album_cover_md: track.album.images[1].url,
    album_cover_sm: track.album.images[2].url
  };
}

export function createPost(body, track, room) {
  return new Promise((resolve, reject) => {
    axios.post('/posts/create', createFormData({
      body,
      room,
      ...formatTrackData(track)
    }), config).then(
      res => resolve(res.data),
      err => reject(err)
    );
  });
}

export function getRoom(roomId) {
  return new Promise((resolve, reject) => {
    axios.get(`/rooms/get/${roomId}`).then(
      res => resolve(res.data),
      err => reject(err)
    );
  });
}

export function getPosts(roomId) {
  return new Promise((resolve, reject) => {
    axios.get(`/posts/get/${roomId}`).then(
      res => resolve(res.data),
      err => reject(err)
    );
  });
}

export function commentOnPost(post, room, body) {
  return new Promise((resolve, reject) => {
    axios.post('/posts/comment', createFormData({
      body,
      room,
      post,
    }), config).then(
      res => resolve(res.data),
      err => reject(err)
    );
  });
}