import React from "react";
import committeeData from "../data/committees.json";

const ShowInfo = ({ hovered, selected, shownFor }) => {
  const hoveredItem = hovered[shownFor];
  const selectedItem = selected[shownFor];

  switch (shownFor) {
    case "committee":
      return (
        hoveredItem && (
          <div className="chart-info">
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
              propositions are considered thoroughly before any decisions are
              taken. In addition to its 17 members, each committee hires
              independent experts to bring insight in complex matters.
            </p>
          </div>
        )
      );
    case "motion":
      return (
        hoveredItem && (
          <div className="chart-info">
            <h2>Motions &amp; Propositions</h2>
            <h3>Click to select a motion or proposition</h3>
            <p>
              Propositions are submitted by the ministries in the government and
              can be proposals for changes in legislation or regarding any other
              topic. Motions are proposals coming from one or several members of
              the Riksdag.
            </p>
          </div>
        )
      );
    case "representative":
      return (
        hoveredItem && (
          <div className="chart-info">
            <h2>The Riksdag</h2>
            <h3>Click to select a representative</h3>
            <p>
              The Riksdag has 349 members representing eight political parties
              who are elected every four years. This is where voting regarding
              the committees’ proposals occurs. The Riksdag also houses debates
              between the representatives, many of which are open to the public.
            </p>
          </div>
        )
      );
    case "proposition":
      return (
        hoveredItem && (
          <div className="chart-info">
            <h2>Proposals for Decision</h2>
            <h3>Click a proposal to see how representatives voted</h3>
            <p>
              The committees present proposals for decisions to be voted upon by
              the Riksdag. These are based on the original propositions and
              motions and have been worked through by the committee best suited
              to the topic.
            </p>
          </div>
        )
      );
    case "government":
      return (
        hoveredItem && (
          <div className="chart-info">
            <h2>Government</h2>
            <p>
              The party or parties that attains the highest percentage of votes
              may form a government and appoint ministers. Each of the eleven
              ministries is made up of one or several ministers as well as a
              chancellery that works on propositions.
            </p>
          </div>
        )
      );
    default:
      return null;
  }
};

export default ShowInfo;
