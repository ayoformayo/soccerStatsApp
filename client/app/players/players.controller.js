'use strict';

angular.module('soccerApp')
  .controller('playersIndexCtrl', function ($scope, $http, socket, players, playersPromise) {

      $scope.players = players.players;
      $scope.newPlayer = {};
      $scope.addPlayer = function(){
          players.create($scope.newPlayer);
      };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  })
  .controller('playersShowCtrl', function(players, player, $scope, $stateParams, $window){
    var d3 = $window.d3;
    var svg = d3.select('svg');
    var max_hash = { gameStarted: { player: 'Koke', val: 6 },
                        red: { player: 'Koke', val: 0 },
                        aerialWon: { player: 'Robin Knoche', val: 24 },
                        interceptions: { player: 'Robin Knoche', val: 18 },
                        totalShots: { player: 'Nolito', val: 23 },
                        dribbles: { player: 'Fede Cartabia', val: 26 },
                        totalCrosses: { player: 'Koke', val: 49 },
                        accurateThroughBalls: { player: 'Nolito', val: 3 },
                        subOn: { player: 'Neymar', val: 2 },
                        goals: { player: 'Neymar', val: 6 },
                        aerialLost: { player: 'Raul Bobadilla', val: 21 },
                        fouls: { player: 'Nolito', val: 15 },
                        shotsOnTarget: { player: 'Raheem Sterling', val: 9 },
                        wasFouled: { player: 'Fede Cartabia', val: 24 },
                        accurateCrosses: { player: 'Koke', val: 14 },
                        height: { player: 'Robin Knoche', val: 190 },
                        subOff: { player: 'Keisuke Honda', val: 4 },
                        assists: { player: 'Koke', val: 5 },
                        rating: { player: 'dad', val: 11 },
                        offsidesWon: { player: 'Robin Knoche', val: 4 },
                        shotsBlocked: { player: 'Robin Knoche', val: 8 },
                        offsides: { player: 'Nolito', val: 6 },
                        totalLongBalls: { player: 'Miranda', val: 55 },
                        weight: { player: 'Raul Bobadilla', val: 88 },
                        yellow: { player: 'Koke', val: 3 },
                        totalPasses: { player: 'Jordi Alba', val: 387 },
                        manOfTheMatch: { player: 'Paco Alcácer', val: 3 },
                        totalClearances: { player: 'Ermin Bicakcic', val: 33 },
                        ownGoals: { player: 'Koke', val: 0 },
                        dispossesed: { player: 'Franco Vázquez', val: 11 },
                        accurateLongBalls: { player: 'Robin Knoche', val: 38 },
                        ranking: { player: 'Jordi Alba', val: 60 },
                        secondYellow: { player: 'Koke', val: 0 },
                        accuratePasses: { player: 'Jordi Alba', val: 343 },
                        totalTackles: { player: 'Iván Piris', val: 21 },
                        wasDribbled: { player: 'Kevin De Bruyne', val: 10 },
                        keyPasses: { player: 'Kevin De Bruyne', val: 23 },
                        turnovers: { player: 'Raheem Sterling', val: 11 },
                        totalThroughBalls: { player: 'Kevin De Bruyne', val: 4 },
                        age: { player: 'Daniele Gastaldello', val: 31 } }

    var attr_array = [];
    for (var key in player) {
        var new_hash = {};
        if( typeof player[key] === 'number' && key != 'id' && key != '_id' && key != '__v' && key != 'teamId' && key != 'playerId' ){

          new_hash['val'] = player[key];
          new_hash['attribute'] = key;
          attr_array.push(new_hash);
        }
      }

      var totalEntries = attr_array.length
      var radianAngle = 360 / totalEntries;

      var circle = svg.selectAll('.dataCircle')
          .data(attr_array);


      var calculateCoordinates = function(angle, percent){
        var otherAngle = 180 - angle - 90;
        var toRadian = function (angle) {
          return angle * (Math.PI / 180);
        }
        var r = 360 * percent;
        var myAngle = toRadian(angle)
        var y = r * Math.sin(myAngle)
        var x = r * Math.cos(myAngle)
        return { "x": x, "y": y}
      };

      // angle 10, up 62.5133, x354.531

      var backCircle = svg.selectAll('.backgroundCircle')

      backCircle.style('fill', 'steelblue');

      var circleEnter = circle.enter().append('circle');

      circleEnter.attr('data-stat-value', function( d, i ){
        return d.val;
      });

      circleEnter.attr('data-stat-attribute', function(d, i){
        return d.attribute;
      });

      circleEnter.attr('stat-point', function(d, i){
        return '';
      });

      circleEnter.attr('cy', function(d,i){

        var val = d.val
        var playerAttr = d.attribute;
        var maxVal = max_hash[playerAttr].val;
        if(val === 0 || maxVal === 0){ return 360;}
        var percent = (val / maxVal)
        var myAngle = radianAngle * i;
        var coord = calculateCoordinates(myAngle, percent).y + 360;
        // console.log(percent+'% ----' + playerAttr)
        return coord;
      });

      circleEnter.attr('r', function(d, i) {
        return 10;
      });


      circleEnter.attr('cx', function(d, i) {

        var val = d.val
        var playerAttr = d.attribute;
        var maxVal = max_hash[playerAttr].val;
        if(val === 0 || maxVal === 0){ return 360;}
        var percent = (val / maxVal)
        // console.log(percent + '% ----' + playerAttr)
        var myAngle = radianAngle * i;
        var coord = calculateCoordinates(myAngle, percent).x + 360;
        return coord;
      });

      circleEnter.style('fill', function(d, i){
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      })
      // circleEnter.attr('r', function(d) { return Math.sqrt(d.number); });
      $scope.player = player;


    }
  );
