import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

function InstitutionSearchResultsEntry(props) {
    let { name, _id, website, state } = props.institution;
    let linkUrl = `/institutions/${_id}`;

    let variant;
    if (props.idx % 2 === 0) {
        variant = "primary"
    } else {
        variant = "secondary"
    }

    return (
        <Link to={linkUrl} >
            <ListGroup style={{ marginBottom: '3px' }}>
                <ListGroup.Item variant={variant}>
                    <div className="InstitutionSearchResultsEntry">
                        <h4>{name}
                            {state ?
                                <>, {state}</>
                                :
                                <></>
                            }
                        </h4>
                        {website ?
                            <>{website}</>
                            :
                            <></>
                        }
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Link>
    );
}

export default InstitutionSearchResultsEntry;
