import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRODUCT_SERVER, SERVER } from '../../../Config';
import { categories } from '../categories';
import './ProductCategoryPage.css';

function ProductCategoryPage(props) {
    const categoryId = props.match.params.categoryId;
    const [product, setProduct] = useState([])
    const [categoryTitle, setCategoryTitle] = useState("");

    let keyword = categories.find(item => {
        if(item.id === categoryId) return true 
    });
    if(!keyword){
        categories.forEach(item => {
            if(keyword) return true
            if(item.categories) {
                keyword = item.categories.find(item => {
                    if(item.id === categoryId) return true 
                })
            }
        });
    }
    if(!keyword){
        categories.forEach(item => {
            if(item.categories) {
                item.categories.forEach(item => {
                    if(keyword) return true
                    if(item.categories) {
                        keyword = item.categories.find(item => {
                            if(item.id === categoryId) return true 
                        })
                    }
                })
            }
        })
    }

    useEffect(() => {
        const categoryVariable = {
            categoryId: categoryId
        };
        axios.post(`${PRODUCT_SERVER}/searchCategory`, categoryVariable)
            .then(response => {
                if (response.data.success) {
                    setProduct(response.data.product)
                } else {
                    alert('Failed to get video Info')
                }
            })

    }, [props.match.params.categoryId])

    const renderProducts = product.map((product, index) => {
        const regexp = /\B(?=(\d{3})+(?!\d))/g;
        const price = product.price.toString().replace(regexp, ',');
        const nowDate = Date.now();
        let newDate = new Date(product.newDate);
        newDate = Date.parse(newDate)
        let date = '';
        if(nowDate - newDate < (1000 * 60)){
            date = `${parseInt((nowDate - newDate) / 1000)} ??????`
        } else if(nowDate - newDate < (1000 * 60 * 60)){
            date = `${parseInt((nowDate - newDate) / (1000 * 60))} ??????`
        } else if(nowDate - newDate < (1000 * 60 * 60 * 24)){
            date = `${parseInt((nowDate - newDate) / (1000 * 60 * 60))} ?????????`
        } else {
            date = `${parseInt((nowDate - newDate) / (1000 * 60 * 60 * 24))} ??????`
        }

        return (
            <div className="content_product_wrap" key={index}>
                <div className="product_img_wrap">
                    <a href={`/products/${product._id}`}><img className="product_img" src={`${SERVER}/${product.filePath}`} alt="${product.title}" /></a>
                </div>
                <div className="product_article_wrap">
                    <div className="product_title">{product.title}</div>
                    <div className="product_article">
                        <div className="product_price">{price}</div>
                        <div className="product_regdate">
                            {date}
                        </div>
                    </div>
                </div>
                <div className="product_area_wrap">
                    <div className="product_area">
                        {product.location}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="wrap_content">
            <div className="content_container">
                <div className="content_nav">
                    <div className="search_result">
                        <span className="search_name">
                            {keyword && keyword.title}
                        </span>??? ????????????
                        <span className="search_count">{product && product.length}???</span>
                    </div>
                    <ul className="sorting_method">
                        <li className="sort_item accuracy_sort">????????????</li>
                        <li className="sort_item newest_sort">?????????</li>
                        <li className="sort_item low_price_sort">?????????</li>
                        <li className="sort_item high_price_accuracy_sort">?????????</li>
                    </ul>
                </div>

                <div className="content_inner">
                    {renderProducts}
                </div>
            </div>
        </div>
    )
}

export default ProductCategoryPage
