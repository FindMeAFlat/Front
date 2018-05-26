import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

import './index.css';

import { signIn } from './../../actions';

class SignIn extends Component{
    CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

    handleSuccess = (response) => {
        const userId = response.profileObj.googleId;
        this.props.signIn(userId);
        this.props.history.push('/');
    }

    render(){
        console.log(process.env)
        return (
            <div className='sign-in'>
                <GoogleLogin
                    className='google-login'
                    clientId={this.CLIENT_ID}
                    buttonText="Sign in with Google"
                    onSuccess={this.handleSuccess}
                    onFailure={(e) => console.log(e)}
                    isSignedIn={true}
                    prompt='select_account'
                />
            </div>
        );
    }
}



export default connect(null, { signIn })(SignIn);