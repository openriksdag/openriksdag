import peopleData from "../data/people.json";
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit"

export const Hovered = {
  type: 'Hovered',
  Nothing: () => ({type: 'Hovered.Nothing'}),
  Representative: (id) => ({type: 'Hovered.Representative', id}),
}

Hovered.Representative.type = 'Hovered.Representative'
Hovered.Nothing.type = 'Hovered.Nothing'

const initialState = {
  peopleData,
  hovered: Hovered.Nothing(),
}

export const ChangeHover = createAction('ChangeHover')

const reducer = createReducer(initialState, {
  [ChangeHover.type]: (state, action) => ({
    ...state,
    hovered: action.payload
  })
})

export const state = configureStore({
  reducer
})
