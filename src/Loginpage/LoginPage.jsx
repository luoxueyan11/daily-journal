import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Footer from '../Homepage/Footer'
import NavBar from '../Homepage/NavBar'
import { HashLink as Link } from "react-router-hash-link"
import { withRouter } from "react-router-dom"
import GoogleAuth from "./GoogleAuth"
import './LoginPage.css'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            customer_email: "",
            customer_pass: "",
            loginError: false   // check non-matched email and password
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
    }

    async googleLogin(signal, user,email) {
        if (signal) {
            console.log("welcome, ",user);
            const temp = this.props.users;
            var isFound = false;
            for (var i=0;i<temp.length;i++){
                if (temp[i].email == email){
                    isFound = true;
                    break;
                };
            }

            if (!isFound) {
                const newUser = {
                    name: user,
                    email: email,
                    password: "",
                }
                // temp.push(newUser);
                // this.props.usersUpdate(temp, email, user);
                await this.props.usersUpdate(newUser);
                this.props.userLogIn(email);
                this.props.history.push("/mainpage");   //login successful
            } else {
                this.props.userLogIn(email);
                this.props.history.push("/mainpage");   //login successful
            }

        }
    }

    checkInput() {
        console.log(this.props.users);
        const users = this.props.users;
        for (var i = 0; i < users.length; i++) {
            if (this.state.customer_email == users[i].email && this.state.customer_pass == users[i].password) {
                return true;
            }
        }
        alert("Login failed! Incorrect username or password. Please try again.");
        this.setState({ ["loginError"]: true });
        return false;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.checkInput()) {
            this.props.userLogIn(this.state.customer_email)
            this.props.history.push("/mainpage");   //login successful, ask to explore more or not
        }
        this.setState({ [e.target.name]: "" });   //clear the input box
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        let form = <Form onSubmit={this.handleSubmit}>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label> <strong>Email address</strong></Form.Label>
                <Form.Control className='input_' type="email" placeholder="Enter email" name="customer_email" onChange={this.handleOnChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label><strong>Password</strong></Form.Label>
                <Form.Control className='input_' type="password" placeholder="Password" name="customer_pass" onChange={this.handleOnChange} />
            </Form.Group>

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            {this.state.loginError ? <div className="errorMessage">Login failed! Incorrect username or password. Please try again. </div> : null}

            <div className="d-grid gap-2">
                <Button variant="primary" type="submit" size='lg' style={{ width: "100%" }}>
                    Login
                </Button>
            </div>
            <br></br><div><GoogleAuth googleLogin={this.googleLogin}/></div>

            <div className="transLink1">
                <Link to="/signUp">Don't have an account? <span className="transLink2">Click to sign up.</span></Link>
            </div>
        </Form>

        return (
            <React.Fragment>
                <div className="loginPage">
                    <div className="navBarWrapper">
                        <NavBar />
                    </div>

                    <div className='content'>
                        <img src='../Images/login_pic1.jpg' />
                        {form}
                    </div>

                    <div class="footerWrapper">
                        <Footer />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Login)