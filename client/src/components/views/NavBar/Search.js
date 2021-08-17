import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router';
import styled from 'styled-components';

function Search() {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();
    const onchange = (e) => {
        setKeyword(e.target.value);
    }
    // useEffect(() => {
    //     console.log(keyword);
    // }, [keyword])
    const onclick = () => {
        history.push(`/search/products?q=${keyword}`);
    }
    const onkeypress = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            onclick();
        } 
    }
    return (
        <div style={{height: '60px', display: 'flex'}}>
            <SearchBox>
                <form>
                    <InputSearch type="text" placeholder="상품명 입력" onChange={onchange} onKeyPress={onkeypress}/> 
                    <SearchBtn type="button" onClick={onclick}><FiSearch color='skyblue'/></SearchBtn>
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
    border: 3px solid skyblue;
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
