import axios from 'axios';
import { createFormData } from '../util/general';
class Room {
  constructor(id = null) {
    this.id = id;
    this.data;
  }

  async getRoomData() {
    const data = await axios.get(`/rooms/get/${this.id}`);
    return data;
  }
}

export default Room;