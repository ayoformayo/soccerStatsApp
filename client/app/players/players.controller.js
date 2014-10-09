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
    var canvas = d3.select('stat-canvas');
    $scope.player = player;

  });
