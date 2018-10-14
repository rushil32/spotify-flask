import React, { Component } from 'react';

import { search, getTrack } from '../../util/spotify';
import { createPost } from '../../util/room';
import DropDown from '../common/DropDown';
import TrackCard from './TrackCard';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.trackSearch = React.createRef();
    this.state = {
      body: '',
      track: {},
      searchString: '',
      searchResults: [],
    }
  }

  searchForTrack = async (event) => {
    this.handleChange(event);
    const searchString = event.target.value;

    if (searchString === '') {
      this.setState({ searchResults: [] });
      return;
    }

    const searchResults = await search(searchString);
    this.setState({ searchResults });
  }

  addTrack = async (track) => {
    const trackInfo = await getTrack(track.id);
    this.setState({ track: trackInfo, searchString: '', searchResults: [] });
  }

  clearFormAndClose() {
    this.setState({
      body: '',
      track: {},
      searchString: '',
    })
    window.$('.modal').modal('hide');
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const roomId = this.props.roomId;
    const { body, track } = this.state;
    const postList = await createPost(body, track, roomId);
    
    this.clearFormAndClose();
    this.props.onSuccess(postList);
  }

  render() {
    const { track } = this.state;
    const searchResults = this.state.searchResults.map((item => ({
      id: item.id,
      header: item.name,
      subheader: item.artists[0].name
    })));

    return (
      <form className="post-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="searchInput">Search for a track</label>
          <input
            type="text" 
            className="form-control" 
            id="searchInput" 
            name="searchString"
            placeholder="Enter a track or artist" 
            value={this.state.searchString}
            onChange={this.searchForTrack}
            ref={this.trackSearch}
            autoComplete="off"
          />
          { this.state.searchResults.length > 0 && (
            <DropDown
              list={searchResults}
              handleClick={this.addTrack}
              width={this.trackSearch.current.getBoundingClientRect().width}
            />
          )}
        </div>

        {track.name && (<TrackCard track={track} />)}

        <div className="form-group">
          <label htmlFor="bodyInput">Anything to say about the track? (optional)</label>
          <textarea id="bodyInput" name="body" className="form-control" value={this.state.body} onChange={this.handleChange} />
        </div>
        
        <div className="modal-footer modal-footer-form">
          <button className="btn btn-link" data-dismiss="modal">Cancel</button>
          <button disabled={!this.state.track.name} type="submit" className="btn btn-primary">Post</button>
        </div>
      </form>
    );
  }
}
 
export default PostForm;