import React from "react";
import "./Committees.css";
import { useDispatch, useSelector } from "react-redux";
import { ChangeHover, Select, Selected } from "../../state/state";
import committeeData from "../../data/committees.json";
import { isInCommittee } from "../../relation-helpers";

const committeeRadius = 25,
  committeeColors = {
    background: "#999999",
    text: "white",
    hover: "black",
    highlight: "black"
  };

const Committee = ({
  cx,
  cy,
  name: { sv: fullName, short: shortName },
  isHovered,
  onHover,
  onLeaveHover,
  isHighlighted,
  onClick
}) => (
  <g
    className={"committee"}
    onMouseOver={onHover}
    onMouseLeave={onLeaveHover}
    onClick={onClick}
  >
    <circle
      cx={cx}
      cy={cy}
      r={committeeRadius}
      fill={
        isHovered
          ? committeeColors.hover
          : isHighlighted
          ? committeeColors.highlight
          : committeeColors.background
      }
    />
    <text x={cx} y={cy + 5} textAnchor={"middle"} fill={committeeColors.text}
          onClick={onClick}
    >
      {shortName}
    </text>
  </g>
);

const Committees = props => {
  const dispatch = useDispatch();
  const { hovered, searchDate, selected } = useSelector(state => state);

  const height = 300,
    width = 380;

  const isHovered = name =>
    hovered.committee != null && hovered.committee === name;

  const isHighlighted = name =>
    selected.committee === name ||
    (selected.representative == null &&
      hovered.representative != null &&
      isInCommittee(hovered.representative, name, searchDate)) ||
    (selected.representative != null &&
      isInCommittee(selected.representative, name, searchDate)) ||
    (selected.motion != null && selected.motion.organ === name) ||
    (selected.proposition != null && selected.proposition.organ === name);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      height={height}
      width={width}
      className={"committees"}
    >
      {committeeData.map(({ cx, cy, nameSv, shortName }) => (
        <Committee
          key={`committee-${shortName}`}
          cx={cx}
          cy={cy}
          name={{ sv: nameSv, short: shortName }}
          isHovered={isHovered(shortName)}
          onHover={() => dispatch(ChangeHover(Selected.Committee(shortName)))}
          onLeaveHover={() => dispatch(ChangeHover(Selected.Nothing()))}
          isHighlighted={isHighlighted(shortName)}
          onClick={() => dispatch(Select(Selected.Committee(shortName)))}
        />
      ))}
      <text x="190" y="60" fill="black" textAnchor={"middle"}>
        COMMITTEES
      </text>
    </svg>
  );
};
export default Committees;
