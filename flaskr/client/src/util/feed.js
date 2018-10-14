import axios from 'axios';

export function getRooms() {
  return new Promise((resolve, reject) => {
    axios.get('/rooms/all').then(
      res => resolve(res.data),
      err => reject(err)
    );
  });
}