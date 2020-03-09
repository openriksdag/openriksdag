import peopleData from "../data/people.json";
import propoData from "../data/propositions.json";
import motionsData from "../data/motions.json";
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";
import makeUnion from "./union";
import {isDraft, original} from "immer"

export const Selected = makeUnion("Selected", {
  Nothing: () => ({}),
  Representative: data => ({data}),
  Committee: name => ({name}),
  Motion: data => ({data}),
  Proposition: data => ({data})
});

const initialSelected = {
  representative: null,
  committee: null,
  motion: null,
  proposition: null,
}

const initialState = {
  peopleData,
  motionsData,
  propoData,
  hovered: initialSelected,
  selected: initialSelected,
  searchDate: "2020-02-01"
};

export const ChangeHover = createAction("ChangeHover");

export const Select = createAction("Select");

const reducer = createReducer(initialState, {
  [ChangeHover.type]: (state, action) => ({
    ...state,
    hovered: Selected.case(action.payload, {
      Representative: ({data}) => ({...initialSelected, representative: data}),
      Committee: ({name}) => ({...initialSelected, committee: name}),
      Proposition: ({data}) => ({...initialSelected, proposition: data}),
      Motion: ({data}) => ({...initialSelected, motion: data}),
      Nothing: () => initialSelected
    }),
  }),
  [Select.type]: (state, action) => {
    const selected = state.selected
    const toggle = (current, newVal) => (isDraft(current) ? original(current) : current) !== newVal ? newVal : null
    return ({
      ...state,
      selected: Selected.case(action.payload, {
        Representative: ({data}) => ({...initialSelected, representative: toggle(selected.representative, data)}),
        Committee: ({name}) => ({...initialSelected, committee: toggle(selected.committee, name)}),
        Proposition: ({data}) => ({...initialSelected, proposition: toggle(selected.proposition, data)}),
        Motion: ({data}) => ({...initialSelected, motion: toggle(selected.motion, data)}),
        Nothing: () => initialSelected
      })
    })
  }
});

export const state = configureStore({
  reducer
});
