import React, {memo, useCallback, useMemo} from "react";
import "./MotionsChart.css";
import {values, sortBy} from "ramda";
import {useDispatch} from "react-redux";
import {ChangeHover, Select, Selected} from "../../state/state";
import {isInDocument, isReferencedIn} from "../../relation-helpers";
import extLink from "../../images/ext-link.png";

function Points({data}) {
  return <div className="betankandePoints">
    {sortBy((p) => parseInt(p['punkt']), data.points).map(point => (
      <div key={`point-${point['punkt']}`} className="betankandePoint">
        <div className="pointTitle">
          <span>{point['punkt']}.</span>
          <span>{point['rubrik']}</span>
        </div>
        <div className="pointDecision">
          <span>{point['vinnare'] === 'utskottet' ? 'Approved' : point['vinnare'] == null ? 'No decision' : 'Proviso'}</span>
          <span>{point['beslutstyp'] != null ? point['beslutstyp'] === 'röstning' ? 'by voting' : 'by acclamation' : ''}</span>
        </div>
      </div>
    ))}
  </div>
}

const Betakande = memo(props => {
  const {data, isSelected, handleMouseOver, handleMouseLeave, onClick} = props;
  if (data.attachments[0]) {
    return (
      <div
        key={data.dok_id}
        className="betankande"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div className="betankandeHeader">
          <div className="motionTitle" onClick={onClick}>
            {data.attachments[0].titel} <br/>
          </div>
          <div className="motionLink">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={data.attachments[0].url}
            >
              <img src={extLink} alt="Read more"/>
            </a>
          </div>
        </div>
        {!isSelected && data.points && <span>{`${data.points.length} points`}</span>}
        {isSelected && data.points && (< Points isSelected={isSelected} data={data}/>)}
      </div>
    );
  } else {
    return null;
  }
});

const Motion = memo(props => {
  const {data, handleMouseOver, handleMouseLeave, onClick} = props;
  if (data.attachments[0]) {
    return (
      <div
        key={data.dok_id}
        className="motion"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div className="motionTitle" onClick={onClick}>
          {data.attachments[0].titel} <br/>
        </div>
        <div className="motionLink">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data.attachments[0].url}
          >
            <img src={extLink} alt="Read more"/>
          </a>
        </div>
      </div>
    );
  } else {
    return null;
  }
});

const byHoverAndSelection = (
  currentContainer,
  {
    representative: hoveredRep,
    motion: hoveredMotion,
    proposition: hoveredProp,
    committee: hoveredCommittee
  },
  {
    representative: selectedRep,
    motion: selectedMotion,
    proposition: selectedProp,
    committee: selectedCommittee
  }
) => doc =>
  (currentContainer === "Motions" &&
    selectedRep != null &&
    isInDocument(doc.intressent, selectedRep.id)) ||
  (currentContainer === "Motions" &&
    hoveredRep != null &&
    selectedRep == null &&
    isInDocument(doc.intressent, hoveredRep.id)) ||
  (selectedCommittee != null && doc.organ === selectedCommittee) || //This is where i removed "mottagare"
  (hoveredCommittee != null &&
    selectedCommittee == null &&
    doc.organ === hoveredCommittee) || //This is also where i removed "mottagare"
  (currentContainer === "Motions" && selectedMotion === doc) ||
  (currentContainer === "Proposals" && selectedProp === doc) ||
  (currentContainer === "Motions" &&
    hoveredProp != null &&
    isReferencedIn(doc, hoveredProp)) ||
  (currentContainer === "Proposals" &&
    hoveredMotion != null &&
    isReferencedIn(doc, hoveredMotion)) ||
  (currentContainer === "Motions" &&
    selectedProp != null &&
    isReferencedIn(doc, selectedProp)) ||
  (currentContainer === "Proposals" &&
    selectedMotion != null &&
    isReferencedIn(doc, selectedMotion));

const MotionsChart = props => {
  const {type, description, reverse, data, hovered, selected} = props;
  const motions = useMemo(() => values(data), [data]);
  const filteredMotions = motions.filter(
    byHoverAndSelection(type, hovered, selected)
  );

  const dispatch = useDispatch();
  const handleMouseLeave = useCallback(
    () => dispatch(ChangeHover(Selected.Nothing())),
    [dispatch]
  );
  const handleMouseOver = (data, type) => () =>
    dispatch(
      ChangeHover(
        type === "Motions" ? Selected.Motion(data) : Selected.Proposition(data)
      )
    );

  const handleClick = (data, type) => () =>
    dispatch(
      Select(
        type === "Motions" ? Selected.Motion(data) : Selected.Proposition(data)
      )
    );

  const betankandeRenderer = bet => (
    <Betakande
      key={bet.dok_id}
      data={bet}
      hovered={hovered}
      handleMouseOver={handleMouseOver(bet, type)}
      handleMouseLeave={handleMouseLeave}
      onClick={handleClick(bet, type)}
      isSelected={selected.proposition != null && selected.proposition.dok_id === bet.dok_id}
    />
  )

  const motionRenderer = motion => (
    <Motion
      key={motion.dok_id}
      data={motion}
      hovered={hovered}
      handleMouseOver={handleMouseOver(motion, type)}
      handleMouseLeave={handleMouseLeave}
      onClick={handleClick(motion, type)}
    />
  )

  const itemRenderer = type === 'Motions' ? motionRenderer : betankandeRenderer

  return (
    <div className={reverse ? "wrapper reverse" : "wrapper"}>
      <div className={reverse ? "infoContainer flipText" : "infoContainer"}>
        {description}
      </div>

      <div className="squareContainer">
        <div className="motionContainer">
          {filteredMotions.map(itemRenderer)}
        </div>
        <span className="motionType">{type}</span>
      </div>
    </div>
  );
};

export default MotionsChart;
