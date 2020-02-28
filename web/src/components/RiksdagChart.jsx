import React from "react";
import PieChart from "./PieChart";
import "./RiksdagsChart.css";

const RiksdagChart = props => {
  const data = [
    { label: "S", value: 100 },
    { label: "M", value: 70 },
    { label: "SD", value: 62 },
    { label: "C", value: 31 },
    { label: "V", value: 27 },
    { label: "KD", value: 22 },
    { label: "L", value: 19 },
    { label: "MP", value: 16 }
  ];
  const partyColors = [
    "#EE1F21",
    "#32ABFF",
    "#DBBE13",
    "#017A26",
    "#9B0100",
    "#1F3B96",
    "#3D6BFF",
    "#53a045"
  ];

  return (
    <div className="pie-container">
      <div className="pie-chart">
        <PieChart
          data={data}
          width={250}
          height={120}
          innerRadius={99}
          outerRadius={120}
          partyColors={partyColors}
        />
      </div>
      <div className="pie-chart two">
        <PieChart
          data={data}
          width={230}
          height={100}
          innerRadius={80}
          outerRadius={100}
          partyColors={partyColors}
        />
      </div>
    </div>
  );
};

export default RiksdagChart;
