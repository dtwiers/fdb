import { createEntityAdapter, createSlice, EntityState, nanoid, PayloadAction } from "@reduxjs/toolkit";
import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import type { RetailUnit } from "../../types";

export type InventoryItem = {
  item: RetailUnit;
  usedInCurrentShow: boolean;
  id: string;
};

export type InventoryStore = {
  inventory: EntityState<InventoryItem>;
};

const adapter = createEntityAdapter<InventoryItem>();

const slice = createSlice({
  name: "inventory",
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
    useForShow: (state, action: PayloadAction<string>) =>
      adapter.updateOne(state, { changes: { usedInCurrentShow: true }, id: action.payload }),
    releaseFromShow: (state, action: PayloadAction<string>) =>
      adapter.updateOne(state, { changes: { usedInCurrentShow: false }, id: action.payload }),
    addRetailUnit: (state, action: PayloadAction<RetailUnit>) => {
      if (action.payload._tag === "mortar") {
        return adapter.addMany(
          state,
          pipe(
            A.range(1, action.payload.shellCount),
            A.map(num => ({id: nanoid(), usedInCurrentShow: false, item: action.payload}))
          )
        );
      }
      return adapter.addOne(state, { item: action.payload, id: nanoid(), usedInCurrentShow: false });
    },
  },
});

export const selectors = adapter.getSelectors((store: InventoryStore) => store.inventory);
export const reducer = slice.reducer;
export const name = slice.name;
export const actions = slice.actions;
