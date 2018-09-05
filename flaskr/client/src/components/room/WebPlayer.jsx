import React, { Component } from 'react';
import cookie from 'js-cookie';

class WebPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.token = cookie.get('access_token') || '';
    this.playerCheckInterval = null;
  }

  connectPlayer = () => { 
    const token = this.token;

    if (window.Spotify !== null) {
      this.player = new window.Spotify.Player({
        name: "Rushil's Spotify Player",
        getOAuthToken: cb => { cb(token); },
      });

      this.createEventHandlers();

      this.player.connect();
      clearInterval(this.playerCheckInterval);
    }
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });
  
    // Playback status updates
    this.player.on('player_state_changed', state => { console.log(state); });
  
    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
    });
  }

  componentDidMount = () => {
    if (this.token !== '') {
      this.playerCheckInterval = setInterval(() => this.connectPlayer(), 1000);
    }
  }

  render() {
    return (
      <div className="web-player">

      </div>
    );
  }
}
 
export default WebPlayer;