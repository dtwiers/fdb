import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RetailUnit } from "../../types";

const adapter = createEntityAdapter<RetailUnit>();

export default createSlice({
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
