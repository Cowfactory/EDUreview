import React from 'react';
import './ProgramDetails.css';

function ProgramDetails(props) {
    return (
        <div key={props.idx} className='ProgramDetails'>
            <p>INSTITUTION: {props.institutionName}</p>
            <p>NAME: {props.name}</p>
            <p>TYPES: {props.types}</p>
            <p>LOCATIONS: {props.locations}</p>
        </div>
    )
}

export default ProgramDetails;