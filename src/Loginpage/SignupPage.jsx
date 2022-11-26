import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { HashLink as Link } from "react-router-hash-link"
import { withRouter } from "react-router-dom"
import axios from 'axios'

import Footer from '../Homepage/Footer'
import NavBar from '../Homepage/NavBar'

import './LoginPage.css'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_name: "",
            customer_email: "",
            customer_pass1: "",
            customer_pass2: "",
            nullError: false,   // check null inputs
            userError: false,   // check exist username
            emailError: false,  // check exist email
            passwordError: false // check different password
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    checkInput() {
        if (!(this.state.customer_name && this.state.customer_email && this.state.customer_pass1 && this.state.customer_pass2)) {
            alert("Registration failed! All the inputs must be not null.");   // check inputs are not null
            this.setState({ ["nullError"]: true });
            return false;
        }

        const users = this.props.users;
        for (var i = 0; i < users.length; i++) {
            if (this.state.customer_name == users[i].customer_name) {
                alert("Registation failed! Username already exists.");   // check exist username
                this.setState({ ["userError"]: true });
                return false;
            }
            if (this.state.customer_email == users[i].customer_email) {
                alert("Registation failed! This email is already registered.");   // check exist email
                this.setState({ ["emailError"]: true });
                return false;
            }
        }

        if (this.state.customer_pass1 != this.state.customer_pass2) {
            alert("Registation failed! Please ensure you input the same password.");   // check passwordError
            this.setState({ ["passwordError"]: true });
            return false;
        }
        return true;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.checkInput()) {
            const temp = this.props.users;
            temp.push(this.state);
            this.props.usersUpdate(temp);

            var res = window.confirm("Registration successful! Click ok to log in and explore more features. Else, stay at the current page.");
            if (res == true) { this.props.history.push("/login"); }
        }
        this.setState({ [e.target.name]: "" });   //clear the input box
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        let form = <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label><strong>Username</strong></Form.Label>
                <Form.Control className='input_' type="text" maxLength="40" placeholder="Username" name="customer_name" onChange={this.handleOnChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label> <strong>Email address</strong></Form.Label>
                <Form.Control className='input_' type="email" placeholder="Enter Email as User Id" name="customer_email" onChange={this.handleOnChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label><strong>Password</strong></Form.Label>
                <Form.Control className='input_' type="password" placeholder="Password" name="customer_pass1" onChange={this.handleOnChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label><strong>Confirm Password</strong></Form.Label>
                <Form.Control className='input_' type="password" placeholder="Confirm Password" name="customer_pass2" onChange={this.handleOnChange} />
            </Form.Group>

            {this.state.nullError ? <div className="errorMessage"> Registation failed! All the inputs must be not null.</div> : null}
            {this.state.userError ? <div className="errorMessage">Registation failed! Username already exists.</div> : null}
            {this.state.emailError ? <div className="errorMessage"> Registation failed! This email is already registered.</div> : null}
            {this.state.passwordError ? <div className="errorMessage"> Registation failed! Please ensure you input the same password.</div> : null}

            <div className="d-grid gap-2">
                <Button variant="primary" type="submit" size='lg' style={{ width: "100%" }}>
                    Create Account
                </Button>
            </div>

            <div className="transLink1">
                <Link to="/login">Already have an account? <span className="transLink2">Click to log in.</span></Link>
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

                    <div className="footerWrapper">
                        <Footer />
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(Signup)