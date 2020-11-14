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
            <div>
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
                <div className="home-about">
                    <img src={building} className="home-about-pic"/>
                    <div>
                        <div className="left home-about-font">
                            ABOUT US
                        </div>
                        <hr className="home-about-line"/>
                        <p className="home-about-text">
                        Our Beginning
                        คณะผู้จัดทำได้เล็งเห็นถึงปัญหาในระบบจองของมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี ซึ่งมีความไม่สะดวกในการใช้งานและพบปัญหามากมายในการใช้ ทางคณะผู้จัดทำจึงเลือกหัวข้อนี้ในการทำโปรเจกต์ซึ่งเป็นส่วนหนึ่งของรายวิชา CPE101 ขึ้นมาเพื่อแก้ปัญหาดังกล่าว
                        <br/><br/>
                        </p>
                        <p className="home-about-text ">
                        Our Mission
                        เป้าหมายของเราคือการทำให้ผู้ใช้งานระบบจองมีความสะดวกในการใช้งาน ความรวดเร็วในการเข้าถึงข้อมูลข่าวสาร และพบปัญหาในการใช้งานให้น้อยที่สุด เพื่อที่จะแก้ปัญหาระบบการจองที่มีอยู่ในปัจจุบัน
                        </p>
                        <br/><br/>
                        <p className="home-about-text">
                        Our Vision
                        พวกเราหวังเป็นอย่างยิ่งว่าโปรเจกต์ที่เราทำจะพัฒนามหาวิทยาลัยของเราไปอีกขั้น และสามารถนำความรู้ที่ได้จากการทำโปรเจกต์นี้ไปต่อยอดในการทำงานในอนาคตต่อไป
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default home;