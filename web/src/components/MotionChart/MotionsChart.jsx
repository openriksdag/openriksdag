import React, {memo, useCallback, useMemo} from "react";
import "./MotionsChart.css";
import {values} from "ramda";
import {useDispatch} from "react-redux";
import {ChangeHover, Hovered} from "../../state/state";
import {isInDocument, isReferencedIn} from "../../relation-helpers"

const Title = memo(props => {
  const {data, handleMouseOver, handleMouseLeave} = props;
  if (data.attachments[0]) {
    return (
      <div
        key={data.dok_id}
        className="motion"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <a target="_blank" rel="noopener noreferrer" href={data.attachments[0].url}>
          {data.attachments[0].titel}
        </a>
      </div>
    );
  } else {
    return null;
  }
});

const byHovered = (currentContainer, {representative, motion, proposition, committee}) => (doc) =>
  (representative != null && isInDocument(doc.intressent, representative.id)) ||
  (motion != null && (currentContainer === "Motions" ? true : isReferencedIn(doc, motion))) ||
  (proposition != null && (currentContainer === "Proposals" ? true : isReferencedIn(doc, proposition))) ||
  (committee != null && (currentContainer === "Motions" ? doc.organ : doc.mottagare) === committee) ||
  (representative == null && motion == null && proposition == null && committee == null)

const MotionsChart = props => {
  const {type, description, reverse, data, hovered} = props;
  const motions = useMemo(() => values(data), [data]);
  const filteredMotions = motions.filter(byHovered(type, hovered))

  const dispatch = useDispatch()
  const handleMouseLeave = useCallback(() => dispatch(ChangeHover(Hovered.Nothing())), [dispatch]);
  const handleMouseOver = (data, type) => () =>
    dispatch(
      ChangeHover(
        type === "Motions" ? Hovered.Motion(data) : Hovered.Proposition(data)
      )
    )

  return (
    <div className={reverse ? "wrapper reverse" : "wrapper"}>
      <div className={reverse ? "infoContainer flipText" : "infoContainer"}>
        <span id="description">{description}</span>
      </div>

      <figure className="squareContainer">
        <div className="motionContainer">
          {filteredMotions.map((motion) =>
            <Title
              key={motion.dok_id}
              data={motion}
              hovered={hovered}
              handleMouseOver={handleMouseOver(motion, type)}
              handleMouseLeave={handleMouseLeave}
            />
          )
          }
        </div>
        <span className="motionType">{type}</span>
      </figure>
    </div>
  );
};

export default MotionsChart;
