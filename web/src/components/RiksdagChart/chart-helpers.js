import * as d3 from "d3"

export const degreesToRadians = (degrees) => degrees * (Math.PI / 180)

export function calculateArcs(parties, data) {
  const pieBuilder = d3.pie()
    .value(x => x.count)
    .startAngle(degreesToRadians(-90))
    .endAngle(degreesToRadians(90))
    .sort(null)
  const dataAsPieInput = parties.map((party) => ({
    label: party.label,
    color: party.color,
    count: data[party.label].length,
    reps: data[party.label],
    party
  }))
  return pieBuilder(dataAsPieInput)
}

const votesToClassName = {
  'Ja': 'vote-yes',
  'Nej': 'vote-no',
  'Frånvarande': 'vote-abstained',
  'Avstår': 'vote-absent',
  [undefined]: 'vote-irrelevant'
}

export const votesPrettyText = {
  'vote-yes': 'voted Yes',
  'vote-no': 'voted No',
  'vote-abstained': 'Abstained',
  'vote-absent': 'was Absent',
  'vote-irrelevant': 'was not in parliament'
}

const mapVoteToClass = voteInSv => votesToClassName[voteInSv]

export const getVote = (id, {voting}, votes) =>
  voting != null ?
    mapVoteToClass(votes[voting][id])
    : null