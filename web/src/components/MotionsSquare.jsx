import React from "react";
import * as d3 from "d3";
import "./MotionsSquare.css";
import { values } from "ramda";
import testData from "../testpropositions.json";

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

console.log(values(testData).map(d => d));
const Organ = () => {
  return values(testData).map(d => <p key={d.dok_id}>{d.dok_id}</p>);
};

function test() {
  console.log("hej");
}
const MotionsSquare = props => {
  const { type, title, reverse } = props;
  //Make an SVG Container
  const outerRadius = 200;

  return (
    <div className={reverse ? "wrapper reverse" : "wrapper"}>
      <div className={reverse ? "info reverse" : "info"}>
        {title}
        <br />
        <br />
        <Organ></Organ>
      </div>

      <figure className="squareContainer">
        <span className="type">{type}</span>

        <div className="motionContainer">
          {data.map((d, i) => (
            <div
              key={i}
              className="motion"
              onMouseEnter={test}
              onMouseLeave={test}
            ></div>
          ))}
        </div>
      </figure>
    </div>
  );
};

export default MotionsSquare;
