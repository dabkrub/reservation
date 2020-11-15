import React, { Component } from 'react';
import circle2 from '../img/Circle2.png';
import circle1 from '../img/Circle1.png';
import bg from '../img/login-bg.png';
import id from '../img/id-card.png';
import pass from '../img/padlock.png';
import pic1 from '../img/login-pic1.png';
import pic2 from '../img/login-pic2.png';
class login extends Component {
    render() {
        return (
            <div className="no-overflow">
                <img src={circle2} className="login-circle2 no-overflow"/>
                <img src={circle1} className="login-circle1 no-overflow"/>
                <img src={bg} className="login-bg no-overflow"/>
                <div className="login-grid">
                    <div>
                        <div className="login-sub-text">
                            WELCOME TO
                        </div>
                        <div className="login-main-text">
                            KMUTT ONLINE RESERVATION
                        </div>
                        <br/>
                        <input type="text" className="form-control login-input" id="username" placeholder="USERNAME"></input>
                        <input type="password" className="form-control login-input" id="password" placeholder="PASSWORD"></input>
                        <br/>
                        <button type="button" class="btn btn-danger login-btn">SIGN IN</button>
                        <img src={id} className="login-id"/>
                        <img src={pass} className="login-pass"/>
                        <img src={pic1} className="login-pic1"/>
                        <img src={pic2} className="login-pic2"/>
                    </div>
                    <div>
                    <div className="login-main-text3">
                            KMUTT ONLINE RESERVATION
                        </div>  
                    </div>
                </div>
            </div>
        );
    }
}

export default login; 