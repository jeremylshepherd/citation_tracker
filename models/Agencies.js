'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Agency = new Schema({
    name: String,
    abbr: String,
    violationCodes: [{code: String, text: String}],
    accessCode: String
});


module.exports = mongoose.model('Agency', Agency);