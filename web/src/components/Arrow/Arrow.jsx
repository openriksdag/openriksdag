import * as d3 from 'd3';
import React, { useMemo } from "react";



const Arrow = ({ index }) => {

    const data = [
        { x0: 130, y0: 10, x1: 30, y1: 30, x2: 10, y2: 100 },
        { x0: 10, y0: 10, x1: 30, y1: 70, x2: 130, y2: 100 },
        { x0: 10, y0: 100, x1: 120, y1: 70, x2: 130, y2: 10 },
        { x0: 130, y0: 100, x1: 100, y1: 30, x2: 10, y2: 10 },
        { x0: 130, y0: 60, x1: 60, y1: 30, x2: 10, y2: 60 },
    ]

    const { x0, y0, x1, y1, x2, y2 } = data[index];

    return (
        <svg width="150" height="120">
            <g transform={`translate(0,0)`}>
                <defs>
                    <marker
                        id="triangle"
                        refX="6"
                        refY="6"
                        markerWidth="40"
                        markerHeight="40"
                        markerUnits="userSpaceOnUse"
                        orient="auto"
                    >
                        <path
                            d="M 0 0 12 6 0 12 3 6"
                            fill="#D4D4D4"
                        />
                    </marker>
                </defs>

                <path
                    className="arc"
                    d={`M ` + `${x0}` + ` ` + `${y0}` + ` Q ` + `${x1}` + ` ` + `${y1}` + ` ` + `${x2}` + ` ` + `${y2}`}
                    fill="transparent"
                    stroke="#D4D4D4"
                    stroke-width="4"
                    marker-end={`url(#triangle)`}
                />

            </g>
        </svg >
    )
}

export default Arrow

