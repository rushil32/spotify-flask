import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import RoomCard from './RoomCard';
import Modal from '../common/Modal';
import RoomForm from './RoomForm';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] }
  }

  async componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();

    const rooms = await axios.get('/rooms/all');
    const list = rooms.data;
    this.setState({ rooms: list });
  }

  openRoom = (id) => {
    this.props.history.push(`/room/${id}`);
  }

  render() {
    const roomList = this.state.rooms.map(room => 
      <div key={room.id} onClick={() => this.openRoom(room.id)}>
        <RoomCard data={room} />
      </div>
    );

    return (
      <div className="feed">
        <div className="feed__room-list">
          {roomList}
        </div>
        <Modal name="roomModal" icon="group_add" header="Create a new room">
          <RoomForm />
        </Modal>
      </div>
    );
  }
}

Feed.propTypes = {

}

Feed.defaulProps = {

}
 
export default Feed;