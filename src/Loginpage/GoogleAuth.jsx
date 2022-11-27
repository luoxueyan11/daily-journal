import React from 'react'
import {useState, useCallback} from 'react';
import { GoogleLogin, GoogleLogout, GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { HashLink as Link } from "react-router-hash-link"
import { withRouter } from "react-router-dom"

function GoogleAuth(props) {
    const [user, setuser] = useState();
    var loginSuccessful = false; 
    const logout = () => {
      console.log('Logged Out');
      setuser("");
    }
    const success = (response) => {
      var userObject = jwt_decode(response.credential);
      console.log('Login Success');
      console.log(response);
      setuser(userObject.name);
      loginSuccessful = true;
      props.googleLogin(loginSuccessful,userObject.name,userObject.email);
    }
    const failure = () => {
      console.log('Login Failure');
    }
    return (
          <div>
            {/* <h1>Welcome, {user}</h1> */}
            <GoogleOAuthProvider clientId="419983708283-m4slss66fqg03rjahki9l3d8bu297uk0.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={success}
              onFailure={failure}
            />         
            </GoogleOAuthProvider>
          </div>)
  }

  export default withRouter(GoogleAuth)