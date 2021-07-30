/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useHistory } from 'react-router';
import { auth } from '../_actions/user_actions';
import { modalOpen } from '../_actions/modal_actions';
import { useDispatch, useSelector } from "react-redux";

const SuperRoute =  ({ component: Component, ...rest }) => {
    const [authenticated, setuthenticated] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    
     useEffect(() => {
        async function fetchData(){
            const result = await dispatch(auth()).then(response => {
                if (!response.payload.isAuth) {
                    history.block()
                    dispatch(modalOpen());
                } else {
                    setuthenticated(true);
                }
                console.log(response);
            })
        }
        fetchData();
    }, [history])
  
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page 
        <Route
            {...rest}
            render = {props => 
                authenticated ? (
                    <Component {...props} />
                ) : ( 
                    <></>
                )
            }
        />
    );
  }

  export default SuperRoute;