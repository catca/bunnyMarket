import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { PRODUCT_SERVER, SERVER } from '../../Config';

function Content() {
    const [product, setProduct] = useState([])
    useEffect(() => {
        Axios.get(`${PRODUCT_SERVER}/main`)
        .then(response => {
            if(response.data.success) {
                console.log(response.data);
                setProduct(response.data.products)
            } else {
                console.log(response.data);
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
            <Link to={`/products/${product._id}`} key={index} style={{height: '278px'}}>
                <div className="product">
                    <div className="product__thumb">
                        <img src={`${SERVER}/${product.filePath}`} alt={product.title} />
                    </div>
                    <div className="product__content">
                        <div className="product__title">{product.title}</div>
                        <div className="product__desc">
                            <div className="product__price">{price}</div>
                            <span className="product__regdate">{date}</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    })
    return (
        <div className="main_content">
            <div className="content_title">인기 있는 품목</div>
            {renderProducts}
        </div>
    )
}

export default Content
