"use strict";
angular.module("soccerApp")
  .controller("playersIndexCtrl", function ($scope, $http, socket, players, playersPromise, $window) {
    var ctrl = this;
    var d3 = $window.d3;
    var width = 500,
        height = 700,
        radius = Math.min(width, height) / 2,
        color = d3.scale.category20c();
    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.linear()
        .range([0, radius]);

    var svg = d3.select('.svg-container').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g').attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");
    var playerArray = players.players;

    var dictionary = {
      // IS THIS DATA CORRECT??
      "age":  {"name":"Faryd Mondragón","val":43},
      "apps":  {"name":"Ramires","val":7},
      "height":  {"name":"Thibaut Courtois","val":199},
      "minsPlayed":  {"name":"Sergio Romero","val":720},
      "rating":  {"name":"Lionel Messi","val":8.521428571428572},
      "subOn":  {"name":"Serey Die","val":0},
      "weight":  {"name":"Daniel van Buyten","val":96},
      "tackleTotalAttempted":  {"name":"Oscar","val":40},
      "tackleWonTotal":  {"name":"Javier Mascherano","val":30},
      "DribbledPast":  {"name":"Ogenyi Onazi","val":21},
      "interceptionAll":  {"name":"Stefan de Vrij","val":25},
      "foulCommitted":  {"name":"Marouane Fellaini","val":19},
      "foulGiven":  {"name":"Arjen Robben","val":28},
      "redCard":  {"name":"Konstantinos Katsouranis","val":1},
      "yellowCard":  {"name":"Thiago Silva","val":3},
      "offsideGiven":  {"name":"Robin van Persie","val":12},
      "clearanceTotal":  {"name":"Ezequiel Garay","val":71},
      "ShotsBlocked":  {"name":"Thiago Silva","val":9},
      "outfielderBlockedPass":  {"name":"Cheick Tioté","val":10},
      "passCrossBlockedDefensive":  {"name":"Jan Vertonghen","val":9},
      "saveObox":  {"name":"Tim Howard","val":12},
      "savePenaltyArea":  {"name":"Tim Howard","val":15},
      "saveSixYardBox":  {"name":"Noel Valladares","val":2},
      "shotsTotal":  {"name":"Karim Benzema","val":31},
      "shotOboxTotal":  {"name":"Lionel Messi","val":16},
      "shotSixYardBox":  {"name":"Ezequiel Garay","val":4},
      "shotPenaltyArea":  {"name":"Karim Benzema","val":19},
      "shotOpenPlay":  {"name":"Karim Benzema","val":24},
      "shotCounter":  {"name":"Arjen Robben","val":4},
      "shotSetPiece":  {"name":"Vasilis Torosidis","val":3},
      "penaltyTaken":  {"name":"Karim Benzema","val":2},
      "shotOffTarget":  {"name":"Lionel Messi","val":12},
      "shotOnPost":  {"name":"Wesley Sneijder","val":2},
      "shotOnTarget":  {"name":"Karim Benzema","val":15},
      "shotBlocked":  {"name":"Ángel Di María","val":12},
      "shotHead":  {"name":"Asamoah Gyan","val":7},
      "shotLeftFoot":  {"name":"Ángel Di María","val":24},
      "shotRightFoot":  {"name":"Karim Benzema","val":18},
      "goalSixYardBox":  {"name":"Enner Valencia","val":3},
      "goalPenaltyArea":  {"name":"Robin van Persie","val":4},
      "goalObox":  {"name":"Lionel Messi","val":3},
      "goalOpenPlay":  {"name":"James Rodríguez","val":4},
      "goalCounter":  {"name":"Arjen Robben","val":2},
      "goalSetPiece":  {"name":"Enner Valencia","val":2},
      "goalOwn":  {"name":"Noel Valladares","val":1},
      "goalNormal":  {"name":"James Rodríguez","val":5},
      "penaltyScored":  {"name":"Mile Jedinak","val":1},
      "goalHead":  {"name":"Enner Valencia","val":2},
      "goalLeftFoot":  {"name":"James Rodríguez","val":4},
      "goalRightFoot":  {"name":"Thomas Müller","val":4},
      "goalTotal":  {"name":"James Rodríguez","val":6},
      "dribbleLost":  {"name":"Lionel Messi","val":27},
      "dribbleWon":  {"name":"Lionel Messi","val":46},
      "turnover":  {"name":"Arjen Robben","val":24},
      "dispossessed":  {"name":"Alexis Sánchez","val":29},
      "duelAerialLost": {"name":"Islam Slimani","val":22},
      "duelAerialWon":  {"name":"Marouane Fellaini","val":23},
      "passLongBallAccurate":  {"name":"Javier Mascherano","val":74},
      "passLongBallInaccurate":  {"name":"Jasper Cillessen","val":90},
      "shortPassAccurate":  {"name":"Philipp Lahm","val":502},
      "shortPassInaccurate":  {"name":"Dirk Kuyt","val":59},
      "passCornerAccurate":  {"name":"Mathieu Valbuena","val":14},
      "passCornerInaccurate":  {"name":"Toni Kroos","val":20},
      "passCrossAccurate":  {"name":"Ángel Di María","val":14},
      "passCrossInaccurate":  {"name":"Toni Kroos","val":33},
      "passFreekickAccurate":  {"name":"Keylor Navas","val":27},
      "passFreekickInaccurate":  {"name":"Keylor Navas","val":32},
      "keyPassLong":  {"name":"Ángel Di María","val":9},
      "keyPassShort":  {"name":"Lionel Messi","val":18},
      "keyPassCorner":  {"name":"Toni Kroos","val":7},
      "keyPassCross":  {"name":"Toni Kroos","val":10},
      "keyPassOther":  {"name":"Thomas Müller","val":14},
      "keyPassFreekick":  {"name":"Christian Bolaños","val":5},
      "keyPassThroughball":  {"name":"Lionel Messi","val":4},
      "keyPassThrowin":  {"name":"Ben Halloran","val":1},
      "assistCorner":  {"name":"Toni Kroos","val":2},
      "assistCross":  {"name":"Toni Kroos","val":3},
      "assistFreekick":  {"name":"Walter Ayoví","val":2},
      "assistOther":  {"name":"Juan Guillermo Cuadrado","val":3},
      "assistThroughball":  {"name":"Daley Blind","val":2},
      "assistThrowin":  {"name":"Serey Die","val":0}
    }

    var max_hash = $scope.max_hash = {
      "name": "Stats",
      "children": [{
                    "name": "Summary",
                     "children" :[ 
                      {"name": "age" },
                      {"name": "apps" },
                      {"name": "height" },
                      {"name": "minsPlayed" },
                      {"name": "rating" },
                      {"name": "subOn" },
                      {"name": "weight"}
                    ]},
                    {"name": "Defensive",
                      "children": [
                      {"name": "tackles",
                       "children": [
                        {"name": "tackleTotalAttempted" },
                        {"name": "tackleWonTotal" },
                        {"name": "DribbledPast" }
                        ]
                      },
                      {"name": "interceptions",
                       "children": [
                        {"name": "interceptionAll" },
                        ]
                      },
                      { "name": "fouls",
                      "children": [
                       {"name": "foulCommitted" },
                       {"name": "foulGiven" },
                       ]
                      },
                      {"name": "cards",
                       "children": [
                        {"name": "redCard" },
                        {"name": "yellowCard" }
                        ]
                      },
                       { "name": "offsides",
                        "children": [
                         {"name": "offsideGiven" },
                         ]
                       },
                       { "name": "clearances",
                        "children": [
                         {"name": "clearanceTotal" },
                        ]
                      },
                      { "name": "blocks",
                       "children": [
                        {"name": "ShotsBlocked" },
                        {"name": "outfielderBlockedPass" },
                        {"name": "passCrossBlockedDefensive" }
                        ]
                      },
                      {"name": "saves",
                       "children": [
                        {"name": "saveObox" },
                        {"name": "savePenaltyArea" },
                        {"name": "saveSixYardBox" },
                        // "Total"
                        ]
                      },
                    ]},
                    {"name": "Offensive",
                     "children": [
                      {"name": "shots",
                       "children": [                      
                        {"name": "zones",
                         "children": [
                          {"name": "shotsTotal" },
                          {"name": "shotOboxTotal" },
                          {"name": "shotSixYardBox" },
                          {"name": "shotPenaltyArea" }
                        ]},
                        {"name": "situations",
                         "children": [
                          {"name": "shotsTotal" },
                          {"name": "shotOpenPlay" },
                          {"name": "shotCounter" },
                          {"name": "shotSetPiece" },
                          {"name": "penaltyTaken" }
                        ]},
                        {"name": "accuracy",
                         "children": [
                          // "Total",
                          {"name": "shotOffTarget" },
                          {"name": "shotOnPost" },
                          {"name": "shotOnTarget" },
                          {"name": "shotBlocked" },
                        ]},
                        {"name": "body parts",
                         "children": [
                          {"name": "shotHead" },
                          {"name": "shotLeftFoot" },
                          {"name": "shotRightFoot" },
                          {"name": "shotsTotal" },
                          // "Other"
                        ]}
                      ]},
                      {"name": "goals",
                       "children": [
                        {"name": "zones",
                         "children": [
                          {"name": "goalSixYardBox" },
                          {"name": "goalTotal" },
                          {"name": "goalPenaltyArea" },
                          {"name": "goalObox" },
                        ]},
                        {"name": "situations",
                         "children": [
                          {"name": "goalOpenPlay" },
                          {"name": "goalCounter" },
                          {"name": "goalSetPiece" },
                          {"name": "goalOwn" },
                          {"name": "goalNormal" },
                          {"name": "penaltyScored" }
                        ]},
                        {"name": "bodyParts",
                         "children": [
                          {"name": "goalHead" },
                          {"name": "goalLeftFoot" },
                          {"name": "goalRightFoot" },
                          {"name": "goalTotal" },
                          // "Other"
                        ]}
                      ]},
                      {"name": "dribbles",
                       "children": [
                        {"name": "dribbleLost" },
                        {"name": "dribbleWon" },
                        // "DribbleTotal"
                      ]},
                      {"name": "possession-loss",
                       "children": [
                        {"name": "turnover" },
                        {"name": "dispossessed" }
                      ]},
                      {"name": "aerial",
                       "children": [
                        {"name":"duelAerialLost" },
                        {"name": "duelAerialWon" },
                        // "Total"
                      ]},
                    ]},
                    {"name": "Passing",
                     "children": [
                                  {"name": "passes",
                                   "children": [
                                    {"name": "length",
                                     "children": [
                                        // "Total",
                                        {"name": "passLongBallAccurate" },
                                        {"name": "passLongBallInaccurate" },
                                        {"name": "shortPassAccurate" },
                                        {"name": "shortPassInaccurate" }
                                      ]},
                                    { "name": "type",
                                     "children": [
                                      {"name": "passCornerAccurate" },
                                      {"name": "passCornerInaccurate" },
                                      {"name": "passCrossAccurate" },
                                      {"name": "passCrossInaccurate" },
                                      {"name": "passFreekickAccurate" },
                                      {"name": "passFreekickInaccurate" }
                                    ]}
                                  ]},
                                  {"name": "key-passes",
                                   "children": [
                                    {"name": "length",
                                     "children": [
                                      {"name": "keyPassLong" },
                                      {"name": "keyPassShort" },
                                      // "Total"
                                    ]},
                                    {"name": "type",
                                     "children": [
                                      {"name": "keyPassCorner" },
                                      {"name": "keyPassCross" },
                                      {"name": "keyPassOther" },
                                      {"name": "keyPassFreekick" },
                                      {"name": "keyPassThroughball" },
                                      {"name": "keyPassThrowin" }
                                    ]}
                                  ]},
                                  {"name": "assists",
                                   "children": [
                                    {"name": "assistCorner" },
                                    {"name": "assistCross" },
                                    {"name": "assistFreekick" },
                                    {"name": "assistOther" },
                                    {"name": "assistThroughball" },
                                    {"name": "assistThrowin" },
                                    // "Total"
                                  ]}
                                ]
                      }
                    ]
                  };
   

    var stash = function(d) {
      d.x0 = d.x;
      d.dx0 = d.dx;
    }


  // Interpolate the arcs in data space.


    var partition = d3.layout.partition()
      .sort(null)
      .size([2 * Math.PI, radius * radius])
      .value(function(d) { return 1; });


    var arc = d3.svg.arc()
      .startAngle(function(d) { return d.x; })
      .endAngle(function(d) { return d.x + d.dx; })
      .innerRadius(function(d) { 
        return Math.sqrt(d.y); 
      })
      .outerRadius(function(d) { 
        return Math.sqrt(d.y + d.dy); 
      });

    var path = svg.datum(max_hash).selectAll("path")
          .data(partition.nodes)

     var pathEnter = path.enter().append("path")
          .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
          .attr("d", arc)
          .style("stroke", "#fff")
          .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
          .style("fill-rule", "evenodd")
          .each(stash);
    path.on('click', function(d){
      console.log(d)
    })

    var text = svg.selectAll("text").datum(max_hash).data(partition.nodes);

    var textEnter = text.enter().append("text")
        .style("fill-opacity", 1)
        .style("fill", function(d) {
          return "#eee";
        })
        .attr("text-anchor", function(d) {
          return 'end';
        })
        .attr("dy", ".2em")


    d3.select(self.frameElement).style("height", height + "px");

    textEnter.append("tspan")
        .attr("x", 0)
        .text(function(d) { return d.name});


    $scope.$on("$destroy", function () {
      socket.unsyncUpdates("thing");
    });
  })
  .controller("playersShowCtrl", function(players, player, $scope, $stateParams, $window){
    $scope.player = player;
  });
