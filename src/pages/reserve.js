import React, { Component, useState } from 'react';
import Calendar from "react-calendar";
import logo from '../img/kmutt.png';
import fb from '../firebase/index';
import 'firebase/firestore';
import firebase from 'firebase';
const db=fb.firestore();
function Reserve(props){
        
    var test = []
    const [value,onChange] = useState(new Date());
    db.collection("place").get().then(querySnapshot=>{
        querySnapshot.forEach(doc => {
            test.push(doc.data().name)
        });
    })
    var itemtorender = test.map(a=>{
        return <option>{a}</option>
    })
    console.log(itemtorender);
    return (
        <>
            <main class="reserve">
                <div className="reserve-flex1">
                    <div className="reserve-menu">
                        {props.name}<br/>{props.department}  {props.id}
                    </div>
                    <div className="reserve-menu">
                        History/Cancel
                    </div>
                    <div className="reserve-menu">
                        Reserve
                    </div>
                    <div className="reserve-menu-space">

                    </div>
                </div>
                <div className="reserve-flex2">
                    <div>
                        <select>
                            {itemtorender}
                        </select>
                    </div>
                    <div className="calendar">
                        <Calendar onChange={onChange} value={value} id="#calendar"/>

                    </div>

                </div>
                <br/>
                {value.toLocaleString()}
            </main>
        </>
    )
}

export default Reserve;