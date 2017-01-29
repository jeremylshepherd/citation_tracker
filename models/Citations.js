'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Citation = new Schema({
    ticket: String,
	tag: String,
    make: String,
    model: String,
    year: String,
    color: String,
    state: String,
    violation: [Number],
    location: String,
    date: String,
    time: String,
    officer: {name: String, unit: Number},
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    employee: String
});

module.exports = mongoose.model('Citation', Citation);