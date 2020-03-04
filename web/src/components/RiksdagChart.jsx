import React from "react";
import PieChart from "./PieChart";
import "./RiksdagsChart.css";

const RiksdagChart = props => {
  const data = [
    {label: "V", value: 27, color: "#9B0100"},
    {label: "S", value: 100, color: "#EE1F21"},
    {label: "MP", value: 16, color: "#53a045"},
    {label: "SD", value: 62, color: "#DBBE13"},
    {label: "M", value: 70, color: "#32ABFF"},
    {label: "C", value: 31, color: "#017A26"},
    {label: "L", value: 19, color: "#3D6BFF"},
    {label: "KD", value: 22, color: "#1F3B96"}
  ];

  const createPieCharts = numberOfArcs => {
    let pieCharts = [];
    let width = 700;
    let height = 115;
    let innerRadius = 100;
    let numCircles = 22;
    let left = 15 * numberOfArcs;
    for (let i = 0; i < numberOfArcs; i++) {
      height = height + 15;
      innerRadius = innerRadius + 15;
      numCircles = numCircles + 3;
      left = left - 15;
      pieCharts.push(
        <div
          className="pie-chart"
          key={numCircles}
          style={{left: `${left}px`}}
        >
          <PieChart
            key={numCircles}
            data={data}
            width={width}
            height={height}
            innerRadius={innerRadius - 1} // remove 1 px gutter
            outerRadius={height}
            numCircles={numCircles}
          />
        </div>
      );
    }
    return pieCharts;
  };

  return <div className="pie-container">{createPieCharts(10)}</div>;
};

export default RiksdagChart;
