import React from "react";
import PieChart from "./PieChart";
import "./RiksdagsChart.css";

const RiksdagChart = props => {
  const data = [
    { label: "V", value: 27 },
    { label: "S", value: 100 },
    { label: "MP", value: 16 },
    { label: "SD", value: 62 },
    { label: "M", value: 70 },
    { label: "C", value: 31 },
    { label: "L", value: 19 },
    { label: "KD", value: 22 }
  ];
  const partyColors = [
    "#9B0100",
    "#EE1F21",
    "#53a045",
    "#DBBE13",
    "#32ABFF",
    "#017A26",
    "#3D6BFF",
    "#1F3B96"
  ];

  const createPieCharts = numBows => {
    let pieCharts = [];
    let width = 700;
    let height = 115;
    let innerRadius = 100;
    let numCircles = 22;
    let left = 15 * numBows;
    for (var i = 0; i < numBows; i++) {
      height = height + 15;
      innerRadius = innerRadius + 15;
      numCircles = numCircles + 3;
      left = left - 15;
      pieCharts.push(
        <div
          className="pie-chart"
          key={numCircles}
          style={{ left: `${left}px` }}
        >
          <PieChart
            key={numCircles}
            data={data}
            width={width}
            height={height}
            innerRadius={innerRadius - 1} // remove 1 px gutter
            outerRadius={height}
            partyColors={partyColors}
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
