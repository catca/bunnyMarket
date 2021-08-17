import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { ThreeBars } from '@styled-icons/octicons/ThreeBars'
import { categories } from '../../ProductPage/categories'
import './NavCategory.css'
import { PRODUCT_SERVER } from '../../../Config'

function NavCategory() {
    const [category, setCategory] = useState(null)
    const [largeCategory, setLargeCategory] = useState({})
    const [mediumCategory, setMediumCategory] = useState({})
    const [smallCategory, setSmallCategory] = useState({})
    const history = useHistory();
    let mouseLeave;
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
        clearTimeout(mouseLeave);
        setCategory('exist');
    }
    const onmouseleave = () => {
        mouseLeave = setTimeout(() => {
            setCategory(null);
            setLargeCategory({});
            setMediumCategory({});
            setSmallCategory({});
        }, 1000);
    }

    useEffect(() => {
        setMediumCategory({});
        setSmallCategory({});
    }, [largeCategory, setMediumCategory, setSmallCategory])

    useEffect(() => {
        setSmallCategory({});
    }, [mediumCategory, setSmallCategory])

    // const categoryClick = (props) => { //개열심히 했는데 필요없음 ㅜㅜ
    //     console.log(props);
    //     let variable = {};
    //     if(props.largeCategory){
    //         variable = { largeCategoryId: props.largeCategory.id, 
    //             largeCategory: props.largeCategory.title }
    //     } else if (props.mediumCategory){
    //         variable = { mediumCategoryId: props.mediumCategory.id, 
    //             mediumCategory: props.mediumCategory.title }
    //     } else if (props.smallCategory){
    //         variable = { smallCategoryId: props.smallCategory.id, 
    //             smallCategory: props.smallCategory.title }
    //     }
    //     axios.post(`${PRODUCT_SERVER}/searchCategory`, variable)
    //         .then(response => {
    //             if (response.data.success) {
    //                 //How many likes does this video or comment have 
                    
    //             } else {
    //                 alert('Failed to get likes')
    //             }
    //         })
    // }

    const categoryClick = (props) => {
        setCategory(null);
        setLargeCategory({});
        setMediumCategory({});
        setSmallCategory({});
        history.push(`/categories/${props.id}`);
    }

    return (
        <>
            <Bars onMouseOver={onmouseover} onMouseLeave={onmouseleave} />
            {category &&
                <CategoryBox 
                    category={category} 
                    largeCategory={largeCategory}
                    mediumCategory={mediumCategory} 
                    onMouseOver={onmouseover} 
                    onMouseLeave={onmouseleave}>
                    <div className="header-category-view">
                        <div className="header-category-view__select">
                            <span>전체 카테고리</span>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                        <ul className="header-category-view__list">
                            {categories.map(props => (
                                <li key={props.id}>
                                    <Button type="button" onMouseOver={() => onclickLarge({props})} 
                                        current={largeCategory} title={props.title} 
                                        onClick={() => categoryClick(largeCategory)}>
                                        {props.title} 
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {largeCategory.categories &&
                        <div className="header-category-view">
                            <div className="header-category-view__select">
                                <span>{largeCategory.title}</span>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                            <ul className="header-category-view__list">
                                {largeCategory.categories && largeCategory.categories.map(props => (
                                    <li key={props.id}>
                                        <Button type="button" onMouseOver={() => onclickMedium({props})} 
                                            current={mediumCategory} title={props.title}
                                            onClick={() => categoryClick(mediumCategory)}>
                                            {props.title}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    {mediumCategory.categories &&
                        <div className="header-category-view">
                            <div className="header-category-view__select">
                                <span>{mediumCategory.title}</span>
                            </div>
                            <ul className="header-category-view__list">
                            {mediumCategory.categories && mediumCategory.categories.map(props => (
                                <li key={props.id}>
                                    <Button type="button" onMouseOver={() => onclickSmall({props})} 
                                        current={smallCategory} title={props.title}
                                        onClick={() => categoryClick(smallCategory)}>
                                        {props.title}
                                    </Button>
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

const CategoryBox = styled.div`
    background-color: white;
    display: flex;
    top: calc(100%);
    border: var(--main-border);
    width: ${props => props.category && '240px'};
    width: ${props => props.largeCategory.categories && '480px'};
    width: ${props => props.mediumCategory.categories && '720px'};
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
