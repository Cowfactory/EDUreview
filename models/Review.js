const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        review: String
    },
    {
        timestamps: true
    }
);
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
