import React, { Component } from 'react';
import login2 from '../img/login2.png';
import circle1 from '../img/Circle1.png';
import circle2 from '../img/Circle2.png';
import auth from '../firebase';
import Reserve from '../pages/reserve.js';
import { findAllByAltText } from '@testing-library/react';
import  firebase from 'firebase/app';

class login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            isLoggedIn: 0,
            
        } 
    }

    changeUsername = (e) =>
    {
        const a = e.target.value;
        this.setState({
            username : a
        });
    }
    changePassword = (e) =>
    {
        const a = e.target.value;
        this.setState({
            password : a
        }); 
    }
    
    handleLogin =async () =>{
        try
        {
            const respond = await auth.signInWithEmailAndPassword(this.state.username,this.state.password);
            const  {user} = respond;
            this.setState({
                isLoggedIn : 1
            })
        }
        catch(error)
        {
            this.setState({
                isLoggedIn : -1
            })
        }
        
    }
    render() {
        if(this.state.isLoggedIn==0)
        return (
            <>
                <main>
                    <div className="login-box">
                        <div className="login-flex1 text-center">
                            <h4 classname="login-font1">WELCOME TO</h4>
                            <h2 className="login-font2">KMUTT ONLINE RESERVATION</h2>
                            <input className="login-input" placeholder="EMAIL" onChange={this.changeUsername}/><br/>
                            <input className="login-input" placeholder= "PASSWORD" type="password" onChange={this.changePassword}/><br/><br/>
                            <input className="login-btn" onClick={this.handleLogin} onKeyDown={this.handleLogin} type="submit" value="LOGIN"/>
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
        else if(this.state.isLoggedIn==-1)
        return (
            <>
                <main>
                    <div className="login-box">
                        <div className="login-flex1 text-center">
                            <h4 classname="login-font1">WELCOME TO</h4>
                            <h2 className="login-font2">KMUTT ONLINE RESERVATION</h2>
                            <input className="login-input" placeholder="EMAIL" onChange={this.changeUsername}/><br/>
                            <input className="login-input" placeholder= "PASSWORD" type="password" onChange={this.changePassword}/><br/><br/>
                            <h4 className="login-wrong">Wrong email or password</h4>
                            <input className="login-btn" onClick={this.handleLogin} onKeyDown={this.handleLogin} type="submit" value="LOGIN"/>
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
        else if(this.state.isLoggedIn==1)
        {
            return(
                <Reserve username={this.state.username}/>
            )
        }
    }
}

export default login; 