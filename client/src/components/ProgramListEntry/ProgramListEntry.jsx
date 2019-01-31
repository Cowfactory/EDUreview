import React from 'react';
import { Link } from 'react-router-dom';
import './ProgramListEntry.css';

function ProgramListEntry(props) {
    return (
        <Link to={`/programs/${props.programId}`}>
            <div className='ProgramListEntry'>
                <h1>{props.name}</h1>
                <p>Type: {props.types}</p>
                <p>Location(s): {props.locations}</p>
            </div>
        </Link>
    )
}

export default ProgramListEntry;