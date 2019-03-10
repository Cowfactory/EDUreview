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
        website: String
    },
    {
        timestamps: true
    }
);

/* --- Index the 'name' field --- */
institutionSchema.index({
    name: 'text'
});

const Instituion = mongoose.model('Institution', institutionSchema);

module.exports = Instituion;
