import * as d3 from "d3";

export default class Government {
  constructor(element) {
    const data = [
      { "cx": "10", "cy": "0", "description": "Labor Ministry" },
      { "cx": "-15", "cy": "40", "description": "Finance Ministry" },
      { "cx": "35", "cy": "40", "description": "Defense Ministry" },
      { "cx": "-40", "cy": "80", "description": "Infrastructure Ministry" },
      { "cx": "10", "cy": "80", "description": "Justice Ministry" },
      { "cx": "60", "cy": "80", "description": "Culture Ministry" },
      { "cx": "-70", "cy": "120", "description": "Environment Ministry" },
      { "cx": "-20", "cy": "120", "description": "Commerce Ministry" },
      { "cx": "30", "cy": "120", "description": "Social Affair Ministry" },
      { "cx": "80", "cy": "120", "description": "Education Ministry" }
    ];

    var margin = { top: 10, right: 10, buttom: 10, left: 10 },
      width = 365,
      height = 220;

    var svg = d3
      .select(element)
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", "translate(175,40)");

    const circles = svg.selectAll("circle")
      .data(data);

    circles.enter().append("circle")
      .attr("cx", d => d.cx)
      .attr("cy", d => d.cy)
      .attr("r", "20")
      .attr("fill", "white")
      // .on("mouseover", function () {
      //   d3.select(this).attr("fill", "#999999")
      // })
      // .on("mouseout", function () {
      //   d3.select(this).attr("fill", "white")
      // })
      .on('mouseover', function () {
        tooltip.style("display", null)
        d3.select(this).attr("fill", "#999999")
      })
      .on('mouseout', function () {
        tooltip.style("display", "none")
        d3.select(this).attr("fill", "white")
      })
      .on('mousemove', function (d) {
        var xPos = d3.mouse(this)[0] - 15;
        var yPos = d3.mouse(this)[1] + 15;
        console.log("mouseover");

        tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
        tooltip.select("text").text(d.description).each(wrap);

      })


    var tooltip = svg.append("g")
      .attr("class", tooltip)
      .style("display", "none")

    tooltip.append("rect")
      .attr("x", -15)
      .attr("y", 0)
      .attr("width", 150)
      .attr("height", 25)
      .attr("rx", "5")
      .attr("fill", "#ECECEC")

    tooltip.append("text")
      .attr("x", 15)
      .attr("dy", "1.2em")
      .style("font-size", "0.8em")
      .style("background-color", "grey")


    svg.append("text")
      .attr("x", "-45")
      .attr("y", "180")
      .attr("fill", "black")
      .text("GOVERNMENT")

    function wrap() {
      var text = d3.select(this)
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 0.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > 300) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }



  }
}

