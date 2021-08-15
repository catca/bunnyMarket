import React from 'react'
import styled from 'styled-components'
import { ThreeBars } from '@styled-icons/octicons/ThreeBars'

function NavCategory() {
    return (
        <div>
            <Bars />
            <Conatiner>박예찬 바보</Conatiner>
        </div>
    )
}

const Bars = styled(ThreeBars)`
    width: 28px;
    height: 28px;
    &:hover {
        color: skyblue;
    }
`;

const Conatiner = styled.div`
    width: 400px;
    height: 600px;
    background-color: blue;
    position: relative;
    z-index: 10;
    box-sizing: border-box;
    color: white;
    font-size: 32px;
`;

export default NavCategory
