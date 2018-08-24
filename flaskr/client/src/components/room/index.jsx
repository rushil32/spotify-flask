import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../common/Modal';
import PostForm from './PostForm';
import PostList from './PostList';
import { getRoom, getPosts } from '../../util/room';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
      posts: [],
      roomReady: false,
    };
  }

  async componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();

    const { id } = this.props.match.params;
    const [room, posts] = await Promise.all([getRoom(id), getPosts(id)]);

    this.setState({ room, posts, roomReady: true });
  }

  handleNewPost = (updatedList) => {
    debugger;
    this.setState({ posts: updatedList });
  }

  refreshPosts = async () => {
    const posts = await getPosts(this.props.match.params.id);
    this.setState({ posts });
  }

  render() {
    const { room_name, full_name, display_image } = this.state.room;
    const roomId = this.props.match.params.id;

    return (
      <div className="room">
        <div className="card animated fadeInUp">
          <div className="card-body">
            <h1 className="room__header">{room_name}</h1>
            <p className="room__subheader">Hosted by {full_name}</p>
            <PostList posts={this.state.posts} ready={this.state.roomReady} />
          </div>
        </div>
        <Modal name="postModal" icon="playlist_add" header="Add a track">
          <PostForm roomId={roomId} onSuccess={this.handleNewPost} />
        </Modal>
      </div>
    );
  }
}

export default Room;
