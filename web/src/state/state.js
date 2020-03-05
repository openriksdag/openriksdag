import peopleData from "../data/people.json";
import propoData from "../data/propositions.json";
import motionsData from "../data/motions.json";
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import makeUnion from "./union";

export const Hovered = makeUnion("Hovered", {
  Nothing: () => ({}),
  Representative: data => ({ data }),
  Committee: name => ({ name }),
  Motion: id => ({ id })
});

const initialState = {
  peopleData,
  motionsData,
  hovered: Hovered.Nothing(),
  searchDate: "2020-02-01"
};

export const ChangeHover = createAction("ChangeHover");

const reducer = createReducer(initialState, {
  [ChangeHover.type]: (state, action) => ({
    ...state,
    hovered: action.payload
  })
});

export const state = configureStore({
  reducer
});
