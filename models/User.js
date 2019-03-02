const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "You must enter a name"],
            minlength: [3, "Name must be between 3 and 16 characters"],
            maxlength: [16, "Name must be between 1 and 16 characters"]
        },
        password: {
            type: String,
            required: [true, "You must enter a password"],
            minlength: [8, "Password must be between 8 and 128 characters"],
            maxlength: [128, "Password must be between 8 and 128 characters"]
        },
        email: {
            type: String,
            required: [true, "You must enter an email"],
            minlength: [5, "Email must be between 5 and 99 characters"],
            maxlength: [99, "Email must be between 5 and 99 characters"],
            unique: true
        }
    },
    {
        timestamps: true
    }
);

// This returns a user object without a password
userSchema.set("toObject", {
    transform: function(doc, user, options) {
        let userObj = {
            _id: user._id,
            email: user.email,
            username: user.name
        };
        return userObj;
    }
});

// This checks the entered password against the hashed password
userSchema.methods.authenticated = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// This replaces the user object's password w/ a hash
userSchema.pre("save", function(next) {
    if (this.isNew) {
        let hash = bcrypt.hashSync(this.password, 12);
        this.password = hash;
    }
    next();
});

var User = mongoose.model("User", userSchema);

module.exports = User;
