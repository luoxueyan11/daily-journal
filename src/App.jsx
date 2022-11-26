import React from 'react';
import Login from './Loginpage/LoginPage'
import Signup from './Loginpage/SignupPage'
import HomePage from './Homepage/HomePage'
import MainPage from './MainPage/MainPage'
////import MainPage
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import { GiRhinocerosHorn } from 'react-icons/gi';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],    // to track signup & login
      user: "",     // to track login & logout
      data:[], // store all the data
    }

    this.updateUsers = this.updateUsers.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  getInfo(entry) {
    var result = new Array();
    const info = localStorage.getItem(entry);
    if (info != null){
      result = JSON.parse(info);
    }
    return result;
  }

  createUserSpace(user) {
    const data = this.state.data;
    let newUserSpace = {
      user: user,
      plans:[],
      completed:[],
      allJournals:[]
    };
    data.push(newUserSpace);
    return data;
  }


  componentDidMount() {

    this.setState({ users: this.getInfo("USERS") });
    this.setState({ data: this.getInfo("DATA") });
  }

  updateUsers(users, user) {
    this.setState({ users: users });
    localStorage.setItem('USERS', JSON.stringify(users) );
    localStorage.setItem('DATA', JSON.stringify(this.createUserSpace(user)) );
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
            <Route path = "/mainpage" component={() => (<MainPage user={this.state.user}/>)} />          
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;