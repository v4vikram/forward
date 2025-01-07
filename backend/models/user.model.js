const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: 3
        },
        lastname: {
            type: String,
            required: false,
            minlength: 3
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    }
}, {
    timestamps: true
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return token;
};

userSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};

userSchema.statics.comparePassword = function (password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
};


const userModel = mongoose.model('users', userSchema);

module.exports = userModel;