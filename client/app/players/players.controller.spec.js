'use strict';

describe('Controller: playersShowCtrl', function () {

  // load the controller's module
  beforeEach(module('soccerApp'));
  beforeEach(module('socketMock'));

  var playersShowCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    // console.log("player")
    // console.log(player)
    $httpBackend.expectGET('/api/players/:id')
      .respond({player: {name: "name"}});

    scope = $rootScope.$new();
    playersShowCtrl = $controller('playersShowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    // $httpBackend.flush();
    // expect(scope.awesomeThings.length).toBe(4);
  });
});
