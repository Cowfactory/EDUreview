const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    fName: String,
    lName: String,
    email: String
}, {
    timestamps: true
});

var User = mongoose.model('User', userSchema);

module.exports = User;