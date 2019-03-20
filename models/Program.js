const mongoose = require('mongoose');
const Institution = require('./Institution');

const { Schema } = mongoose;

const DEFAULT_LIMIT = 10;
const ASCENDING = 1;
const DEFAULT_SKIP = 0;

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
        locations: [String],
        institutionId: {
            type: Schema.Types.ObjectId,
            ref: 'Institution'
        }
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
    return this;
};

/**
 * @description
 * Query helper function with default options for find().
 * @param {Object}  options
 * @param {String}  options.filter  The find() query string. Default finds all
 * @param {String}  options.limit   Num results to show. Default shows 10
 * @param {String}  options.skip    First {skip} results to skip. Default skips 0
 * @param {Number}  options.sort    Returns results in: 1: Ascending -1: Descending order. Default Ascending
 * @param {Number}  options.selectFields    Select which fields to return. Default only returns name
 */
programSchema.query.query = function query(options) {
    const filter = options.filter || {};
    const limit = options.limit || DEFAULT_LIMIT;
    const skip = options.skip || DEFAULT_SKIP;
    const sort = options.sort || ASCENDING;
    const selectFields = options.selectFields || '';

    return this.find(filter)
        .select(selectFields)
        .limit(limit)
        .sort({ name: sort })
        .skip(skip);
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
