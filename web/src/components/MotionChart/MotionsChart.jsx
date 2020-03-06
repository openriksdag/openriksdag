import React, { useMemo } from "react";
import "./MotionsChart.css";
import { values } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { ChangeHover, Hovered } from "../../state/state";

const Title = props => {
  const { hovered, type } = props;
  return Hovered.case(hovered, {
    Motion: ({ data }) =>
      type === "Motions" && (
        <a href={data.attachments[0].url} id="title">
          {data.attachments[0].titel}
        </a>
      ),
    Proposition: ({ data }) =>
      type === "Proposals" && (
        <a href={data.attachments[0].url} id="title">
          {data.attachments[0].titel}
        </a>
      ),
    otherwise: () => null
  });
};

const MotionsChart = props => {
  const { type, description, reverse, data } = props;
  const dispatch = useDispatch();
  const hovered = useSelector(state => state.hovered);
  const motions = useMemo(() => values(data), [data]);
  const handleMouseLeave = () => dispatch(ChangeHover(Hovered.Nothing()));
  return (
    <div className={reverse ? "wrapper reverse" : "wrapper"}>
      <div className={reverse ? "infoContainer flipText" : "infoContainer"}>
        <span id="description">{description}</span>
        <Title hovered={hovered} type={type}></Title>
      </div>

      <figure className="squareContainer">
        <span className="motionType">{type}</span>
        <div className="motionContainer">
          {motions.map((d, i) => (
            <div
              key={i}
              className="motion"
              onMouseEnter={() =>
                dispatch(
                  ChangeHover(
                    type === "Motions"
                      ? Hovered.Motion(d)
                      : Hovered.Proposition(d)
                  )
                )
              }
              onMouseLeave={handleMouseLeave}
            ></div>
          ))}
        </div>
      </figure>
    </div>
  );
};

export default MotionsChart;
