import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import './SearchPage.css';



function SearchPage() {
    const location = useLocation();
    const query = queryString.parse(location.search);
    const [product, setProduct] = useState([])
    const productVariable = {
        productTitle: query.q
    }

    useEffect(() => {
        console.log(productVariable)
        axios.post('http://localhost:5000/api/products/search', productVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.product)
                    setProduct(response.data.product)
                } else {
                    alert('Failed to get video Info')
                }
            })

    }, [])

    const renderProducts = product.map((product, index) => {
        const regexp = /\B(?=(\d{3})+(?!\d))/g;
        const price = product.price.toString().replace(regexp, ',');
        const nowDate = Date.now();
        let newDate = new Date(product.newDate);
        newDate = Date.parse(newDate)
        console.log(nowDate, newDate)
        let date = '';
        if(nowDate - newDate < (1000 * 60)){
            date = `${parseInt((nowDate - newDate) / 1000)} 초전`
        } else if(nowDate - newDate < (1000 * 60 * 60)){
            date = `${parseInt((nowDate - newDate) / (1000 * 60))} 분전`
        } else if(nowDate - newDate < (1000 * 60 * 60 * 24)){
            date = `${parseInt((nowDate - newDate) / (1000 * 60 * 60))} 시간전`
        } else {
            date = `${parseInt((nowDate - newDate) / (1000 * 60 * 60 * 24))} 일전`
        }

        return (
            <div className="content_product_wrap" key={index}>
                <div className="product_img_wrap">
                    <a href="/detail?no=${product.no}"><img className="product_img" src={`http://localhost:5000/${product.filePath}`} alt="${product.title}" /></a>
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
                        <span className="search_name">{query.q}</span>의 검색결과
                        <span className="search_count">{product && product.length}</span>
                    </div>
                    <ul className="sorting_method">
                        <li className="sort_item accuracy_sort">정확도순</li>
                        <li className="sort_item newest_sort">최신순</li>
                        <li className="sort_item low_price_sort">저가순</li>
                        <li className="sort_item high_price_accuracy_sort">고가순</li>
                    </ul>
                </div>

                <div className="content_inner">
                    {renderProducts}
                </div>
            </div>
        </div>
    )
}

export default SearchPage
