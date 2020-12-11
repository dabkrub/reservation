import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from '../img/kmutt.png';
import menu from '../img/menu.png';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom"; 
import fb from '../img/fb-logo.png'
class Navbar extends Component
{
    constructor()
    {
        super();
        this.state={
            NavStatus:"nav-mobile-hide"
        }
    }
    changeStatus=()=>{
        if(this.state.NavStatus=="nav-mobile")
        this.setState({
            NavStatus:"nav-mobile-hide"
        })
        else
        {
            this.setState({
                NavStatus:"nav-mobile"
            })
        }
    }
    render(){
        let btn =this.state.NavStatus;
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
                            <Link to="/login">
                                <li>LOG IN</li>
                            </Link>
                            
                        </ul>
                    </div>
                    <div className="" onClick={this.changeStatus}>
                        <img src={menu} className="nav-btn"/>
                    </div>
                    <div className={btn}>
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
                            <Link to="/login">
                                <li>LOG IN</li>
                            </Link>
                            
                        </ul>
                    </div>
                </nav>
            </>
        );
    };
}



export default Navbar;