import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ThreeBars } from '@styled-icons/octicons/ThreeBars'
import { categories } from '../../ProductPage/categories';
import './NavCategory.css'

function NavCategory() {
    const [category, setCategory] = useState(1)
    const [largeCategory, setLargeCategory] = useState(1)
    const [mediumCategory, setMediumCategory] = useState({})
    const [smallCategory, setSmallCategory] = useState({})
    const onclickLarge = ({props}) => {
        setLargeCategory(props);
    }
    const onclickMedium = ({props}) => {
        setMediumCategory(props);
    }
    const onclickSmall = ({props}) => {
        setSmallCategory(props);
    }
    const onmouseover = () => {
        setCategory('exist');
    }
    const onmouseleave = () => {
        setCategory(null);
    }
    useEffect(() => {
        console.log(mediumCategory);
        setMediumCategory({});
        setSmallCategory({});
    }, [largeCategory, setMediumCategory, setSmallCategory])

    useEffect(() => {
        setSmallCategory({});
    }, [mediumCategory, setSmallCategory])
    return (
        <>
            <Bars onMouseOver={onmouseover} onMouseLeave={onmouseleave} />
            {category &&
                <CategoryBox category={category} mediumCategory={mediumCategory} smallCategory={smallCategory}>
                    <div class="header-category-view">
                        <div class="header-category-view__select">
                            <span>전체 카테고리</span>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                        <ul class="header-category-view__list">
                            {categories.map(props => (
                                <li key={props.id}>
                                    <Button type="button" onMouseOver={() => onclickLarge({props})} current={largeCategory} title={props.title}>{props.title} </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {largeCategory.title &&
                        <div class="header-category-view">
                            <div class="header-category-view__select">
                                <span>두번째 카테고리</span>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <ul class="header-category-view__list">
                                {largeCategory.categories && largeCategory.categories.map(props => (
                                    <li key={props.id}>
                                        <Button type="button" onMouseOver={() => onclickMedium({props})} current={mediumCategory} title={props.title}>{props.title}</Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    {mediumCategory.title &&
                        <div class="header-category-view">
                            <div class="header-category-view__select">
                                <span>세번째 카테고리</span>
                            </div>
                            <ul class="header-category-view__list">
                            {mediumCategory.categories && mediumCategory.categories.map(props => (
                                <li key={props.id}>
                                    <Button type="button" onMouseOver={() => onclickSmall({props})} current={smallCategory} title={props.title}>{props.title}</Button>
                                </li>
                            ))}
                            </ul>
                        </div>
                    }
                </CategoryBox>
            }
        </>
    )
}

const Bars = styled(ThreeBars)`
    width: 28px;
    height: 28px;
    &:hover {
        color: skyblue;
    }
`;

const Conatiner = styled.div`
    top: calc(100%);
    border-left: 1px solid rgb(238, 238, 238);
    width: 240px;
    height: 400px;
    z-index: 10;
    position: absolute;
    ${props => props.hide === 'hide' ? 'display: none' : 'display: flex;'}
`;

const CategoryBox = styled.div`
    background-color: white;
    display: flex;
    top: calc(100%);
    border: var(--main-border);
    width: ${props => props.category && '240px'};
    width: ${props => props.largeCategory && '480px'};
    width: ${props => props.mediumCategory && '720px'};
    z-index: 10;
    position: absolute;
    height: 1200px;
`;

const Button = styled.div`
    height: 30px;
    line-height: 30px;
    padding-left: 12px;
    color: ${props => props.current.title === props.title ? 'white' : 'black'};
    background-color: ${props => props.current.title === props.title ? 'skyblue' : 'white'};
    cursor: pointer;
    &:hover {
        background-color: skyblue;
    }
`;

export default NavCategory
