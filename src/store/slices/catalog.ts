import { createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import type { RetailUnit } from "../../types";

export type Catalog = EntityState<RetailUnit>;

export type CatalogStore = {

}

const adapter = createEntityAdapter<RetailUnit>();

const slice = createSlice({
  name: "catalog",
  initialState: adapter.getInitialState(),
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    setAll: adapter.setAll,
    removeOne: adapter.removeOne,
    removeMany: adapter.removeMany,
    removeAll: adapter.removeAll,
    updateOne: adapter.updateOne,
    updateMany: adapter.updateMany,
    upsertOne: adapter.upsertOne,
    upsertMany: adapter.upsertMany,
  },
});

export const selectors = adapter.getSelectors();
export const reducer = slice.reducer;
export const actions = slice.actions;
export const name = slice.name;