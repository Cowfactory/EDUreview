import React from "react";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

function ProgramSearchResultsEntry(props) {
    let { name, _id } = props.program;
    let { state, website } = props.institution;
    let linkUrl = `/programs/${_id}`;

    let variant;
    if (props.idx % 2 === 0) {
        variant = "primary"
    } else {
        variant = "secondary"
    }

    return (
        <Link to={linkUrl}>
            <ListGroup style={{ marginBottom: '3px' }}>
                <ListGroup.Item variant={variant}>
                    <h4>{name}
                        {state ?
                            <>, {state}</>
                            : <></>
                        }
                    </h4>
                    {props.institution.name}
                    <br />
                    {website}
                </ListGroup.Item>
            </ListGroup>
        </Link >
    );
}

export default ProgramSearchResultsEntry;
