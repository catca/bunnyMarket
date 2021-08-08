/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { modalOpen, modalClose } from '../../../../_actions/modal_actions';
import { Modal } from 'antd';
import styled from 'styled-components';
import LoginPage from '../../LoginPage/LoginPage';

function RightMenu() {
    const user = useSelector(state => state.user);
    const visible = useSelector(state => state.modal.visible);
    const dispatch = useDispatch();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        dispatch(modalOpen());
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(modalClose());
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(modalClose());
        console.log(visible);
    };

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                alert('로그아웃');
                const deleteCookie = function(name) {
                    const date = new Date();
                    document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
                }
                deleteCookie('w_auth');
            } else {
                alert('Log Out Failed')
            }
        });
    };
    if (user.userData && !user.userData.isAuth) {
        return (
            <LinkContainer>
                <div>
                    <StyledButton onClick={showModal}>로그인</StyledButton>
                </div>
                <div>
                    <StyledLink to="/register">회원가입</StyledLink>
                </div>
                <Modal
                    title="바니마켓"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <LoginPage />
                </Modal>
            </LinkContainer>
        )
    } else {
        return (
            <LinkContainer>
                <div>
                    <StyledDiv style={{marginRight: '8px'}} onClick={logoutHandler}>로그아웃</StyledDiv>
                </div>
            </LinkContainer>
        )
    }
}

const StyledButton = styled.button`
    // font-size: 16px;
    color: black;
    border: none;
    outline: none;
    width: 80px;
    cursor: pointer;
    background-color: white;
    &:hover {
        color: skyblue;
    }
`;
const StyledLink = styled(Link)`
    // font-size: 16px;
    color: black;
    border: none;
    outline: none;
    width: 80px;
    cursor: pointer;
    background-color: white;
    &:hover {
        color: skyblue;
    }
`;
const StyledDiv = styled.div`
    // font-size: 16px;
    color: black;
    cursor: pointer;
    &:hover {
        color: skyblue;
    }
`;
const LinkContainer = styled.div`
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
`;

export default withRouter(RightMenu);

