const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var institutionSchema = new Schema({
    name: String,
    website: String,
    programs: []
}, {
    timestamps: true
});

var Instituion = mongoose.model('Institution', institutionSchema);

module.exports = Instituion;