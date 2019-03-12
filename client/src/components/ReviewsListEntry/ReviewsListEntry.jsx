import React from 'react';
import './ReviewsListEntry.css';

function ReviewsListEntry({ review }) {
    return (
        <div className="ReviewsListEntry">
            <p>Review: {review.review} </p>
            {
                review.user ?
                    <p>By: {review.user.username}</p>
                    :
                    <p>By: Anonymous User</p>
            }
        </div>
    );
}

export default ReviewsListEntry;
