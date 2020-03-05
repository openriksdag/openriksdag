import React from "react";
import "./MotionsChart.css";
import { values } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { ChangeHover, Hovered } from "../../state/state";

const Title = props => {
  const { id, data } = props;
  let title = "";
  let url = "";
  values(data).map(d => {
    if (d.dok_id === id) {
      title = d.attachments[0].titel; //Not a typo, the data uses titel
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

const MotionsChart = props => {
  const { type, description, reverse, data } = props;
  const dispatch = useDispatch();
  const hovered = useSelector(state => state.hovered);
  return (
    <div className={reverse ? "wrapper reverse" : "wrapper"}>
      <div className={reverse ? "infoContainer flipText" : "infoContainer"}>
        <span id="description">{description}</span>
        <Title id={hovered.id} data={data}></Title>
      </div>

      <figure className="squareContainer">
        <span className="motionType">{type}</span>

        <div className="motionContainer">
          {values(data).map((d, i) => (
            <div
              key={i}
              className="motion"
              onMouseEnter={() =>
                dispatch(ChangeHover(Hovered.Motion(d.dok_id)))
              }
              onMouseLeave={() => dispatch(ChangeHover(Hovered.Nothing()))}
            ></div>
          ))}
        </div>
      </figure>
    </div>
  );
};

export default MotionsChart;
