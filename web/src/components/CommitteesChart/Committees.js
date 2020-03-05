import * as d3 from "d3";

export default class Committees {
    constructor(element) {
        const data = [
            { "cx": "40", "cy": "100", "r": "25", "color": "#999999" },
            { "cx": "100", "cy": "100", "r": "25", "color": "#999999" },
            { "cx": "160", "cy": "100", "r": "25", "color": "#999999" },
            { "cx": "220", "cy": "100", "r": "25", "color": "#999999" },
            { "cx": "280", "cy": "100", "r": "25", "color": "#999999" },
            { "cx": "340", "cy": "100", "r": "25", "color": "#999999" },
            { "cx": "70", "cy": "150", "r": "25", "color": "#999999" },
            { "cx": "130", "cy": "150", "r": "25", "color": "#999999" },
            { "cx": "190", "cy": "150", "r": "25", "color": "#999999" },
            { "cx": "250", "cy": "150", "r": "25", "color": "#999999" },
            { "cx": "310", "cy": "150", "r": "25", "color": "#999999" },
            { "cx": "100", "cy": "200", "r": "25", "color": "#999999" },
            { "cx": "160", "cy": "200", "r": "25", "color": "#999999" },
            { "cx": "220", "cy": "200", "r": "25", "color": "#999999" },
            { "cx": "280", "cy": "200", "r": "25", "color": "#999999" }

        ]

        var svg = d3.select(element)
            .append("svg")
            .attr("height", 300)
            .attr("width", 400)

        const circles = svg.selectAll("circle")
            .data(data)

        circles.enter()
            .append("circle")
            .attr("cx", d => d.cx)
            .attr("cy", d => d.cy)
            .attr("r", d => d.r)
            .attr("fill", d => d.color)


        const texts = svg.selectAll("text")
            .data(data)

        texts.enter()
            .append("text")
            .attr("x", d => d.cx)
            .attr("y", d => (+d.cy + 5))
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text("AU")









    }

} 