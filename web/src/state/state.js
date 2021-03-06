import peopleData from "../data/people.json";
import propoData from "../data/betankande.json";
import motionsData from "../data/motions.json";
import votes from "../data/votes_by_id.json";
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";
import makeUnion from "./union";
import {isDraft, original} from "immer";
import * as R from "ramda"
import {isChamberMemberAsOf} from "../relation-helpers"

export const Selected = makeUnion("Selected", {
  Nothing: () => ({}),
  Representative: data => ({data}),
  Committee: name => ({name}),
  Motion: data => ({data}),
  Proposition: data => ({data}),
  Voting: (voteId, propositionData) => ({voteId, propositionData})
});

const initialSelected = {
  representative: null,
  committee: null,
  motion: null,
  proposition: null,
  voting: null,
};

const processVotes = (votes) => {
  const votesOnly = R.map(item => item.votes, votes)
  const votesByVoter = (votesList) => R.map(item => item.vote, R.indexBy(item => item.intressent_id, votesList))
  return R.map(votesByVoter, votesOnly)
}

const searchDate = "2020-02-01"

const initialState = {
  peopleData: R.filter(isChamberMemberAsOf(searchDate), R.values(peopleData)),
  motionsData,
  propoData,
  votes: processVotes(votes),
  hovered: initialSelected,
  selected: initialSelected,
  searchDate: searchDate
};

export const ChangeHover = createAction("ChangeHover");

export const Select = createAction("Select");

const reducer = createReducer(initialState, {
  [ChangeHover.type]: (state, action) => ({
    ...state,
    hovered: Selected.case(action.payload, {
      Representative: ({data}) => ({
        ...initialSelected,
        representative: data
      }),
      Committee: ({name}) => ({...initialSelected, committee: name}),
      Proposition: ({data}) => ({...initialSelected, proposition: data}),
      Motion: ({data}) => ({...initialSelected, motion: data}),
      Voting: ({voteId}) => ({...initialSelected, voting: voteId}),
      Nothing: () => initialSelected
    })
  }),
  [Select.type]: (state, action) => {
    const selected = state.selected;
    const toggle = (current, newVal) =>
      (isDraft(current) ? original(current) : current) !== newVal
        ? newVal
        : null;
    return {
      ...state,
      selected: Selected.case(action.payload, {
        Representative: ({data}) => ({
          ...initialSelected,
          representative: toggle(selected.representative, data)
        }),
        Committee: ({name}) => ({
          ...initialSelected,
          committee: toggle(selected.committee, name)
        }),
        Proposition: ({data}) =>
          selected.voting != null && original(selected.proposition) === data ?
            ({...initialSelected, proposition: data})
            : ({
              ...initialSelected,
              proposition: toggle(selected.proposition, data)
            }),
        Motion: ({data}) => ({
          ...initialSelected,
          motion: toggle(selected.motion, data)
        }),
        Voting: ({voteId, propositionData}) => ({
          ...initialSelected,
          proposition: propositionData,
          voting: toggle(selected.voting, voteId),
        }),
        Nothing: () => initialSelected
      })
    };
  }
});

export const state = configureStore({
  reducer
});
