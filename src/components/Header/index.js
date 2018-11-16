import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleLogout, GoogleLogin } from 'react-google-login';
import ReactTooltip from 'react-tooltip';

import { logOut, signIn } from '../../actions/user';

class Header extends Component {
    logOut = () => {
        this.props.logOut();
    };

    handleLoginSuccess = (response) => {
        const userId = response.profileObj.googleId;
        this.props.signIn(userId);
    };

    handleLoginFailure = () => { };

    renderNotifications = () => (this.props.userId
        ? (
            <span className="number fa-stack fa-2x has-badge" data-count={10}>
                <i className="bell fa fa-bell xfa-inverse" data-count="4b" />
            </span>
        )
        : ''
    );

    render() {
        return (
            <div className="header-container">
                <nav className="header">
                    <Link className="header-title" href="/" to="/">FindMeAFlat</Link>

                    {this.renderNotifications()}
                    <div data-tip="Signed in users can save custom criteria for future use">
                        {this.props.userId
                            ? (
                                <GoogleLogout
                                    className="google-logout"
                                    buttonText="Log out"
                                    onLogoutSuccess={this.logOut}
                                />
                            )
                            : (
                                <GoogleLogin
                                    className="google-login"
                                    clientId={process.env.REACT_APP_CLIENT_ID}
                                    buttonText="Sign in"
                                    onSuccess={this.handleLoginSuccess}
                                    onFailure={this.handleLoginFailure}
                                    isSignedIn
                                    prompt="select_account"
                                />
                            )
                        }
                    </div>
                </nav>
                <ReactTooltip type="info" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.userId,
});

Header.propTypes = {
    logOut: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { logOut, signIn })(Header);
