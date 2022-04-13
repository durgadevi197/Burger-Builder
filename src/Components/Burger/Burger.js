import React from 'react';
import "./Burger.css";
import BurgerIngredient from './BurgerIngredient';

const burger = (props) =>{
    let transformedIngredents = Object.keys(props.ingredients)
    .map( igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} /> ;
        });
    }).reduce((arr, el)=> {
    return arr.concat(el)
},[]);

if (transformedIngredents.length === 0){
    transformedIngredents =<p>Please start adding ingredients...</p>;
}

    return (
            <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredents}
            {/* <BurgerIngredient type="meat" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" /> */}
            <BurgerIngredient type="bread-bottom" />
            </div>

    );

};

export default burger;