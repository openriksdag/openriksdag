import React from "react";

const CommitteeInfo = ({ hovered, selected }) => {
  const shownFor = "committee";
  const hoveredItem = hovered[shownFor];
  const selectedItem = selected[shownFor];

  return (
    <div className="committee-info">
      <div>selected: {selectedItem || hoveredItem} </div>
    </div>
  );
};

export default CommitteeInfo;
