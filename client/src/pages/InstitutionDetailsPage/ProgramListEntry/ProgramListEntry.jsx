import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import './ProgramListEntry.css';

function ProgramListEntry(props) {
    const { institutionName, institutionId, idx } = props;
    const { name, types, _id } = props.program;
    const length = props.program.reviews.length;

    let variant;
    if (idx % 2 === 0) {
        variant = "primary"
    } else {
        variant = "secondary"
    }

    return (
        <Link to={{
            pathname: `/programs/${_id}`,
            state: { institutionName, institutionId }
        }}>
            <ListGroup>
                <ListGroup.Item variant={variant}>
                    <h3>{name}</h3>
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
                    <p>{length} reviews</p>

                </ListGroup.Item>
            </ListGroup>
        </Link >
    )
}
// <div className='ProgramListEntry'>
//     <h1>{name}</h1>
//     <p>
//         Program Type(s): &nbsp;
//         {types.map((type, key) => {
//             if (key === types.length - 1) {
//                 return <span key={key}>{type} </span>
//             } else {
//                 return <span key={key}>{type}, </span>
//             }
//         })}
//     </p>
// </div>

export default ProgramListEntry;