const mongoose = require('mongoose');
const Institution = require('./Institution');

const { Schema } = mongoose;

/* --- Review sub-schema --- */
const reviewSchema = new Schema(
    {
        user: {
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

/* --- Program Schema --- */
const programSchema = new Schema(
    {
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        name: String,
        types: [String],
        locations: [String]
    },
    {
        timestamps: true
    }
);

/* --- Index the 'name' field --- */
programSchema.index({
    name: 'text'
});

const User = require('../models/User');

/* --- Program Schema Methods --- */
// Do not change the function to arrow function (this binding)
programSchema.methods.addReview = function addReview(review, user) {
    const newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        review
    });
    if (user) {
        console.log('user', user);
        User.findById(user).then(userObj => {
            newReview.user = userObj;
            console.log(userObj);
        });
        // equivalent to newReview.user = user;
    }
    newReview.save();
    this.reviews.push(newReview);
};

programSchema.methods.updateCorrespondingInstitution = function updateCorrespondingInstitution(
    institutionId
) {
    Institution.findById(institutionId, (err, institution) => {
        if (err) {
            console.log('Error: Failed to add new Program to Institution');
            return err;
        }
        institution.programs.push(this._id);
        institution.save();
    });
};

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
