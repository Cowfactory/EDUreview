const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        review: {
            city: String,
            rating: String,
            enrollment: String,
            trueFalseQuestion1: String,
            trueFalseQuestion2: String,
            trueFalseQuestion3: String,
            headline: String,
            freeformQuestion1: String,
            freeformQuestion2: String,
            freeformQuestion3: String
        }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
