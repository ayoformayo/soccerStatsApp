angular.module('soccerApp')
  .directive('statCanvas', function($window) {
    return {
      restrict: 'E',
      scope: {
        player: '='
      },
      // template: '<div>Here</div>',
      controller: function($scope){

        this.max_hash = { gameStarted: { player: 'Koke', val: 6 },
                        red: { player: 'Koke', val: 0 },
                        aerialWon: { player: 'Robin Knoche', val: 24 },
                        interceptions: { player: 'Robin Knoche', val: 18 },
                        totalShots: { player: 'Nolito', val: 23 },
                        dribbles: { player: 'Fede Cartabia', val: 26 },
                        totalCrosses: { player: 'Koke', val: 49 },
                        accurateThroughBalls: { player: 'Nolito', val: 3 },
                        subOn: { player: 'Neymar', val: 2 },
                        goals: { player: 'Neymar', val: 6 },
                        aerialLost: { player: 'Raul Bobadilla', val: 21 },
                        fouls: { player: 'Nolito', val: 15 },
                        shotsOnTarget: { player: 'Raheem Sterling', val: 9 },
                        wasFouled: { player: 'Fede Cartabia', val: 24 },
                        accurateCrosses: { player: 'Koke', val: 14 },
                        height: { player: 'Robin Knoche', val: 190 },
                        subOff: { player: 'Keisuke Honda', val: 4 },
                        assists: { player: 'Koke', val: 5 },
                        rating: { player: 'dad', val: 11 },
                        offsidesWon: { player: 'Robin Knoche', val: 4 },
                        shotsBlocked: { player: 'Robin Knoche', val: 8 },
                        offsides: { player: 'Nolito', val: 6 },
                        totalLongBalls: { player: 'Miranda', val: 55 },
                        weight: { player: 'Raul Bobadilla', val: 88 },
                        yellow: { player: 'Koke', val: 3 },
                        totalPasses: { player: 'Jordi Alba', val: 387 },
                        manOfTheMatch: { player: 'Paco Alcácer', val: 3 },
                        totalClearances: { player: 'Ermin Bicakcic', val: 33 },
                        ownGoals: { player: 'Koke', val: 0 },
                        dispossesed: { player: 'Franco Vázquez', val: 11 },
                        accurateLongBalls: { player: 'Robin Knoche', val: 38 },
                        ranking: { player: 'Jordi Alba', val: 60 },
                        secondYellow: { player: 'Koke', val: 0 },
                        accuratePasses: { player: 'Jordi Alba', val: 343 },
                        totalTackles: { player: 'Iván Piris', val: 21 },
                        wasDribbled: { player: 'Kevin De Bruyne', val: 10 },
                        keyPasses: { player: 'Kevin De Bruyne', val: 23 },
                        turnovers: { player: 'Raheem Sterling', val: 11 },
                        totalThroughBalls: { player: 'Kevin De Bruyne', val: 4 },
                        age: { player: 'Daniele Gastaldello', val: 31 }
                      }

        this.calculateCoordinates = function(angle, percent){
          var otherAngle = 180 - angle - 90;
          var toRadian = function (angle) {
            return angle * (Math.PI / 180);
          }
          var r = 360 * percent;
          var myAngle = toRadian(angle)
          var y = r * Math.sin(myAngle)
          var x = r * Math.cos(myAngle)
          return { 'x': x, 'y': y}
        };



        this.hasherizePlayer = function(player){
          var attr_array = [];
          for (var key in player) {
              var new_hash = {};
              if( typeof player[key] === 'number' && key != 'id' && key != '_id' && key != '__v' && key != 'teamId' && key != 'playerId' ){

                new_hash['val'] = player[key];
                new_hash['attribute'] = key;
                attr_array.push(new_hash);
              }
            };

          return attr_array;
        };

        this.drawBackgroundCircle = function(context){
          context.beginPath();
          context.arc(360,360,360,0,2*Math.PI);
          context.stroke();
          context.closePath();
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

        this.drawDataPoint = function(context, hash){

          // context.beginPath();
          // context.arc(hash.x, hash.y, 10, 0, 2 * Math.PI);
          // context.fillStyle = 'green';
          // context.fill();
          // context.lineWidth = 5;
          // context.strokeStyle = '#003300';
          // context.stroke();
          // context.closePath();
        };

        this.drawDataline = function(context, hash){
          // context.beginPath();
          // context.lineWidth = 1;
          // context.strokeStyle = '#003300';
          // context.moveTo(360, 360);
          // context.lineTo(hash.x, hash.y);
          // context.stroke();
          // context.closePath();
        };

        this.drawConnectors = function(context, hash){
          context.beginPath();
          context.lineWidth = 1;
          context.strokeStyle = '#003300';
          context.moveTo(hash.old_x, hash.old_y);
          context.lineTo(hash.x, hash.y);
          context.stroke();
          context.closePath();
        };

        this.drawCanvas = function(context, attrs){

          this.drawBackgroundCircle(context)
          var dataCircles = $('data-circle');
          var that = this;
          var lastCoord = {};
          var firstCoord = {};
          var circleCount = dataCircles.length - 1;
          angular.forEach(dataCircles, function(circle, i ){
            var x = $(circle).attr('x');
            var y = $(circle).attr('y');
            var old_x = lastCoord.x
            var old_y = lastCoord.y


            that.drawDataPoint(context, {x: x, y: y})
            that.drawDataline(context, {x: x, y: y})
            if(i !== 0){
              that.drawConnectors(context, {x: x, old_x: old_x, old_y: old_y, y: y})
            }
            if( i === 0) {
              firstCoord = {x: x, y: y}
            }
            if(i === circleCount){

              that.drawConnectors(context, {x: x, y: y, old_x: firstCoord.x, old_y: firstCoord.y})
            }


            lastCoord = {x: x, y: y}

          })
        }

        this.setCircleAttrs = function(circleEnter, hash){
          var that = this;
          circleEnter.attr(hash.y, function( d, i ){
            var coord = that.getAngle(d,i, hash.radianAngle)
            return coord.y + 360;
          });

          circleEnter.attr(hash.x, function(d, i) {
            var coord = that.getAngle(d,i, hash.radianAngle)
            return coord.x + 360;
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
          lineEnter.attr('y2', 360)
          lineEnter.attr('x2', 360)
          lineEnter.attr('stroke', 'blue')
          lineEnter.attr('stroke-width', 1)
          lineEnter.attr('y1', function( d, i ){
            var coord = that.getAngle(d,i, hash.radianAngle)
            return coord.y + 360;
          });

          lineEnter.attr('x1', function(d, i) {
            var coord = that.getAngle(d,i, hash.radianAngle)
            return coord.x + 360;
          });
        };


        this.drawCanvasStyle = function(attrs){
          var d3 = $window.d3;
          var base = d3.select('stat-canvas');
          var that = this;

          var canvas = base.append('canvas')
            .attr('width', 720)
            .attr('height', 720);

          var context = canvas.node().getContext('2d');

          var attr_array = this.hasherizePlayer($scope.player)

          var totalEntries = attr_array.length
          var radianAngle = 360 / totalEntries;

          var circle = canvas.selectAll('.dataCircle').data(attr_array);

          var circleEnter = circle.enter().append('data-circle');

          this.setCircleAttrs(circleEnter, {x: 'x', y: 'y', radianAngle: radianAngle});

          this.drawCanvas(context, attrs);

        };

        this.drawSvgStyle = function(attrs){
          var d3 = $window.d3;
          var base = d3.select('stat-canvas');
          var that = this;
          var svg = base.append('svg')
            .attr('width', 720)
            .attr('height', 720);
          var grouping = svg.append('g').attr('id', 'nodes');
          var attr_array = this.hasherizePlayer($scope.player);
          var circle = grouping.selectAll('circle.node').data(attr_array);


          var totalEntries = attr_array.length;
          var radianAngle = 360 / totalEntries;
          var groupEnter = circle.enter().append('g');
          var circleEnter = groupEnter.append('circle').attr('class', 'node');
          var lineEnter = groupEnter.append('line');

          circleEnter.append("circle:title")
            .text(function(d) { return d.attribute; });
          var tooltip = d3.select("body")
              .append("div")
              .style("position", "absolute")
              .style("z-index", "10")
              // .style("visibility", "hidden")
              .text("a simple tooltip");

          // circle.on("mouseover", function(){return tooltip.style("visibility", "visible");})
          circle.on("mousemove", function(){return tooltip.style("top",
                  (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
          // circle.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

          circle.on('mouseover', function( d, i ){
            // var content = '<p class="main">' + d.attribute + '</span></p>'
            // content += '<hr class="tooltip-hr">'
            // content += '<p class="main">' + d.val + '</span></p>'
            // var event = d3.event

            // var x = event.x
            // var y = event.y
            // var xPositive = (x - 360) > 0
            // var yPositive = (y - 360) > 0
            // var tooltip = Tooltip("vis-tooltip", 230)
            // console.log(tooltip)


            // console.log(xNegative)
            // console.log(yNegative)
                    // var d3_this = d3.select(this);
            // d3_this.style('background-color', 'black')
            // var _this = $(d3.select(this)[0])

            // var hoverCircle = $(_this.children('circle')[0])
            // console.log(hoverCircle)
          });

          this.setCircleAttrs(circleEnter, {x: 'cx', y: 'cy', radianAngle: radianAngle});
          this.setLineAttrs(lineEnter, {radianAngle: radianAngle});
          // this.setTextAtts(textEnter, {radianAngle: radianAngle});

          circleEnter.attr('r', function(d, i) {
            return 5;
          });

          circleEnter.style('fill', function(d, i){
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          })

        }
      },

      link: function(scope, elem, attrs, ctrl){

        ctrl.drawCanvasStyle(attrs);
        ctrl.drawSvgStyle(attrs)

      }
    };
  });
