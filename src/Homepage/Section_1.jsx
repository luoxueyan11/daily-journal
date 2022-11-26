import React from 'react'
import NavBar from './NavBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import Button from 'react-bootstrap/Button';
import './Section_1.css';
import JournalPost from './Section_2.jsx';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let navBar = <div style={{ paddingTop: 10, backgroud: "black" }}><NavBar users={this.props.users} userLogIn={this.props.userLogIn} userLogOut={this.props.userLogOut} /></div>
        return (
            <div className="Section1">
                {navBar}
                <div className="Section1_1">
                    <h2 className="Homeword1">Try a new type of Journal</h2>
                    <h2 className="Homeword2">Record life & make like-minded friends</h2>
                    <JournalPost />
                </div>
            </div>)
    }

}

export default Header