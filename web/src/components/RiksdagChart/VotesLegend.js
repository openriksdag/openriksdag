import React from "react"
import * as R from 'ramda'
import './VotesLegend.css'

const VotesLegend = ({voting, votes, people}) => {
  if (voting == null || votes[voting] == null) {
    return null
  }

  const vote = votes[voting]
  const presentIds = R.map(R.prop('id'), people)
  const voteOnlyPresent = R.pick(presentIds, vote)
  const summary = R.countBy(R.identity, R.values(vote))
  const summaryOnlyPresent = R.countBy(R.identity, R.values(voteOnlyPresent))

  return (<div className="votes-legend">
    <div>
      <div />
      <span/>
      <span/>
      <span>shown</span>
    </div>
    <div>
      <div className="vote-yes"/>
      <span>Yes</span>
      <span>{summary['Ja']}</span>
      <span>({summaryOnlyPresent['Ja']})</span>
    </div>
    <div>
      <div className="vote-no"/>
      <span>No</span>
      <span>{summary['Nej']}</span>
      <span>({summaryOnlyPresent['Nej']})</span>
    </div>
    <div>
      <svg viewBox="0 0 10 10" width={10} height={10} className="vote-abstained">
        <circle cx={5} cy={5} r={5}/>
        <line x1={2.5} x2={7.5} y1={5} y2={5} strokeWidth={3} stroke="white"/>
      </svg>
      <span>Abstained</span>
      <span>{summary['Frånvarande']}</span>
      <span>({summaryOnlyPresent['Frånvarande']})</span>
    </div>
    <div>
      <div className="vote-absent"/>
      <span>Absent</span>
      <span>{summary['Avstår']}</span>
      <span>({summaryOnlyPresent['Avstår']})</span>
    </div>
    <div>
      <div className="vote-not-member"/>
      <span>Not members of parliament</span>
      <span>{R.sum(R.values(summary)) - R.sum(R.values(summaryOnlyPresent))}</span>
    </div>
  </div>)
}

export default VotesLegend