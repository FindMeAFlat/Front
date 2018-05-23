import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

import './index.css';

import { signIn } from './../../actions';

class SignIn extends Component{
    CLIENT_ID = '199758126206-940shrcvohvdmf81j09dkihlirapq4vp.apps.googleusercontent.com';

    handleSuccess = (response) => {
        const userId = response.profileObj.googleId;
        this.props.signIn(userId);
        this.props.history.push('/');
    }

    render(){
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