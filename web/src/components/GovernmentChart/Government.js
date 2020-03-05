import * as d3 from "d3";

export default class Government {
  constructor(element) {
    const data = [
      { "cx": "10", "cy": "0" },
      { "cx": "-15", "cy": "40" },
      { "cx": "35", "cy": "40" },
      { "cx": "-40", "cy": "80" },
      { "cx": "10", "cy": "80" },
      { "cx": "60", "cy": "80" },
      { "cx": "-70", "cy": "120" },
      { "cx": "-20", "cy": "120" },
      { "cx": "30", "cy": "120" },
      { "cx": "80", "cy": "120" }
    ];

    var margin = { top: 10, right: 10, buttom: 10, left: 10 },
      width = 400,
      height = 320;

    var svg = d3
      .select(element)
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", "translate(175,80)");

    svg
      .append("path")
      .attr("class", "triangle")
      .attr(
        "d",
        "M 0 " +
        -height / 3 +
        " L " +
        -width / 3 +
        " " +
        height / 3 +
        "L " +
        width / 3 +
        " " +
        height / 3 +
        " Z"
      )
      .style("fill", "#EA222A")
      .attr("transform", "translate(8,40)");

    const circles = svg.selectAll("circle")
      .data(data);

    circles.enter().append("circle")
      .attr("cx", d => d.cx)
      .attr("cy", d => d.cy)
      .attr("r", "20")
      .attr("fill", "white")
      .on("mouseover", function () {
        d3.select(this).attr("fill", "#999999")
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "white")
      })

  }
}

function rightRoundedRect(x, y, width, height, radius) {
  return "M" + x + "," + y
    + "h" + (width - radius)
    + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
    + "v" + (height - 2 * radius)
    + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
    + "h" + (radius - width)
    + "z";
}