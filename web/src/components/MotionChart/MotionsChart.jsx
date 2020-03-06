import React, { useMemo } from "react";
import "./MotionsChart.css";
import { values } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { ChangeHover, Hovered } from "../../state/state";

const Title = props => {
  const { data, type, dispatch, hovered } = props;
  const handleMouseLeave = () => dispatch(ChangeHover(Hovered.Nothing()));
  const handleMouseEnter = () =>
    dispatch(
      ChangeHover(
        type === "Motions" ? Hovered.Motion(data) : Hovered.Proposition(data)
      )
    );
  if (data.attachments[0]) {
    return (
      <div
        key={data.dok_id}
        className="motion"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a target="_blank" href={data.attachments[0].url}>
          {data.attachments[0].titel}
        </a>
      </div>
    );
  } else {
    return null;
  }
};
const MotionsChart = props => {
  const { type, description, reverse, data } = props;
  const dispatch = useDispatch();
  const hovered = useSelector(state => state.hovered);
  const motions = useMemo(() => values(data), [data]);

  return (
    <div className={reverse ? "wrapper reverse" : "wrapper"}>
      <div className={reverse ? "infoContainer flipText" : "infoContainer"}>
        <span id="description">{description}</span>
      </div>

      <figure className="squareContainer">
        <span className="motionType">{type}</span>
        <div className="motionContainer">
          {motions.map(d => (
            <Title
              data={d}
              type={type}
              dispatch={dispatch}
              hovered={hovered}
            ></Title>
          ))}
        </div>
      </figure>
    </div>
  );
};

export default MotionsChart;
