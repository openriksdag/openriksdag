import React, {memo, useMemo} from "react";
import * as R from "ramda";
import classnames from 'classnames'
import {degreesToRadians} from "./chart-helpers";
import {isInCommittee, isInDocument} from "../../relation-helpers";

const Representative = memo(
  ({
     x,
     y,
     isHighlighted,
     handleMouseOver,
     handleMouseLeave,
     onClick,
     isSelected,
     isDisabled,
     vote
   }) => {
    const circle = <circle
      cx={x}
      cy={y}
      r={5}
      style={{
        position: "absolute"
      }}
      className={classnames(
        {
          representative: true,
          highlight: isHighlighted,
          selected: isSelected,
          disabled: isDisabled,
          [vote]: vote != null
        }
      )}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}>
    </circle>
    return (
      vote === 'vote-abstained' ?
        <g>
          {circle}
          <line x1={x - 2.5} x2={x + 2.5} y1={y} y2={y} stroke={'#FFFFFF'} strokeWidth={3}/>
        </g>
        : circle
    )
  }
);

const isSelected = ({representative: selected}, representative) =>
  selected != null && selected.id === representative.id;

const isDisabled = ({representative: selected}, representative) =>
  selected != null && selected.id !== representative.id;

const isHighlighted = (hovered, selected, searchDate, rep) =>
  (selected.committee == null &&
    hovered.committee != null &&
    isInCommittee(rep, hovered.committee, searchDate)) ||
  (selected.committee != null &&
    isInCommittee(rep, selected.committee, searchDate)) ||
  (hovered.motion != null && isInDocument(hovered.motion.intressent, rep.id)) ||
  (selected.motion != null && isInDocument(selected.motion.intressent, rep.id));

const votesToClassName = {
  'Ja': 'vote-yes',
  'Nej': 'vote-no',
  'Frånvarande': 'vote-abstained',
  'Avstår': 'vote-absent',
  [undefined]: 'vote-irrelevant'
}

const mapVoteToClass = voteInSv => votesToClassName[voteInSv]

const getVote = (id, {voting}, votes) =>
  voting != null ?
    mapVoteToClass(votes[voting][id])
    : null

const Representatives = memo(
  ({
     innerRadius,
     arcWidth,
     cx,
     cy,
     hovered,
     selected,
     votes,
     searchDate,
     arcs,
     onHoverRepresentative,
     onMouseLeaveRep,
     onClick

   }) => {
    const middleRadius = innerRadius + arcWidth / 2;

    const repsData = useMemo(
      () =>
        R.flatten(
          arcs.map(({startAngle, endAngle, data}) => {
            const {reps, count} = data;
            const totalAngle = endAngle - startAngle;
            const reprAngle = totalAngle / count;
            return reps.map((repr, index) => {
              const angle =
                startAngle +
                reprAngle / 2 +
                reprAngle * index -
                degreesToRadians(90);
              return {
                data: repr,
                x: middleRadius * Math.cos(angle),
                y: middleRadius * Math.sin(angle),
                isHighlighted: isHighlighted(
                  hovered,
                  selected,
                  searchDate,
                  repr
                ),
                isSelected: isSelected(selected, repr),
                isDisabled: isDisabled(selected, repr),
                vote: getVote(repr.id, selected, votes)
              };
            });
          })
        ),
      [hovered, middleRadius, arcs, searchDate, selected, votes]
    );

    return (
      <g transform={`translate(${cx} ${cy})`}>
        {repsData.map(
          ({data, x, y, isHighlighted, isSelected, isDisabled, vote}) => (
            <Representative
              x={x}
              y={y}
              key={data.id}
              isHighlighted={isHighlighted}
              isSelected={isSelected}
              isDisabled={isDisabled}
              handleMouseOver={onHoverRepresentative(data)}
              handleMouseLeave={onMouseLeaveRep}
              onClick={onClick(data)}
              vote={vote}
            />
          )
        )}
      </g>
    );
  }
);

export default Representatives;
