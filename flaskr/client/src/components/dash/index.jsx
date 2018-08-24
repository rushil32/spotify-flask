import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Feed from '../feed'
import Room from '../room'
import Nav from '../common/Nav';
import FloatingButton from '../common/FloatingButton';

import { logout } from '../../util/auth';

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    const { userInfo, history } = this.props; 
    const $ = window.$;
    
    if (!userInfo.id) {
      history.push('/login');
    }
  }

  showModal = (modalName) => {
    const $ = window.$;
    $(`#${modalName}`).modal('show');
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
            <Route exact path="/" component={Feed} />
            <Route path="/room/:id" component={Room} />
          </Switch>
          <Route exact path="/" component={() => (
            <FloatingButton icon="group_add" tooltip="Start Room" handleClick={() => this.showModal('roomModal')} />
          )} />
          <Route exact path="/room/:id" component={() => (
            <FloatingButton icon="playlist_add" tooltip="Create Post" handleClick={() => this.showModal('postModal')} />
          )} />
        </div>
      </Router>
    );
  }
}
 
export default Dash;