import React from "react";
import './Arrow.css'


const Arrow = ({index, shownFor, hovered, selected}) => {

  const data = [
    {x0: 130, y0: 10, x1: 30, y1: 30, x2: 10, y2: 100},
    {x0: 10, y0: 10, x1: 30, y1: 70, x2: 130, y2: 100},
    {x0: 10, y0: 100, x1: 120, y1: 70, x2: 130, y2: 10},
    {x0: 130, y0: 100, x1: 100, y1: 30, x2: 10, y2: 10},
    {x0: 130, y0: 60, x1: 60, y1: 30, x2: 10, y2: 60},
  ]

  const hoveredItem = hovered[shownFor]
  const selectedItem = selected[shownFor]
  const label = (item) => ({
    'representative': `${item.first_name} ${item.last_name} proposed:`,
    'motion': `Motion ${item.dok_id} was discussed in:`,
    'committee': `${item} brought to decision:`,
    'proposition': `Proposition ${item.dok_id} was brought to decision:`
  }[shownFor])

  const {x0, y0, x1, y1, x2, y2} = data[index];

  return (
    <div className={`arrow arrow-${shownFor}`}>
      <svg width="150" height="120">
        <g transform={`translate(0,0)`}>
          <defs>
            <marker
              id={`triangle-${index}`}
              refX="6"
              refY="6"
              markerWidth="40"
              markerHeight="40"
              markerUnits="userSpaceOnUse"
              orient="auto"
            >
              <path
                d="M 0 0 12 6 0 12 3 6"
                fill={ hoveredItem != null || selectedItem != null ? "#505050" : "#D4D4D4"}
              />
            </marker>
          </defs>

          <path
            className="arc"
            d={`M ` + `${x0}` + ` ` + `${y0}` + ` Q ` + `${x1}` + ` ` + `${y1}` + ` ` + `${x2}` + ` ` + `${y2}`}
            fill="transparent"
            stroke={ hoveredItem != null || selectedItem != null ? "#505050" : "#D4D4D4"}
            strokeWidth="4"
            markerEnd={`url(#triangle-${index})`}
          />

        </g>
      </svg>
      {hoveredItem != null || selectedItem != null ?
        <div className={"label"}>{label(selectedItem || hoveredItem)}</div>
        : null
      }
    </div>)
}

export default Arrow

