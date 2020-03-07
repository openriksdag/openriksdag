import React, {memo, useCallback, useMemo} from "react";
import "./MotionsChart.css";
import {values} from "ramda";
import {useDispatch} from "react-redux";
import {ChangeHover, Hovered} from "../../state/state";
import {isInDocument, isReferencedIn} from "../../relation-helpers"

const Title = memo(props => {
  const {data, type} = props;
  const dispatch = useDispatch()
  const handleMouseLeave = useCallback(() => dispatch(ChangeHover(Hovered.Nothing())), [dispatch]);
  const handleMouseEnter = useCallback(() =>
    dispatch(
      ChangeHover(
        type === "Motions" ? Hovered.Motion(data) : Hovered.Proposition(data)
      )
    ), [type, data, dispatch]);
  if (data.attachments[0]) {
    return (
      <div
        key={data.dok_id}
        className="motion"
        onMouseEnter={handleMouseEnter}
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

const byHovered = (currentContainer, hovered) => (doc) =>
  Hovered.case(hovered, {
    Representative: ({data: repr}) => isInDocument(doc.intressent, repr.id),
    Motion: ({data: motion}) => currentContainer === "Motions" ? true : isReferencedIn(doc, motion),
    Proposition: ({data: proposition}) => currentContainer === "Proposals" ? true : isReferencedIn(doc, proposition),
    Committee: ({name: committee}) => (currentContainer === "Motions" ? doc.organ : doc.mottagare) === committee,
    Nothing: () => true
  })

const MotionsChart = props => {
  const {type, description, reverse, data, hovered} = props;
  const motions = useMemo(() => values(data), [data]);

  return (
    <div className={reverse ? "wrapper reverse" : "wrapper"}>
      <div className={reverse ? "infoContainer flipText" : "infoContainer"}>
        <span id="description">{description}</span>
      </div>

      <figure className="squareContainer">
        <span className="motionType">{type}</span>
        <div className="motionContainer">
          {motions.filter(byHovered(type, hovered)).map(d => (
            <Title
              key={d.dok_id}
              data={d}
              type={type}
              hovered={hovered}
            />
          ))}
        </div>
      </figure>
    </div>
  );
};

export default MotionsChart;
