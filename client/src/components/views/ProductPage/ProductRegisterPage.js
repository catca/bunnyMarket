import React, { useState, useRef } from "react";
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { PRODUCT_SERVER } from "../../Config";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import CategoryPage from "./CategoryPage";
import './ProductRegisterPage.css'
import nodemon from "nodemon";

function ProductRegisterPage() {
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const user = useSelector(state => state.user);
    const [largeCategory, setLargeCategory] = useState({});
    const [mediumCategory, setMediumCategory] = useState({});
    const [smallCategory, setSmallCategory] = useState({});

    const onSubmit = (values) => {
        const files = values.image;
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post(`${PRODUCT_SERVER}/uploadfiles`, formData, config)
            .then(response => {
                console.log(response);
                const dataToSubmit = {
                    ...values,
                    filePath: response.data.filePath,
                    fileName: response.data.fileName,
                    largeCategory: largeCategory.title,
                    mediumCategory: mediumCategory.title,
                    smallCategory: smallCategory.title
                };
                axios.post(`${PRODUCT_SERVER}/new`, dataToSubmit)
                .then(response => {
                    console.log(response)
                    // if (response.payload.loginSuccess) {
                    //     props.history.push("/");
                    //     dispatch(modalClose());
                    // } else {
                    //     setFormErrorMessage('Check out your Account or Password again')
                    // }
                })
                .catch(err => {
                    // setFormErrorMessage('Check out your Account or Password again')
                    // setTimeout(() => {
                    //     setFormErrorMessage("")
                    // }, 3000);
                });
            })
    }
    // const onDrop = (files) => {
    //     console.log(files);
    //     let formData = new FormData;
    //     const config = {
    //         header: {'content-type': 'multipart/form-data'}
    //     }
    //     formData.append("file", files[0])

    //     axios.post(`${PRODUCT_SERVER}/new`, formData, config)
    //         .then(response => {
    //             console.log(response)
    //         })
    // }
    return (
        <main className="content">
            <div className="wrap_content">
                <div className="content_header">
                    <nav className="content_header_nav">
                        <div className="content_header_list"><Link to="/products/new">상품등록</Link></div>
                        <div className="content_header_list"><Link to="/products/manage">상품관리</Link></div>
                        {/* <div className=""><a href="https://pay2.bunjang.co.kr?tab=purchases" target="_blank" rel="" className="">구매/판매 내역</a>
                        </div> */}
                    </nav>
                </div>
                <form className="content_inner" onSubmit={handleSubmit(onSubmit)}>
                    <div className="content_inner_main">
                        <div className="content_inner_section">
                            <h2>기본정보<span>*필수항목</span></h2>
                            <ul className="content_inner_list">
                                <li className="product_image_wrap inner_list_wrap">
                                    <div className="image_title inner_title">상품이미지<span>&nbsp;*</span><small>(0/12)</small></div>
                                    <div className="image_desc_wrap inner_desc_wrap">
                                        <div className="register_image_wrap">
                                            <label className="product_image" htmlFor="productImage">이미지 등록</label>
                                            <input 
                                                type="file" id="productImage" accept="image/jpg, image/jpeg, image/png" multiple="" style={{ display: 'none' }} 
                                                {...register("image", { required: true })}
                                            />
                                            {errors.image && <p style={{color: 'skyblue'}}>상품 사진을 등록해주세요.</p>}
                                            <div className="register_image_main">
                                                <div>
                                                    <div><img className="register_image_thumbnail" alt=""/></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="image_desc"><b>* 상품 이미지는 640x640에 최적화 되어 있습니다.</b><br />- 이미지는
                                            상품등록 시 정사각형으로 짤려서 등록됩니다.<br />- 이미지를 클릭 할 경우 원본이미지를 확인할 수 있습니다.<br />- 이미지를 클릭 후
                                            이동하여 등록순서를 변경할 수 있습니다.<br />- 큰 이미지일경우 이미지가 깨지는 경우가 발생할 수 있습니다.<br />최대 지원 사이즈인
                                            640 X 640 으로 리사이즈 해서 올려주세요.(개당 이미지 최대 10M)
                                        </div>
                                    </div>
                                </li>
                                <li className="board_title_wrap inner_list_wrap">
                                    <div className="board_title_title inner_title">제목<span>*</span></div>
                                    <div className="board_title_desc_wrap inner_desc_wrap">
                                        <div className="board_title_desc">
                                            <div className="board_title_input_wrap">
                                                <input type="text" placeholder="상품 제목을 입력해주세요." id="boardTitleInput" />
                                            </div>
                                            <div id="boardTitleInputQuantity">0/40</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="category_wrap inner_list_wrap">
                                    <div className="category_title inner_title">카테고리<span>*</span></div>
                                    <CategoryPage 
                                        largeCategory={largeCategory} 
                                        mediumCategory={mediumCategory} 
                                        smallCategory={smallCategory} 
                                        setLargeCategory={setLargeCategory}
                                        setMediumCategory={setMediumCategory}
                                        setSmallCategory={setSmallCategory}
                                    />
                                </li>
                                <li className="location_wrap inner_list_wrap">
                                    <div className="inner_title">거래지역<span>*</span></div>
                                    <div className="location_desc_wrap inner_desc_wrap">
                                        <div className="board_title_desc">
                                            <div className="">
                                                <input 
                                                    placeholder="선호 거래 지역을 입력해주세요." id="locationInput"
                                                    {...register("location", { required: true })}
                                                />
                                            </div>
                                            <div id="locationInputQuantity">0/40</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="status_wrap inner_list_wrap">
                                    <div className="inner_title">상태<span>*</span></div>
                                    <div className="inner_desc_wrap">
                                        <div className="">
                                            <label htmlFor="usedProduct" className="">
                                                <input 
                                                    id="usedProduct" name="status" type="radio" value="use"
                                                    {...register("status", { required: true })}
                                                />중고상품</label>
                                            <label htmlFor="newProduct" className="">
                                                <input 
                                                    id="newProduct" name="status" type="radio" value="new" 
                                                    {...register("status", { required: true })}
                                                />새상품</label>
                                        </div>
                                    </div>
                                </li>
                                <li className="exchange_wrap inner_list_wrap">
                                    <div className="inner_title">교환<span>*</span></div>
                                    <div className="inner_desc_wrap">
                                        <div className="">
                                            <label htmlFor="교환불가" className="">
                                                <input 
                                                    id="교환불가" name="exchanges" type="radio" value="no" 
                                                    {...register("exchanges", { required: true })}
                                                />교환불가</label>
                                            <label htmlFor="교환가능" className="">
                                                <input 
                                                    id="교환가능" name="exchanges" type="radio" value="yes" 
                                                    {...register("exchanges", { required: true })}
                                                />교환가능 </label>
                                        </div>
                                    </div>
                                </li>
                                <li className="price_wrap inner_list_wrap">
                                    <div className="inner_title">가격<span>*</span></div>
                                    <div className="inner_desc_wrap">
                                        <div className="">
                                            <input 
                                                placeholder="숫자만 입력해주세요." id="priceInput"
                                                {...register("price", { required: true })}
                                            />&nbsp;&nbsp;&nbsp;원
                                        </div>
                                        <div className="price_desc">
                                            <div className=""><label htmlFor="freesShipping" className="">
                                                {/* <input id="freesShipping" type="checkbox" />배송비 포함 */}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="desc_wrap inner_list_wrap">
                                    <div className="inner_title">설명</div>
                                    <div className="inner_desc_wrap">
                                        <textarea 
                                            placeholder="상품 설명을 입력해주세요." rows="6" id="descInput"
                                            {...register("description", { required: true })}
                                        />
                                        <div className="">
                                            <div id="descInputQuantity">0/2000</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="quantity_wrap inner_list_wrap">
                                    <div className="inner_title">수량</div>
                                    <div className="inner_desc_wrap">
                                        <div className="">
                                            <input 
                                                type="text" id="quantityInput"
                                                {...register("quantity", { required: true })}
                                            />&nbsp;&nbsp;&nbsp;개
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <footer className="content_register_wrap">
                        <div className="content_register">
                            <input type="submit" className="register_button" value="등록하기"></input>
                        </div>
                    </footer>
                </form>
            </div>
        </main>
    )
}

export default withRouter(ProductRegisterPage);
