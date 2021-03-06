/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { auth } from '../_actions/user_actions';
import { modalOpen } from '../_actions/modal_actions';
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = async ({ component: Component, ...rest }) => {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const result = {}
    useEffect(() => {
        async function fetchData(){
            result = await dispatch(auth()).then(response => {
                if (!response.payload.isAuth) {
                    dispatch(modalOpen());
                }
            })
            console.log(result);
        }
        fetchData();
    }, [])

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page 
        <Route
            {...rest}
            render = {props => 
                user.isAuth?(
                    <Component {...props} />
                ) : ( 
                    <Redirect to={{
                                    pathname: '/login', 
                                    state: {from: props.location}
                                  }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;