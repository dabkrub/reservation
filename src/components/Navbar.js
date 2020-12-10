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
        <>
            <nav className="nav-flex">
                <img src={Logo} id="nav-logo"/>
                <div className="nav-list">
                    <ul>
                        <Link to="/">
                            <li>HOME</li>
                        </Link>
                        <Link to="/about">
                            <li>ABOUT</li>
                        </Link>
                        <Link to="/contact">
                            <li>CONTACT US</li>   
                        </Link>
                        <Link to="/faq">
                            <li>FAQ</li>
                        </Link>
                        <Link to="/login">
                            <li>LOG IN</li>
                        </Link>
                        <Link to="/fb">
                            <li><img src={fb}/></li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </>
    );
};


export default Navbar;