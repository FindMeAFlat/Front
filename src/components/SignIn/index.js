// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import GoogleLogin from 'react-google-login';

// import { signIn } from './../../actions/';

// class SignIn extends Component {
//   static propTypes = {
//       signIn: PropTypes.func.isRequired,
//       history: PropTypes.object.isRequired,
//   };

//   CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

//   handleSuccess = (response) => {
//       const userId = response.profileObj.googleId;
//       this.props.signIn(userId);
//       this.props.history.push('/');
//   };

//   handleFailure = () => {
//   };

//   render() {
//       this.handleSuccess({ profileObj: { googleId: 'lalala' } });

//       return (
//           <div className="sign-in">
//               <GoogleLogin
//                   className="google-login"
//                   clientId={this.CLIENT_ID}
//                   buttonText="Sign in with Google"
//                   onSuccess={this.handleSuccess}
//                   onFailure={this.handleFailure}
//                   isSignedIn
//                   prompt="select_account"
//               />
//           </div>
//       );
//   }
// }


// export default connect(null, { signIn })(SignIn);
