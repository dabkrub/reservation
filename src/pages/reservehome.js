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
export default function Reservehome(props)
{
    if(typeof(props.name)!="undefined")
    {
        console.log(props.department);
        return (
            <>
                <main class="reserve">
                    <div className="reserve-flex1">
                        <div className="reserve-menu">
                            {props.name}<br/>{props.department}  {props.id}
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
                        <Link to={{
                            pathname : '/reserve/reserve',
                            state : {
                                name : props.name,
                                id : props.id,
                                department : props.department
                            }
                        }}>
                            <div className="reserve-menu">
                                Reserve
                            </div>
                        </Link>
                        <div className="reserve-menu-space">

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