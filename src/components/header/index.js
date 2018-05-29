import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import './index.css';
import { logOut } from './../../actions';

class Header extends Component {
    static propTypes = {
      logOut: PropTypes.func,
      history: PropTypes.object,
      userId: PropTypes.string,
    };

    logOut = () => {
      this.props.logOut();
      this.props.history.push('/');
    };

    renderLogout = () => (this.props.userId
      ? (
        <GoogleLogout
          className="google-logout"
          buttonText="Log out"
          onLogoutSuccess={this.logOut}
        />
      )
      : '');

    render() {
      return (
        <nav className="header">
          <Link className="header-title" href="/" to="/">FindMeAFlat</Link>
          <img className="notification-icon" src="https://image.flaticon.com/icons/svg/77/77682.svg"/>
          {this.renderLogout()}
        </nav>
      );
    }
}

const mapStateToProps = state => ({
  userId: state.userId,
});

export default connect(mapStateToProps, { logOut })(Header);
