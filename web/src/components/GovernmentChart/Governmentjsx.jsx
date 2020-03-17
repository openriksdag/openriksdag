import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeHover, Select, Selected } from "../../state/state";
import "../GovernmentChart/GovernmentWrapper.css";
import tippy, { followCursor } from "tippy.js";
// import 'tippy.js/dist/tippy.css';
// import tippy, { followCursor } from 'tippy.js';




const governmentData = [
    { cx: -20, cy: 0, name_eng: "Ministry", name: "Stats­minister" },
    { cx: 30, cy: 0, name_eng: "Finance Ministry", name: "Finans­departementet" },
    { cx: -70, cy: 45, name_eng: "Defense Ministry", name: "Försvars­departementet" },
    { cx: -20, cy: 45, name_eng: "Infrastructure Ministry", name: "Infrastruktur­departementet" },
    { cx: 30, cy: 45, name_eng: "Justice Ministry", name: "Justitie­departementet" },
    { cx: 80, cy: 45, name_eng: "Culture Ministry", name: "Kultur­departementet" },
    { cx: -70, cy: 90, name_eng: "Environment Ministry", name: "Miljö­departementet" },
    { cx: -20, cy: 90, name_eng: "Commerce Ministry", name: "Närings­departementet" },
    { cx: 30, cy: 90, name_eng: "Social Affair Ministry", name: "Social­departementet" },
    { cx: 80, cy: 90, name_eng: "Education Ministry", name: "Utbildnings­departementet" },
    { cx: -20, cy: 135, name_eng: "Foreign Affair Ministry", name: "Utrikes­departementet" },
    { cx: 30, cy: 135, name_eng: "Labor Ministry", name: "Arbetsmarknads­­departementet" }

];

const ministryRadius = 20,
    ministryColor = {
        background: "white",
        hover: "grey",
        highlight: "grey"
    }


const Tooltip = ({ name }) => (
    <svg>
        <g className="tooltip">
            <rect
                x={15}
                y={0}
                width={150}
                height={25}
                rx={5}
                fill="#ECECEC" />

            <text x={15} dy="1.2em">{name}</text>
        </g>
    </svg>

);





/* */


const Ministry = ({
    cx,
    cy,
    name,
    onHover,
    onLeaveHover,
    isHovered,
    isHighlighted }) => (
        <g
            className={"ministry"}
            onMouseOver={onHover}
            onMouseLeave={onLeaveHover}

        >
            <circle
                cx={cx}
                cy={cy}
                r={ministryRadius}
                fill={
                    isHovered ?
                        ministryColor.hover
                        : isHighlighted
                            ? ministryColor.highlight
                            : ministryColor.background}
            >
            </circle>

        </g>
    )


const Government = props => {
    const height = 260,
        width = 365;

    // tippy('#Finans­departementet', {
    //     followCursor: 'initial',
    //     content: 'Tooltip'
    // });

    // tippy('#my', {
    //     followCursor: 'initial',
    //     content: 'Tooltip'
    // });

    const { hovered, selected } = useSelector(state => state)
    const isHovered = name =>
        hovered.ministry != null && hovered.ministry === name;


    const isHighlighted = name => {

        var result = selected.proposition != null &&
            selected.proposition.organ === name ||
            hovered.proposition != null &&
            hovered.proposition.organ === name;

        if (hovered.motion != null) {
            console.log("it's motion");
        } else {
            console.log("it's not motion")
            if (hovered.proposition != null) {
                console.log("it's proposition")
                console.log(hovered.proposition.organ);
            }
        }
        return result
    }

    return (
        <div>

            <svg height={height} width={width} className="government">
                <g transform="translate(175,60)">
                    {governmentData.map(({ cx, cy, name, name_eng }) => (
                        <g>
                            <Ministry className="ministry" key={name}
                                cx={cx}
                                cy={cy}
                                name={name}
                                isHighlighted={isHighlighted(name)}
                                isHovered={isHovered(name)}

                            />
                            {/* <Tooltip name={name_eng} /> */}
                            <title>{name_eng}</title>
                        </g>

                    ))}


                    <text x={-45} y={200} fill="black">GOVERNMENT</text>


                </g>

            </svg>


        </div>
    )


};
export default Government;