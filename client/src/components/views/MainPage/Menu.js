import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
    font-size: 26px;
    font-weight:bold;
    text-decoration: none;
    color: ${props => props.pathname === "/" ? 
        props.current === "true" ? "red" : "pink" : 
        props.current === "true" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)"};
    // background-color: ${props => props.pathname === "/" ? "black" : "white"};
    &:hover {
        color: ${props => props.pathname === "/" ? "red" : "black"};
    }
`; 
const Menu = ({ location: {pathname}}) => {
    return (
        <>
            <div className="main_menu inner">
                <ul className="menu_list">
                    <li className="menu_item">
                        <StyledLink exact pathname={pathname} current={(pathname === "/").toString()} to="/">홈</StyledLink>
                    </li>
                    <li className="menu_item">
                        <StyledLink pathname={pathname} current={(pathname === "/partner").toString()} to="/partner">파트너</StyledLink>
                    </li>
                    <li className="menu_item">
                        <StyledLink pathname={pathname} current={(pathname === "/post").toString()} to="/post">모임</StyledLink>
                    </li>
                    <li className="menu_item">
                        <StyledLink pathname={pathname} current={(pathname === "/feed").toString()} to="/feed">피드</StyledLink>
                    </li>
                </ul>
            </div>
        </>
    );
  }
  
  export default withRouter(Menu);
  