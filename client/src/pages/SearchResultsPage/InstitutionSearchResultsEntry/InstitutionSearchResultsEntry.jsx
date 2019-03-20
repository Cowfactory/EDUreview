import React from 'react';
import { Link } from 'react-router-dom';
import './InstitutionSearchResultsEntry.css';

function InstitutionSearchResultsEntry({ institution }) {
    let { name, _id, website, state } = institution;
    let linkUrl = `/institutions/${_id}`;
    return (
        <Link to={linkUrl}>
            <div className="InstitutionSearchResultsEntry">
                <p>{name}
                    {state ?
                        <>, {state}</>
                        :
                        <></>
                    }
                </p>
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
