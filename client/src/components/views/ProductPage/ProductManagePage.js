import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// import "./ProductManagePage.css"
import styled from "styled-components";

const Th = styled.th`
    min-width: ${props => props.width}px;
    padding: 0.5rem;
    text-align: center;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
`;

const Td = styled.td`
    min-width: ${props => props.width}px;
    height: 168px;
    border-top: 1px solid black;
    border-bottom: 1px solid #CCCCCC;
    vertical-align: middle;
    padding: 8px;
    line-height: normal;
    text-align: center;
`;

const Img = styled.img`
    width: 152px;
    height: 152px;
    object-fit: cover;
`;

function Table({ columns, data }) {

    return (
        <table style={{ borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <Th key={index} width={column.width} style={{ fontWeight: 'bold' }}>{column.Header}</Th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((props, index) => {
                    const regexp = /\B(?=(\d{3})+(?!\d))/g;
                    const price = props.price.toString().replace(regexp, ',');
                    return (
                        <tr key={index}>
                            <Td width={168}>
                                {console.log(props)}
                                <Img src={`http://localhost:5000/${props.filePath}`} alt="곰돌이" />
                            </Td>
                            <Td width={128}>
                                <div>
                                    <div>
                                        <div>
                                            <div>판매 중</div>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                            </Td>
                            <Td width={248}><Link to={`/${props._id}`}>{props.title}</Link></Td>
                            <Td width={176}>{price}원</Td>
                            <Td width={120}>0/0</Td>
                            <Td width={120}>{props.newDate}</Td>
                            <Td width={64}>
                                <div>수정</div>
                            </Td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

function ProductManagePage() {
    const user = useSelector(state => state.user);
    const [product, setProduct] = useState([])
    const userVariable = {
        userId: user.userData.email
    }

    const columns = useMemo(
        () => [
            {
                accessor: "image",
                Header: "사진",
                width: 168
            },
            {
                accessor: "status",
                Header: "판매상태",
                width: 128
            },
            {
                accessor: "title",
                Header: "상품명",
                width: 248
            },
            {
                accessor: "price",
                Header: "가격",
                width: 176
            },
            {
                accessor: "feed",
                Header: "찜/댓글",
                width: 120
            },
            {
                accessor: "updateDate",
                Header: "최근수정일",
                width: 120
            },
            {
                accessor: "function",
                Header: "기능",
                width: 64
            },
        ],
        []
    );

    useEffect(() => {
        axios.post('/api/products/productManage', userVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.product)
                    setProduct(response.data.product)
                } else {
                    alert('Failed to get video Info')
                }
            })

    }, [])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <main style={{ width: '1024px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '100%', height: '30px', verticalAlign: 'middle' }}>search</div>
                {product && <Table columns={columns} data={product} />}
            </main>
        </div>

    )
}

export default ProductManagePage
