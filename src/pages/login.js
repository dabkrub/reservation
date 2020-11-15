import React, { Component } from 'react';
import circle2 from '../img/Circle2.png';
import circle1 from '../img/Circle1.png';
import bg from '../img/login-bg.png';
class login extends Component {
    render() {
        return (
            <div className="no-overflow">
                <img src={circle2} className="login-circle2 no-overflow"/>
                <img src={circle1} className="login-circle1 no-overflow"/>
                <img src={bg} className="login-bg no-overflow"/>
                <div className="login-grid">
                    <div className="login-sub-text">
                        WELCOME TO
                    </div>
                    <div className="login-main-text">
                        KMUTT ONLINE RESERVATION
                    </div>
                    <div>
                    <div className="login-main-text2">
                        WELCOME TO
                    </div>  
                    </div>
                </div>
            </div>
        );
    }
}

export default login; 