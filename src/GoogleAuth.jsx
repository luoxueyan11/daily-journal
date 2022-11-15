import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout, GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";

function GoogleAuth() {
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
      console.log(userObject)
      setuser(userObject.name)
      loginSuccessful = true;
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
  
export default GoogleAuth;