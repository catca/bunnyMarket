import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useSelector } from "react-redux";
import { PRODUCT_SERVER, FAVORITES_SERVER, SERVER } from "../../Config";
import Product from "./Product";
import styled from 'styled-components'

function ShopPage(props) {
    const user = useSelector(state => state.user);
    const [product, setProduct] = useState([])
    const [favorites, setFavorites] = useState([])
    const [location, setLocation] = useState("product")
    let userVariable;
    if(user.userData){
        userVariable = {
            userId: user.userData.email,
            user_id: user.userData._id
        }
    }

    useEffect(() => {
        axios.post(`${PRODUCT_SERVER}/productManage`, userVariable)
            .then(response => {
                if (response.data.success) {
                    setProduct(response.data.product)
                } else {
                    alert('Failed to get proudct Info')
                }
            })

        axios.post(`${FAVORITES_SERVER}/getProducts`, userVariable)
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.product)
                } else {
                    alert('Failed to get favorite Info')
                }
            })
    }, [])

    useEffect(() => {
            const rLastPath = /\/([a-zA-Z0-9._]+)(?:\?.*)?$/;
            const lastPath = rLastPath.test(props.location.pathname) && RegExp.$1; 
            setLocation(lastPath);
    }, [props.location.pathname])

    return (
        <Container>
            <Content>
                <ShopContainer>
                    <ShopContent>
                        <Left>
                            <ThumbContainer>
                                <Image></Image>
                                <Name>{user.userData ? user.userData.name : '테스트'}</Name>
                                <Link to="/products/manage" style={{color: 'white'}}>내상점관리</Link>
                            </ThumbContainer>
                        </Left>
                        <Right></Right>
                    </ShopContent>
                </ShopContainer>
                <Detail>
                    <NavContainer>
                        <NavContent>
                            <StyledLink to={user.userData && `/shop/${user.userData._id}/product`}>상품</StyledLink>
                            <StyledLink to={user.userData && `/shop/${user.userData._id}/favorite`}>찜</StyledLink>
                        </NavContent>
                    </NavContainer>
                    <div>
                        <div>
                            {location === 'product' ? 
                                (product && <Product product={product}/>) : 
                                (favorites && <Product product={favorites}/>)}
                        </div>
                    </div>
                </Detail>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

`;

const Content = styled.div`
    width: 1024px;
`;

const ShopContainer = styled.div`
    height: 310px;
    margin: 24px 0;
    border: 1px solid #EEEEEE;
`;

const ShopContent = styled.div`
    display: flex;
`;

const Left = styled.div`
    background-color: #CCCCCC;
    width: 310px;
`;

const ThumbContainer = styled.div`
    width: 310px;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 0; 
`;

const Image = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #EEEEEE;
    margin-bottom: 12px;
`;

const Name = styled.div`
    margin-bottom: 12px;
    color: white;
`;

const Right = styled.div`

`;

const Detail = styled.div`
    // background-color: blue;
`;

const NavContainer = styled.div`
    width: 100%;
`;

const NavContent = styled.div`
    display: flex;
`;

const StyledLink = styled(Link)`
    display: block;
    width: 512px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #F8F8F8;
    border: 1px solid #EEEEEE;
    border-bottom: 0;
`;

export default ShopPage
