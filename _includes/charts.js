Chart.defaults.global.responsive = true;
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
var ctx = document.getElementById("my-chart").getContext("2d");
var options = {
  scaleShowGridLines : true,
  scaleLabel: "          <%=value%>"
};
var data = {
  labels: ["0", "10", "20", "30", "40", "50", "60"],
  datasets: [
    {
      label: "Loop: 10",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [0, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "Loop: 50",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [0, 48, 40, 19, 86, 27, 90]
    }
  ]
};
var myLineChart = new Chart(ctx).LineAlt(data, options);
document.getElementById('js-legend').innerHTML = myLineChart.generateLegend();
