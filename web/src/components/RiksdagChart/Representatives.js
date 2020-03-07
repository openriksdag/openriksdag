import {ChangeHover, Hovered} from "../../state/state"
import React, {memo, useCallback, useMemo} from "react"
import * as R from "ramda"
import {calculateArcs, degreesToRadians} from "./chart-helpers"
import {useDispatch} from "react-redux"
import {isInCommittee, isInDocument} from "../../relation-helpers"

const Representative = memo(({repData, x, y, isHovered, isHighlighted, handleMouseOver, handleMouseLeave}) => {
  const onMouseOver = useCallback(() => handleMouseOver(repData), [repData, handleMouseOver])
  const onMouseLeave = useCallback(handleMouseLeave, [handleMouseLeave])

  return <circle
    cx={x}
    cy={y}
    r={5}
    style={{
      position: "absolute",
      fill: "rgba(255, 255, 255, 0.8)",
    }}
    className={
      `representative ${isHovered ? "hover" : ""} ${isHighlighted ? "highlight" : ""}`}
    onMouseOver={onMouseOver}
    onMouseLeave={onMouseLeave}
  />
})

const isHovered = (hovered, representative) =>
  Hovered.case(hovered, {
    Representative: ({data}) => data.id === representative.id,
    otherwise: () => false
  })

const isHighlighted = (hovered, searchDate, rep) =>
  Hovered.case(hovered, {
    Committee: ({name}) => isInCommittee(rep, name, searchDate),
    Motion: ({data}) => isInDocument(data.intressent, rep.id),
    Proposition: ({data}) => isInDocument(data.intressent, rep.id),
    otherwise: () => false
  })

const Representatives = memo(({data, parties, innerRadius, arcWidth, cx, cy, hovered, searchDate, arcs}) => {
  const dispatch = useDispatch();

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
    })), [data, middleRadius, arcs])

  const handleMouseOver = (rep) => dispatch(ChangeHover(Hovered.Representative(rep)))
  const handleMouseLeave = () => dispatch(ChangeHover(Hovered.Nothing()))

  return (<g transform={`translate(${cx} ${cy})`}>
    {repsData.map(({data, x, y, isHighlighted, isHovered}) => <Representative
      x={x}
      y={y}
      key={data.id}
      isHovered={isHovered}
      isHighlighted={isHighlighted}
      repData={data}
      handleMouseOver={handleMouseOver}
      handleMouseLeave={handleMouseLeave}
    />)}
  </g>)
})

export default Representatives