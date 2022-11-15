// import { useCallback, useEffect, useRef} from 'react';
// import GoogleAuth from './GoogleAuth.jsx';
// import TextEditor from './TextEditor.jsx';

import React from 'react';
import {useState, useCallback} from 'react';
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

function TextEditor(){
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }], 
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video']
  ];


  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return 

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    new Quill(editor, {
      modules: {
        toolbar: toolbarOptions
      }, 
      theme: "snow"
    });
  }, [])

  return <div id="container" ref={wrapperRef}></div>
}

class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.login;
    const users = this.props.users;
    const email = form.email.value;
    const password = form.password.value;
    var isSuccessful = false; 
    for (var i=0; i<users.length; i++){
      if (email == users[i].email && password == users[i].password){
        isSuccessful = true;
        this.props.switchPage(2);
      } 
      }
    if (!isSuccessful) {
      alert("The username or password is incorrect.")
    }   
    form.email.value = "";
    form.password.value = "";
  }

  render() {
    console.log("login");
    return (
      <div className="register-container">
        <form name="login" className="register" onSubmit={this.handleSubmit}>
          <h2>Log in to your account</h2>
          <div><GoogleAuth/></div><br></br>
          <div className="social-container">
            {/* <a href="#"><i className="fa-brands fa-qq"></i></a>
            <a href="#"><i className="fa-brands fa-weixin"></i></a>
            <a href="#"><i className="fa-brands fa-weibo"></i></a> */}
          </div>
          <input type="email" name="email" id="email" placeholder="Email" /><br></br>
          <input type="password" name="password" placeholder="Password" /><br></br>
          <a href="#" className="forget">Forget your password</a><br></br>
          <button>Log in</button>
        </form>
      </div>
    );
  }
}


class Signup extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.signup;
    const newEmail = form.email.value;
    const newPassword = form.password.value;
    const newFirstName = form.firstname.value;
    const newLastName = form.lastname.value;
    const newUser = {email:newEmail, password:newPassword, firstname:newFirstName, lastname:newLastName};
    this.props.signUpUser(newUser);
    form.email.value = "";
    form.password.value = "";
    form.firstname.value = "";
    form.lastname.value = "";
  }

  render() {
    console.log("signup");
    return (
      <div className="register-container">
        <form name="signup" className="register" onSubmit={this.handleSubmit}>
          <h2>Sign up an account</h2>
          <div className="social-container">
            {/* <a href="#"><i className="fa-brands fa-qq"></i></a>
            <a href="#"><i className="fa-brands fa-weixin"></i></a>
            <a href="#"><i className="fa-brands fa-weibo"></i></a> */}
          </div>
          <input type="email" name="email" id="email" placeholder="Email" /><br></br>
          <input type="password" name="password" placeholder="Password" /><br></br>
          <input type="firstname" name="firstname" placeholder="First Name" /><br></br>
          <input type="lastname" name="lastname" placeholder="Last Name" /><br></br>
          <button>Sign up</button>
        </form>
      </div>
    );
  }
}


class Homepage extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log("Homepage");
    return (
      <div className="register-container">
        <form name="signup" className="register">
          <h2>Welcome!</h2>
        </form>
      </div>
    );
  }
}


class TimeLine extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="register-container">
        <form name="signup" className="register">
          <h2>TimeLine</h2>
        </form>
      </div>
    );
  }
}


const initialPlan = [
  {
    id : 1,
    startTime : "10:00 am",
    endTime : "11:00 am",
    description: "This is a task",
    checked: false
  },
  {
    id : 2,
    startTime : "14:00 pm",
    endTime : "16:00 pm",
    description: "This is a task",
    checked: false
  },
]



class PlanRows extends React.Component {
  constructor() {
    super(); 
  }

  handleChange(e, id,checked) {
    if (!checked){
      this.props.completePlans(id);
    } else {
      this.props.uncheckPlans(id);
    }
  }

  handleDelete(e, id) {
    this.props.deletePlans(id);
  }

  render() {
    const plans = this.props.plans;
    return (
      plans.map(plan => 
        <tr>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{plan.id.toString()}</td>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{plan.startTime.toString()}</td>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{plan.endTime.toString()}</td>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{plan.description.toString()}</td>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}><input 
            type="checkbox" 
            checked={plan.checked}
            //value={plan.id}
            onChange={e => this.handleChange(e, plan.id, plan.checked)}
            /></td>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}><input 
            type="button" 
            value="Delete"
            onClick={e => this.handleDelete(e, plan.id)}
            /></td>
        </tr>
      )
    )
  }
}

class Plan extends React.Component {
  constructor() {
    super(); 
    this.completePlans = this.completePlans.bind(this);
    this.deletePlans = this.deletePlans.bind(this);
    this.uncheckPlans = this.uncheckPlans.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  completePlans(id){
    this.props.completePlans(id);
  }

  deletePlans(id){
    this.props.deletePlans(id);
  }

  uncheckPlans(id){
    this.props.uncheckPlans(id);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.addPlan;
    const newStartTime = form.startTime.value;
    const newEndTime = form.endTime.value;
    const newDescription = form.description.value;
    let newPlan = {id:this.props.plans.length + 1,
                    startTime:newStartTime, endTime:newEndTime, 
                    description:newDescription, checked:false};
    this.props.addPlans(newPlan);
    form.startTime.value = "";
    form.endTime.value = "";
    form.description.value = "";
  }

  render() {
    return (
      <div className="register-container">
        <form name="addPlan" className="register" onSubmit={this.handleSubmit}>
          <p>Input start time, end time and description to add a new plan.</p>
          <input type="startTime" name="startTime" id="startTime" placeholder="Start Time" /><br></br>
          <input type="endTime" name="endTime" placeholder="End Time" /><br></br>
          <input id="description" name="description" style={{"width": "300px", "height": "60px"}} placeholder="Enter description here..."/><br></br>
          <button>Add New Plan</button><br></br>

            <table className="bordered-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Description</th>
                <th>Completion Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <PlanRows plans={this.props.plans} 
                        deletePlans={this.deletePlans}
                        completePlans={this.completePlans} uncheckPlans={this.uncheckPlans}/>
            </tbody>
            </table>
        </form>
      </div>
    );
  }
}

class JournalRows extends React.Component {
  constructor() {
    super(); 
  }


  render() {
    const completed = this.props.completed;
    return (
      completed.map(p => 
        <tr>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{p.startTime.toString()}</td>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{p.endTime.toString()}</td>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{p.description.toString()}</td>
          <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}><input 
            type="button" 
            value="Edit"
            onClick={(e) => {this.props.switchPage(2);}}
            /></td>
        </tr>
      )
    )
  }
}


class Journal extends React.Component {
  constructor() {
    super();
    this.state = { selector: 1}; 
    this.switchPage = this.switchPage.bind(this);
  }
  setSelector(value){
    this.setState({selector:value});
    console.log(value);
  }

  switchPage(value){
    this.setSelector(value);
  }

  renderSwitch(param) {
    switch(param) {
      case 1:
        return (
          <div className="register-container">
          <form name="signup" className="register">
            <h2>Journal</h2>
            <table className="bordered-table">
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Content</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
               <JournalRows completed={this.props.completed} switchPage={this.switchPage}/>
              </tbody>
              </table>
          </form>
        </div>
        );
      case 2:
        return (
          <div>
            <div>
              Editor
            </div>
            <div><button onClick={(e) => {this.switchPage(1);}}>back</button></div>
            <div><TextEditor/></div>
          </div>

        );
    }
  }

  render() {

    return (
      <div>
        {this.renderSwitch(this.state.selector)}
      </div>
    );
  }
}


class InitialPage extends React.Component {
	constructor() {
	super();
  this.state = { selector: 1}; 
  this.signUpUser = this.signUpUser.bind(this);
	}

  setSelector(value){
    this.setState({selector:value});
    console.log(value);
  }

  signUpUser(user){
    const temp = this.props.users;
    temp.push(user);
    this.props.updateUsers(temp);
  }

	render(){
    return (
	<div className="register-container">
    <button onClick={()=>{this.setSelector(1)}}>Homepage</button>
    <button onClick={()=>{this.setSelector(2)}}>Log in</button>
    <button onClick={()=>{this.setSelector(3)}}>Sign up</button>
    <form className="register">
    <h4>Website title</h4>
    <div>
      {this.state.selector == 1 && (<Homepage users={this.props.users} selector={this.state.selector} setSelector={this.setSelector}/>)}
      {this.state.selector == 2 && (<Login users={this.props.users} switchPage={this.props.switchPage}/>)}
      {this.state.selector == 3 && (<Signup users={this.props.users} signUpUser={this.signUpUser}/>)}
  </div>
  </form>
</div>
  );
	}
}


class MainPage extends React.Component {
	constructor() {
	super();
  this.state = {plans:initialPlan, completed:[], selector: 1}; 
  this.completePlans = this.completePlans.bind(this);
  this.uncheckPlans = this.uncheckPlans.bind(this);
  this.addPlans = this.addPlans.bind(this);
  this.deletePlans = this.deletePlans.bind(this);
	}

  setSelector(value){
    this.setState({selector:value});
  }

  addPlans(plan){
    const temp = this.state.plans;
    temp.push(plan);
    this.setState({plans:temp});
    console.log(temp)
  }

  deletePlans(id){
    this.uncheckPlans(id);
    const plans = this.state.plans;
    const updatePlans = plans.filter(function(plan){
      return plan.id != id;
    })
    for (var i=0; i<updatePlans.length; i++){
      updatePlans[i].id = i+1;
    }

    this.setState({plans:updatePlans});
  }

  completePlans(id){
    const plans = this.state.plans;
    const temp = this.state.completed;
    for (var i=0; i<plans.length; i++){
      if (plans[i].id == id){
        let newComplete = {
          id: plans[i].id,
          startTime: plans[i].startTime,
          endTime: plans[i].endTime,
          description: plans[i].description,
          checked: true
        }
        plans[i] = newComplete;
        temp.push(newComplete);
      }
    }
    this.setState({completed: temp.sort((a, b) => (a.id > b.id) ? 1 : -1)}, function () {
      console.log("check a plan");
  });
  }

  uncheckPlans(id){
    const plans = this.state.plans;
    const temp = this.state.completed;
    const updateComplete = temp.filter(function(plan){
      return plan.id != id;
    })
    this.setState({completed: updateComplete}, function () {
      console.log("uncheck a plan");
  });

    
    for (var i=0; i<plans.length; i++){
      if (plans[i].id == id){
        let newUncheck = {
          id: plans[i].id,
          startTime: plans[i].startTime,
          endTime: plans[i].endTime,
          description: plans[i].description,
          checked: false
        }
        plans[i] = newUncheck;
      }
    }
  }

	render(){
    return (
	<div className="main-page-container">
    <div className="right-align">
      <div className="right-align"><button onClick={()=>{this.props.switchPage(1)}}>Log out</button></div>
      <br></br>
      <br></br>
      <button onClick={()=>{this.setSelector(1)}}>TIMELINE</button>
      <button onClick={()=>{this.setSelector(2)}}>PLAN</button>
      <button onClick={()=>{this.setSelector(3)}}>JOURNAL</button>
    </div>
    <div className="left-align"><h2>Website title</h2></div>
    <form className="register">
    <div>
      {this.state.selector == 1 && (<TimeLine/>)}
      {this.state.selector == 2 && (<Plan plans={this.state.plans} completed={this.state.completed} 
                                          completePlans={this.completePlans} uncheckPlans={this.uncheckPlans}
                                          addPlans={this.addPlans}
                                          deletePlans={this.deletePlans}
                                          />)}
      {this.state.selector == 3 && (<Journal completed={this.state.completed}/>)}
  </div>
  </form>
</div>
  );
	}
}


class WebPage extends React.Component{
  constructor() {
  super();
  this.state = { users: [], selector: 1}; 
  this.switchPage = this.switchPage.bind(this);
  this.updateUsers = this.updateUsers.bind(this);
  }

  setSelector(value){
    this.setState({selector:value});
  }

  componentDidMount() {
    this.setState({ users: [] });
  }

  switchPage(selector){
    this.setSelector(selector);
  }

  updateUsers(users){
    this.setState({users:users});
  }

  render() {
    return (
      <div>   
        {this.state.selector == 1 && (<InitialPage users = {this.state.users} switchPage = {this.switchPage} updateUsers = {this.updateUsers}/>)}
        {this.state.selector == 2 && (<MainPage switchPage = {this.switchPage}/>)}
      </div>
    );
  }
}


// const element = <InitialPage />;
// const element = <MainPage />;
const element = <WebPage />;


ReactDOM.render(element, document.getElementById('contents'));
