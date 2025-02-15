import React from 'react';
import './inputs.css';
import './css/text.css'
//Email, FullName, RoomName
//ex. <Text type='fullname' title='Full Name' placeHolder=''></Text>
// id=type -> becuz of css file id
const Text = (props) => {
    return (
        <div >
            <p className="type">{props.title}</p>
            <input id={props.type} className="input" placeholder={props.placeHolder}></input>
        </div>
    );
};

export default Text;