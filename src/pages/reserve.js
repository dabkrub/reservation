import React, { Component, useState } from 'react';
import Calendar from "react-calendar";
import logo from '../img/kmutt.png';
function Reserve(){
    const [value,onChange] = useState(new Date());
    return (
        <>
            <main class="reserve">
                <div className="reserve-flex1">
                    <div className="reserve-menu">
                        User's Reservation
                    </div>
                    <div className="reserve-menu">
                        Reserve
                    </div>
                    <div className="reserve-menu-space">

                    </div>
                </div>
                <div className="reserve-flex2">
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