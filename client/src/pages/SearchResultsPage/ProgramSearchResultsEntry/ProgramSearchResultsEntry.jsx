import React from "react";
import { Link } from "react-router-dom";
import "./ProgramSearchResultsEntry.css";

function ProgramSearchResultsEntry(props) {
    let { name, _id, types } = props.program;
    let { state, website } = props.institution;

    let linkUrl = `/programs/${_id}`;
    return (
        <Link to={linkUrl}>
            <div className="ProgramSearchResultsEntry">
                <p>{name}
                    {state ?
                        <>, {state}</>
                        : <></>
                    }
                </p>
                <p>{props.institution.name}</p>
                <p>{website}</p>
            </div>
        </Link>
    );
}

export default ProgramSearchResultsEntry;
