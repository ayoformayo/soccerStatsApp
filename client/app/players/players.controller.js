'use strict';

angular.module('soccerApp')
  .controller('playersIndexCtrl', function ($scope, $http, socket, players, playersPromise) {
      $scope.players = players.players;
      $scope.newPlayer = {};
      $scope.addPlayer = function(){
        if($scope.newThing === '') {
          return;
        }
        players.create($scope.newPlayer)
      };
    // $scope.awesomeThings = [];

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  })
  .controller("playersShowCtrl",
    function(players, player, $scope, $stateParams){
      $scope.player = player;
    }
  );
