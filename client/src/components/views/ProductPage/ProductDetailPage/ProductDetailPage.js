import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PRODUCT_SERVER, SERVER } from '../../../Config';
import { AiOutlineHome, AiFillHeart, AiFillEye } from 'react-icons/ai';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { BsClockFill } from 'react-icons/bs';
import Favorites from './Favorites';
import styled from 'styled-components';
import './ProductDetailPage.css';

function ProductDetailPage(props) {
    const productId = props.match.params.productId;
    const [product, setProduct] = useState([]);
    const [favorites, setFavorites] = useState(0);
    const user = useSelector(state => state.user);
    const productVariable = {
        productId: productId
    };

    useEffect(() => {
        axios.post(`${PRODUCT_SERVER}/getProduct`, productVariable)
            .then(response => {
                if (response.data.success) {
                    setProduct(response.data.product)
                } else {
                    alert('상품 가져오기 실패!')
                }
            })

    }, [])

    if (product.email) {
        const regexp = /\B(?=(\d{3})+(?!\d))/g;
        const price = product.price.toString().replace(regexp, ',');
        const nowDate = Date.now();
        let newDate = new Date(product.newDate);
        newDate = Date.parse(newDate)
        let date = '';
        if (nowDate - newDate < (1000 * 60)) {
            date = `${parseInt((nowDate - newDate) / 1000)} 초전`
        } else if (nowDate - newDate < (1000 * 60 * 60)) {
            date = `${parseInt((nowDate - newDate) / (1000 * 60))} 분전`
        } else if (nowDate - newDate < (1000 * 60 * 60 * 24)) {
            date = `${parseInt((nowDate - newDate) / (1000 * 60 * 60))} 시간전`
        } else {
            date = `${parseInt((nowDate - newDate) / (1000 * 60 * 60 * 24))} 일전`
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <main style={{ width: '1024px' }}>
                    <div>
                        <div style={{ width: '100%', height: '78px', padding: '30px 0 20px', display: 'flex', alignItems: 'center', borderBottom: 'solid 2px #666666' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="category-view-box">
                                    <AiOutlineHome style={{fontSize: '12px'}} />
                                    <span style={{fontSize: '12px'}}>홈</span>
                                </div>
                                <CategoryBox>
                                    <FiChevronRight />
                                    <div>
                                        <CategorySelect>
                                            <span style={{fontSize: '12px'}}>{product.largeCategory}</span>
                                            <FiChevronDown />
                                        </CategorySelect>
                                        <CatengoryList></CatengoryList>
                                    </div>
                                </CategoryBox>
                                <CategoryBox>
                                    <FiChevronRight />
                                    <div>
                                        <CategorySelect>
                                            <span style={{fontSize: '12px'}}>{product.mediumCategory}</span>
                                            <FiChevronDown />
                                        </CategorySelect>
                                        <CatengoryList></CatengoryList>
                                    </div>
                                </CategoryBox>
                                <CategoryBox>
                                    <FiChevronRight />
                                    <div>
                                        <CategorySelect>
                                            <span style={{fontSize: '12px'}}>{product.smallCategory}</span>
                                            <FiChevronDown />
                                        </CategorySelect>
                                        <CatengoryList></CatengoryList>
                                    </div>
                                </CategoryBox>
                            </div>
                        </div>
                        <div style={{ width: '100%' }}>
                            <div style={{ width: '100%', height: '490px', padding: '30px 0', display: 'flex' }}>
                                <div style={{ marginRight: '40px' }}>
                                    <div>
                                        <img src={`${SERVER}/${product.filePath}`} alt="이미지" style={{ width: '430px', height: '430px', objectFit: 'cover' }} />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ height: '350px', marginBottom: '24px' }}>
                                        <div style={{ width: '554px', height: '130px', padding: '0 0 30px', borderBottom: 'solid 1px #CCCCCC' }}>
                                            <div style={{ fontSize: '28px', height: '35px', marginBottom: '25px' }}>{product.title}</div>
                                            <div>
                                                <div style={{ fontSize: '40px' }}>
                                                    {price}
                                                    <span style={{ fontSize: '28px' }}>원</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ color: '#CCCCCC', height: '30px', margin: '15px 0 25px', display: 'flex', alignItems: 'center' }}>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ display: 'flex', marginRight: '10px' }}>
                                                        <AiFillHeart style={{ marginRight: '5px' }} />
                                                        <div>{favorites}</div>
                                                    </div>
                                                    <div style={{ display: 'flex', marginRight: '10px' }}>
                                                        <AiFillEye style={{ marginRight: '5px' }} />
                                                        <div>64</div>
                                                    </div>
                                                    <div style={{ display: 'flex', marginRight: '10px' }}>
                                                        <BsClockFill style={{ marginRight: '5px' }} />
                                                        <div>{date}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <ProductDetailList>
                                                    <ProductDetail>
                                                        상품상태
                                                    </ProductDetail>
                                                    <div>
                                                        {product.status === 'new' ? '새상품' : '중고상품'}
                                                    </div>
                                                </ProductDetailList>
                                                <ProductDetailList>
                                                    <ProductDetail>
                                                        교환여부
                                                    </ProductDetail>
                                                    <div>
                                                        {product.exchanges === 'yes' ? '교환가능' : '교환불가능'}
                                                    </div>
                                                </ProductDetailList>
                                                <ProductDetailList>
                                                    <ProductDetail>
                                                        배송비
                                                    </ProductDetail>
                                                    <div>
                                                        배송비 별도
                                                    </div>
                                                </ProductDetailList>
                                                <ProductDetailList>
                                                    <ProductDetail>
                                                        거래지역
                                                    </ProductDetail>
                                                    <div>
                                                        {product.location}
                                                        {/* <div>지역인증</div> */}
                                                    </div>
                                                </ProductDetailList>
                                            </div>
                                        </div>
                                    </div>
                                    {user.userData && (product.email !== user.userData.email ?
                                        <div style={{ display: 'flex' }}>
                                            <Favorites
                                                productId={product._id} 
                                                userId={user.userData._id}
                                                favorites={favorites}
                                                setFavorites={setFavorites}
                                            />
                                            <ConnectButton>연락하기</ConnectButton>
                                        </div>
                                        :
                                        <Link to="/products/manage" style={{ width: '100%', height: '56px'}}>
                                            <div style={{ width: '100%', height: '56px', backgroundColor: 'orange', color: 'white', textAlign: 'center', lineHeight: '56px', fontSize: '18px', fontWeight: 'bold'}}>내 상점 관리</div>
                                        </Link>
                                    )}
                                    {/* <ButtonBox product={product} user={user}/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    } else {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ color: 'skyblue', fontSize: '26px' }}>...Loading</div>
            </div>
        )
    }
}

const CategoryBox = styled.div`
    width: 180px;
    display: flex;
    align-items: center;
`;

const CategorySelect = styled.div`
    width: 154px;
    height: 28px;
    padding-left: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #999999;
`;

const CatengoryList = styled.div`
    display: none;
`;

const ProductDetail = styled.div`
    width: 90px;
    color: #999999;
    &::before{
        content: '· ';
        color: #999999;
    }
`;

const ProductDetailList = styled.div`
    display: flex;
    margin-bottom: 25px;
`;

const ConnectButton = styled.button`
    width: 188px;
    height: 56px;
    background-color: skyblue;
    color: white;
    border: 0;
    outline: 0;
    cursor: pointer;
`;

export default ProductDetailPage;
