import React from 'react';
import { Link } from 'react-router-dom';
import './InstitutionListEntry.css';

function InstitutionListEntry(props) {
    return (
        <Link to={`/institutions/${props.institutionId}`}>
            <div className='InstitutionListEntry'>
                <h1>{props.name}</h1>
                <p>Website: {props.website}</p>
            </div>
        </Link>
    )
}

export default InstitutionListEntry;