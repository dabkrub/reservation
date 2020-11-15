import React, { Component } from 'react';
import circle1 from '../img/Circle1.png';
import circle2 from '../img/Circle2.png';
class err extends Component {
    render() {
        return (
            <div>
                <img src={circle2} className="login-circle2 no-overflow"/>
                <img src={circle1} className="login-circle1 no-overflow"/>
            </div>
        );
    }
}

export default err;