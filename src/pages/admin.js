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
export default function Admin(props)
{
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
    if(typeof(props.name)!="undefined")
    {
        console.log(props.department);
        return (
            <>
                <main class="reserve">
                    <div className="admin-flex1 admin-bg">
                        <div className="admin-menu">
                            {props.name}<br/>{props.department}  {props.id}
                        </div>
                        <Link to={{
                            pathname : '/admin/history',
                            state : {
                                name : props.name,
                                id : props.id,
                                department : props.department
                            }
                        }}>
                            <div className="admin-menu">
                                User's Reservation
                            </div>
                        </Link>
                        <Link to={{
                            pathname : '/admin/generate',
                            state : {
                                name : props.name,
                                id : props.id,
                                department : props.department
                            }
                        }}>
                            <div className="admin-menu">
                                Generate
                            </div>
                        </Link>
                        <Link to={{
                            pathname : '/reserve/reserve',
                            state : {
                                name : props.name,
                                id : props.id,
                                department : props.department
                            }
                        }}>
                            <div className="admin-menu">
                                Reserve
                            </div>
                        </Link>
                        <div className="admin-menu-space">

                        </div>
                    </div>
                    <div className="reserve-flex2"></div>
                    <br/>
                </main>
            </>
        )
    }
    else
    {
        return (<Login/>)
    }
}