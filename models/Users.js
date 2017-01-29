'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var User = new Schema({
	local:{
        id: Number,
        email: String,
        username: String,
        password: String,
        created: Date,
        resetPasswordToken: String,
        resetExpires: Number
    },
    citations: [{ type: Schema.Types.ObjectId, ref: 'Citation' }]
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);