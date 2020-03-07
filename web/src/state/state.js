import peopleData from "../data/people.json";
import propoData from "../data/propositions.json";
import motionsData from "../data/motions.json";
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";
import makeUnion from "./union";

export const Hovered = makeUnion("Hovered", {
  Nothing: () => ({}),
  Representative: data => ({data}),
  Committee: name => ({name}),
  Motion: data => ({data}),
  Proposition: data => ({data})
});

const initialHovered = {
  representative: null,
  committee: null,
  motion: null,
  proposition: null,
}

const initialState = {
  peopleData,
  motionsData,
  propoData,
  hovered: initialHovered,
  searchDate: "2020-02-01"
};

export const ChangeHover = createAction("ChangeHover");

const reducer = createReducer(initialState, {
  [ChangeHover.type]: (state, action) => ({
    ...state,
    hovered: Hovered.case(action.payload, {
      Representative: ({data}) => ({...initialHovered, representative: data}),
      Committee: ({name}) => ({...initialHovered, committee: name}),
      Proposition: ({data}) => ({...initialHovered, proposition: data}),
      Motion: ({data}) => ({...initialHovered, motion: data}),
      Nothing: () => initialHovered
    })
  })
});

export const state = configureStore({
  reducer
});
