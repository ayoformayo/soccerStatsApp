/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /players              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Player = require('./player.model');

// Get list of things
exports.index = function(req, res) {
  var players = Player.find({}).limit(20).sort({minsPlayed: -1})
  // var max_array =
  //          [
  //           'age',
  //           'height',
  //           'weight',
  //           'apps',
  //           'subOn',
  //           'minsPlayed',
  //           'rating',
  //           'tackleWonTotal',
  //           'tackleTotalAttempted',
  //           'challengeLost',
  //           'interceptionAll',
  //           'foulGiven',
  //           'foulCommitted',
  //           'offsideGiven',
  //           'clearanceTotal',
  //           'dribbleLost',
  //           'dribbleWon',
  //           'outfielderBlock',
  //           'passCrossBlockedDefensive',
  //           'outfielderBlockedPass',
  //           'shotOffTarget',
  //           'shotOnPost',
  //           'shotOnTarget',
  //           'shotsTotal',
  //           'shotBlocked',
  //           'shotSixYardBox',
  //           'shotPenaltyArea',
  //           'shotOboxTotal',
  //           'shotOpenPlay',
  //           'shotCounter',
  //           'shotSetPiece',
  //           'penaltyTaken',
  //           'shotRightFoot',
  //           'shotLeftFoot',
  //           'shotHead',
  //           'goalSixYardBox',
  //           'goalPenaltyArea',
  //           'goalObox',
  //           'goalTotal',
  //           'goalOwn',
  //           'goalOpenPlay',
  //           'goalCounter',
  //           'goalSetPiece',
  //           'penaltyScored',
  //           'goalNormal',
  //           'goalRightFoot',
  //           'goalLeftFoot',
  //           'goalHead',
  //           'yellowCard',
  //           'redCard',
  //           'turnover',
  //           'dispossessed',
  //           'saveSixYardBox',
  //           'savePenaltyArea',
  //           'saveObox',
  //           'duelAerialWon',
  //           'duelAerialLost',
  //           'passLongBallAccurate',
  //           'passLongBallInaccurate',
  //           'shortPassAccurate',
  //           'shortPassInaccurate',
  //           'passCrossAccurate',
  //           'passCrossInaccurate',
  //           'passCornerAccurate',
  //           'passCornerInaccurate',
  //           'passFreekickAccurate',
  //           'passFreekickInaccurate',
  //           'keyPassLong',
  //           'keyPassShort',
  //           'keyPassCross',
  //           'keyPassCorner',
  //           'keyPassThroughball',
  //           'keyPassFreekick',
  //           'keyPassThrowin',
  //           'keyPassOther',
  //           'assistCross',
  //           'assistCorner',
  //           'assistThroughball',
  //           'assistFreekick',
  //           'assistThrowin',
  //           'assistOther'
  //          ]

  //         _.each(max_array, function(key){
  //           var query = Player.find({}).limit(1).sort([[key, 'descending']]);
  //           query.exec(function(err, player){
  //             var player_hash = {}
  //             player_hash[key] = {name: player[0].name, val: player[0][key]}
  //             console.log(player_hash)
  //           })
  //         })
  players.exec(function (err, players) {
    if(err) { return handleError(res, err); }
    return res.json(200, players);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Player.findById(req.params.id, function (err, player) {
    if(err) { return handleError(res, err); }
    if(!player) { return res.send(404); }
    return res.json(player);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Player.create(req.body, function(err, player) {
    if(err) { return handleError(res, err); }
    return res.json(201, player);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Player.findById(req.params.id, function (err, player) {
    if (err) { return handleError(res, err); }
    if(!player) { return res.send(404); }
    var updated = _.merge(player, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, player);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Player.findById(req.params.id, function (err, player) {
    if(err) { return handleError(res, err); }
    if(!player) { return res.send(404); }
    player.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
