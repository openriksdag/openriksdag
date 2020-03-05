import * as d3 from "d3";

export default class Government {
  constructor(element) {
    const data = {};

    var margin = { top: 10, right: 10, buttom: 10, left: 10 },
      width = 400,
      height = 400;

    var svg = d3
      .select(element)
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", "translate(200,200)");

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



    svg
      .append("circle")
      .attr("cx", 10)
      .attr("cy", 0)
      .attr("r", 20)
      .attr("fill", "white");

    svg
      .append("circle")
      .attr("cx", -15)
      .attr("cy", 40)
      .attr("r", 20)
      .attr("fill", "white");

    svg
      .append("circle")
      .attr("cx", 35)
      .attr("cy", 40)
      .attr("r", 20)
      .attr("fill", "white");

    svg
      .append("circle")
      .attr("cx", -40)
      .attr("cy", 80)
      .attr("r", 20)
      .attr("fill", "white");

    svg
      .append("circle")
      .attr("cx", 10)
      .attr("cy", 80)
      .attr("r", 20)
      .attr("fill", "white");

    svg
      .append("circle")
      .attr("cx", 60)
      .attr("cy", 80)
      .attr("r", 20)
      .attr("fill", "white");

    svg
      .append("circle")
      .attr("cx", -70)
      .attr("cy", 120)
      .attr("r", 20)
      .attr("fill", "white");

    svg
      .append("circle")
      .attr("cx", -20)
      .attr("cy", 120)
      .attr("r", 20)
      .attr("fill", "white");

    svg
      .append("circle")
      .attr("cx", 30)
      .attr("cy", 120)
      .attr("r", 20)
      .attr("fill", "white");

    svg
      .append("circle")
      .attr("cx", 80)
      .attr("cy", 120)
      .attr("r", 20)
      .attr("fill", "white");

    // var circles = svg.selectAll("circle").data(data);
    // circles.enter().append("circle");
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