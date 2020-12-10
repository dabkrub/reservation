import React, { Component } from 'react';
import bg from '../img/home-bg.png'
import building from '../img/building.png';
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
            <>
                <main>
                    <div className="home-banner">
                        <div className="home-bg"></div>                       
                    </div>
                    <div className="home-main">
                            <h2>KMUTT</h2><h2>Online Reservation</h2>
                    </div>
                    <div className="home-main2">
                        <h1>WELCOME TO KMUTT ONLINE RESERVARION</h1>
                        <h3 className="home-sub">Looking for free working space? Trying to reserve a place for an event?</h3>
                    </div>
                    <div className="home-button">
                        <Link to="\reserve" style={{textDecoration:"none"}}>
                            <a className="button">Reserve</a>
                        </Link>
                    </div>
                </main>
                <section>
                    <div className="home-about">
                            <img src={building} id="building"/>
                        
                        <div >
                            <h2 className="about-text">ABOUT US</h2>
                            <hr/>
                            <br/><br/>
                            <div>
                                <h3>Our Beginning</h3>
                                <p>
                                    คณะผู้จัดทำได้เล็งเห็นถึงปัญหาในระบบจองของมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี ซึ่งมีความไม่สะดวกในการใช้งานและพบปัญหามากมายในการใช้ ทางคณะผู้จัดทำจึงเลือกหัวข้อนี้ ในการทำโปรเจกต์ซึ่งเป็นส่วนหนึ่งของรายวิชา CPE101 ขึ้นมาเพื่อแก้ปัญหาดังกล่าว 
                                </p>
                                <h3>Our Mission</h3>
                                <p>
                                    เป้าหมายของเราคือการทำให้ผู้ใช้งานระบบจองมีความสะดวกในการใช้งาน ความรวดเร็วในการเข้าถึงข้อมูลข่าวสาร และพบปัญหาในการใช้งานให้น้อยที่สุด เพื่อที่จะแก้ปัญหาระบบการจองที่มีอยู่ในปัจจุบัน 
                                </p>
                                <h3>Our Vision</h3>
                                <p>
                                    พวกเราหวังเป็นอย่างยิ่งว่าโปรเจกต์ที่เราทำจะพัฒนามหาวิทยาลัยของเราไปอีกขั้น และสามารถนำความรู้ที่ได้จากการทำโปรเจกต์นี้ไปต่อยอดในการทำงานในอนาคตต่อไป
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default home;