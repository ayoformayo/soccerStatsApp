'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mongoose = require("mongoose")
var PlayerSchema = new mongoose.Schema({
  name: String,
  rating: {type: Number, default: 0}
});

module.exports = mongoose.model('Player', PlayerSchema);

