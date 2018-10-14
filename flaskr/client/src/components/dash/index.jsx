import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Feed from '../feed'
import Room from '../room'
import Nav from '../common/Nav';
import FloatingButton from '../common/FloatingButton';

import { logout } from '../../util/auth';
import { showModal } from '../../util/bootstrap';

import { getRooms } from '../../util/feed';

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    }
  }

  async componentDidMount() {
    const { userInfo, history } = this.props; 
    let rooms = [];
    
    if (!userInfo.id) {
      history.push('/login');
    } else {
      rooms = await getRooms();
      this.setState({ rooms });
    }
  }

  logout = async () => {
    const res = await logout();

    if (res.status === 200) {
      this.props.history.push('/login');
    }
  }

  render() { 
    return (
      <Router>
        <div>
          <Nav logout={this.logout} />
          <Switch>
            <Route exact path="/" component={(props) => (
              <Feed {...props} rooms={this.state.rooms} />
            )}/>
            <Route path="/room/:id" component={Room} />
          </Switch>
          <Route exact path="/" component={() => (
            <FloatingButton icon="group_add" tooltip="Start Room" handleClick={() => showModal('roomModal')} />
          )} />
          <Route exact path="/room/:id" component={() => (
            <FloatingButton icon="playlist_add" tooltip="Create Post" handleClick={() => showModal('postModal')} />
          )} />
        </div>
      </Router>
    );
  }
}
 
export default Dash;