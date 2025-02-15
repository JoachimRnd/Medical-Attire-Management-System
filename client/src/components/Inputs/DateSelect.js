import React from 'react';
import './inputs.css';
import './css/dateSelect.css'
const DateSelect = (props) => {
    return (
            <div className="date-form">
                <div className="dateSelect">{props.type}</div>
                <input className="inputDate" type="date"></input>
            </div>
    );
};

export default DateSelect;