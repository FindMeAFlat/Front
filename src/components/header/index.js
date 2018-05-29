import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { logOut } from './../../actions';

class Header extends Component {
    static propTypes = {
      logOut: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      userId: PropTypes.string.isRequired,
    };

    logOut = () => {
      this.props.logOut();
      this.props.history.push('/');
    };

    renderNotifications = () => (this.props.userId
      ? (
        <span className="number fa-stack fa-2x has-badge" data-count={10}>
          <i className="bell fa fa-bell xfa-inverse" data-count="4b" />
        </span>
      )
      : '');

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
          {this.renderNotifications()}
          {this.renderLogout()}
        </nav>
      );
    }
}

const mapStateToProps = state => ({
  userId: state.userId,
});

export default connect(mapStateToProps, { logOut })(Header);
