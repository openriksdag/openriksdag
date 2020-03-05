import React from "react"
import {calculateArcs, degreesToRadians} from "./chart-helpers"
import * as R from "ramda"
import * as d3 from "d3"

export const LogosArc = ({data, parties, radius, width, cx, cy}) => {
  const arcs = calculateArcs(parties, data)
  const displayData = arcs.map(arc => ({
    angle: ((arc.endAngle - arc.startAngle) / 2) + arc.startAngle - degreesToRadians(90),
    color: arc.data.color,
    label: arc.data.label,
    logo: arc.data.party.logo,
    name: arc.data.party.name
  }))

  return (<g transform={`translate(${cx} ${cy})`}>
      {displayData.map(
        ({angle, color, label, logo}) => {
          const x = (Math.cos(angle) * radius) - (width / 2)
          const y = (Math.sin(angle) * radius)
          return (<g key={`logo-${label}`} transform={`translate(${x} ${y})`}>
            <image xlinkHref={logo}
                   width={width}
                   height={width}
                   style={{
                     backgroundSize: `${width}px ${width}px`,
                     clipPath: `url(#clip-${label})`
                   }}
            />
            <circle cx={width / 2} cy={width / 2} r={width / 2} strokeWidth={1} stroke={color} fill={'none'}/>
            <clipPath id={`clip-${label}`} >
              <circle cx={width / 2} cy={width / 2} r={width / 2} strokeWidth={1} stroke={color} fill={'none'}/>
            </clipPath>
          </g>)
        }
      )}
    </g>
  )
}