import React, { Component } from 'react';

import RoomCard from '../feed/RoomCard';
import sampleRooms from './sample-rooms.json';
import Redirect from '../common/Redirect';
import { getUrlParams } from '../../util/url';
import { getLoginRedirect, registerSpotify } from '../../util/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectUrl: '' }
    this.sampleRooms = sampleRooms.map((room, index) => <RoomCard key={index} data={room} />)
  }

  redirectToSpotify = async () => {
    const redirect = await getLoginRedirect();
    this.setState({ redirectUrl: redirect });
  }

  async componentDidMount() {
    const params = getUrlParams();
    const code = params.code || null;
    const { setUserInfo, history, userInfo } = this.props;

    if (userInfo.id) {
      history.push('/');
      return;
    };
    if (!code) return;

    const user = await registerSpotify(code);
    setUserInfo(user);
  }

  render() {
    if (this.state.redirectUrl) {
      return <Redirect url={this.state.redirectUrl} />
    }

    return (
      <div className="login">
        <div className="login__content">
          <div className="login__content-wrapper animated fadeInUp">
            <h1>DJ Rooomba</h1>
            <p>No politics here, just music</p>
            <button className="btn btn-secondary" onClick={this.redirectToSpotify}>Login with Spotify</button>
          </div>
        </div>
        <div className="login__image">
          <div className="login__card-list animated credits">
            {this.sampleRooms}
          </div>
        </div>
      </div>
    );
  }
}
 
export default Login;