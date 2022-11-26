import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'
import { right } from '@popperjs/core';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let navBar = <Navbar expand="lg">
            <Container>
                <Navbar.Brand style={{ width: "20%" }}>JOURNAL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ width: "10%", backgroundColor:"white" }} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end link" style={{ width: "100%"}}>
                        <Link to="/" >HOME</Link>
                        {!this.props.userLogIn ? <Link to="/login" >LOGIN </Link> : <Link onClick={this.props.userLogOut} to="/" >LOGOUT </Link>}
                        {!this.props.userLogIn ? <Link to="/signup" >SIGNUP </Link> : <Link onClick={this.props.userLogOut} to="/" >LOGOUT </Link>}
                        <FaUserCircle size={35} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        return (<div>{navBar}</div>)
    }
}

export default NavBar