const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* --- Review sub-schema --- */
var reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    review: String,
}, {
    timestamps: true
});
var Review = mongoose.model('Review', reviewSchema);


/* --- Program Schema --- */
var programSchema = new Schema({
    reviews: [{
        type: Schema.Types.ObjectId, ref: 'Review'
    }],
    name: String,
    types: [String],
    locations: [String]
}, {
    timestamps: true
});

/* --- Program Schema Methods --- */
programSchema.methods.addReview = function(review) {
    let newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        userId: null,
        review: review
    })
    newReview.save();
    this.reviews.push(newReview);
}

var Program = mongoose.model('Program', programSchema);

module.exports = Program;