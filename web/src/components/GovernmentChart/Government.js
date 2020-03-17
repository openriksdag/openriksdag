import * as d3 from "d3";
import img1 from "../../images/Binyuan.png"
import office from "../../images/office.png"
import finance from "../../images/finance.png"
import defense from "../../images/defence.png"
import infrastructure from "../../images/infastructrue.png"
import justice from "../../images/justice.png"
import culture from "../../images/culture.png"
import enviornment from "../../images/enviornment.png"
import innovation from "../../images/innovation.png"
import health from "../../images/health.png"
import education from "../../images/education.png"
import foreign from "../../images/health.png"
import emplyment from "../../images/employment.png"

export default class Government {
  constructor(element) {
    const data = [
      { cx: -20, cy: 0, name_eng: "Prime Minister's Office", name: "Stats­minister", icon: office },
      { cx: 30, cy: 0, name_eng: "Ministry of Finance", name: "Finans­departementet", icon: finance },
      { cx: -70, cy: 45, name_eng: "Ministry of Defense", name: "Försvars­departementet", icon: defense },
      { cx: -20, cy: 45, name_eng: "Ministry of Infrastructure", name: "Infrastruktur­departementet", icon: infrastructure },
      { cx: 30, cy: 45, name_eng: "Ministry of Justice", name: "Justitie­departementet", icon: justice },
      { cx: 80, cy: 45, name_eng: "Ministry of Culture", name: "Kultur­departementet", icon: culture },
      { cx: -70, cy: 90, name_eng: "Ministry of the Environment", name: "Miljö­departementet", icon: enviornment },
      { cx: -20, cy: 90, name_eng: "Ministry of Enterprise and Innovation", name: "Närings­departementet", icon: innovation },
      { cx: 30, cy: 90, name_eng: "Ministry of Health and Social Affairs", name: "Social­departementet", icon: health },
      { cx: 80, cy: 90, name_eng: "Ministry of Education and Research", name: "Utbildnings­departementet", icon: education },
      { cx: -20, cy: 135, name_eng: "Ministry of Foreign Affairs", name: "Utrikes­departementet", icon: foreign },
      { cx: 30, cy: 135, name_eng: "Ministry of Employment", name: "Arbetsmarknads­­departementet", icon: emplyment }

    ];

    var margin = { top: 10, right: 10, buttom: 10, left: 10 },
      width = 365,
      height = 270,
      isHighlighted = 1;

    var svg = d3
      .select(element)
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", "translate(178,70)");

    const circles = svg.selectAll("circle")
      .data(data);
    const images = svg.selectAll("image")
      .data(data);


    circles.enter().append("circle")
      .attr("cx", d => d.cx)
      .attr("cy", d => d.cy)
      .attr("r", "20")
      .attr("fill", "white")



    images.enter().append("image")
      .attr("xlink:href", d => d.icon)
      .attr("width", 25)
      .attr("height", 25)
      .attr("x", function (d) {
        return d.cx - 12;
      })
      .attr("y", (d) => {
        return d.cy - 12;
      })
      .attr("opacity", "40%")
      .on('mouseover', function () {
        tooltip.style("display", null)
        d3.select(this).attr("opacity", "100%")
      })
      .on('mouseout', function () {
        tooltip.style("display", "none")
        d3.select(this).attr("opacity", "40%")
      })
      .on('mousemove', function (d) {
        var xPos = d3.mouse(this)[0] - 15;
        var yPos = d3.mouse(this)[1] + 15;
        console.log("mouseover");

        tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
        tooltip.select("text").text(d.name_eng).each(wrap);

      })


    var tooltip = svg.append("g")
      .attr("class", tooltip)
      .style("display", "none")

    tooltip.append("rect")
      .attr("x", -50)
      .attr("y", 0)
      .attr("width", 160)
      .attr("height", 40)
      .attr("rx", "5")
      .attr("fill", "#ECECEC")

    tooltip.append("text")
      .attr("x", -100)
      .attr("dy", "1.2em")
      .style("font-size", "0.8em")
      .style("background-color", "grey")


    svg.append("text")
      .attr("x", "-45")
      .attr("y", "200")
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
          tspan = text.text(null).append("tspan").attr("x", -40).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > 146) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", -40).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }



  }
}


