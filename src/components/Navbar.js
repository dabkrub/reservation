import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../img/kmutt.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom"; 
import fb from '../img/fb-logo.png'
const Navbar = props => {
    return (
        <div className="navbar navbar-grid">
            <div className="left">
                <img src={Logo} className="navbar-logo"/>
            </div>
            <div className="navbar-menu right navbar-list">
                <Link to="/">
                    <a className="navbar-list">HOME</a>
                </Link>
                <Link to="/about">
                    <a className="navbar-list">ABOUT</a>
                </Link>
                <Link to="/contact">
                    <a className="navbar-list">CONTACT US</a>
                </Link>
                <Link to="/faq">
                    <a className="navbar-list">FAQ</a>
                </Link>
                <Link to="/login">
                    <a className="navbar-list">LOG IN</a>
                </Link>
                <Link to="/err">
                    <img className="navbar-list navbar-fb" src={fb} />
                </Link>
            </div>
        </div>
    );
};


export default Navbar;