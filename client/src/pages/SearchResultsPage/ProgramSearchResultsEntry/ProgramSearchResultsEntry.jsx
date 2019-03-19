import React from "react";
import { Link } from "react-router-dom";
import "./ProgramSearchResultsEntry.css";

function ProgramSearchResultsEntry(props) {
    let { name, id, types } = props;

    let typeList;
    if (types) {
        typeList = types.map((type, key) => <span key={key}>{type}</span>);
    }

    let linkUrl = `/programs/${id}`;
    return (
        <Link to={linkUrl}>
            <div className="ProgramSearchResultsEntry">
                <span>Name: {name}</span>
                <div>Types: {typeList}</div>
            </div>
        </Link>
    );
}

export default ProgramSearchResultsEntry;
