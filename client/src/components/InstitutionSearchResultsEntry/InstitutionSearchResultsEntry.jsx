import React from 'react';
import { Link } from 'react-router-dom';
import './InstitutionSearchResultsEntry.css';

function InstitutionSearchResultsEntry({ institution }) {
    let { name, _id, website, cities, state } = institution;
    let linkUrl = `/institutions/${_id}`;
    return (
        <Link to={linkUrl}>
            <div className="InstitutionSearchResultsEntry">
                <p>{name}</p>
                {cities ?
                    <div>{cities}</div>
                    :
                    <></>
                }
                {state ?
                    <p>State: {state}</p>
                    :
                    <></>
                }
                {website ?
                    <p>{website}</p>
                    :
                    <></>
                }
            </div>
        </Link>
    );
}

export default InstitutionSearchResultsEntry;
