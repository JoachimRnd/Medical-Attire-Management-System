import React from 'react';
import './css/textArea.css'
import './inputs.css'

const TextArea = (props) => {
    return (
        <div>
            <p className="type">{props.title}</p>
            <textarea id={props.type} className="input"/>
        </div>
    );
};

export default TextArea;
