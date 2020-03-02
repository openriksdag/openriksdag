import React from "react";
import * as d3 from "d3";

const Arc = ({ data, index, createArc, colors, format }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={colors(index)} />
  </g>
);
const PieChart = props => {
  const {
    innerRadius,
    outerRadius,
    height,
    width,
    data,
    partyColors,
    numCircles
  } = props;
  const createPie = d3
    .pie()
    .startAngle(-90 * (Math.PI / 180))
    .endAngle(90 * (Math.PI / 180))
    .value(d => d.value)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const format = d3.format(".2f");
  const pieData = createPie(data);
  const colors = d3
    .scaleOrdinal()
    .domain(pieData.map(item => item.data.label))
    .range(partyColors);

  const createCircles = num => {
    const circles = [];
    const distToCenter = innerRadius + (outerRadius - innerRadius) / 2; //hypotenuse
    for (var n = 1; n <= num; n++) {
      const angleDeg = (180 * (2 * n - 1)) / (num * 2);
      const angle = (angleDeg * Math.PI) / 180; // in radians
      const x = distToCenter * Math.cos(-angle);
      const y = distToCenter * Math.sin(-angle);
      circles.push(
        <circle
          cx={x}
          cy={y}
          r="4"
          key={n}
          style={{ position: "absolute", fill: "rgba(255, 255, 255, 0.8)" }}
        ></circle>
      );
    }
    return circles;
  };
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${outerRadius} ${outerRadius})`}>
        {pieData.map((d, i) => (
          <Arc
            key={i}
            data={d}
            index={i}
            createArc={createArc}
            colors={colors}
            format={format}
          />
        ))}
        {createCircles(numCircles).map(i => i)}
      </g>
    </svg>
  );
};

export default PieChart;
