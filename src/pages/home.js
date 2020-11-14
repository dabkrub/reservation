import React, { Component } from 'react';
import bg from '../img/home-bg.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom"; 
class home extends Component {
    render() {
        return (
            <div className="home-main">
                <img src={bg} className="home-bg"/>
                <div className="home-big-text left">
                    KMUTT
                </div>
                <div className="home-big-text2 left">
                    Online Reservation
                </div>
                <div className="home-main-text">
                    WELCOME TO KMUTT ONLINE RESERVATION
                </div>
                <div className="home-sub-text">
                    Looking for free working space? Trying to reserve a place for an event?
                 </div>
                 <Link to="/reserve">
                    <button type="button" class="btn btn-outline-light home-btn center">RESERVE</button>
                </Link>
            </div>
        );
    }
}

export default home;