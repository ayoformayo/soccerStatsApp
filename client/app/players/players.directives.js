angular.module('soccerApp')
  .directive('statCanvas', function($window, players) {
    return {
      restrict: 'E',
      scope: {
        player: '='
      },
      controller: function($scope){

        this.max_hash = { age: { name: 'Faryd Mondragón', val: 43 },
          minsPlayed: { name: 'Sergio Romero', val: 720 },
          interceptionAll: { name: 'Stefan de Vrij', val: 25 },
          dribbleLost: { name: 'Lionel Messi', val: 27 },
          shotOffTarget: { name: 'Lionel Messi', val: 12 },
          shotSixYardBox: { name: 'Ezequiel Garay', val: 4 },
          shotSetPiece: { name: 'Vasilis Torosidis', val: 3 },
          goalSixYardBox: { name: 'Enner Valencia', val: 3 },
          goalOpenPlay: { name: 'James Rodríguez', val: 4 },
          goalRightFoot: { name: 'Thomas Müller', val: 4 },
          turnover: { name: 'Arjen Robben', val: 24 },
          duelAerialWon: { name: 'Marouane Fellaini', val: 23 },
          shortPassInaccurate: { name: 'Dirk Kuyt', val: 59 },
          height: { name: 'Thibaut Courtois', val: 199 },
          rating: { name: 'Lionel Messi', val: 8.521428571428572 },
          foulGiven: { name: 'Arjen Robben', val: 28 },
          dribbleWon: { name: 'Lionel Messi', val: 46 },
          shotOnPost: { name: 'Wesley Sneijder', val: 2 },
          shotPenaltyArea: { name: 'Karim Benzema', val: 19 },
          penaltyTaken: { name: 'Karim Benzema', val: 2 },
          goalPenaltyArea: { name: 'Robin van Persie', val: 4 },
          goalCounter: { name: 'Arjen Robben', val: 2 },
          goalLeftFoot: { name: 'James Rodríguez', val: 4 },
          dispossessed: { name: 'Alexis Sánchez', val: 29 },
          duelAerialLost: { name: 'Islam Slimani', val: 22 },
          weight: { name: 'Daniel van Buyten', val: 96 },
          tackleWonTotal: { name: 'Javier Mascherano', val: 30 },
          foulCommitted: { name: 'Marouane Fellaini', val: 19 },
          outfielderBlock: { name: 'Thiago Silva', val: 9 },
          shotOnTarget: { name: 'Karim Benzema', val: 15 },
          shotOboxTotal: { name: 'Lionel Messi', val: 16 },
          shotRightFoot: { name: 'Karim Benzema', val: 18 },
          goalObox: { name: 'Lionel Messi', val: 3 },
          goalSetPiece: { name: 'Enner Valencia', val: 2 },
          goalHead: { name: 'Enner Valencia', val: 2 },
          saveSixYardBox: { name: 'Noel Valladares', val: 2 },
          passLongBallAccurate: { name: 'Javier Mascherano', val: 74 },
          passCrossInaccurate: { name: 'Toni Kroos', val: 33 },
          keyPassLong: { name: 'Ángel Di María', val: 9 },
          apps: { name: 'Ramires', val: 7 },
          tackleTotalAttempted: { name: 'Oscar', val: 40 },
          offsideGiven: { name: 'Robin van Persie', val: 12 },
          passCrossBlockedDefensive: { name: 'Jan Vertonghen', val: 9 },
          shotsTotal: { name: 'Karim Benzema', val: 31 },
          shotOpenPlay: { name: 'Karim Benzema', val: 24 },
          shotLeftFoot: { name: 'Ángel Di María', val: 24 },
          goalTotal: { name: 'James Rodríguez', val: 6 },
          penaltyScored: { name: 'Mile Jedinak', val: 1 },
          yellowCard: { name: 'Thiago Silva', val: 3 },
          savePenaltyArea: { name: 'Tim Howard', val: 15 },
          passLongBallInaccurate: { name: 'Jasper Cillessen', val: 90 },
          passCornerAccurate: { name: 'Mathieu Valbuena', val: 14 },
          keyPassShort: { name: 'Lionel Messi', val: 18 },
          subOn: { name: 'Serey Die', val: 0 },
          challengeLost: { name: 'Ogenyi Onazi', val: 21 },
          clearanceTotal: { name: 'Ezequiel Garay', val: 71 },
          outfielderBlockedPass: { name: 'Cheick Tioté', val: 10 },
          shotBlocked: { name: 'Ángel Di María', val: 12 },
          shotCounter: { name: 'Arjen Robben', val: 4 },
          shotHead: { name: 'Asamoah Gyan', val: 7 },
          goalOwn: { name: 'Noel Valladares', val: 1 },
          goalNormal: { name: 'James Rodríguez', val: 5 },
          redCard: { name: 'Konstantinos Katsouranis', val: 1 },
          saveObox: { name: 'Tim Howard', val: 12 },
          shortPassAccurate: { name: 'Philipp Lahm', val: 502 },
          passCornerInaccurate: { name: 'Toni Kroos', val: 20 },
          keyPassCross: { name: 'Toni Kroos', val: 10 },
          passFreekickAccurate: { name: 'Keylor Navas', val: 27 },
          keyPassCorner: { name: 'Toni Kroos', val: 7 },
          assistCross: { name: 'Toni Kroos', val: 3 },
          passCrossAccurate: { name: 'Ángel Di María', val: 14 },
          passFreekickInaccurate: { name: 'Keylor Navas', val: 32 },
          keyPassThroughball: { name: 'Lionel Messi', val: 4 },
          keyPassFreekick: { name: 'Christian Bolaños', val: 5 },
          assistThroughball: { name: 'Daley Blind', val: 2 },
          keyPassThrowin: { name: 'Ben Halloran', val: 1 },
          keyPassOther: { name: 'Thomas Müller', val: 14 },
          assistFreekick: { name: 'Walter Ayoví', val: 2 },
          assistOther: { name: 'Juan Guillermo Cuadrado', val: 3 },
          assistThrowin: { name: 'Serey Die', val: 0 },
          assistCorner: { name: 'Toni Kroos', val: 2 } }

        this.hasherizePlayer = function(player){
          var attr_array = [];
          var that = this;
          for (var key in player) {
              var new_hash = {};
              if(that.max_hash[key] !== undefined){
                var maxVal = that.max_hash[key].val;
                var percent;
                if(maxVal === 0){
                  percent = 0;
                }else{
                  percent = (player[key] / maxVal)
                }

                new_hash['value'] = percent;
                new_hash['axis'] = key;
                attr_array.push(new_hash);
              }
            };

          return attr_array;
        };

        this.drawSvgStyle = function(attrs){
          var d3 = $window.d3;
          var base = d3.select('stat-canvas');
          var that = this;

          var chart = RadarChart.chart();
          var attr_array = this.hasherizePlayer($scope.player);

          var data = [
                      {
                        className: 'player',
                        axes: attr_array
                      }
                    ];

          var radarDiv = base.append('div').attr('class', 'radarSvg');
          RadarChart.draw('.radarSvg', data);
          var svg = base.append('svg').attr('class', 'attrSvg');

            svg.attr('width', 500);
            svg.attr('height', 1000);

          var attrGroup = svg.append('g').attr('id', 'dataAttrs');
          var attrData = attrGroup.selectAll('g').data(attr_array);
          var attrGroupEnter = attrData.enter().append('g');
          var attrText = attrGroupEnter.append('text');
          // attrText.text(function(d, i){return d.axis});
          // attrText.attr('x', 100);
          // attrText.attr('y', function(d, i){return i * 10 + 20});

          var activeAttrs = [];
          attrGroupEnter.on('click', function(d, i){
            var _this = d3.select(this);
            var thisText = _this.selectAll('text');
            thisText.style('fill', 'red');
            activeAttrs.push(d);
            data[0].axes = activeAttrs;
            RadarChart.draw('.radarSvg', data);
          });
        }
      },

      link: function(scope, elem, attrs, ctrl){
        console.log(scope.player)
        ctrl.drawSvgStyle(attrs)

      }
    };
  }).directive('toggleButton', function(){
    return {
      restrict: "AE",
      link: function(scope, elem, attrs){
        scope.active = false;
        elem.on('click', function(){
          if(elem.hasClass('active')){
            elem.removeClass('active');
          }else{
            elem.addClass('active');
          }
        });
      }
    }
  });
