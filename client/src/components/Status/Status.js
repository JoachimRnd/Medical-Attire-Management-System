import React from 'react';
import './status.css';

const Status = (props) => {
    const value = props.type.toUpperCase();
    return (
        <div id={props.type} className="status-banner">
            {value}
        </div>
    );
};

export default Status;