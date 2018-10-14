import axios from 'axios';
import { createFormData } from '../util/general';
class Room {
  constructor(id = null) {
    this.id = id;
    this.data;
  }

  async getRoomData() {
    return axios.get(`/rooms/get/${this.id}`);
  }

  createRoom() {
    
  }
}

export default Room;