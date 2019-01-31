const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var programSchema = new Schema({
    insitutionId: {
        type: Schema.Types.ObjectId, ref: 'Instituion'
    },
    name: String,
    types: [String],
    locations: [String]
}, {
    timestamps: true
});

var Program = mongoose.model('Program', programSchema);

module.exports = Program;