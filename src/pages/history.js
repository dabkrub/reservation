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
function History(props){
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

    function getList(){
        db.collectionGroup("reserving").where("user",'==',props.location.state.name).orderBy("date").get().then(querySnapshot=>{
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
        getList();
        
    }
    function action(a)
    {
        if(a.available==true)
        return <button className="reserve-btn2" onClick={()=>{
            prereserve(a);
            settimeslot(a);

        }}>RESERVE</button>;
        else if(a.user == props.location.state.name && a.id == props.location.state.id) 
        return <button className="reserve-btn2" onClick={()=>{
            precancel(a);
            settimeslot(a);
        }}>CANCEL</button>;
        else
        return <button className="reserve-btn2 disable" disable>RESERVE</button>;
    }
    function todate(a)
    {
        let t = new Date(a.date*1000);
        return <td>{t.getDate()}/{t.getMonth()+1}/{t.getFullYear()-1969}</td>
    }
    useEffect(()=>{
        getList();
    },[]);
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
                            name : props.name,
                            id : props.id,
                            department : props.department
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
                <div className="history-flex2">
                    <h2 className="reserve-font">การจองในปัจจุบันของคุณ</h2>
                    <div>
                        <table>
                            <tr>
                                <td className="">Date</td>
                                <td>Time</td>
                                <td className="long-history">Place</td>
                                <td>Action</td>
                            </tr>
                            {place.map((t)=>(
                                <tr>
                                    <td>{todate(t)}</td>
                                    <td>{t.time}</td>
                                    <td>{t.name}</td>
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
                            คุณต้องการยกเลิกการจองคุณต้องการจองใช่หรือไม่
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
                            getList();
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

export default History;