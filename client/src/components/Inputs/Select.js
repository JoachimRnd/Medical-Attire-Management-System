import React, { Fragment } from 'react';
import './inputs.css';
import './css/select.css';



const gender = [
    { value: 'Male'},
    { value: 'Female'}
  ]

const profession=[

]
const scrub_type=[

]
const scrub_size=[]

const scrub_color=[]

const room_name=[]
const room_number=[]

const report_type = [
    { value: 'Damage' },
    { value: 'Missing' }
];

const Options = (items) => {
    return(
        <Fragment>
            {
                items.item.map(({value})=><option value={value}>{value}</option>)
            }
        </Fragment>
    );
}

const returnOption = type => {
    switch(type) {
        case 'gender': return gender; 
        case 'profession': return profession;
        case 'scrub_type': return scrub_type;
        case 'scrub_size': return scrub_size;
        case 'scrub_color': return scrub_color;
        case 'room_name': return room_name;
        case 'room_number': return room_number;
        case 'report_type': return report_type;
    }
};


const Select = (props) => {
    let option = returnOption(props.type);
    return (
        <div >
            <p className="type">{props.title}</p>
            <select className="input"  id={props.type} >
                <Options item={option} />
            </select>
        </div>
    );
};

export default Select;
