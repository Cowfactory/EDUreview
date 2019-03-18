import React from 'react';
import './ReviewsListEntry.css';

function ReviewsListEntry({ review, user }) {
    return (
        <div className="ReviewsListEntry">
            <p>Review: {review.headline} </p>
            {
                user ?
                    <p>By: {user.username}</p>
                    :
                    <p>By: Anonymous User</p>
            }
        </div>
    );
}

export default ReviewsListEntry;
