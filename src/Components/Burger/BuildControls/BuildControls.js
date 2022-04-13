import React from 'react';
import "./BuildControls.css";
import BuildControl from './BuildControl/BuildControl';

const controls =[
    {label:'salad' , type:'salad'},
    {label:'bacon' ,type:'bacon'},
    {label:'meat' , type:'meat'},
    {label:'cheese' , type:'cheese'}
];

const buildControls = (props) =>(
    <div className="BuildControls">
        <p>Current Price : <strong>{props.price.toFixed(2)} $</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)} 
            removed ={() => props.ingredientRemoved(ctrl.type)}
            disabled ={props.disabled[ctrl.type]}
            price = {props.price}/>
        ))}
        <button className="OrderButton" 
        disabled={!props.purchasable}
        onClick = {props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;