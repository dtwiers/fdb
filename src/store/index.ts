import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import * as CatalogSlice from "./slices/catalog";

export const store = configureStore({
  middleware: [createEpicMiddleware({})],
  reducer: combineReducers({catalog: CatalogSlice.reducer}),
});
