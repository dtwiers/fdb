import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FireworkBase } from "../../types";

export type InventoryItem = {
  item: FireworkBase<string>;
  usedInCurrentShow: boolean;
  id: string;
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
  },
});
