angular.module('soccerApp')
  .directive('statCanvas', function($window) {
    return {
      restrict: 'E',
      scope: {
        player: '='
      },
      // template: '<div>Here</div>',
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

        this.calculateCoordinates = function(angle, percent){
          var r = 360 * percent;
          var myAngle = this.toRadian(angle)
          var y = r * Math.sin(myAngle)
          var x = r * Math.cos(myAngle)
          return { 'x': x, 'y': y}
        };

        this.toRadian = function (radianAngle) {
          return radianAngle * (Math.PI / 180);
        }



        this.hasherizePlayer = function(player){
          var attr_array = [];
          var that = this;
          for (var key in player) {
              var new_hash = {};
              if(that.max_hash[key] !== undefined){

                new_hash['val'] = player[key];
                new_hash['attribute'] = key;
                attr_array.push(new_hash);
              }
            };

          return attr_array;
        };

        this.getAngle = function(d, i, radianAngle) {
          var val = d.val
          var playerAttr = d.attribute;
          var maxVal = this.max_hash[playerAttr].val;
          if(val === 0 || maxVal === 0){ return {x: 0, y: 0};}
          var percent = (val / maxVal)

          var myAngle = radianAngle * i;
          var coord = this.calculateCoordinates(myAngle, percent);
          return coord;
        }

        this.setCircleAttrs = function(circleEnter, hash){
          var that = this;
          circleEnter.attr(hash.y, function( d, i ){
            var coord = that.getAngle(d,i, hash.radianAngle)
            return coord.y + 500;
          });

          circleEnter.attr(hash.x, function(d, i) {
            var coord = that.getAngle(d,i, hash.radianAngle)
            return coord.x + 500;
          });

          circleEnter.attr('data-stat-value', function( d, i ){
            return d.val;
          });

          circleEnter.attr('data-stat-attribute', function(d, i){
            return d.attribute;
          });
        };

        this.setLineAttrs = function(lineEnter, hash){
          var that = this;
          lineEnter.attr('y2', 500)
          lineEnter.attr('x2', 500)
          lineEnter.attr('stroke', 'blue')
          lineEnter.attr('stroke-width', 1)
          lineEnter.attr('y1', function( d, i ){
            var coord = that.getAngle(d,i, hash.radianAngle)
            return coord.y + 500;
          });

          lineEnter.attr('x1', function(d, i) {
            var coord = that.getAngle(d,i, hash.radianAngle)
            return coord.x + 500;
          });
        };

        this.setCircleEnter = function(circleEnter){
            circleEnter.append("circle:title")
            .text(function(d) { return d.attribute; });

          circleEnter.attr({'stroke':'black', 'stroke-width': 1, 'r': 5});

          circleEnter.style('fill', function(d, i){
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          });
        };

        this.drawLine = function(path){
         var d3 = $window.d3;
          var svg = d3.select('svg');
          var new_line = svg.append('line');
           // .attr({'x1': path.x1, 'x2': path.x2, 'y1': path.y1, 'y2': path.y2})
          new_line.attr('y1', path.y1)
          new_line.attr('x1', path.x1)
          new_line.attr('y2', path.y2)
          new_line.attr('x2', path.x2)
          new_line.attr('stroke', 'blue')
          new_line.attr('stroke-width', 1)
        }

        this.drawPolygon = function(){
          var circleCollect = d3.selectAll('circle.node')[0];
          var coords_array = [];
          _.each(circleCollect, function(circle){
            var hash = {};
            hash['cx'] = d3.select(circle).attr('cx')
            hash['cy'] = d3.select(circle).attr('cy')
            coords_array.push(hash)
          });

          var first_coord = {}
          var that = this;

          d3.selectAll('circle.node').style('visibility', 'hidden')

          for( i = 0; i < coords_array.length; i++){
            if(i === coords_array.length -1){
              var path = {
                'x1': coords_array[i].cx,
                'y1': coords_array[i].cy,
                'x2': first_coord.cx,
                'y2': first_coord.cy,
              }
              return this.drawLine(path)
            }

            if(i === 0){ first_coord = coords_array[i] };
            var path = {
              'x1': coords_array[i].cx,
              'y1': coords_array[i].cy,
              'x2': coords_array[i+1].cx,
              'y2': coords_array[i+1].cy,
            }

            this.drawLine(path)
          }
        };
          // var otherAngle = 180 - radianAngle - 90;

        this.writeTicks = function(groupEnter, radianAngle){
          var that = this;

          groupEnter.append('text').attr('x', function(d,i){
            var myAngle = radianAngle * i;
            var startText = that.calculateCoordinates(myAngle, 1.03)
            // var endText = that.calculateCoordinates(myAngle, 1.02)
            // calculateCoordinates(myAngle, 1.01)
            return startText.x + 500;
          }).attr('y', function(d, i){
            var myAngle = radianAngle * i;
            var startText = that.calculateCoordinates(myAngle, 1.03)
            return startText.y + 500;
          }).text(function(d, i){
            return d.attribute + ': ' + d.val;
          })

        };

        this.drawSvgStyle = function(attrs){
          var d3 = $window.d3;
          var base = d3.select('stat-canvas');
          var that = this;
          var svg = base.append('svg')
            .attr('width', 1000)
            .attr('height', 1000);

          // var backgroundCircle = svg.append('circle').attr({'cx': 500, 'cy': 500, 'r': 360, 'stroke':'black', 'stroke-width': 1, 'fill': 'white'})
          // var attr_array = this.hasherizePlayer($scope.player);
          // var grouping = svg.append('g').attr('id', 'nodes');
          // var totalEntries = attr_array.length;
          // var radianAngle = 360 / totalEntries;
          // var tooltipPresent = $('.tooltipDiv').length > 0;
          // if(!tooltipPresent){
          //   d3.select('.playerContainer').append('div')
          //     .attr('class', 'tooltipDiv');
          // }
          // var tooltip = d3.select(".tooltipDiv")
          //     .style("position", "absolute")
          //     .style("z-index", "10")
          //     .style("visibility", "hidden")
          //     .text("a simple tooltip");



          // var group = grouping.selectAll('g').data(attr_array);
          // var groupEnter = group.enter().append('g');
          // var lineEnter = groupEnter.append('line');
          // var textEnter = groupEnter.append('text');
          // var circleEnter = groupEnter.append('circle').attr('class', 'node');
          // lineEnter.attr('x1', function(d, i){
          //   return 0;
          // });

          // lineEnter.attr('y1', function(d, i){
          //   return 0;
          // });

          // lineEnter.attr('x2', function(d, i){
          //   var val = d.val
          //   var playerAttr = d.attribute;
          //   var maxVal = that.max_hash[playerAttr].val;
          //   var percent;
          //   if( maxVal === 0){
          //     percent = 0
          //   }else{
          //     percent = (val / maxVal)
          //   }
          //   return percent * 360;
          // });

          // lineEnter.attr('y2', function(d, i){
          //   return 0;
          // });

          // lineEnter.attr('stroke-width', 1);
          // lineEnter.attr('stroke', 'blue');
          // circleEnter.attr('r', 5);


          // groupEnter.attr("transform", function(d, i){
          //   var transformAngle;
          //   if(i === 0){
          //     transformAngle = 0;
          //   }else{
          //     transformAngle = radianAngle * i;
          //   }
          //   return 'translate(500,500)rotate(' + transformAngle + ')'
          // });

          // circleEnter.attr('cy', 0);
          // var that = this;

          // circleEnter.attr('cx', function(d, i){
          //   var val = d.val
          //   var playerAttr = d.attribute;
          //   var maxVal = that.max_hash[playerAttr].val;
          //   var percent;
          //   if( maxVal === 0){
          //     percent = 0
          //   }else{
          //     percent = (val / maxVal)
          //   }
          //   return percent * 360;
          // });

          // textEnter.attr('x', function(d, i){
          //   return 370;
          // })

          // textEnter.attr('y', function(d, i){
          //   return 0;
          // });

          // textEnter.text(function(d, i){
          //   return d.attribute + ' - ' + d.val;
          // });



          // group.on('mousemove', function(d, i){
          //    var _this = d3.select(this);
          //   var line = _this.select('line');
          //   var thisCircle = _this.select('circle');
          //   var thisText= _this.select('text');
          //   thisText.style('font-weight', 'bold');
          //   thisCircle.attr('r', 10);
          //   thisCircle.attr('stroke-width', 3)
          //   line.attr('stroke-width', 3)
          //   tooltip.text(d.attribute + ' - ' + d.val)
          //   content = '<p class="main">' + d.attribute + '</span></p>'
          //   content += '<hr class="tooltip-hr">'
          //   content += '<p class="main">' + d.val + '</span></p>'
          //   tooltip.html(content)
          //   tooltip.style("visibility", "visible")
          //   return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
          // });

          // group.on('mouseout', function(d, i){
          //   var _this = d3.select(this);
          //   var line = _this.select('line');
          //   var thisText= _this.select('text');
          //   thisText.style('font-weight', 'normal');
          //   var thisCircle = _this.select('circle')
          //   line.attr('stroke-width', 1)
          //   thisCircle.attr({'stroke-width': 1, 'r': 5})
          //   return tooltip.style("visibility", "hidden");
          // });

          // var circles = d3.selectAll('circle.node');




          // var circle = grouping.selectAll('circle.node').data(attr_array);


          // // groupEnter.attr("transform", "translate(500,500)rotate(50)")
          // var groupEnter = circle.enter().append('g');
          // var lineEnter = groupEnter.append('line');
          // var circleEnter = groupEnter.append('circle').attr('class', 'node');
          // this.setCircleEnter(circleEnter);

          // // circleEnter.append("circle:title")
          // //   .text(function(d) { return d.attribute; });

          // // default values


          // circle.on("mousemove", function(d, i){
          //   var _this = d3.select(this);
          //   var line = _this.select('line');
          //   var thisCircle = _this.select('circle')
          //   thisCircle.attr('r', 10)
          //   thisCircle.attr('stroke-width', 3)
          //   line.attr('stroke-width', 3)
          //   tooltip.text(d.attribute + ' - ' + d.val)
          //   content = '<p class="main">' + d.attribute + '</span></p>'
          //   content += '<hr class="tooltip-hr">'
          //   content += '<p class="main">' + d.val + '</span></p>'
          //   tooltip.html(content)
          //   tooltip.style("visibility", "visible")
          //   return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
          // })

          // circle.on('mouseout', function(d, i){
          //   var _this = d3.select(this);
          //   var line = _this.select('line');
          //   var thisCircle = _this.select('circle')
          //   line.attr('stroke-width', 1)
          //   thisCircle.attr({'stroke-width': 1, 'r': 5})
          //   return tooltip.style("visibility", "hidden");
          // })

          // this.setCircleAttrs(circleEnter, {x: 'cx', y: 'cy', radianAngle: radianAngle});
          // // this.setLineAttrs(lineEnter, {radianAngle: radianAngle});

          // this.drawPolygon();
          // this.writeTicks(groupEnter, radianAngle);

        }
      },

      link: function(scope, elem, attrs, ctrl){

        // ctrl.drawCanvasStyle(attrs);
        ctrl.drawSvgStyle(attrs)

      }
    };
  });
