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
import Timestamp from 'react-timestamp'
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
export default function Generate(props)
{
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [day,setDay] = useState(new Date());
    const [place,setPlace] = useState([]);
    const [time,setTime] = useState([]);
    const [mylist,setmylist] = useState([]);
    const [select,setSelect] = useState("");
    const [Mytext,setMytext] = useState("");
    const [confirm,setConfirm] = useState(false);
    const [timeslot,settimeslot] = useState({time : ""});
    const badmintontime=["3pm-4pm","4pm-5pm","5pm-6pm","6pm-7pm"];
    const librarytime=["10am-11am","11am-12pm","12pm-1pm","1pm-2pm","2pm-3pm"]
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
    function autoGen(){
        for(var i=0;i<7;i++)
        {   
            const d= new Date();
            d.setDate(d.getDate()+i)
            const nowday= d.getDate();
            const nowmonth = d.getMonth();
            const nowyear = d.getFullYear();
            d.setHours(0,0,0,0);
            const ts = new firebase.firestore.Timestamp.fromDate(d)
            for(var j=0;j<4;j++)
            {
                db.collection("place").doc("badminton1").collection("reserving").doc(nowday+" "+ (nowmonth+1)+" "+nowyear+" "+badmintontime[j]).set({
                    available : true,
                    name : "badminton1", 
                    user : "",
                    id : "",
                    date : ts ,
                    time : badmintontime[j]
                    })
            }
            for(var j=0;j<4;j++)
            {
                db.collection("place").doc("badminton2").collection("reserving").doc(nowday+" "+ (nowmonth+1)+" "+nowyear+" "+badmintontime[j]).set({
                    available : true,
                    name : "badminton2", 
                    user : "",
                    id : "",
                    date : ts ,
                    time : badmintontime[j]
                    })
            }
            for(var j=0;j<5;j++)
            {
                db.collection("place").doc("ห้องติว CPE").collection("reserving").doc(nowday+" "+ (nowmonth+1)+" "+nowyear+" "+librarytime[j]).set({
                    available : true,
                    name : "ห้องติว CPE", 
                    user : "",
                    id : "",
                    date : ts ,
                    time : librarytime[j]
                    })
            }
            for(var j=0;j<5;j++)
            {
                db.collection("place").doc("ห้องติว ณ ห้องสมุด").collection("reserving").doc(nowday+" "+ (nowmonth+1)+" "+nowyear+" "+librarytime[j]).set({
                    available : true,
                    name : "ห้องติว ณ ห้องสมุด", 
                    user : "",
                    id : "",
                    date : ts ,
                    time : librarytime[j]
                    })
            }
        checkDate();
        }
    }
    function getList(){
        db.collection("place").get().then(querySnapshot=>{
            const text=[];
            querySnapshot.forEach(doc => {
                text.push(doc.data());
            });
            setmylist(text);
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
    function handleClose (){
        setOpen(false);
      };
    function handleClickOpen2(){
        setOpen2(true);
      };
    function preadd(){
        handleClickOpen();
    }
    function adminaction(a)
    {
        return <button className="reserve-btn2" onClick={()=>{
            predelete()
            settimeslot(a)
        }}>DELETE</button>;
    }
    function add(){
        const nowday= day.getDate();
        const nowmonth = day.getMonth();
        const nowyear = day.getFullYear();
        const ts = new firebase.firestore.Timestamp.fromDate(day)
        db.collection("place").doc(select).collection("reserving").doc(nowday+" "+ (nowmonth+1)+" "+nowyear+" "+Mytext).set({
            available : true,
            name : select, 
            user : "",
            id : "",
            date : ts ,
            time : Mytext

        })
        checkDate();
    }
    function handleClose2 (){
        setOpen2(false);
      };    
    function predelete()
    {
        handleClickOpen2();
    }
    function deletee(a)
    {
        const nowday= day.getDate();
        const nowmonth = day.getMonth();
        const nowyear = day.getFullYear();
        db.collection("place").doc(select).collection("reserving").doc(nowday+" "+ (nowmonth+1)+" "+nowyear+" "+a.time).delete();
        checkDate();
    }
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
        getList();
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
                    <div className="reserve-flex2">
                        <div className="reserve-flex3">
                            <h3>Select Place</h3>
                            <div>
                                <select className="reserve-list" onChange={(e)=>{
                                    setSelect(e.target.value);
                                }}>
                                    <option value="" disabled selected></option>
                                    {mylist.map((p)=>(
                                        <option value={p.name}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="calendar">
                                <Calendar value={day} id="#calendar" onChange={setDay} />
                            </div>
                            <button class="reserve-btn" onClick={checkDate}>Search</button>
                        </div>
                        <div className="generate-table">
                            <table>
                                <tr className="generate-cell">
                                    <td className="">DATE/TIME</td>
                                    <td className="long-reserve">{day.getDate()}/{day.getMonth()+1}/{day.getFullYear()}</td>
                                    <td>User</td>
                                    <td>Admin Action</td>
                                </tr>
                                {time.map((t)=>(
                                    <tr>
                                        <td>{t.time}</td>
                                        <td>{isAvailable(t)}</td>
                                        <td>{t.user}</td>
                                        <td>{adminaction(t)}</td>
                                    </tr>
                                ))}
                            </table>
                            <br/>
                            <h3>ADD MORE TIME :</h3><input placeholder="ex. 8pm-9pm" onChange={(e)=>{
                                setMytext(e.target.value)
                            }}/>
                            <button className="generate-btn" onClick={()=>{
                                preadd()
                            }}> Add</button>
                            <button className="auto-btn" onClick={autoGen}>Auto Generate</button>
                        </div>
                    <br/>

                    </div>
                    
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
                                คุณต้องการสร้างการจอง {select} ในวันที่ {day.getDate()}/{day.getMonth()}/{day.getFullYear()} เวลา {Mytext}
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
                                getList();
                                add();
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
                                คุณต้องการจองลบการให้จอง {select} ในวันที่ {day.getDate()}/{day.getMonth()}/{day.getFullYear()} เวลา {timeslot.time}
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
                                getData();
                                getList();
                                deletee(timeslot);
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