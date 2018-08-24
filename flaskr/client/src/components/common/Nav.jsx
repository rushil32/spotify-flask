import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-dark.svg'

const Nav = ({ logout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-transperant">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="DJ Roomba"/>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
            <a className="nav-link" href="#">
              <i class="material-icons">account_circle</i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i class="material-icons">favorite</i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={logout}>
              <i class="material-icons">exit_to_app</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
