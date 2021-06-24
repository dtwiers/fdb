import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { pipe } from "fp-ts/lib/function";
import * as RR from "fp-ts/lib/ReadonlyRecord";
import { Optional } from "monocle-ts";
import type { FireworkBase } from "../../types";

export type InventoryItem<T extends FireworkBase<any> = any> = {
  item: T;
  usedInCurrentShow: boolean;
  id: string;
};

export type Inventory = {
  contents: Record<string, InventoryItem>;
};

export type InventoryStore = {
  inventory: Inventory;
};

const initialState: Inventory = { contents: {} };

export const useForShow = createAction("inventory/useForShow", (id: string) => ({ payload: id }));
export const releaseFromShow = createAction("inventory/releaseFromShow", (id: string) => ({ payload: id }));
export const addItem = createAction("inventory/addItem", <T extends FireworkBase<any>>(item: T) => ({ payload: item }));
export const removeItem = createAction("inventory/removeItem", (id: string) => ({ payload: id }));

const usedInCurrentShow = (id: string) => Optional.fromPath<Inventory>()(["contents", id, "usedInCurrentShow"]);
const makeInventoryItem = (item: FireworkBase<any>): InventoryItem => ({
  id: nanoid(),
  usedInCurrentShow: false,
  item,
});

export const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(useForShow, (state, action) => usedInCurrentShow(action.payload).set(true)(state))
    .addCase(releaseFromShow, (state, action) => usedInCurrentShow(action.payload).set(false)(state))
    .addCase(addItem, (state, action) =>
      pipe(action.payload, makeInventoryItem, (item) =>
        Optional.fromPath<Inventory>()(["contents", item.id]).set(item)(state)
      )
    )
    .addCase(removeItem, (state, action) =>
      Optional.fromPath<Inventory>()(["contents"]).set(RR.deleteAt(action.payload)(state.contents))(state)
    )
);
