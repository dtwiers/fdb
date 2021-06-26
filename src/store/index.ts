import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { default as Catalog } from "./slices/catalog";
import { default as Inventory } from "./slices/inventory";
import { default as Show } from "./slices/show";

export const store = configureStore({
  middleware: [createEpicMiddleware({})],
  reducer: combineReducers({ catalog: Catalog.reducer, inventory: Inventory.reducer, show: Show.reducer }),
});
