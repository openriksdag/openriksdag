import React from 'react';
import {useDispatch, useSelector} from "react-redux"
import {ChangeHover, Hovered} from '../../state/state'
import {isInCommittee} from "../../relation-helpers"

const committeeData = [
  {cx: 40, cy: 100, r: 25, color: "#999999", nameSv: "Arbetsmarknadsutskottet", shortName: "AU"},
  {cx: 100, cy: 100, r: 25, color: "#999999", nameSv: "Civilutskottet", shortName: "CU"},
  {cx: 160, cy: 100, r: 25, color: "#999999", nameSv: "Finansutskottet", shortName: "FiU"},
  {cx: 220, cy: 100, r: 25, color: "#999999", nameSv: "Försvarsutskottet", shortName: "FöU"},
  {cx: 280, cy: 100, r: 25, color: "#999999", nameSv: "Justitieutskottet", shortName: "JuU"},
  {cx: 340, cy: 100, r: 25, color: "#999999", nameSv: "Konstitutionsutskottet", shortName: "KU"},
  {cx: 70, cy: 150, r: 25, color: "#999999", nameSv: "Kulturutskottet", shortName: "KrU"},
  {cx: 130, cy: 150, r: 25, color: "#999999", nameSv: "Miljö- och jordbruksutskottet", shortName: "MJU"},
  {cx: 190, cy: 150, r: 25, color: "#999999", nameSv: "Näringsutskottet", shortName: "NU"},
  {cx: 250, cy: 150, r: 25, color: "#999999", nameSv: "Skatteutskottet", shortName: "SkU"},
  {cx: 310, cy: 150, r: 25, color: "#999999", nameSv: "Socialförsäkringsutskottet", shortName: "SfU"},
  {cx: 100, cy: 200, r: 25, color: "#999999", nameSv: "Socialutskottet", shortName: "SoU"},
  {cx: 160, cy: 200, r: 25, color: "#999999", nameSv: "Trafikutskottet", shortName: "TU"},
  {cx: 220, cy: 200, r: 25, color: "#999999", nameSv: "Utbildningsutskottet", shortName: "UbU"},
  {cx: 280, cy: 200, r: 25, color: "#999999", nameSv: "Utrikesutskottet", shortName: "UU"},
]

const committeeRadius = 25,
  committeeColors = {
    background: "#999999",
    text: "white",
    hover: "black",
    highlight: "black"
  }

const Committee = ({
                     cx,
                     cy,
                     name: {sv: fullName, short: shortName},
                     isHovered,
                     onHover,
                     onLeaveHover,
                     isHighlighted
                   }) =>
  (<g onMouseOver={onHover} onMouseLeave={onLeaveHover}>
    <circle cx={cx}
            cy={cy}
            r={committeeRadius}
            fill={isHovered ? committeeColors.hover : isHighlighted ? committeeColors.highlight : committeeColors.background}
    />
    <text x={cx} y={cy + 5} textAnchor={'middle'} fill={committeeColors.text}>{shortName}</text>
  </g>)

const Committees = (props) => {
  const dispatch = useDispatch()
  const {hovered, searchDate} = useSelector(state => state)

  const height = 300, width = 400

  const isHovered = (name) => hovered.committee != null && hovered.committee === name


  const isHighlighted = (name) =>
    (hovered.representative != null && isInCommittee(hovered.representative, name, searchDate))

  return (<svg viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
    {committeeData.map(({cx, cy, nameSv, shortName}) =>
      <Committee
        key={`committee-${shortName}`}
        cx={cx}
        cy={cy}
        name={{sv: nameSv, short: shortName}}
        isHovered={isHovered(shortName)}
        onHover={() => dispatch(ChangeHover(Hovered.Committee(shortName)))}
        onLeaveHover={() => dispatch(ChangeHover(Hovered.Nothing()))}
        isHighlighted={isHighlighted(shortName)}/>
    )}
  </svg>)
}
export default Committees
