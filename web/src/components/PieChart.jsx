import React from "react";
import * as d3 from "d3";

const Arc = ({ data, index, createArc, colors, format }) => (
    <g key={index} className="arc">
      <path className="arc" d={createArc(data)} fill={colors(index)} />
      <text
        transform={`translate(${createArc.centroid(data)})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize="10"
      >
        {format(data.value)}
      </text>
    </g>
  );

  const PieChart = props => {
    const { innerRadius, outerRadius, height, width, data } = props;
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
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const format = d3.format(".2f");
    const pieData = createPie(data);
  
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
        </g>
      </svg>
    );
  };
  
  export default PieChart;