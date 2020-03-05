import React from "react";
import "./MotionsSquare.css";
import { values } from "ramda";

const Title = props => {
  const { id, data } = props;
  let title = "";
  let url = "";
  values(data).map((d, i) => {
    if (i === id) {
      title = d.attachments[0].titel;
      url = d.attachments[0].url;
    }
    return 0; //Added because the arrow function wants to return a value
  });
  return (
    <a href={url} id="title">
      {title}
    </a>
  );
};

function changeTitle() {
  //Use later to update the title depending on the motion hovered
  console.log("Getting motion id and changing title");
}

const MotionsSquare = props => {
  const { type, description, reverse, data } = props;

  return (
    <div className={reverse ? "wrapper reverse" : "wrapper"}>
      <div className={reverse ? "infoContainer flipText" : "infoContainer"}>
        <span id="description">{description}</span>
        <Title id={12} data={data}></Title>
      </div>

      <figure className="squareContainer">
        <span className="motionType">{type}</span>

        <div className="motionContainer">
          {values(data).map((d, i) => (
            <div
              key={i}
              className="motion"
              onMouseEnter={changeTitle}
              onMouseLeave={changeTitle}
            ></div>
          ))}
        </div>
      </figure>
    </div>
  );
};

export default MotionsSquare;
