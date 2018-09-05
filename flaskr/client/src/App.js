import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getSpotifyUser } from './util/auth';
import Login from './components/login';
import Dash from './components/dash';

class App extends Component {
  state = {
    userInfo: {},
  }

  setUserInfo = (userInfo) => this.setState({ userInfo });

  async componentDidMount() {
    const userInfo = await getSpotifyUser();

    if (userInfo.id) {
      this.setUserInfo(userInfo);
    }
  }

  render() {
    const { userInfo } = this.state;

    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/login" component={(props) => 
                <Login {...props} setUserInfo={this.setUserInfo} userInfo={userInfo} />
              }/>
              <Route path="/" component={(props) => 
                <Dash {...props} userInfo={userInfo} />
              }/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
