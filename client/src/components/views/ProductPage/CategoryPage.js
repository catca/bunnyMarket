import React, { useEffect } from 'react';
import styled from 'styled-components';
import { categories } from './categories';

function CategoryPage({ largeCategory, setLargeCategory, mediumCategory, setMediumCategory, smallCategory, setSmallCategory }) {

    const onclickLarge = ({props}) => {
        setLargeCategory(props);
    }
    const onclickMedium = ({props}) => {
        setMediumCategory(props);
    }
    const onclickSmall = ({props}) => {
        setSmallCategory(props);
    }
    useEffect(() => {
        setMediumCategory({});
        setSmallCategory({});
    }, [largeCategory, setMediumCategory, setSmallCategory])

    useEffect(() => {
        setSmallCategory({});
    }, [mediumCategory, setSmallCategory])

    return (
        <div className="category_desc_wrap inner_desc_wrap">
            <div className="category_class">
                <div style={{padding: '0'}}>
                    <ul style={{height: '100%', overflowY: 'scroll'}}>
                        {categories.map(props => (
                            <li key={props.id}>
                                <Button type="button" onClick={() => onclickLarge({props})} current={largeCategory} title={props.title}>{props.title} </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{padding: '0'}}>
                    <ul style={{height: '100%', overflowY: 'scroll'}}>
                        {largeCategory.categories ? largeCategory.categories.map(props => (
                            <li key={props.id}>
                                <Button type="button" onClick={() => onclickMedium({props})} current={mediumCategory} title={props.title}>{props.title}</Button>
                            </li>
                        )) :
                        <div style={{height: '100%', width: '100%', textAlign: 'center', lineHeight: '280px'}}>중분류 선택</div>}
                    </ul>
                </div>
                <div style={{padding: '0'}}>
                    <ul style={{height: '100%', overflowY: 'scroll'}}>
                        {mediumCategory.categories ? mediumCategory.categories.map(props => (
                            <li key={props.id}>
                                <Button type="button" onClick={() => onclickSmall({props})} current={smallCategory} title={props.title}>{props.title}</Button>
                            </li>
                        )) :
                        <div style={{height: '100%', width: '100%', textAlign: 'center', lineHeight: '280px'}}>소분류 선택</div>}
                    </ul>
                </div>
            </div>
            <h3 style={{marginTop: '22px', color: 'blue'}}>선택한 카테고리 : 
            <b>{largeCategory.title !== undefined ? ` ${largeCategory.title}` : null}</b>
            <b>{mediumCategory.title !== undefined ? ` > ${mediumCategory.title}` : null}</b>
            <b>{smallCategory.title !== undefined ? ` > ${smallCategory.title}` : null}</b>
            </h3>
        </div>
    )
}

const Button = styled.div`
    height: 100%;
    line-height: 40px;
    padding-left: 12px;
    color: ${props => props.current.title === props.title ? 'blue' : 'black'};
    cursor: pointer;
    &:hover {
        background-color: rgb(244, 244, 250);
    }
`;

export default CategoryPage;
