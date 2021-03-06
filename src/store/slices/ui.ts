import { createSlice } from "@reduxjs/toolkit";
import { Lens } from "monocle-ts/lib";

export type UI = {
  modalsOpen: number;
};

export type UIStore = {
  ui: UI;
};

const modalLens = Lens.fromProp<UI>()("modalsOpen");
const sliceLens = Lens.fromProp<UIStore>()("ui");

const slice = createSlice({
  name: "ui",
  initialState: {
    modalsOpen: 0,
  } as UI,
  reducers: {
    openModal: modalLens.modify(s => s + 1),
    closeModal: modalLens.modify(s => s - 1),
  },
});

export const selectors = {
  selectUI: sliceLens.get,
  selectModalOpen: sliceLens.composeLens(modalLens).get,
};
export const reducer = slice.reducer;
export const actions = slice.actions;
export const name = slice.name;