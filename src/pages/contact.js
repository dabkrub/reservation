import React, { Component } from 'react';
import circle1 from '../img/Circle1.png';
import circle2 from '../img/Circle2.png';

class contact extends Component {
    render() {
        return (
            <div>
                <main className="contact-font">
                    <h2>ใช้งานระบบมีปัญหาติดต่อ</h2><br/>
                    <h2>อภิชา อ่อนอำไพ 093-946-5199</h2>
                </main>
                <img src={circle2} id="circle2"/>
                <img src={circle1} id="circle1"/>
            </div>
        );
    }
}

export default contact;