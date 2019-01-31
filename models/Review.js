const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
    programId: {
        type: Schema.Types.ObjectId, ref: 'Program'
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    review: String,
}, {
    timestamps: true
});

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;