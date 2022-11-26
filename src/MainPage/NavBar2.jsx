import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link"
import { GiShoppingCart } from 'react-icons/gi';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'




class NavBar extends React.Component{
    constructor(){
        super();
    }

    render() {

        let navBar = <Navbar expand="lg">
                        <Container>
                            <Navbar.Brand>DailyJournal</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" style = {{backgroundColor: "white"}} />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="justify-content-end link" style = {{width: "100%"}}>
                                <Link  to="/mainpage" onClick={()=>{this.props.switchPage(1)}}>TIMELINE</Link>
                                <Link  to="/mainpage/#plan" onClick={()=>{this.props.switchPage(2)}}>PLAN</Link>
                                <Link  to="/mainpage/#journal" onClick={()=>{this.props.switchPage(3)}}>JOURNAL</Link>
                                <Link  to="/">HOMEPAGE</Link>
                                {/* {!this.props.userLogIn? <Link  to="/login" >LOG IN </Link>: <Link onClick = {this.props.userLogOut} to="/" >LOG OUT </Link>} */}

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                     </Navbar>


        return (<div>{navBar}</div>)

    }

}

export default NavBar