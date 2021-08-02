import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import { Carousel } from 'antd';
import './Main.css';

const Img = styled.img`
    height: 300px;
    width: 100%;
`;

function MainPage() {

    return (
        <section style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '1100px', height: '1000px' }}>
                <Carousel autoplay>
                    <div>
                        <Img src={'http://localhost:5000/server/sliderImage/662404945.jpg'} alt="" />
                    </div>
                    <div>
                        <Img src={'http://localhost:5000/server/sliderImage/668577671.jpg'} alt="" />
                    </div>
                    <div>
                        <Img src={'http://localhost:5000/server/sliderImage/668587539.jpg'} alt="" />
                    </div>
                    <div>
                        <Img src={'http://localhost:5000/server/sliderImage/669233812.jpg'} alt="" />
                    </div>
                </Carousel>
                <Content />
            </div>
        </section>
    )
}

export default MainPage
