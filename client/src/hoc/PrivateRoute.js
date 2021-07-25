/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { auth } from '../_actions/user_actions';
import { modalOpen } from '../_actions/modal_actions';
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, path }) => {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    console.log()
    console.log({path})
    useEffect(() => {
        //To know my current status, send Auth request 
        dispatch(auth()).then(response => {
            //Not Loggined in Status 
            if (!response.payload.isAuth) {
                dispatch(modalOpen());
            }
            // if (!response.payload.isAuth) {
            //     if (option) {
            //         props.history.push('/login')
            //     }
            //     //Loggined in Status 
            // } else {
            //     //supposed to be Admin page, but not admin person wants to go inside
            //     if (adminRoute && !response.payload.isAdmin) {
            //         props.history.push('/')
            //     }
            //     //Logged in Status, but Try to go into log in page 
            //     else {
            //         if (option === false) {
            //             props.history.push('/')
            //         }
            //     }
            // }
        })

    }, [])
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page 
        <>
            {user.isAuth ? <Redirect to="/partner" /> :
            <Redirect to="/partner" />}
        </>
    );
}

export default PrivateRoute;