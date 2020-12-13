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
import History from './history.js';
import Login from '../pages/login';
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
export default function AdminHistory(props)
{
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [day,setDay] = useState(new Date());
    const [place,setPlace] = useState([]);
    const [time,setTime] = useState([]);
    const [select,setSelect] = useState("");
    const [Mytext,setMytext] = useState("");
    const [confirm,setConfirm] = useState(false);
    const [timeslot,settimeslot] = useState({time : ""});
    function getData()
    {
        db.collectionGroup("reserving").orderBy('date').get().then(querySnapShot=>{
            const text=[];
            querySnapShot.forEach(doc =>{
                if(Mytext!="")
                {
                    if(doc.data().available==false&&doc.data().id===Mytext)
                    {
                        console.log("false",doc.data());
                        text.push(doc.data());
                    }
                }
                else
                {
                    if(doc.data().available==false)
                    {
                        console.log("false",doc.data());
                        text.push(doc.data());
                    }
                }
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
    function precancel(a)
    {
        handleClickOpen();
    }
    function cancel(a)
    {
        const d =new Date(a.date*1000)
        const nowday= d.getDate();
        const nowmonth = d.getMonth();
        const nowyear = d.getFullYear()-1969;
        console.log(nowday,nowmonth+1,nowyear)
        db.collection("place").doc(a.name).collection("reserving").doc((nowday)+" "+ (nowmonth+1)+" "+(nowyear)+" "+a.time).set({
            available : true,
            name : a.name,
            user : "",
            id : "",
            date : a.date,
            time : a.time

        })
        getData();
        
    }
    function todate(a)
    {
        let t = new Date(a.date*1000);
        return <td>{t.getDate()}/{t.getMonth()+1}/{t.getFullYear()-1969}</td>
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
    function action(a)
    { 
        return <button className="reserve-btn2" onClick={()=>{
            getData();
            precancel(a);
            settimeslot(a);
        }}>CANCEL</button>;     
    }
    useEffect(()=>{
        getData();
    },[]);
    if(typeof(props.location.state.name)!="undefined")
    {
        console.log(props.location.state.department);
        return (
            <>
                <main class="reserve">
                    <div className="admin-flex1 admin-bg">
                        <div className="admin-menu">
                            {props.location.state.name}<br/>{props.location.state.department}  {props.location.state.id}
                        </div>
                        <Link to={{
                            pathname : '/admin/history',
                            state : {
                                name : props.location.state.name,
                                id : props.location.state.id,
                                department : props.location.state.department
                            }
                        }}>
                            <div className="admin-menu">
                                User's Reservation
                            </div>
                        </Link>
                        <Link to={{
                            pathname : '/admin/generate',
                            state : {
                                name : props.location.state.name,
                                id : props.location.state.id,
                                department : props.location.state.department
                            }
                        }}>
                            <div className="admin-menu">
                                Generate
                            </div>
                        </Link>
                        
                        <div className="admin-menu-space">

                        </div>
                    </div>
                    <div className="admin-flex2">
                        <h3 className="reserve-font">Search ID : <input placeholder="ENTER ID" className="admin-input" onChange={(e)=>{
                            setMytext(e.target.value);
                            getData();
                        }}/> </h3>
                        <table>
                                <tr>
                                    <td className="">DATE</td>
                                    <td className="long-reserve">TIME</td>
                                    <td>PLACE</td>
                                    <td>ID</td>
                                    <td>ACTION</td>
                                </tr>
                                {place.map((t)=>(
                                    <tr>
                                        <td>{todate(t)}</td>
                                        <td>{t.time}</td>
                                        <td>{t.name}</td>
                                        <td>{t.id}</td>
                                        <td>{action(t)}</td>
                                    </tr>
                                ))}
                            </table>
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
                                getData();
                                cancel(timeslot);
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
    else
    {
        return (<Login/>)
    }
}