const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var institutionSchema = new Schema({
    name: String,
    website, String
}, {
    timestamps: true
});

var Instituion = mongoose.model('Instituion', institutionSchema);

module.exports = Instituion;