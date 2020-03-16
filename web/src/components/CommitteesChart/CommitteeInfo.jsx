import React from "react";
import { committeeData } from "../../data/committees.js";

const CommitteeInfo = ({ hovered, selected, shownFor }) => {
  const hoveredItem = hovered[shownFor];
  const selectedItem = selected[shownFor];

  return (
    (hoveredItem || selectedItem) && (
      <div className="committee-info">
        <h2>
          {
            committeeData.filter(
              item =>
                item.shortName === hoveredItem ||
                item.shortName === selectedItem
            )[0].nameSv
          }
        </h2>
        <h3>
          {
            committeeData.filter(
              item =>
                item.shortName === hoveredItem ||
                item.shortName === selectedItem
            )[0].description
          }
        </h3>
        <p>
          The 15 parliamentary committees ensure that all motions and
          propositions are considered thoroughly before any decisions are taken.
          In addition to its 17 members, each committee hires independent
          experts to bring insight in complex matters.
        </p>
      </div>
    )
  );
};

export default CommitteeInfo;
