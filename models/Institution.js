const mongoose = require('mongoose');

const { Schema } = mongoose;

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
institutionSchema.index({
    name: 'text',
    cities: 'text',
    state: 'text'
}, {
        weights: {
            name: 2,
            state: 1,
            cities: 1
        }
    });

const Instituion = mongoose.model('Institution', institutionSchema);

module.exports = Instituion;
