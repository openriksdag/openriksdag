import React from "react";
import * as d3 from "d3";
import "./MotionsSquare.css";

const data = [
  { title: "motion1" },
  { title: "motion2" },
  { title: "motion3" },
  { title: "motion4" },
  { title: "motion5" },
  { title: "motion6" },
  { title: "motion7" },

  { title: "motion8" }
];

const MotionsSquare = props => {
  const { type, reverse } = props;
  //Make an SVG Container
  const outerRadius = 200;

  return (
    <div className="wrapper">
      <span className="info">Motions & Proposals</span>
      <figure className="squareContainer">
        <span className="type">{type}</span>
        <div className="motionContainer">
          {data.map((d, i) => (
            <div key={i} className="motion"></div>
          ))}
        </div>
      </figure>
    </div>
  );
};

export default MotionsSquare;
