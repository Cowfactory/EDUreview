const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var institutionSchema = new Schema({
    programs: [{
        type: Schema.Types.ObjectId, ref: 'Program'
    }],
    name: String,
    website: String,
}, {
    timestamps: true
});

var Instituion = mongoose.model('Institution', institutionSchema);

module.exports = Instituion;