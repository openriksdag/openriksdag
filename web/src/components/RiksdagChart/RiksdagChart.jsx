import React, {useMemo} from "react";
import "./RiksdagsChart.css";
import * as R from 'ramda'

import vansterpartietLogo from '../../images/logo-v-large.jpg'
import socialdemokraternaLogo from '../../images/logo-s-large.jpg'
import miljopartietLogo from '../../images/logo-mp-large.jpg'
import sverigedemokraternaLogo from '../../images/logo-sd-large.jpg'
import moderaternaLogo from '../../images/logo-m-large.jpg'
import centerpartietLogo from '../../images/logo-c-large.jpg'
import liberalernaLogo from '../../images/logo-l-large.jpg'
import kristdemokraternaLogo from '../../images/logo-kd-large.jpg'
import RiksdagArc from "./RiksdagArc"
import {LogosArc} from "./LogosArc"

const partyData = [
  {label: "V", name: "Vänsterpartiet", logo: vansterpartietLogo, color: "#9B0100"},
  {label: "S", name: "Socialdemokraterna", logo: socialdemokraternaLogo, color: "#EE1F21"},
  {label: "MP", name: "Miljöpartiet", logo: miljopartietLogo, color: "#53a045"},
  {label: "SD", name: "Sverigedemokraterna", logo: sverigedemokraternaLogo, color: "#DBBE13"},
  {label: "M", name: "Moderaterna", logo: moderaternaLogo, color: "#32ABFF"},
  {label: "C", name: "Centerpartiet", logo: centerpartietLogo, color: "#017A26"},
  {label: "L", name: "Liberalerna", logo: liberalernaLogo, color: "#3D6BFF"},
  {label: "KD", name: "Kristdemokraterna", logo: kristdemokraternaLogo, color: "#1F3B96"}
]

function arrangeRepresentativesInArcs(numArcs, validRoleStatuses, people, date) {
  const isChamberMemberAsOf = (date) => ({party, roles}) =>
    (party !== "-" && roles.some(({organ, status, from, to}) =>
        organ === 'kam' && date >= from && date <= to && R.includes(status, validRoleStatuses)
      )
    )

  const membersByParty = R.groupBy(x => x.party,
    R.filter(isChamberMemberAsOf(date), R.values(people))
  )

  const arcSeats = R.range(0, numArcs).map(i => 22 + i * 3)

  const membersToArc = (remainingMembers, totalSeats) => {
    const membersCount = R.map(R.length, remainingMembers)
    const totalMembers = R.sum(R.values(membersCount))
    const seatsPerParty = R.zipObj(partyData.map(party => party.label), partyData.map(party => {
      const fraction = membersCount[party.label] / totalMembers
      return Math.round(fraction * totalSeats)
    }))
    const splitMembers = R.mapObjIndexed(
      (members, label) => R.splitAt(seatsPerParty[label], members)
      , remainingMembers
    )

    const [membersInArc, membersRemaining] = [R.map(R.head, splitMembers), R.map(R.last, splitMembers)]
    return [membersRemaining, membersInArc]
  }

  const [ignore, arcs] = R.mapAccum(membersToArc, membersByParty, arcSeats)
  return arcs
}

const RiksdagChart = props => {
  const {people, date} = props;
  console.assert(date != null)

  const numArcs = 10,
    chartWidth = 700,
    chartHeight = 300,
    chartTopPadding = 30,
    chartBottomPadding = 5,
    innerRadius = 100,
    arcWidth = ((chartHeight - innerRadius - chartTopPadding) / numArcs);

  const validRoleStatuses = ['Tjänstgörande', 'Ersättare']

  const arcs = useMemo(
    () => arrangeRepresentativesInArcs(numArcs, validRoleStatuses, people, date),
    [numArcs, validRoleStatuses, people, date]
  )

  return <div className="pie-container">
    <svg width={chartWidth} height={chartHeight + chartBottomPadding}>
      {arcs.map((arcData, index) =>
        <RiksdagArc
          key={`arc-${index}`}
          data={arcData}
          parties={partyData}
          innerRadius={innerRadius + (arcWidth * index)}
          arcWidth={arcWidth}
          cx={chartWidth / 2}
          cy={chartHeight}
        />)}
      <LogosArc data={R.last(arcs)}
                parties={partyData}
                radius={chartHeight}
                width={chartTopPadding - 4}
                cx={chartWidth / 2}
                cy={chartHeight}
      />
    </svg>
  </div>;
};

export default RiksdagChart;
