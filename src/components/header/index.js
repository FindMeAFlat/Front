import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import './index.css';
import { logOut } from './../../actions';

class Header extends Component{
    logOut = () => {
        this.props.logOut();
        this.props.history.push('/');
    }

    renderLogout = () => {
        return this.props.userId 
          ? (
            <GoogleLogout
                buttonText="Log out"
                onLogoutSuccess={this.logOut}
            />
          )
          : '';
    }

    render(){
        return (
            <nav class="navbar navbar-dark bg-primary">
                <Link className='navbar-brand' to='/'>Find me a flat</Link>
                {this.renderLogout()}
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: state.userId
});

export default connect(mapStateToProps, { logOut })(Header);