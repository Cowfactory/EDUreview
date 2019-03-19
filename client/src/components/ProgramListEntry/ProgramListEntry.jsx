import React from 'react';
import { Link } from 'react-router-dom';
import './ProgramListEntry.css';

function ProgramListEntry(props) {
    const { name, types, programId, institutionName, institutionId } = props;
    console.log(institutionName)
    return (
        <Link to={{
            pathname: `/programs/${programId}`,
            state: { institutionName, institutionId }
        }}>
            <div className='ProgramListEntry'>
                <h1>{name}</h1>
                <p>
                    Program Type(s): &nbsp;
                    {types.map((type, key) => {
                        if (key === types.length - 1) {
                            return <span key={key}>{type} </span>
                        } else {
                            return <span key={key}>{type}, </span>
                        }
                    })}
                </p>
            </div>
        </Link >
    )
}

export default ProgramListEntry;