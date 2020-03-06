import {ChangeHover, Hovered} from "../../state/state"
import React, {useMemo} from "react"
import * as R from "ramda"
import {calculateArcs, degreesToRadians} from "./chart-helpers"
import {useDispatch} from "react-redux"
import {isInCommittee, isInDocument} from "../../relation-helpers"

const Representatives = ({data, parties, innerRadius, arcWidth, cx, cy, hovered, searchDate}) => {
  const dispatch = useDispatch();

  const middleRadius = innerRadius + (arcWidth / 2)

  const arcs = useMemo(() => calculateArcs(parties, data), [parties, data])

  const repsData = R.flatten(
    arcs.map(({startAngle, endAngle, data}) => {
      const {reps, count} = data
      const totalAngle = endAngle - startAngle;
      const reprAngle = totalAngle / count;
      return reps.map((repr, index) => {
        const angle = (startAngle + (reprAngle / 2)) + (reprAngle * index) - degreesToRadians(90)
        return {data: repr, x: middleRadius * Math.cos(angle), y: middleRadius * Math.sin(angle)}
      })
    }))

  const isHovered = (representative) =>
    Hovered.case(hovered, {
      Representative: ({data}) => data.id === representative.id,
      otherwise: () => false
    })

  const isHighlighted = (rep) =>
    Hovered.case(hovered, {
      Committee: ({name}) => isInCommittee(rep, name, searchDate),
      Motion: ({data}) => isInDocument(data.intressent, rep.id),
      Proposition: ({data}) => isInDocument(data.intressent, rep.id),
      otherwise: () => false
    })

  return (<g transform={`translate(${cx} ${cy})`}>
    {repsData.map(({data, x, y}) =>
      <circle
        cx={x}
        cy={y}
        r={5}
        key={data.id}
        style={{
          position: "absolute",
          fill: "rgba(255, 255, 255, 0.8)",
        }}
        className={
          `representative ${isHovered(data) ? "hover" : ""} ${isHighlighted(data) ? "highlight" : ""}`}
        data-repr-id={data.id}
        data-repr-party={data.party}
        onMouseOver={() => dispatch(ChangeHover(Hovered.Representative(data)))}
        onMouseLeave={() => dispatch(ChangeHover(Hovered.Nothing()))}
      />
    )}
  </g>)
}

export default Representatives