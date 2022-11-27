import React from 'react';
import Login from './Loginpage/LoginPage'
import Signup from './Loginpage/SignupPage'
import HomePage from './Homepage/HomePage'
import MainPage from './MainPage/MainPage'
import { BrowserRouter, Route, Switch } from "react-router-dom";

/*
this part is for graphql query.
We didn't include graphql implementation in this application.
But it can be used for future need.
*/
const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}
async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}
/* end of graphql query function */


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
    this.updateData = this.updateData.bind(this);
  }

  //get information from local storage
  getInfo(entry) {
    var result = new Array();
    const info = localStorage.getItem(entry);
    if (info != null){
      result = JSON.parse(info);
    }
    return result;
  }

  updateData(data) {
    this.setState({data:data});
  }

  /* initialize new user's workspace in local storage*/
  createUserSpace(useremail,username) {
    const data = this.getInfo("DATA");
    let newUserSpace = {
      user: useremail,
      username: username,
      plans:[],
      completed:[],
      allJournals:[]
    };
    data.push(newUserSpace);
    this.setState({data:data});
    return data;
  }


  componentDidMount() {
    this.setState({ users: this.getInfo("USERS") });
    this.setState({ data: this.getInfo("DATA") });
  }


  updateUsers(users, useremail,username) {
    this.setState({ users: users });
    localStorage.setItem('USERS', JSON.stringify(users) );
    localStorage.setItem('DATA', JSON.stringify(this.createUserSpace(useremail,username)) );
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
            <Route path="/login" component={() => (<Login users={this.state.users}  userLogIn={this.logInUser}  usersUpdate={this.updateUsers}/>)} />
            <Route path="/signUp" component={() => (<Signup users={this.state.users} usersUpdate={this.updateUsers} />)} />
            <Route path = "/mainpage" component={() => (<MainPage user={this.state.user} updateData={this.updateData}/>)} />          
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;