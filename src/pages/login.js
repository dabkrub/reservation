import React, { Component } from 'react';
import login2 from '../img/login2.png';
import circle1 from '../img/Circle1.png';
import circle2 from '../img/Circle2.png';
class login extends Component {
    render() {
        return (
            <>
                <main>
                    <div className="login-box">
                        <div className="login-flex1 text-center">
                            <h4 classname="login-font1">WELCOME TO</h4>
                            <h2 className="login-font2">KMUTT ONLINE RESERVATION</h2>
                            <input className="login-input" placeholder="EMAIL"/><br/>
                            <input className="login-input" placeholder= "PASSWORD" type="password"/><br/><br/>
                            <a className="login-btn">SIGN IN</a>
                        </div>
                        <div className="login-flex2">
                            <img src={login2}/>
                        </div>
                    </div>
                </main>
                <img src={circle1} id="circle1"/>
                <img src={circle2} id="circle2"/>
            </>
        );
    }
}

export default login; 