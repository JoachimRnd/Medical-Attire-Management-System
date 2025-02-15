import React from 'react';
import './css/number.css'
import './inputs.css'
const Number = (props) => {
    const number_style ={
        width:"3rem"
    }
    let type=props.type;
        return (
            <>
            {  type === 'amount' ? 
            <div className="number-form">
            <div  className="amount" >{props.title}</div> 
            <input type="number" id={props.type} className="amount-number"></input>
            </div>
            : 
            <div>
            <p className="type">{props.title}</p> 
            <input type="number" id={props.type} className="input"></input>
            </div>
        }
        </>
    );
};

export default Number;