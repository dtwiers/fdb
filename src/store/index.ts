import { configureStore } from "@reduxjs/toolkit";
import { identity } from "fp-ts/lib/function";
import { createEpicMiddleware } from "redux-observable";

export const store = configureStore({
  middleware: [createEpicMiddleware({})],
  reducer: identity,
});
