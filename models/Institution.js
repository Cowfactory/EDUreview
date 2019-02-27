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

/* --- Index the 'name' field --- */
institutionSchema.index({
    name: 'text',
}); 

var Instituion = mongoose.model('Institution', institutionSchema);

module.exports = Instituion;