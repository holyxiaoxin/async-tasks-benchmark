Chart.defaults.global.responsive = true;
Chart.defaults.global.animationEasing = "easeOutQuart";
Chart.defaults.global.dynamicDisplay = true;
Chart.defaults.global.animationSteps = 120;
Chart.types.Line.extend({
  name: "LineAlt",
  initialize: function() {
    this.chart.height -= 30;
    Chart.types.Line.prototype.initialize.apply(this, arguments);

    var ctx = this.chart.ctx;
    ctx.save();
    // text alignment and color
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = this.options.scaleFontColor;
    // position
    var x = this.chart.width / 2;
    var y = this.chart.height + 15 + 5;
    // change origin
    ctx.translate(x, y)
    ctx.fillText("Number of HTTP requests", 0, 0);
    ctx.restore();
  },
  draw: function () {
    Chart.types.Line.prototype.draw.apply(this, arguments);
    var ctx = this.chart.ctx;
    ctx.save();
    // text alignment and color
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = this.options.scaleFontColor;
    // position
    var x = this.scale.xScalePaddingLeft * 0.4;
    var y = this.chart.height / 2;
    ctx.translate(x, y);
    ctx.rotate(-90 * Math.PI / 180);
    // y axis label
    ctx.fillText("Average Time Taken", 0, 0);
    ctx.restore();


  }
});
var ctx1 = document.getElementById("my-chart-1").getContext("2d");
var options1 = {
  scaleShowGridLines : true,
  scaleLabel: "          <%=value%>"
};
var data1 = {
  labels: ["0", "10", "20", "30", "40", "50", "60"],
  datasets: [
    {
      label: "Synchronous",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",

      data: [0, 0.2616, 0.4902, 0.7677 ,1.0067 ,1.1891 ,1.5043]
    },
    {
      label: "ASynchronous",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [0, 0.1607, 0.2871, 0.3837, 0.3789, 0.5282, 0.7007]
    }
  ]
};

var ctx2 = document.getElementById("my-chart-2").getContext("2d");
var options2 = {
  scaleShowGridLines : true,
  scaleLabel: "          <%=value%>"
};
var data2 = {
  labels: ["0", "10", "20", "30", "40", "50", "60"],
  datasets: [
    {
      label: "Synchronous",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",

      data: [0, 0.2621, 0.5022, 0.7811, 0.9865, 1.2541, 1.5734]
    },
    {
      label: "ASynchronous",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [0, 0.1331, 0.2118, 0.3389, 0.3772, 0.5468, 0.5839]
    }
  ]
};


// Animate chart when height is reached
var chartHeight = $('#my-chart-1').offset().top - $(window).height();
var isChartLoaded = false;

$(window).on('scroll', function() {
  if ($(window).scrollTop() > chartHeight && !isChartLoaded) {
    var myLineChart1 = new Chart(ctx1).LineAlt(data1, options1);
    document.getElementById('js-legend-1').innerHTML = myLineChart1.generateLegend();
    var myLineChart2 = new Chart(ctx2).LineAlt(data2, options2);
    document.getElementById('js-legend-2').innerHTML = myLineChart2.generateLegend();
    isChartLoaded = true;
  }
});
