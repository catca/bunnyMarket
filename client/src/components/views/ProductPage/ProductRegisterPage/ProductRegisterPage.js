import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from 'react-router-dom';
import axios from "axios";
import { PRODUCT_SERVER } from "../../../Config";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import CategoryPage from "../CategoryPage";
import styled from "styled-components";
import './ProductRegisterPage.css'

const ErrorP = styled.p`
    color: deepskyblue;
    margin-top: 8px;
    margin-left: 4px;
`;
const Input = styled.input`
    &:focus{
        outline: deepskyblue solid 1px;
        border: 0;
    }
`;
const Textarea = styled.textarea`
    &:focus{
        outline: deepskyblue solid 1px;
        border: 0;
    }
`;

function ProductRegisterPage() {
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const user = useSelector(state => state.user);
    const [fileUrl, setFileUrl] = useState(null);
    const [largeCategory, setLargeCategory] = useState({});
    const [mediumCategory, setMediumCategory] = useState({});
    const [smallCategory, setSmallCategory] = useState({});
    const [titleCount, setTitleCount] = useState(0);
    const [locationCount, setLocationCount] = useState(0);
    const [descCount, setDescCount] = useState(0);

    const onSubmit = (values) => {
        const files = values.image;
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post(`${PRODUCT_SERVER}/uploadfiles`, formData, config)
            .then(response => {
                console.log(response);
                const date = new Date();
                const dataToSubmit = {
                    ...values,
                    email: user.userData.email,
                    filePath: response.data.filePath,
                    fileName: response.data.fileName,
                    largeCategory: largeCategory.title,
                    mediumCategory: mediumCategory.title,
                    smallCategory: smallCategory.title,
                    newDate: date,
                    salesStatus: 'sale'
                };
                axios.post(`${PRODUCT_SERVER}/new`, dataToSubmit)
                .then(response => {
                    console.log(response)
                    alert("등록되었습니다");
                    history.push("/")
                })
                .catch(err => {
                });
            })
    }

    useEffect(() => {
        register("image", { required: true });
      }, []);

    const onchange = (event) => {
        setValue("image", event.target.files)
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrl(imageUrl)
        errors.image = null;
    }
    
    return (
        <main className="content">
            <div className="wrap_content">
                <div className="content_header">
                    <nav className="content_header_nav">
                        <div className="content_header_list"><Link to="/products/new">상품등록</Link></div>
                        <div><Link to="/products/manage">상품관리</Link></div>
                        {/* <div><a href="https://pay2.bunjang.co.kr?tab=purchases" target="_blank" rel="">구매/판매 내역</a>
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
                                                onChange={onchange}
                                            />
                                            {errors.image && <p style={{color: 'deepskyblue'}}>상품 사진을 등록해주세요.</p>}
                                            {fileUrl && 
                                                <div className="register_image_main">
                                                    <div>
                                                        <div><img src={fileUrl} className="register_image_thumbnail" alt=""/></div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="image_desc"><b>* 상품 이미지는 640x640에 최적화 되어 있습니다.</b><br />- 이미지는
                                            상품등록 시 정사각형으로 짤려서 등록됩니다.<br />- 큰 이미지일경우 이미지가 깨지는 경우가 발생할 수 있습니다.<br />최대 지원 사이즈인
                                            640 X 640 으로 리사이즈 해서 올려주세요.
                                        </div>
                                    </div>
                                </li>
                                <li className="board_title_wrap inner_list_wrap">
                                    <div className="board_title_title inner_title">제목<span>*</span></div>
                                    <div className="board_title_desc_wrap inner_desc_wrap">
                                        <div className="board_title_desc">
                                            <div className="board_title_input_wrap">
                                                <Input 
                                                    type="text" placeholder="상품 제목을 입력해주세요." id="boardTitleInput" maxLength="40"
                                                    {...register("title", { required: true })}
                                                    onChange={(e) => setTitleCount(e.target.value.length)}
                                                />
                                            </div>
                                            <div id="boardTitleInputQuantity">{titleCount}/40</div>
                                        </div>
                                        {errors.title && <ErrorP>상품 제목을 입력해주세요.</ErrorP>}
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
                                            <div>
                                                <Input 
                                                    placeholder="선호 거래 지역을 입력해주세요." id="locationInput" maxLength="40"
                                                    {...register("location", { required: true })}
                                                    onChange={(e) => setLocationCount(e.target.value.length)}
                                                />
                                            </div>
                                            <div id="locationInputQuantity">{locationCount}/40</div>
                                        </div>
                                        {errors.location && <ErrorP>선호 거래 지역을 입력해주세요.</ErrorP>}
                                    </div>
                                </li>
                                <li className="status_wrap inner_list_wrap">
                                    <div className="inner_title">상태<span>*</span></div>
                                    <div className="inner_desc_wrap">
                                        <div>
                                            <label htmlFor="usedProduct" style={{marginRight:'10px'}}>
                                                <input 
                                                    id="usedProduct" name="status" type="radio" value="use" checked="use" 
                                                    {...register("status", { required: true })}
                                                    style={{marginRight:'2px'}}
                                                />중고상품</label>
                                            <label htmlFor="newProduct">
                                                <input 
                                                    id="newProduct" name="status" type="radio" value="new" 
                                                    {...register("status", { required: true })}
                                                    style={{marginRight:'2px'}}
                                                />새상품</label>
                                        </div>
                                    </div>
                                </li>
                                <li className="exchange_wrap inner_list_wrap">
                                    <div className="inner_title">교환<span>*</span></div>
                                    <div className="inner_desc_wrap">
                                        <div>
                                            <label htmlFor="교환불가" style={{marginRight:'10px'}}>
                                                <input 
                                                    id="교환불가" name="exchanges" type="radio" value="no" checked="no" 
                                                    {...register("exchanges", { required: true })}
                                                    style={{marginRight:'2px'}}
                                                />교환불가</label>
                                            <label htmlFor="교환가능">
                                                <input 
                                                    id="교환가능" name="exchanges" type="radio" value="yes" 
                                                    {...register("exchanges", { required: true })}
                                                    style={{marginRight:'2px'}}
                                                />교환가능 </label>
                                        </div>
                                    </div>
                                </li>
                                <li className="price_wrap inner_list_wrap">
                                    <div className="inner_title">가격<span>*</span></div>
                                    <div className="inner_desc_wrap">
                                        <div>
                                            <Input 
                                                type="text" id="priceInput"
                                                {...register("price", { required: true, pattern: /^[0-9]+$/i })}
                                            />&nbsp;&nbsp;&nbsp;원
                                        </div>
                                        {errors.price && (errors.price.type === 'required' && <ErrorP>가격을 입력해주세요.</ErrorP>)}
                                        {errors.price && (errors.price.type === 'pattern' && <ErrorP>숫자만 입력해주세요.</ErrorP>)}
                                        <div className="price_desc">
                                            <div><label htmlFor="freesShipping">
                                                {/* <input id="freesShipping" type="checkbox" />배송비 포함 */}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="desc_wrap inner_list_wrap">
                                    <div className="inner_title">설명</div>
                                    <div className="inner_desc_wrap">
                                        <Textarea 
                                            placeholder="상품 설명을 입력해주세요." rows="6" id="descInput" maxLength="2000"
                                            {...register("description", { required: true })}
                                            onChange={(e) => setDescCount(e.target.value.length)}
                                            />
                                        <div>
                                            <div id="descInputQuantity">{descCount}/2000</div>
                                        </div>
                                        {errors.description && <ErrorP>상품 설명을 입력해주세요.</ErrorP>}
                                    </div>
                                </li>
                                <li className="quantity_wrap inner_list_wrap">
                                    <div className="inner_title">수량</div>
                                    <div className="inner_desc_wrap">
                                        <div>
                                            <Input 
                                                type="text" id="quantityInput"
                                                {...register("quantity", { required: true, pattern: /^[0-9]+$/i  })}
                                            />&nbsp;&nbsp;&nbsp;개
                                        </div>
                                        {errors.quantity && (errors.quantity.type === 'required' && <ErrorP>수량을 입력해주세요.</ErrorP>)}
                                        {errors.quantity && (errors.quantity.type === 'pattern' && <ErrorP>숫자만 입력해주세요.</ErrorP>)}
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
