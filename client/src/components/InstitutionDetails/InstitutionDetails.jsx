import React from 'react';
import { Link } from 'react-router-dom';
import './InstitutionDetails.css';

function InstitutionDetails(props) {
    return (
        <Link to={`/institutions/${props.institutionId}`}>
            <div className='InstitutionDetails'>
                <h1>{props.name}</h1>
                <body>Website: {props.website}</body>
            </div>
        </Link>
    )
}

export default InstitutionDetails;