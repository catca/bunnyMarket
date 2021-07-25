import React from 'react'
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

function Search() {
    return (
        <div style={{height: '60px', display: 'flex'}}>
            <SearchBox>
                <form>
                    <InputSearch /> 
                    <SearchBtn><FiSearch color='skyblue'/></SearchBtn>
                </form>
            </SearchBox>
        </div>
    )
}

const SearchBox = styled.div`
    height:40px;
    width: 520px;
    margin: auto;
    display:flex;
    justify-content: center;
    align-items:center;
    border-radius: 2px;
    border: 1px solid skyblue;
`;
const InputSearch = styled.input`
    width:450px;
    height:30px;
    border:none;
    &:focus{
        outline: none;
    }
`;
const SearchBtn = styled.button`
    border:none;
    font-size: 15px;
    box-sizing: border-box;
    margin-left: 15px;
    width:30px;
    background-color: transparent;
    cursor: pointer;
`;
export default Search
