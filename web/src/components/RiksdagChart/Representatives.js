import React, {memo, useMemo} from "react"
import * as R from "ramda"
import {degreesToRadians} from "./chart-helpers"
import {isInCommittee, isInDocument} from "../../relation-helpers"

const Representative = memo(({x, y, isHighlighted, handleMouseOver, handleMouseLeave, onClick, isSelected, isDisabled}) =>
  <circle
    cx={x}
    cy={y}
    r={5}
    style={{
      position: "absolute",
    }}
    className={
      `representative ${isHighlighted ? "highlight" : ""} ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
    onMouseOver={handleMouseOver}
    onMouseLeave={handleMouseLeave}
    onClick={onClick}
  />)

const isSelected = ({representative: selected}, representative) =>
  selected != null && selected.id === representative.id

const isDisabled = ({representative: selected}, representative) =>
  selected != null && selected.id !== representative.id

const isHighlighted = (hovered, selected, searchDate, rep) =>
  (selected.committee == null && hovered.committee != null && isInCommittee(rep, hovered.committee, searchDate))
  || (selected.committee != null && isInCommittee(rep, selected.committee, searchDate))
  || (hovered.motion != null && isInDocument(hovered.motion.intressent, rep.id))
  || (selected.motion != null && isInDocument(selected.motion.intressent, rep.id))
  || (hovered.proposition != null && isInDocument(hovered.proposition.intressent, rep.id))
  || (selected.proposition != null && isInDocument(selected.proposition.intressent, rep.id))

const Representatives = memo(({
                                innerRadius,
                                arcWidth,
                                cx,
                                cy,
                                hovered,
                                selected,
                                searchDate,
                                arcs,
                                onHoverRepresentative,
                                onMouseLeaveRep,
                                onClick
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
          isHighlighted: isHighlighted(hovered, selected, searchDate, repr),
          isSelected: isSelected(selected, repr),
          isDisabled: isDisabled(selected, repr),
        }
      })
    })), [hovered, middleRadius, arcs, searchDate, selected])

  return (<g transform={`translate(${cx} ${cy})`}>
    {repsData.map(({data, x, y, isHighlighted, isSelected, isDisabled}) => <Representative
      x={x}
      y={y}
      key={data.id}
      isHighlighted={isHighlighted}
      isSelected={isSelected}
      isDisabled={isDisabled}
      handleMouseOver={onHoverRepresentative(data)}
      handleMouseLeave={onMouseLeaveRep}
      onClick={onClick(data)}
    />)}
  </g>)
})

export default Representatives