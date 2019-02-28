import React from "react";
import { Link } from "react-router-dom";
import "./InstitutionSearchResultsEntry.css";

function InstitutionSearchResultsEntry(props) {
    let { name, id } = props;

    let linkUrl = `/institutions/${id}`;
    return (
        <Link to={linkUrl}>
            <div className="InstitutionSearchResultsEntry">
                <span>Name: {name}</span>
            </div>
        </Link>
    );
}

export default InstitutionSearchResultsEntry;
