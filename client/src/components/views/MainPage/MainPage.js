import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Menu from './Menu';
import FeedPage from './FeedRouter/FeedPage';
import HomePage from './HomeRouter/HomePage';
import PartnerPage from './PartnerRouter/PartnerPage';
import PostPage from './PostRouter/PostPage';
import { auth } from '../../../_actions/user_actions';
import { modalOpen } from '../../../_actions/modal_actions';
import { useDispatch } from "react-redux";

import './Main.css';

function MainPage({ history, location }) {
    const dispatch = useDispatch();
    const [link, setLink] = useState(false);
    useEffect(() => {
        const unblock = history.block(() => {
            setLink(true);
            console.log(history)
            return false;
        });
        return () => {
            unblock();
        };
    }, [history]);
    useEffect(() => {
        dispatch(auth()).then(response => {
            //Not Loggined in Status 
            if (!response.payload.isAuth) {
                dispatch(modalOpen());
                setLink(false);
            } else {
                history.block(true);
                history.push({location})
            }
        });
    }, [link])
    return (
        <section id="container">
            <Menu />
            <Route exact path='/' component={HomePage} />
            <Route path='/partner' component={PartnerPage} />
            <Route path='/post' component={PostPage} />
            <Route path='/feed' component={FeedPage} />
        </section>
    )
}

export default MainPage
