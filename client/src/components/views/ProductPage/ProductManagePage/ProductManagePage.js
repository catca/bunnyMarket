import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { PRODUCT_SERVER, SERVER } from "../../../Config";
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

const Table = ({ columns, data }) => {
    const [sales, setSales] = useState([])
    useEffect(() => {
        const sale = data.map(item => {
            if(item.salesStatus === 'sale'){
                return {'salesStatus': 'sale'}
            } else {
                return {'salesStatus': 'soldOut'}
            }
        })
        console.log(sale)
        if(sale){
            setSales(sale)
        }
    }, [])
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
                    let modifyDate = new Date(Date.parse(props.newDate));
                    const month = modifyDate.getMonth() < 9 ? `0${modifyDate.getMonth() + 1}` : `${modifyDate.getMonth() + 1}`
                    const date = modifyDate.getDate() < 10 ? `0${modifyDate.getDate()}` : `${modifyDate.getDate()}`
                    modifyDate = `${modifyDate.getFullYear()}-${month}-${date} ${modifyDate.toTimeString().slice(0, 5)}`;
                    console.log(5)
                    return (
                        <tr key={index}>
                            <Td width={168}>
                                <Img src={`${SERVER}/${props.filePath}`} alt="?????????" />
                            </Td>
                            <Td width={128}>
                                <div>
                                    <div>
                                        <div>
                                            <div onClick={() => {setSales('exist')}}>
                                                {/* {sales[index].salesStatus === 'sale' ? '?????? ???' : '????????????'} */}
                                                {sales}
                                            </div>
                                        </div>
                                        {/* <div>
                                            <div>?????? ???</div>
                                            <div>????????????</div>
                                        </div> */}
                                    </div>
                                </div>
                            </Td>
                            <Td width={248}><Link to={`/products/${props._id}`}>{props.title}</Link></Td>
                            <Td width={176}>{price}???</Td>
                            <Td width={120}>0/0</Td>
                            <Td width={120}>{modifyDate}</Td>
                            <Td width={64}>
                                <div>??????</div>
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
    let userVariable;
    if(user.userData){
        userVariable = {
            userId: user.userData.email
        }
    }

    const columns = useMemo(
        () => [
            {
                accessor: "image",
                Header: "??????",
                width: 168
            },
            {
                accessor: "status",
                Header: "????????????",
                width: 128
            },
            {
                accessor: "title",
                Header: "?????????",
                width: 248
            },
            {
                accessor: "price",
                Header: "??????",
                width: 176
            },
            {
                accessor: "feed",
                Header: "???/??????",
                width: 120
            },
            {
                accessor: "updateDate",
                Header: "???????????????",
                width: 120
            },
            {
                accessor: "function",
                Header: "??????",
                width: 64
            },
        ],
        []
    );

    useEffect(() => {
        axios.post(`${PRODUCT_SERVER}/productManage`, userVariable)
            .then(response => {
                if (response.data.success) {
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
