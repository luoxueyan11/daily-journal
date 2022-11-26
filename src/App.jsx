import React from 'react';
import Login from './Loginpage/LoginPage'
import Signup from './Loginpage/SignupPage'
import HomePage from './Homepage/HomePage'

////import MainPage
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import { GiRhinocerosHorn } from 'react-icons/gi';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],    // to track signup & login
      user: "",     // to track login & logout
    }
    this.updateUsers = this.updateUsers.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  componentDidMount() {
    this.setState({ users: [] });
  }

  updateUsers(users) {
    this.setState({ users: users });
  }

  logInUser(userName) {
    this.setState({ user: userName })
  }

  logOutUser() {
    this.setState({ user: "" })
  }

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => (<HomePage users={this.state.users} userLogIn={this.state.user} userLogOut={this.logOutUser} />)} />
            <Route path="/login" component={() => (<Login users={this.state.users} userLogIn={this.logInUser} />)} />
            <Route path="/signUp" component={() => (<Signup users={this.state.users} usersUpdate={this.updateUsers} />)} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;