import React, {memo, useCallback, useMemo} from "react";
import "./MotionsChart.css";
import {values} from "ramda";
import {useDispatch} from "react-redux";
import {ChangeHover, Hovered} from "../../state/state";
import {isInDocument, isReferencedIn} from "../../relation-helpers"
import {CellMeasurer, CellMeasurerCache, List} from "react-virtualized"

const Title = memo(props => {
  const {data, type, handleMouseOver, handleMouseLeave} = props;
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

const byHovered = (currentContainer, hovered) => (doc) =>
  Hovered.case(hovered, {
    Representative: ({data: repr}) => isInDocument(doc.intressent, repr.id),
    Motion: ({data: motion}) => currentContainer === "Motions" ? true : isReferencedIn(doc, motion),
    Proposition: ({data: proposition}) => currentContainer === "Proposals" ? true : isReferencedIn(doc, proposition),
    Committee: ({name: committee}) => (currentContainer === "Motions" ? doc.organ : doc.mottagare) === committee,
    Nothing: () => true
  })

const cache = new CellMeasurerCache({
  defaultWidth: 144,
  minHeight: 16,
  fixedWidth: true
})

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
          <List
            height={165}
            width={144}
            rowHeight={cache.rowHeight}
            deferredMeasurementCache={cache}
            rowCount={filteredMotions.length}
            rowRenderer={({index, key, parent}) =>
              <CellMeasurer
                key={key}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
                cache={cache}
              >
                <Title
                  key={key}
                  data={filteredMotions[index]}
                  type={type}
                  hovered={hovered}
                  handleMouseOver={handleMouseOver(filteredMotions[index], type)}
                  handleMouseLeave={handleMouseLeave}
                />
              </CellMeasurer>}
          />
        </div>
        <span className="motionType">{type}</span>
      </figure>
    </div>
  );
};

export default MotionsChart;
