import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FAVORITES_SERVER } from '../../../Config';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../../../../_actions/modal_actions';

function Favorites(props) {
    const { favorites, setFavorites, productId, userId } = props;
    const [favoritesAction, setFavoritesAction] = useState("notFavorites")
    const dispatch = useDispatch();

    let variable = {};

    variable = { productId: productId, userId: userId }
    useEffect(() => {

        axios.post(`${FAVORITES_SERVER}/getFavorites`, variable)
            .then(response => {
                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setFavorites(response.data.favorites.length)

                    //if I already click this favorites button or not 
                    response.data.favorites.map(favorites => {
                        if (favorites.userId === userId) {
                            setFavoritesAction('favorites');
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })
    });

    const onclickFavorites = () => {

        if(userId){
            if(favoritesAction === 'favorites'){
                axios.post(`${FAVORITES_SERVER}/downFavorites`, variable)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        setFavorites(favorites => favorites - 1);
                        setFavoritesAction('notFavorites');
                    } else {
                        alert('찜 실패!')
                    }
                })
            } else {
                axios.post(`${FAVORITES_SERVER}/upFavorites`, variable)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        setFavorites(favorites => favorites + 1);
                        setFavoritesAction('favorites');
                    } else {
                        alert('찜 실패!')
                    }
                })
            }
        } else {
            dispatch(modalOpen());
        }
    }

    return (
        <FavoritesButton onClick={onclickFavorites} favoritesAction={favoritesAction}>
            <Heart favoritesAction={favoritesAction} />
            <span style={{marginRight: '3px'}}>찜</span>
            <span>{favorites}</span>
        </FavoritesButton>
    )
}

const FavoritesButton = styled.button`
    width: 188px;
    height: 56px;
    background-color: ${props => props.favoritesAction === 'favorites' ? 'black' : '#CCCCCC'};
    color: white;
    border: 0;
    outline: 0;
    margin-right: 12px;
    cursor: pointer;
`;

const Heart = styled(HeartFill)`
    width: 14px;
    height: 14px;
    transform: translateY(-2px);
    margin-right: 3px;
    color: ${props => props.favoritesAction === 'favorites' ? 'red' : 'white'};
`;

export default Favorites
