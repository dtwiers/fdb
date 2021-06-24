import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import * as A from "fp-ts/lib/Array";
import { identity } from "rxjs";
import type { RetailUnit } from "../../types";
import { Lens } from "monocle-ts";
import { ensureArray } from "../../util";

export type Catalog = {
  available: RetailUnit[];
};

export type StoreWithCatalog = {
  catalog: Catalog;
};

const initialState: Catalog = {
  available: [],
};

const addUnits = createAction("catalog/addUnits", (units: RetailUnit | RetailUnit[]) => ({
  payload: ensureArray(units),
}));

const modifyUnit = createAction("catalog/modifyUnit", (index: number, unit: RetailUnit) => ({
  payload: {
    index,
    unit,
  },
}));

const deleteUnits = createAction("catalog/deleteUnits", (index: number | number[]) => ({
  payload: {
    indexes: ensureArray(index),
  },
}));

export const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(addUnits, (state, action) =>
      Lens.fromProp<Catalog>()("available").modify((existing) => [...existing, ...action.payload])(state)
    )
    .addCase(modifyUnit, (state, action) =>
      Lens.fromProp<Catalog>()("available").set(
        A.unsafeUpdateAt(action.payload.index, action.payload.unit, state.available)
      )(state)
    )
    .addCase(deleteUnits, (state, action) =>
      Lens.fromProp<Catalog>()("available").set(state.available.filter((_, i) => !action.payload.indexes.includes(i)))(
        state
      )
    )
);

export const selector = createSelector<StoreWithCatalog, Catalog, Catalog>((state) => state.catalog, identity);
