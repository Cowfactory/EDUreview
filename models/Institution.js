const mongoose = require('mongoose');

const { Schema } = mongoose;

const DEFAULT_LIMIT = 10;
const ASCENDING = 1;
const DEFAULT_SKIP = 0;

const institutionSchema = new Schema(
    {
        programs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Program'
            }
        ],
        name: String,
        address: String,
        cities: [String],
        state: String,
        telephone: String,
        website: String
    },
    {
        timestamps: true
    }
);

/* --- Index the 'name' field --- */
institutionSchema.index(
    {
        name: 'text',
        cities: 'text',
        state: 'text'
    },
    {
        weights: {
            name: 2,
            state: 1,
            cities: 1
        }
    }
);

/**
 * @description
 * Query helper function with default options for find().
 * @param {Object}  options
 * @param {String}  options.filter  The find() query string. Default finds all
 * @param {String}  options.limit   Num results to show. Default shows 10
 * @param {String}  options.skip    First {skip} results to skip. Default skips 0
 * @param {Number}  options.sort    Returns results in: 1: Ascending -1: Descending order. Default Ascending
 * @param {Number}  options.selectFields    Select which fields to return.
 * @param {String}  options.stateCode   Filter results by stateCode
 */
institutionSchema.query.query = function query(options) {
    const filter = options.filter || {};
    const limit = options.limit || DEFAULT_LIMIT;
    const skip = options.skip || DEFAULT_SKIP;
    const sort = options.sort || ASCENDING;
    const selectFields = options.selectFields || '';
    const stateCodeFilter = options.stateCode || [null, /.*/];

    return this.find(filter)
        .select(selectFields)
        .where('state').in(stateCodeFilter)
        .limit(limit)
        .sort({ name: sort })
        .skip(skip);
};

const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;
