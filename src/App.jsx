import React from 'react';
import Login from './Loginpage/LoginPage'
import Signup from './Loginpage/SignupPage'
import HomePage from './Homepage/HomePage'
import MainPage from './MainPage/MainPage'
import { BrowserRouter, Route, Switch } from "react-router-dom";

/*
this part is for graphql query.
*/
const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}
async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
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

  async loadData() {
    const query = `query {
      listUsers {
        name email password
      }
    }`;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ users: data.listUsers });
    };
    console.log(this.state.users);

    const dataquery = `query {
      listData {
        user
        username
        plans{
          id startTime endTime description checked}
        completed{
          id startTime endTime description checked}
        allJournals{
          id startTime endTime description content}
        count
      }
    }`;
    const data2 = await graphQLFetch(dataquery);
    if (data2) {
      this.setState({ data: data2.listData });
    };
    console.log(this.state.data);  
  }


  componentDidMount() {
    this.loadData();
  }


  updateData(data) {
    this.setState({data:data});
  }

  async updateUsers(newUser) {

    const query = `mutation addUser($user: InputUser!) {
      addUser(user: $user) {
        name
      }
    }`;
    let user = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    };
    const new_user = await graphQLFetch(query, {user});
    if (new_user){
      this.loadData();
    }

    const data_query = `mutation addData($data: InputData!) {
      addData(data: $data) {
        user
      }
    }`;
    let data = {
      user: newUser.email,
      username: newUser.name,
      plans:[],
      completed:[],
      allJournals:[],
      count:0
    }
    const new_data = await graphQLFetch(data_query, {data});
    if (new_data){
      this.loadData();
    }

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
            <Route path = "/mainpage" component={() => (<MainPage user={this.state.user} updateData={this.updateData} data={this.state.data}/>)} />          
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;