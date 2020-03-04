import React from "react";
import * as d3 from "d3"
import * as R from "ramda"
import {calculateArcs, degreesToRadians} from "./chart-helpers"

const RiksdagArc = ({data, parties, innerRadius, arcWidth, cx, cy}) => {
  const outerRadius = innerRadius + arcWidth
  const middleRadius = innerRadius + (arcWidth / 2)

  const arcs = calculateArcs(parties, data)

  const arcBuilder = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

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
  return <g transform={`translate(${cx} ${cy})`}>
    {arcs.map(arc => <path key={`${innerRadius}-${arc.data.label}`} d={arcBuilder(arc)} fill={arc.data.color}/>)}
    {repsData.map(({data, x, y}) =>
      <circle
        cx={x}
        cy={y}
        r="4"
        key={data.id}
        style={{position: "absolute", fill: "rgba(255, 255, 255, 0.8)"}}
        data-repr-id={data.id}
        data-repr-party={data.party}
      />
    )}
  </g>
}

export default RiksdagArc