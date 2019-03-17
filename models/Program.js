const mongoose = require('mongoose');
const Institution = require('./Institution');
const Review = require('./Review');

const { Schema } = mongoose;

/* --- Program Schema --- */
var programSchema = new Schema(
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

/* --- Program Schema Methods --- */
// Do not change the function to arrow function (this binding)
programSchema.methods.addReview = function addReview(review) {
    this.reviews.push(review);
};

programSchema.methods.updateCorrespondingInstitution = function updateCorrespondingInstitution(
    institutionId
) {
    Institution.findById(institutionId, (err, institution) => {
        if (err) {
            return err;
        }
        institution.programs.push(this._id);
        institution.save();
    });
};

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
