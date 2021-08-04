import React, { useMemo } from "react";
import faker from "faker/locale/ko";
// import "./ProductManagePage.css"
import styled from "styled-components";

const Th = styled.th`
    padding: 0.5rem;
    border: 1px solid black;
`;

const Td = styled.td`
    height: 168px;
    padding: 0.5rem;
    border: 1px solid black;
`;

function Table({ columns, data }) {

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <Th key={index}>{column.Header}</Th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map(({ image, title, price}) => (
                    <tr key={price}>
                        <Td style={{width: '168px'}}>
                            <img src={'hello'} alt="" />
                        </Td>
                        <Td style={{width: '128px'}}>
                            <div>
                                <div>
                                    <div>
                                        <div>판매 중</div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </Td>
                        <Td style={{width: '248px'}}>{title}</Td>
                        <Td style={{width: '224px'}}>{price}원</Td>
                        <Td style={{width: '72px'}}>0/0</Td>
                        <Td style={{width: '120px'}}>date</Td>
                        <Td style={{width: '64px'}}>
                            <div>수정</div>
                        </Td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function ProductManagePage() {
    const columns = useMemo(
        () => [
            {
                accessor: "image",
                Header: "사진",
            },
            {
                accessor: "status",
                Header: "판매상태",
            },
            {
                accessor: "title",
                Header: "상품명",
            },
            {
                accessor: "price",
                Header: "가격",
            },
            {
                accessor: "feed",
                Header: "찜/댓글",
            },
            {
                accessor: "updateDate",
                Header: "최근수정일",
            },
            {
                accessor: "function",
                Header: "기능",
            },
        ],
        []
    );

    const data = useMemo(
        () =>
            Array(10)
                .fill()
                .map(() => ({
                    image: faker.name.lastName() + faker.name.firstName(),
                    title: faker.internet.email(),
                    price: faker.phone.phoneNumber(),
                })),
        []
    );

    return(
        <div style={{width: '100vw', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <main style={{width: '1024px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Table columns={columns} data={data} />
            </main>
        </div>
        
    ) 
}

export default ProductManagePage
