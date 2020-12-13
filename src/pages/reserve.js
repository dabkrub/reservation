import React, { Component, useEffect, useState } from 'react';
import Calendar from "react-calendar";
import logo from '../img/kmutt.png';
import fb from '../firebase/index';
import 'firebase/firestore';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Login from '../pages/login';
import History from './history.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";    
import { queries } from '@testing-library/react';
const db=fb.firestore();
function Reserve(props){
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [day,setDay] = useState(new Date());
    const [place,setPlace] = useState([]);
    const [time,setTime] = useState([]);
    const [select,setSelect] = useState("");
    const [confirm,setConfirm] = useState(false);
    const [timeslot,settimeslot] = useState({time : ""});
    function checkDate(){
        db.collectionGroup("reserving").where("name","==",select).orderBy("time").get().then(querySnapshot=>{
            const text=[]
            querySnapshot.forEach(doc=>{
                if(doc.data().date.seconds===day.getTime()/1000)
                {
                    text.push(doc.data());
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
        if(a.available==true)
        return <span className="reserve-available">available</span>;
        else if(a.user == props.location.state.name && a.id == props.location.state.id) return  <span className="reserve-already">you already reserve</span>;
        else return <span className="reserve-unavailable">unavailable</span>;
    }
    function handleClickOpen(){
        setOpen(true);
      };
    
    function handleClose (){
        setOpen(false);
      };
    function handleClickOpen2(){
        setOpen2(true);
      };
    
    function handleClose2 (){
        setOpen2(false);
      };
    function reserve(a)
    {
        const nowday= day.getDate();
        const nowmonth = day.getMonth();
        const nowyear = day.getFullYear();
        if(a.date.seconds===day.getTime()/1000&&a.name==select)
        db.collection("place").doc(select).collection("reserving").doc(nowday+" "+ (nowmonth+1)+" "+nowyear+" "+a.time).set({
            available : false,
            name : a.name,
            user : props.location.state.name,
            id : props.location.state.id,
            date : a.date,
            time : a.time

        })
        checkDate();
    }
    function prereserve(a)
    {
        handleClickOpen2();
    }
    function precancel(a)
    {
        handleClickOpen();
    }
    function cancel(a)
    {
        console.log("time",a.date);
        const nowday= day.getDate();
        const nowmonth = day.getMonth();
        const nowyear = day.getFullYear();
        if(a.date.seconds===day.getTime()/1000&&a.name==select)
        db.collection("place").doc(select).collection("reserving").doc(nowday+" "+ (nowmonth+1)+" "+nowyear+" "+a.time).set({
            available : true,
            name : a.name,
            user : "",
            id : "",
            date : a.date,
            time : a.time

        })
        checkDate();
        
    }
    
    function action(a)
    {
        if(a.available==true)
        return <button className="reserve-btn2" onClick={()=>{
            checkDate();
            prereserve(a);
            settimeslot(a);

        }}>RESERVE</button>;
        else if(a.user == props.location.state.name && a.id == props.location.state.id) 
        return <button className="reserve-btn2" onClick={()=>{
            checkDate();
            precancel(a);
            settimeslot(a);
        }}>CANCEL</button>;
        else
        return <button className="reserve-btn2 disable" disable>RESERVE</button>;
    }
    function day7(D)
    {
        D.setDate(D.getDate()+7)
        console.log("date",D);
        return D
    }
    console.log(select)
    useEffect(()=>{
        getList();
    },[]);
    try
    {
        console.log(props.location.state.name)
        return (
            <>
                <main class="reserve">
                    <Dialog/>
                    <div className="reserve-flex1">
                        <div className="reserve-menu">
                            {props.location.state.name}<br/>{props.location.state.department}  {props.location.state.id}
                        </div>
                        <Link to={{
                            pathname : '/reserve/history',
                            state : {
                                name : props.location.state.name,
                                id : props.location.state.id,
                                department : props.location.state.department
                            }
                        }}>
                            <div className="reserve-menu">
                                Your Reserve
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
                                <Calendar value={day} id="#calendar" onChange={setDay} minDate={new Date()} maxDate={day7(new Date())}/>
                            </div>
                            <button class="reserve-btn" onClick={checkDate}>Search</button>
                        </div>
                        <div>
                        <h2 className="reserve-font">เวลาว่างของ {select} ในวันที่ {day.getDate()}/{day.getMonth()+1}/{day.getFullYear()}</h2>
                            <table>
                                <tr>
                                    <td className="">DATE/TIME</td>
                                    <td className="long-reserve">{day.getDate()}/{day.getMonth()+1}/{day.getFullYear()}</td>
                                    <td>Action</td>
                                </tr>
                                {time.map((t)=>(
                                    <tr>
                                        <td>{t.time}</td>
                                        <td>{isAvailable(t)}</td>
                                        <td>{action(t)}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                    <br/>

                        <div>
                            <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                คุณต้องการยกเลิกการจอง {select} ในวันที่ {day.getDate()}/{day.getMonth()}/{day.getFullYear()} เวลา {timeslot.time}
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button autoFocus onClick={()=>{
                                handleClose();
                            }} color="primary">
                                ยกเลิก
                            </Button>
                            <Button onClick={()=>{
                                handleClose();
                                checkDate();
                                cancel(timeslot);
                            }} color="primary" autoFocus>
                                ตกลง
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div>
                            <Dialog
                                fullScreen={fullScreen}
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="responsive-dialog-title"
                            >
                            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                คุณต้องการจอง {select} ในวันที่ {day.getDate()}/{day.getMonth()}/{day.getFullYear()} เวลา {timeslot.time}
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button autoFocus onClick={()=>{
                                handleClose2();
                            }} color="primary">
                                ยกเลิก
                            </Button>
                            <Button onClick={()=>{
                                handleClose2();
                                checkDate();
                                reserve(timeslot);
                            }} color="primary" autoFocus>
                                ตกลง
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </main>
            </>
        )
    }
    catch(e)
    {
        return (<Login/>)
    }
}

export default Reserve;