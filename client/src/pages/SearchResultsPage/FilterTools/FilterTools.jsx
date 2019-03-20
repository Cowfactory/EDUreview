import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { RegionDropdown } from 'react-country-region-selector';

function FilterTools(props) {
    return (
        <ListGroup >
            <ListGroup.Item variant="dark">
                Filter Tools:
                <div>
                    Show Only:
                    {props.type === 'institutions' ?
                        <RegionDropdown
                            country={'United States'}
                            value={props.stateCode}
                            defaultOptionLabel="Any Location"
                            onChange={props.selectstateCode}
                            valueType="short"
                        /> :
                        <></>
                    }
                </div>
                <div>
                    <p>
                        Sort By Names:
                        <select onChange={props.handleSortChange}>
                            <option value={1}>Ascending</option>
                            <option value={-1}>Descending</option>
                        </select>
                    </p>
                </div>
                <div>
                    Don't see the result you're looking for? &nbsp;
                    <Link to="add-institution">Add an institution listing here</Link>
                </div>
            </ListGroup.Item>
        </ListGroup >
    )
}

export default FilterTools;