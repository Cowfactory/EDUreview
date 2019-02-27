import React from 'react';
import './ReviewsListEntry.css';

function ReviewsListEntry(props) {
    return (
        <div className='ReviewsListEntry'>
            <p> {props.review} </p>
        </div>
    )
}

export default ReviewsListEntry;