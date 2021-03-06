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
                    largeCategoryId: largeCategory.id,
                    mediumCategoryId: mediumCategory.id,
                    smallCategoryId: smallCategory.id,
                    newDate: date,
                    salesStatus: 'sale'
                };
                axios.post(`${PRODUCT_SERVER}/new`, dataToSubmit)
                .then(response => {
                    console.log(response)
                    alert("?????????????????????");
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
                        <div className="content_header_list"><Link to="/products/new">????????????</Link></div>
                        <div><Link to="/products/manage">????????????</Link></div>
                        {/* <div><a href="https://pay2.bunjang.co.kr?tab=purchases" target="_blank" rel="">??????/?????? ??????</a>
                        </div> */}
                    </nav>
                </div>
                <form className="content_inner" onSubmit={handleSubmit(onSubmit)}>
                    <div className="content_inner_main">
                        <div className="content_inner_section">
                            <h2>????????????<span>*????????????</span></h2>
                            <ul className="content_inner_list">
                                <li className="product_image_wrap inner_list_wrap">
                                    <div className="image_title inner_title">???????????????<span>&nbsp;*</span><small>(0/12)</small></div>
                                    <div className="image_desc_wrap inner_desc_wrap">
                                        <div className="register_image_wrap">
                                            <label className="product_image" htmlFor="productImage">????????? ??????</label>
                                            <input 
                                                type="file" id="productImage" accept="image/jpg, image/jpeg, image/png" multiple="" style={{ display: 'none' }} 
                                                onChange={onchange}
                                            />
                                            {errors.image && <p style={{color: 'deepskyblue'}}>?????? ????????? ??????????????????.</p>}
                                            {fileUrl && 
                                                <div className="register_image_main">
                                                    <div>
                                                        <div><img src={fileUrl} className="register_image_thumbnail" alt=""/></div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="image_desc"><b>* ?????? ???????????? 640x640??? ????????? ?????? ????????????.</b><br />- ????????????
                                            ???????????? ??? ?????????????????? ????????? ???????????????.<br />- ??? ?????????????????? ???????????? ????????? ????????? ????????? ??? ????????????.<br />?????? ?????? ????????????
                                            640 X 640 ?????? ???????????? ?????? ???????????????.
                                        </div>
                                    </div>
                                </li>
                                <li className="board_title_wrap inner_list_wrap">
                                    <div className="board_title_title inner_title">??????<span>*</span></div>
                                    <div className="board_title_desc_wrap inner_desc_wrap">
                                        <div className="board_title_desc">
                                            <div className="board_title_input_wrap">
                                                <Input 
                                                    type="text" placeholder="?????? ????????? ??????????????????." id="boardTitleInput" maxLength="40"
                                                    {...register("title", { required: true })}
                                                    onChange={(e) => setTitleCount(e.target.value.length)}
                                                />
                                            </div>
                                            <div id="boardTitleInputQuantity">{titleCount}/40</div>
                                        </div>
                                        {errors.title && <ErrorP>?????? ????????? ??????????????????.</ErrorP>}
                                    </div>
                                </li>
                                <li className="category_wrap inner_list_wrap">
                                    <div className="category_title inner_title">????????????<span>*</span></div>
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
                                    <div className="inner_title">????????????<span>*</span></div>
                                    <div className="location_desc_wrap inner_desc_wrap">
                                        <div className="board_title_desc">
                                            <div>
                                                <Input 
                                                    placeholder="?????? ?????? ????????? ??????????????????." id="locationInput" maxLength="40"
                                                    {...register("location", { required: true })}
                                                    onChange={(e) => setLocationCount(e.target.value.length)}
                                                />
                                            </div>
                                            <div id="locationInputQuantity">{locationCount}/40</div>
                                        </div>
                                        {errors.location && <ErrorP>?????? ?????? ????????? ??????????????????.</ErrorP>}
                                    </div>
                                </li>
                                <li className="status_wrap inner_list_wrap">
                                    <div className="inner_title">??????<span>*</span></div>
                                    <div className="inner_desc_wrap">
                                        <div>
                                            <label htmlFor="usedProduct" style={{marginRight:'10px'}}>
                                                <input 
                                                    id="usedProduct" name="status" type="radio" value="use" checked="use" 
                                                    {...register("status", { required: true })}
                                                    style={{marginRight:'2px'}}
                                                />????????????</label>
                                            <label htmlFor="newProduct">
                                                <input 
                                                    id="newProduct" name="status" type="radio" value="new" 
                                                    {...register("status", { required: true })}
                                                    style={{marginRight:'2px'}}
                                                />?????????</label>
                                        </div>
                                    </div>
                                </li>
                                <li className="exchange_wrap inner_list_wrap">
                                    <div className="inner_title">??????<span>*</span></div>
                                    <div className="inner_desc_wrap">
                                        <div>
                                            <label htmlFor="????????????" style={{marginRight:'10px'}}>
                                                <input 
                                                    id="????????????" name="exchanges" type="radio" value="no" checked="no" 
                                                    {...register("exchanges", { required: true })}
                                                    style={{marginRight:'2px'}}
                                                />????????????</label>
                                            <label htmlFor="????????????">
                                                <input 
                                                    id="????????????" name="exchanges" type="radio" value="yes" 
                                                    {...register("exchanges", { required: true })}
                                                    style={{marginRight:'2px'}}
                                                />???????????? </label>
                                        </div>
                                    </div>
                                </li>
                                <li className="price_wrap inner_list_wrap">
                                    <div className="inner_title">??????<span>*</span></div>
                                    <div className="inner_desc_wrap">
                                        <div>
                                            <Input 
                                                type="text" id="priceInput"
                                                {...register("price", { required: true, pattern: /^[0-9]+$/i })}
                                            />&nbsp;&nbsp;&nbsp;???
                                        </div>
                                        {errors.price && (errors.price.type === 'required' && <ErrorP>????????? ??????????????????.</ErrorP>)}
                                        {errors.price && (errors.price.type === 'pattern' && <ErrorP>????????? ??????????????????.</ErrorP>)}
                                        <div className="price_desc">
                                            <div><label htmlFor="freesShipping">
                                                {/* <input id="freesShipping" type="checkbox" />????????? ?????? */}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="desc_wrap inner_list_wrap">
                                    <div className="inner_title">??????</div>
                                    <div className="inner_desc_wrap">
                                        <Textarea 
                                            placeholder="?????? ????????? ??????????????????." rows="6" id="descInput" maxLength="2000"
                                            {...register("description", { required: true })}
                                            onChange={(e) => setDescCount(e.target.value.length)}
                                            />
                                        <div>
                                            <div id="descInputQuantity">{descCount}/2000</div>
                                        </div>
                                        {errors.description && <ErrorP>?????? ????????? ??????????????????.</ErrorP>}
                                    </div>
                                </li>
                                <li className="quantity_wrap inner_list_wrap">
                                    <div className="inner_title">??????</div>
                                    <div className="inner_desc_wrap">
                                        <div>
                                            <Input 
                                                type="text" id="quantityInput"
                                                {...register("quantity", { required: true, pattern: /^[0-9]+$/i  })}
                                            />&nbsp;&nbsp;&nbsp;???
                                        </div>
                                        {errors.quantity && (errors.quantity.type === 'required' && <ErrorP>????????? ??????????????????.</ErrorP>)}
                                        {errors.quantity && (errors.quantity.type === 'pattern' && <ErrorP>????????? ??????????????????.</ErrorP>)}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <footer className="content_register_wrap">
                        <div className="content_register">
                            <input type="submit" className="register_button" value="????????????"></input>
                        </div>
                    </footer>
                </form>
            </div>
        </main>
    )
}

export default withRouter(ProductRegisterPage);
