import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RoomCard from './RoomCard';
import Modal from '../common/Modal';
import RoomForm from './RoomForm';

import { initTooltips } from '../../util/bootstrap';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] }
  }

  componentDidMount() {
    initTooltips();
  }

  openRoom = (id) => {
    this.props.history.push(`/room/${id}`);
  }

  render() {
    const roomList = this.props.rooms.map(room => 
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
  rooms: PropTypes.array
}

Feed.defaulProps = {
  rooms: []
}
 
export default Feed;