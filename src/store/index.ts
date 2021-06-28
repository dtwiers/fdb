import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import * as Catalog from "./slices/catalog";
import * as Inventory from "./slices/inventory";
import * as Show from "./slices/show";
import * as UI from "./slices/ui";

export const store = configureStore({
  middleware: [createEpicMiddleware({})],
  reducer: combineReducers({
    catalog: Catalog.reducer,
    inventory: Inventory.reducer,
    show: Show.reducer,
    ui: UI.reducer,
  }),
});
