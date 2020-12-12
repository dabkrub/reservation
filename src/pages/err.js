import React, { Component } from 'react';
import circle1 from '../img/Circle1.png';
import circle2 from '../img/Circle2.png';
import errorpic1 from '../img/404.png'
import errorpic2 from '../img/error2.png'
class err extends Component {
    render() {
        return (
            <div className="error-page">
                <img src={errorpic1}/>
                <img src={errorpic2}/>
            </div>
        );
    }
}

export default err;