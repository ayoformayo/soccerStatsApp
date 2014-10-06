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
  .controller("playersShowCtrl",
    function(players, player, $scope, $stateParams){
      $scope.player = player;
    }
  );
