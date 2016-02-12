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
    ctx.fillText("Average Time Taken (s)", 0, 0);
    ctx.restore();


  }
});
var ctx1 = document.getElementById("my-chart-1").getContext("2d");
var options1 = {
  scaleShowGridLines : true,
  scaleLabel: "          <%=value%>"
};
var data1 = {
  labels: ["0", "50", "100", "150", "200", "250", "300"],
  datasets: [
    {
      label: "Synchronous",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",

      data: [0, 1.219, 1.7474, 3.5988, 4.5904, 6.0892, 7.1681]
    },
    {
      label: "ASynchronous",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [0, 1.4351, 0.7572, 1.9704, 1.712, 2.1505, 2.6874]
    }
  ]
};

var ctx2 = document.getElementById("my-chart-2").getContext("2d");
var options2 = {
  scaleShowGridLines : true,
  scaleLabel: "          <%=value%>"
};
var data2 = {
  labels: ["0", "50", "100", "150", "200", "250", "300"],
  datasets: [
    {
      label: "Synchronous",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",

      data: [0, 1.1916, 2.5259, 3.6541, 4.8827, 6.1095, 6.4936]
    },
    {
      label: "ASynchronous",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [0, 0.4528, 0.8413, 1.3215, 1.8274, 2.0914, 2.3564]
    }
  ]
};

var ctx3 = document.getElementById("my-chart-3").getContext("2d");
var options3 = {
  scaleShowGridLines : true,
  scaleLabel: "          <%=value%>"
};
var data3 = {
  labels: ["0", "50", "100", "150", "200", "250", "300"],
  datasets: [
    {
      label: "Synchronous",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",

      data: [0, 1.1788, 2.4164, 3.822, 5.0605, 6.3205, 7.6368]
    },
    {
      label: "ASynchronous",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [0, 0.4281, 0.8399, 1.2484, 1.608, 1.9235, 2.5216]
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
    var myLineChart3 = new Chart(ctx3).LineAlt(data3, options3);
    document.getElementById('js-legend-2').innerHTML = myLineChart3.generateLegend();
    isChartLoaded = true;
  }
});
