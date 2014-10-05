'use strict';

angular.module('soccerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('playersIndex', {
        url: '/players',
        templateUrl: 'app/players/index.html',
        controller: 'playersIndexCtrl',
        resolve: {
          playersPromise: ['players', function(players){
            return players.fetch();
          }]
        }
      })
      .state('playersShow', {
        url: '/players/{id}',
        templateUrl: 'app/players/show.html',
        controller: 'playersShowCtrl',
        resolve: {
          player: ["$stateParams", "players", function($stateParams, players){
            return players.get($stateParams.id);
          }]
        }
      })
  });
