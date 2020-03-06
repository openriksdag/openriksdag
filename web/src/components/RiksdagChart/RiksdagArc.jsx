import React, { useMemo } from "react";
import * as d3 from "d3"
import { calculateArcs } from "./chart-helpers"

const RiksdagArc = ({ data, parties, innerRadius, arcWidth, cx, cy }) => {
  const outerRadius = innerRadius + arcWidth + 0.5

  const arcs = useMemo(() => calculateArcs(parties, data), [parties, data])

  const arcBuilder = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

  return <g transform={`translate(${cx} ${cy})`}>
    {arcs.map(arc =>
      <path
        key={`${innerRadius}-${arc.data.label}`}
        d={arcBuilder(arc)}
        fill={arc.data.color}
      />)
    }
  </g>
}

export default RiksdagArc