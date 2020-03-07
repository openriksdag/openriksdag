import React, {memo, useMemo} from "react"
import * as R from "ramda"
import {degreesToRadians} from "./chart-helpers"
import {isInCommittee, isInDocument} from "../../relation-helpers"

const Representative = memo(({x, y, isHighlighted, handleMouseOver, handleMouseLeave}) =>
  <circle
    cx={x}
    cy={y}
    r={5}
    style={{
      position: "absolute",
      fill: "rgba(255, 255, 255, 0.8)",
    }}
    className={
      `representative ${isHighlighted ? "highlight" : ""}`}
    onMouseOver={handleMouseOver}
    onMouseLeave={handleMouseLeave}
  />)

const isHovered = ({representative: hovered}, representative) =>
  hovered != null && hovered.id === representative.id

const isHighlighted = ({committee, motion, proposition}, searchDate, rep) =>
  (committee != null && isInCommittee(rep, committee, searchDate)) ||
  (motion != null && isInDocument(motion.intressent, rep.id)) ||
  (proposition != null && isInDocument(proposition.intressent, rep.id))

const Representatives = memo(({
                                innerRadius,
                                arcWidth,
                                cx,
                                cy,
                                hovered,
                                searchDate,
                                arcs,
                                onHoverRepresentative,
                                onMouseLeaveRep
                              }) => {
  const middleRadius = innerRadius + (arcWidth / 2)

  const repsData = useMemo(() => R.flatten(
    arcs.map(({startAngle, endAngle, data}) => {
      const {reps, count} = data
      const totalAngle = endAngle - startAngle;
      const reprAngle = totalAngle / count;
      return reps.map((repr, index) => {
        const angle = (startAngle + (reprAngle / 2)) + (reprAngle * index) - degreesToRadians(90)
        return {
          data: repr,
          x: middleRadius * Math.cos(angle),
          y: middleRadius * Math.sin(angle),
          isHighlighted: isHighlighted(hovered, searchDate, repr),
          isHovered: isHovered(hovered, repr)
        }
      })
    })), [hovered, middleRadius, arcs, searchDate])

  return (<g transform={`translate(${cx} ${cy})`}>
    {repsData.map(({data, x, y, isHighlighted}) => <Representative
      x={x}
      y={y}
      key={data.id}
      isHighlighted={isHighlighted}
      handleMouseOver={onHoverRepresentative(data)}
      handleMouseLeave={onMouseLeaveRep}
    />)}
  </g>)
})

export default Representatives