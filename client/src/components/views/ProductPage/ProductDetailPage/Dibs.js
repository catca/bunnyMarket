import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { DIBS_SERVER } from '../../../Config';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { modalOpen } from '../../../../_actions/modal_actions';

function Dibs(props) {
    const { dibs, setDibs, productId, userId } = props;
    const [dibsAction, setDibsAction] = useState("unDibs")
    const dispatch = useDispatch();

    let variable = {};

    variable = { productId: productId, userId: userId }
    useEffect(() => {

        axios.post(`${DIBS_SERVER}/getDibs`, variable)
            .then(response => {
                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setDibs(response.data.dibs.length)

                    //if I already click this dibs button or not 
                    response.data.dibs.map(dibs => {
                        if (dibs.userId === userId) {
                            setDibsAction('dibs');
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })
    });

    const onclickDibs = () => {

        if(userId){
            if(dibsAction === 'dibs'){
                axios.post(`${DIBS_SERVER}/unDibs`, variable)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        setDibs(dibs => dibs - 1);
                        setDibsAction('unDibs');
                    } else {
                        alert('찜 실패!')
                    }
                })
            } else {
                axios.post(`${DIBS_SERVER}/upDibs`, variable)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        setDibs(dibs => dibs + 1);
                        setDibsAction('dibs');
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
        <DibsButton onClick={onclickDibs} dibsAction={dibsAction}>
            <Heart dibsAction={dibsAction} />
            <span style={{marginRight: '3px'}}>찜</span>
            <span>{dibs}</span>
        </DibsButton>
    )
}

const DibsButton = styled.button`
    width: 188px;
    height: 56px;
    background-color: ${props => props.dibsAction === 'dibs' ? 'black' : '#CCCCCC'};
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
    color: ${props => props.dibsAction === 'dibs' ? 'red' : 'white'};
`;

export default Dibs
