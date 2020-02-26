import React from "react";
import PieChart from "./PieChart";
import "./RiksdagsChart.css";

const RiksdagChart = props => {
  const data = [
    { label: "CDU", value: 10 },
    { label: "SPD", value: 15 },
    { label: "Die Grünen", value: 8 },
    { label: "Die Mitte", value: 1 },
    { label: "Frei Wähler", value: 3 }
  ];
  return (
    <div class="pie-container">
      <div class="pie-chart">
        <PieChart
          data={data}
          width={250}
          height={120}
          innerRadius={100}
          outerRadius={120}
        />
      </div>
      <div class="pie-chart two">
        <PieChart
          data={data}
          width={230}
          height={100}
          innerRadius={80}
          outerRadius={100}
        />
      </div>
    </div>
  );
};

export default RiksdagChart;
