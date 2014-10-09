angular.module('soccerApp')
  .factory('players', ['$http', function($http){
    var ddo = {
      players: []
    };

    ddo.fetch = function(){
      // return [{"name": "Alessandro Del Piero", "rating": "10"}];
      return $http.get('/api/players').success(function(data){
        angular.copy(data, ddo.players);
      })
    };

    ddo.create = function(player){
      return $http.post('/api/players', player).success(function(data){
        ddo.players.push(data)
      });
    };

    ddo.get = function(id){
      return $http.get('/api/players/' + id).then(function(res){
        return res.data;
      });
    }

    return ddo;
  }]);
