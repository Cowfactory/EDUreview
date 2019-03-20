import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './NavigationTools.css';

function NavigationTools(props) {
    return (
        <ListGroup className="list_group">
            <ListGroup.Item variant="dark">
                <div className="page_tools">
                    <div>
                        Num Results:&nbsp;
                        <select value={props.show} onChange={props.handleShowChange}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={props.showPreviousPage}>
                            {`< Previous ${props.show}`}
                        </button>
                        <button onClick={props.showNextPage}>
                            {`Next ${props.show} >`}
                        </button>
                        <button onClick={props.resetControls}>
                            Reset
                        </button>
                    </div>
                </div>
            </ListGroup.Item>
        </ListGroup >
    )
}

export default NavigationTools;