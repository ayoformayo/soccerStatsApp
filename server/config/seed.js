/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Player = require('../api/player/player.model');
var stats = require('../../re_completed_json.json')
var _ = require('underscore');

// Player.find({}).remove(function() {
//   _.each(stats, function(hash){

//     Player.create(hash)

//   })
// });
