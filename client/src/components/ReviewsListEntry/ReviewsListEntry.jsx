import React from 'react';
import './ReviewsListEntry.css';

function ReviewsListEntry(props) {
    return (
        <div className="ReviewsListEntry">
            <p>Review: {props.review.review} </p>
            <p>By User: {props.review.user.username}</p>
        </div>
    );
}

export default ReviewsListEntry;
