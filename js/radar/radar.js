(function(window) {
  'use strict';

  var protovis = window.pv;

  var Radar = function Radar(h, w) {
    this.height = h;
    this.width = w;

    this.radar = new protovis.Panel()
      .width(w)
      .height(h)
      .canvas('radar');
  };

  Radar.prototype.render = function render(data) {
    var radarData = data;
    var h = this.height;
    var w = this.width;

    // legend
    this.radar.add(protovis.Dot)
      .top(10)
      .left(w/2)
      .shape("circle")
      .fillStyle("grey")
      .strokeStyle("grey")
      .size(16)
      .anchor("right")
      .add(protovis.Label)
        .text("unchanged")
        .textStyle("black");
    this.radar.add(protovis.Dot)
      .top(30)
      .left(w/2)
      .shape("triangle")
      .fillStyle("grey")
      .strokeStyle("grey")
      .size(16)
      .angle(45)
      .anchor("right")
      .add(protovis.Label)
        .text("changed since last edition")
        .textStyle("black");


    //quadrant lines -- vertical
    this.radar.add(protovis.Line)
      .data([(h/2-radarData.radar_arcs[radarData.radar_arcs.length-1].r),h-(h/2-radarData.radar_arcs[radarData.radar_arcs.length-1].r)])
      .lineWidth(1)
      .left(w/2)
      .bottom(function(d) {return d;})
      .strokeStyle("#bbb");

    //quadrant lines -- horizontal
    this.radar.add(protovis.Line)
      .data([(w/2-radarData.radar_arcs[radarData.radar_arcs.length-1].r),w-(w/2-radarData.radar_arcs[radarData.radar_arcs.length-1].r)])
      .lineWidth(1)
      .bottom(h/2)
      .left(function(d) {return d;})
      .strokeStyle("#bbb");

    // arcs
    this.radar.add(protovis.Dot)
      .data(radarData.radar_arcs)
      .left(w/2)
      .bottom(h/2)
      .radius(function(d) { return d.r; })
      .strokeStyle("#ccc")
      .anchor("top")
      .add(protovis.Label)
        .textBaseline("top")
        .textMargin(40)
        .text(function(d) { return d.name; })
        .textStyle("#ccc")
        .font("bold 40px sans-serif");

    //Quadrant Ledgends
    var radar_quadrant_ctr=1;
    var quadrantFontSize = 18;
    var headingFontSize = 14;
    var stageHeadingCount = 0;
    var lastRadius = 0;
    var lastQuadrant='';
    var spacer = 16;
    var fontSize = 10;
    var total_index = 1;


    for (var i = 0; i < radarData.radar_data.length; i++) {

      // quadrant title
      if (lastQuadrant != radarData.radar_data[i].quadrant) {
        lastQuadrant = radarData.radar_data[i].quadrant;
        this.radar.add(protovis.Label)
          .left(radarData.radar_data[i].left)
          .top(radarData.radar_data[i].top)
          .text(radarData.radar_data[i].quadrant)
          .strokeStyle(radarData.radar_data[i].color)
          .fillStyle(radarData.radar_data[i].color)
          .font(quadrantFontSize + "px sans-serif");
      }

      // re-order the items by radius, in order to logically group by ring
      var itemsByStage = _.groupBy(radarData.radar_data[i].items, function(item) { return Math.floor(item.pc.r / 100) });
      var offsetIndex = 0;
      var midIndex = -1;

      for (var stageIndex in _(itemsByStage).keys()) {
        if (stageIndex > 0) {
          offsetIndex = offsetIndex + itemsByStage[stageIndex-1].length + 1;
        }
        if ((stageIndex > 1) && (midIndex < 0)) {
          midIndex = offsetIndex;
        }

        var left = radarData.radar_data[i].left;
        var top = radarData.radar_data[i].top + quadrantFontSize + spacer + (stageIndex * headingFontSize) + (offsetIndex * fontSize);
        // if (stageIndex > 1) {
        //   left = left + 130;
        //   top = top - (2 * headingFontSize) - (midIndex * fontSize);
        // }

        // stage label
        this.radar.add(protovis.Label)
          .left(left + headingFontSize)
          .top(top - headingFontSize / 2)
          .text(radarData.radar_arcs[stageIndex].name)
          .strokeStyle("#ccc")
          .fillStyle("#ccc")
          .font(headingFontSize + "px Courier New");

        // legend label
        this.radar.add(protovis.Label)
          .left(left)
          .top(top)
          .strokeStyle(radarData.radar_data[i].color)
          .fillStyle(radarData.radar_data[i].color)
          .add(protovis.Dot)
            .def("i", top)
            .data(itemsByStage[stageIndex])
            .top(function() { return ( this.i() + (this.index * fontSize) );})
            .shape(function(d) {return (d.movement === 't' ? "triangle" : "circle");})
            .cursor(function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })
            .event("click", function(d) { if ( d.url !== undefined ){self.location =  d.url}})
            .size(fontSize)
            .angle(45)
            .anchor("right")
            .add(protovis.Label)
              .text(function(d) {return radar_quadrant_ctr++ + ". " + d.name;} );

        // the blip itself
        var self = this;
        this.radar.add(protovis.Dot)
          .def("active", false)
          .data(itemsByStage[stageIndex])
          .size(function(d) { return (d.blipSize !== undefined ? d.blipSize : 70); })
          .left(function(d) { return self.polarToRaster(d.pc.r, d.pc.t)[0]; })
          .bottom(function(d) { return self.polarToRaster(d.pc.r, d.pc.t)[1]; })
          .title(function(d) { return d.name; })
          .cursor(function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })
          .event("click", function(d) { if ( d.url !== undefined ){self.location =  d.url}})
          .angle(Math.PI)  // 180 degrees in radians
          .strokeStyle(radarData.radar_data[i].color)
          .fillStyle(radarData.radar_data[i].color)
          .shape(function(d) { return (d.movement === 't' ? "triangle" : "circle"); })
          .anchor("center")
            .add(protovis.Label)
            .text(function(d) {return total_index++;})
            .textBaseline("middle")
            .textStyle("white");
        }
      }

      this.radar.anchor('radar');
      this.radar.render();
  };

  Radar.prototype.polarToCartesian = function polarToCartesian(r,t) {
    //radians to degrees, requires the t*pi/180
    var x = r * Math.cos((t*Math.PI/180));
    var y = r * Math.sin((t*Math.PI/180));
    return [x,y];
  };

  Radar.prototype.cartesianToRaster = function cartesianToRaster(x,y) {
    var rx = this.width/2 + x;
    var ry = this.height/2 + y;
    return [rx,ry];
  };

  Radar.prototype.rasterToCartesian = function rasterToCartesian(rx,ry) {
    var x = rx - this.width/2;
    var y = ry - this.height/2;
    return [x,y];
  };

  Radar.prototype.polarToRaster = function polarToRaster(r,t) {
    var xy = this.polarToCartesian(r,t);
    return this.cartesianToRaster(xy[0], xy[1]);
  };

  window.Radar = Radar;
})(window);
