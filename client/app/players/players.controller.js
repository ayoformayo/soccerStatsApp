"use strict";
angular.module("soccerApp")
  .controller("playersIndexCtrl", function ($scope, $http, socket, players, playersPromise, $window) {
    var ctrl = this;
    var d3 = $window.d3;
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

    var max_hash = $scope.max_hash = [
                    {"name": "Defensive", "displayValue": "Defensive",
                      "children": [
                      {"name": "tackles", "displayValue": "Tackles",
                       "children": [
                        {"name": "tackleTotalAttempted", "displayValue": "Total" },
                        {"name": "tackleWonTotal", "displayValue": "Total Won" },
                        {"name": "DribbledPast", "displayValue": "Dribbled Past" }
                        ]
                      },
                      {"name": "interceptions", "displayValue": "Interceptions",
                       "children": [
                        {"name": "interceptionAll", "displayValue": "All" },
                        ]
                      },
                      { "name": "fouls", "displayValue": "Fouls",
                      "children": [
                       {"name": "foulCommitted", "displayValue": "Committed" },
                       {"name": "foulGiven", "displayValue": "Given" },
                       ]
                      },
                      {"name": "cards", "displayValue": "Cards",
                       "children": [
                        {"name": "redCard", "displayValue": "Red" },
                        {"name": "yellowCard", "displayValue": "Yellow" }
                        ]
                      },
                       { "name": "offsides", "displayValue": "Offside",
                        "children": [
                         {"name": "offsideGiven", "displayValue": "Offside" },
                         ]
                       },
                       { "name": "clearances", "displayValue": "clearances",
                        "children": [
                         {"name": "clearanceTotal", "displayValue": "Total Clearances" },
                        ]
                      },
                      { "name": "blocks", "displayValue": "blocks",
                       "children": [
                        {"name": "ShotsBlocked", "displayValue": "Shots" },
                        {"name": "outfielderBlockedPass", "displayValue": "Pass" },
                        {"name": "passCrossBlockedDefensive", "displayValue": "Cross" }
                        ]
                      },
                      {"name": "saves", "displayValue": "saves",
                       "children": [
                        {"name": "saveObox", "displayValue": "Obox" },
                        {"name": "savePenaltyArea", "displayValue": "PenaltyArea" },
                        {"name": "saveSixYardBox", "displayValue": "SixYardBox" },
                        // "Total"
                        ]
                      },
                    ]},
                    {"name": "Offensive", "displayValue": "Offensive",
                     "children": [
                      {"name": "shots", "displayValue": "Shots",
                       "children": [
                        {"name": "zones", "displayValue": "Zones",
                         "children": [
                          {"name": "shotsTotal", "displayValue": "Total" },
                          {"name": "shotOboxTotal", "displayValue": "Out of the Box" },
                          {"name": "shotSixYardBox", "displayValue": "Six Yard Box" },
                          {"name": "shotPenaltyArea", "displayValue": "Penalty Area" }
                        ]},
                        {"name": "situations", "displayValue": "Situations",
                         "children": [
                          {"name": "shotsTotal", "displayValue": "Total" },
                          {"name": "shotOpenPlay", "displayValue": "Open Play" },
                          {"name": "shotCounter", "displayValue": "Counter Attack" },
                          {"name": "shotSetPiece", "displayValue": "Set Piece" },
                          {"name": "penaltyTaken", "displayValue": "Penalty" }
                        ]},
                        {"name": "accuracy", "displayValue": "Accuracy",
                         "children": [
                          // "Total",
                          {"name": "shotOffTarget", "displayValue": "Off Target" },
                          {"name": "shotOnPost", "displayValue": "On Post" },
                          {"name": "shotOnTarget", "displayValue": "On Target" },
                          {"name": "shotBlocked", "displayValue": "Blocked" },
                        ]},
                        {"name": "body parts", "displayValue": "Body Parts",
                         "children": [
                          {"name": "shotHead", "displayValue": "Header" },
                          {"name": "shotLeftFoot", "displayValue": "Left Foot" },
                          {"name": "shotRightFoot", "displayValue": "Right Foot" },
                          {"name": "shotsTotal", "displayValue": "Total" },
                          // "Other"
                        ]}
                      ]},
                      {"name": "goals", "displayValue": "Goals",
                       "children": [
                        {"name": "zones", "displayValue": "Zones",
                         "children": [
                          {"name": "goalSixYardBox", "displayValue": "Six Yard Box" },
                          {"name": "goalTotal", "displayValue": "Total" },
                          {"name": "goalPenaltyArea", "displayValue": "Penalty Area" },
                          {"name": "goalObox", "displayValue": "Out of Box" },
                        ]},
                        {"name": "situations", "displayValue": "Situations",
                         "children": [
                          {"name": "goalOpenPlay", "displayValue": "Open Play" },
                          {"name": "goalCounter", "displayValue": "Counter" },
                          {"name": "goalSetPiece", "displayValue": "Set Piece" },
                          {"name": "goalOwn", "displayValue": "OwnGoal" },
                          {"name": "goalNormal", "displayValue": "Normal" },
                          {"name": "penaltyScored", "displayValue": "Penalty" }
                        ]},
                        {"name": "bodyParts", "displayValue": "Body Parts",
                         "children": [
                          {"name": "goalHead", "displayValue": "Head" },
                          {"name": "goalLeftFoot", "displayValue": "Left Foot" },
                          {"name": "goalRightFoot", "displayValue": "Right Foot" },
                          {"name": "goalTotal", "displayValue": "Total" },
                          // "Other"
                        ]}
                      ]},
                      {"name": "dribbles", "displayValue": "Dribbles",
                       "children": [
                        {"name": "dribbleLost", "displayValue": "Lost" },
                        {"name": "dribbleWon", "displayValue": "Won" },
                        // "DribbleTotal"
                      ]},
                      {"name": "possession-loss", "displayValue": "Possession Loss",
                       "children": [
                        {"name": "turnover", "displayValue": "turnover" },
                        {"name": "dispossessed", "displayValue": "dispossessed" }
                      ]},
                      {"name": "aerial", "displayValue": "Aerial",
                       "children": [
                        {"name":"duelAerialLost", "displayValue": "Lost" },
                        {"name": "duelAerialWon", "displayValue": "Won" },
                        // "Total"
                      ]},
                    ]},
                    {"name": "Passing", "displayValue": "Passing",
                     "children": [
                                  {"name": "passes", "displayValue": "Passes",
                                   "children": [
                                    {"name": "length", "displayValue": "Length",
                                     "children": [
                                        // "Total",
                                        {"name": "passLongBallAccurate", "displayValue": "AccurateLongBall" },
                                        {"name": "passLongBallInaccurate", "displayValue": "InaccurateLongBall" },
                                        {"name": "shortPassAccurate", "displayValue": "AccurateShortPass" },
                                        {"name": "shortPassInaccurate", "displayValue": "InccurateShortPass" }
                                      ]},
                                    { "name": "type", "displayValue": "type",
                                     "children": [
                                      {"name": "passCornerAccurate", "displayValue": "CornerAccurate" },
                                      {"name": "passCornerInaccurate", "displayValue": "CornerInaccurate" },
                                      {"name": "passCrossAccurate", "displayValue": "CrossAccurate" },
                                      {"name": "passCrossInaccurate", "displayValue": "CrossInaccurate" },
                                      {"name": "passFreekickAccurate", "displayValue": "FreekickAccurate" },
                                      {"name": "passFreekickInaccurate", "displayValue": "FreekickInaccurate" }
                                    ]}
                                  ]},
                                  {"name": "key-passes", "displayValue": "Key Passes",
                                   "children": [
                                    {"name": "length", "displayValue": "Length",
                                     "children": [
                                      {"name": "keyPassLong", "displayValue": "Long" },
                                      {"name": "keyPassShort", "displayValue": "Short" },
                                      // "Total"
                                    ]},
                                    {"name": "type", "displayValue": "Type",
                                     "children": [
                                      {"name": "keyPassCorner", "displayValue": "Cornder" },
                                      {"name": "keyPassCross", "displayValue": "Cross" },
                                      {"name": "keyPassOther", "displayValue": "Other" },
                                      {"name": "keyPassFreekick", "displayValue": "Freekick" },
                                      {"name": "keyPassThroughball", "displayValue": "Throughball" },
                                      {"name": "keyPassThrowin", "displayValue": "Throwin" }
                                    ]}
                                  ]},
                                  {"name": "assists", "displayValue": "Assists",
                                   "children": [
                                    {"name": "assistCorner", "displayValue": "Corner" },
                                    {"name": "assistCross", "displayValue": "Cross" },
                                    {"name": "assistFreekick", "displayValue": "Freekick" },
                                    {"name": "assistOther", "displayValue": "Other" },
                                    {"name": "assistThroughball", "displayValue": "Throughball" },
                                    {"name": "assistThrowin", "displayValue": "Throwin" },
                                    // "Total"
                                  ]}
                                ]
                      }
                    ];
   

    var stash = function(d) {
      d.x0 = d.x;
      d.dx0 = d.dx;
    }


  var width = 600,
      height = width,
      radius = width / 2,
      x = d3.scale.linear().range([0, 2 * Math.PI]),
      y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
      padding = 5,
      duration = 1000;

  var div = d3.select(".svg-container");

  div.select("img").remove();

  var vis = div.append("svg")
      .attr("width", width + padding * 2)
      .attr("height", height + padding * 2)
    .append("g")
      .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");

  div.append("p")
      .attr("id", "intro")
      .text("Click to zoom!")
      .on('click', zoomOut) 

  var partition = d3.layout.partition()
      .sort(null)
      .value(function(d) { return 5.8 - d.depth; });


  var arc = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
      .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    var nodes = partition.nodes({children: max_hash});

    var path = vis.selectAll("path").data(nodes);
    path.enter().append("path")
        .attr("id", function(d, i) { return "path-" + i; })
        .attr("d", arc)
        // .attr("fill-rule", "evenodd")
        // .style("fill", colour)
        .on("click", click);

    var text = vis.selectAll("text").data(nodes);
    var textEnter = text.enter().append("text")
        .style("fill-opacity", 1)
        .style("fill", function(d) {
          return brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
        })
        .attr("text-anchor", function(d) {
          return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        })
        .attr("dy", ".2em")
        .attr("transform", function(d) {
          var multiline = (d.displayValue || "").split(" ").length > 1,
              angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
              rotate = angle + (multiline ? -.5 : 0);
          return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        })
        .on("click", click);

    textEnter.append("tspan")
        .attr("x", 0)
        .text(function(d) { 
          return d.depth ? d.displayValue.split(" ")[0] : ""; });
    textEnter.append("tspan")
        .attr("x", 0)
        .attr("dy", "1em")
        .text(function(d) { return d.depth ? d.displayValue.split(" ")[1] || "" : ""; });

  function click(d) {
    var hasClass = d3.event.target.classList.contains('active-path');
    path.each(function(e, i){
      var that = d3.select(this);
      if(isParentOf(d, e)){
        that.classed({'active-path': !hasClass}); 
      }
    });
  };


  function zoomOut(){
    // var hasClass = d3.event.target.classList.contains('active-path');
    var mapped = path.filter(function(e, i){
      return e.children === undefined;
    });
    mapped.each(function(e, i){
      console.log(e)
    })
  };

  function isParentOf(p, c) {
    if (p === c) return true;
    if (p.children) {
      return p.children.some(function(d) {
        return isParentOf(d, c);
      });
    }
    return false;
  }

  function colour(d) {
    if (d.children) {
      // There is a maximum of two children!
      var colours = d.children.map(colour),
          a = d3.hsl(colours[0]),
          b = d3.hsl(colours[1]);
      // L*a*b* might be better here...
      return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
    }
    return d.colour || "#fff";
  }

  // Interpolate the scales!
  function arcTween(d) {
    var my = maxY(d),
        xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, my]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
    return function(d) {
      return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
    };
  }

  function maxY(d) {
    return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
  }

  // http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
  function brightness(rgb) {
    return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
  }

    $scope.$on("$destroy", function () {
      socket.unsyncUpdates("thing");
    });
  })
  .controller("playersShowCtrl", function(players, player, $scope, $stateParams, $window){
    $scope.player = player;
  });
