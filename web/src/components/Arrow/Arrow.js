import * as d3 from 'd3';


export default class Arrow {
    constructor(element) {

        // const { } = props;

        const svg = d3.select(element)
            .append("svg")
            .attr("width", 200)
            .attr("height", 150)

        svg.append("svg:defs").append("svg:marker")
            .attr("id", "triangle_green")
            .attr("refX", 6)
            .attr("refY", 6)
            .attr("markerWidth", 30)
            .attr("markerHeight", 30)
            .attr("markerUnits", "userSpaceOnUse")
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 12 6 0 12 3 6")
            .style("fill", "#999999");

        svg.append("path")
            .attr("marker-end", "url(#triangle_green)")
            .attr("d", "M " + 200 + " " + 10 + " Q " + 30 + " " + 30 + " " + 10 + " " + 130)
            .attr("stroke", "#91AF92")
            .attr("stroke-width", "4")
            .attr("fill", "transparent")
            .attr("class", "edges");

    }
}



