import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import './index.css';
import { logOut } from './../../actions';

class Header extends Component {
    propTypes = {
      logOut: React.ReactPropTypes.func,
      history: React.ReactPropTypes.array,
      userId: React.ReactPropTypes.number,
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
          <Link className="header-title" href="/" to="/">Find me a flat</Link>
          {this.renderLogout()}
        </nav>
      );
    }
}

const mapStateToProps = state => ({
  userId: state.userId,
});

export default connect(mapStateToProps, { logOut })(Header);
