import React, { Component, useEffect, useState } from 'react';
import Calendar from "react-calendar";
import logo from '../img/kmutt.png';
import fb from '../firebase/index';
import 'firebase/firestore';
import firebase from 'firebase';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom"; 
import { queries } from '@testing-library/react';
const db=fb.firestore();
function Reserve(props){
        
    const [day,onChange] = useState(new Date());
    const [place,setPlace] = useState([]);
    const [time,setTime] = useState([]);
    const [select,setSelect] = useState("");
    function checkDate(){
        console.log("search");
        db.collectionGroup("booking").where("name","==",select).orderBy("time").get().then(querySnapshot=>{
            const text=[]
            querySnapshot.forEach(doc=>{
                if(doc.data().date.seconds===day.getTime()/1000)
                {
                    text.push(doc.data());
                    console.log("yes");
                }
                else
                {
                    console.log("no");
                }
            })  
            setTime(text);
        })
    }
    function getList(){
        db.collection("place").get().then(querySnapshot=>{
            const text=[];
            querySnapshot.forEach(doc => {
                text.push(doc.data());
            });
            setPlace(text);
        })
    }
    function isAvailable(a)
    {
        if(a==true)
        return <span className="reserve-available">available</span>;
        else
        return <span className="reserve-unavailable">unavailable</span>;
    }
    function action(a)
    {
        if(a==true)
        return <button className="reserve-btn2">RESERVE</button>;
        else
        return <button className="reserve-btn2 disable" disable>RESERVE</button>;
    }
    console.log(select)
    useEffect(()=>{
        getList();
    },[]);
    return (
        <>
            <main class="reserve">
                <div className="reserve-flex1">
                    <div className="reserve-menu">
                        {props.name}<br/>{props.department}  {props.id}
                    </div>
                    <Link to="/reserve/history">
                        <div className="reserve-menu">
                            History/Cancel
                        </div>
                    </Link>
                    <Link to="/reserve/reserve">
                        <div className="reserve-menu">
                            Reserve
                        </div>
                    </Link>
                    <div className="reserve-menu-space">

                    </div>
                </div>
                <div className="reserve-flex2">
                    <div className="reserve-flex3">
                        <h3>Select Place</h3>
                        <div>
                            <select className="reserve-list" onChange={(e)=>{
                                setSelect(e.target.value);
                            }}>
                                <option value="" disabled selected></option>
                                {place.map((p)=>(
                                    <option value={p.name}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="calendar">
                            <Calendar onChange={onChange} value={day} id="#calendar"/>
                        </div>
                        <button class="reserve-btn" onClick={checkDate}>Search</button>
                    </div>
                    <div>
                        <h2 className="reserve-font">เวลาว่างของ {select} ในวันที่ {day.getDate()}/{day.getMonth()}/{day.getFullYear()}</h2>
                        <table>
                            <tr>
                                <td className="">DATE/TIME</td>
                                <td className="long-reserve">{day.getDate()}/{day.getMonth()}/{day.getFullYear()}</td>
                                <td>Action</td>
                            </tr>
                            {time.map((t)=>(
                                <tr>
                                    <td>{t.time}</td>
                                    <td>{isAvailable(t.available)}</td>
                                    <td>{action(t.available)}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
                <br/>
            </main>
        </>
    )
}

export default Reserve;