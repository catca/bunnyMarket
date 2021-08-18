import React from 'react';
import styled from 'styled-components';
import Content from './Content';
import { SERVER } from '../../Config';
import { Carousel } from 'antd';
import './MainPage.css';

const Img = styled.img`
    height: 300px;
    width: 100%;
`;

function MainPage() {

    return (
        <section style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '1024px', height: '1000px' }}>
                <Carousel autoplay>
                    <div>
                        <Img src={`${SERVER}/server/sliderImage/662404945.jpg`} alt="" />
                    </div>
                    <div>
                        <Img src={`${SERVER}/server/sliderImage/668577671.jpg`} alt="" />
                    </div>
                    <div>
                        <Img src={`${SERVER}/server/sliderImage/668587539.jpg`} alt="" />
                    </div>
                    <div>
                        <Img src={`${SERVER}/server/sliderImage/669233812.jpg`} alt="" />
                    </div>
                </Carousel>
                <Content />
            </div>
        </section>
    )
}

export default MainPage
