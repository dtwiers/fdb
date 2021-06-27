import { createEntityAdapter, createSlice, EntityState, nanoid, PayloadAction } from "@reduxjs/toolkit";
import type { Firework, RetailUnit } from "../../types";
import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/lib/Array";

export type InventoryItem = {
  item: Firework;
  usedInCurrentShow: boolean;
  id: string;
};

export type InventoryStore = {
  inventory: EntityState<InventoryItem>;
};

const adapter = createEntityAdapter<InventoryItem>();

export default createSlice({
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
      if (action.payload._tag === "MortarRetailUnit") {
        return adapter.addMany(
          state,
          action.payload.shells.map((shell) => ({ id: nanoid(), usedInCurrentShow: false, item: shell }))
        );
      }
      return adapter.addOne(state, { item: action.payload, id: nanoid(), usedInCurrentShow: false });
    },
  },
});

export const selectors = adapter.getSelectors((store: InventoryStore) => store.inventory);
