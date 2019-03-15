const mongoose = require('mongoose');

const { Schema } = mongoose;

const DEFAULT_LIMIT = 10;
const ASCENDING = 1;
const DESCENDING = -1;
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
 * Query helper function with default options for find()
 * @param {Object}  options
 * @param {String}  options.filter  The find() query filter
 * @param {String}  options.limit   Num results to show
 * @param {String}  options.skip    First {skip} results to skip
 * @param {Number}  options.sort    1: Ascending, -1: Descending
 * @param {Function}    cb  Callback Function
 */
institutionSchema.query.query = function query(options) {
    const { filter } = options || {};
    const { limit } = options || DEFAULT_LIMIT;
    const { skip } = options || DEFAULT_SKIP;
    const { sort } = options || ASCENDING;

    return this.find(
        filter,
        null,
        {
            limit,
            skip,
            sort: {
                name: sort
            }
        }
    );
};
const Institution = mongoose.model('Institution', institutionSchema);

module.exports = Institution;
