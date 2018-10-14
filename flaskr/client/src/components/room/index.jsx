import React, { Component } from 'react';

import Modal from '../common/Modal';
import PostForm from './PostForm';
import PostList from './PostList';
import data from './data.json';
import { getRoom, getPosts } from '../../util/room';
import { initTooltips } from '../../util/bootstrap';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
      posts: [],
      roomReady: false,
    };
  }

  getData = (selected) => {
    const option = this.options.find(option => option.text === selected);
    return data.filter(player => player[option.field] > option.gt);
  }

  async componentDidMount() {
    initTooltips();

    const { id } = this.props.match.params;
    const [room, posts] = await Promise.all([getRoom(id), getPosts(id)]);

    this.setState({ room, posts, roomReady: true });
  }

  updatePosts = (updatedList) => {
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
        <div className="animated fadeInUp">
          <div className="card-body">
            <h1 className="room__header">{room_name}</h1>
            <p className="room__subheader">Hosted by {full_name}</p>
            <PostList posts={this.state.posts} ready={this.state.roomReady} updatePosts={this.updatePosts} />
          </div>
        </div>
        <Modal name="postModal" icon="playlist_add" header="Add a track">
          <PostForm roomId={roomId} onSuccess={this.updatePosts} />
        </Modal>
      </div>
    );
  }
}

export default Room;
