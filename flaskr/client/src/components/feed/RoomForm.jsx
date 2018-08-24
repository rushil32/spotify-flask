import React, { Component } from 'react';
import { withRouter } from 'react-router'

import { createRoom } from '../../util/room';
import checkIcon from '../../assets/icon-check.svg';

class RoomForm extends Component {
  state = {
    name: '',
    isPrivate: false,
    formSubmitted: false,
    newRoomId: 0,
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  resetForm = () => {
    this.setState({ formSubmitted: false });
  }

  openRoom = () => {
    const { history } = this.props;
    const $ = window.$;

    $('.modal').modal('hide');
    history.push(`/room/${this.state.newRoomId}`);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, isPrivate } = this.state;
    const res = await createRoom(name, isPrivate);
    const newRoomId = res.data;

    this.setState({
      formSubmitted: true,
      newRoomId,
    });
  }

  render() {
    if (this.state.formSubmitted) {
      return (
        <div className="modal-message">
          <img className="animated flipInX" src={checkIcon} alt="Room Created"/>
          <h3>You're good to go!</h3>
          <div className="modal-footer modal-footer-form">
            <button onClick={this.resetForm} className="btn btn-link">Create a new room</button>
            <button onClick={this.openRoom} className="btn btn-primary">Go to room</button>
          </div>
        </div>
      );
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="nameInput">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="nameInput" 
            name="name"
            aria-describedby="nameInput" 
            placeholder="Give your room a name" 
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="isPrivate"
              id="privateCheck"
              checked={this.state.isPrivate}
              onChange={this.handleChange}
            />
            <label className="form-check-label" for="privateCheck">Private Room</label>
            <small id="visibilityHelp" className="form-text text-muted">Private rooms won't be shown in the feed</small>
          </div>
        </div>
        <div className="modal-footer modal-footer-form">
          <button className="btn btn-link" data-dismiss="modal">Cancel</button>
          <button disabled={this.state.name === ''} type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}
 
export default withRouter(RoomForm);