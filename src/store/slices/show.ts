import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
import { pipe } from "fp-ts/lib/function";
import { Lens } from "monocle-ts/lib";

export type ShowSong = {
  title: string;
  duration: number;
  startTime: number;
  id: string;
};

export type IgnitionEvent<T = any> = {
  item: T;
  startTime: number;
  rack?: string;
};

export type Fuse = {
  title: string;
  speed: number;
  startTime: number;
  startCue: string;
  downstreamEvents: IgnitionEvent[];
  id: string;
};

export type Show = {
  songs: EntityState<ShowSong>;
  fuses: EntityState<Fuse>;
};

export type ShowStore = {
  show: Show;
};

const songLens = Lens.fromProp<Show>()("songs");
const fuseLens = Lens.fromProp<Show>()("fuses");

const startTimeComparer = <T extends { startTime: number }>(a: T, b: T) =>
  a.startTime > b.startTime ? 1 : a.startTime === b.startTime ? 0 : -1;
const songs = createEntityAdapter<ShowSong>({
  sortComparer: startTimeComparer,
});
const fuses = createEntityAdapter<Fuse>({
  sortComparer: startTimeComparer,
});

const slice = createSlice({
  name: "show",
  initialState: {
    songs: songs.getInitialState(),
    fuses: fuses.getInitialState(),
  },
  reducers: {
    addSong: (state, action: PayloadAction<ShowSong>) =>
      pipe(state, songLens.set(songs.addOne(state.songs, action.payload))),
    addSongs: (state, action: PayloadAction<ShowSong[]>) =>
      pipe(state, songLens.set(songs.addMany(state.songs, action.payload))),
    setSongs: (state, action: PayloadAction<ShowSong[]>) =>
      pipe(state, songLens.set(songs.setAll(state.songs, action.payload))),
    removeSong: (state, action: PayloadAction<string>) =>
      pipe(state, songLens.set(songs.removeOne(state.songs, action.payload))),
    removeSongs: (state, action: PayloadAction<string[]>) =>
      pipe(state, songLens.set(songs.removeMany(state.songs, action.payload))),
    clearSongs: (state) =>
      pipe(state, songLens.set(songs.removeAll(state.songs))),
    updateSong: (state, action: PayloadAction<Update<ShowSong>>) =>
      pipe(state, songLens.set(songs.updateOne(state.songs, action.payload))),
    updateSongs: (state, action: PayloadAction<Update<ShowSong>[]>) =>
      pipe(state, songLens.set(songs.updateMany(state.songs, action.payload))),
    upsertSong: (state, action: PayloadAction<ShowSong>) =>
      pipe(state, songLens.set(songs.upsertOne(state.songs, action.payload))),
    upsertSongs: (state, action: PayloadAction<ShowSong[]>) =>
      pipe(state, songLens.set(songs.upsertMany(state.songs, action.payload))),

    addFuse: (state, action: PayloadAction<Fuse>) =>
      pipe(state, fuseLens.set(fuses.addOne(state.fuses, action.payload))),
    addFuses: (state, action: PayloadAction<Fuse[]>) =>
      pipe(state, fuseLens.set(fuses.addMany(state.fuses, action.payload))),
    setFuses: (state, action: PayloadAction<Fuse[]>) =>
      pipe(state, fuseLens.set(fuses.setAll(state.fuses, action.payload))),
    removeFuse: (state, action: PayloadAction<string>) =>
      pipe(state, fuseLens.set(fuses.removeOne(state.fuses, action.payload))),
    removeFuses: (state, action: PayloadAction<string[]>) =>
      pipe(state, fuseLens.set(fuses.removeMany(state.fuses, action.payload))),
    clearFuses: (state) =>
      pipe(state, fuseLens.set(fuses.removeAll(state.fuses))),
    updateFuse: (state, action: PayloadAction<Update<Fuse>>) =>
      pipe(state, fuseLens.set(fuses.updateOne(state.fuses, action.payload))),
    updateFuses: (state, action: PayloadAction<Update<Fuse>[]>) =>
      pipe(state, fuseLens.set(fuses.updateMany(state.fuses, action.payload))),
    upsertFuse: (state, action: PayloadAction<Fuse>) =>
      pipe(state, fuseLens.set(fuses.upsertOne(state.fuses, action.payload))),
    upsertFuses: (state, action: PayloadAction<Fuse[]>) =>
      pipe(state, fuseLens.set(fuses.upsertMany(state.fuses, action.payload))),
  },
});

const curry =
  <A, B, C>(fn: (a: A, b: B) => C) =>
  (a: A) =>
  (b: B): C =>
    fn(a, b);

const flip =
  <A, B, C>(fn: (a: A) => (b: B) => C) =>
  (b: B) =>
  (a: A): C =>
    fn(a)(b);

const fuseSelectors = fuses.getSelectors(
  Lens.fromPath<ShowStore>()(["show", "fuses"]).get
);
const songSelectors = songs.getSelectors(
  Lens.fromPath<ShowStore>()(["show", "songs"]).get
);
export const selectors = {
  selectFuses: fuseSelectors.selectAll,
  selectFuseById: curry(fuseSelectors.selectById),
  selectFuseEntities: fuseSelectors.selectEntities,
  selectFuseIds: fuseSelectors.selectIds,
  selectFuseTotal: fuseSelectors.selectTotal,
  selectSongs: songSelectors.selectAll,
  selectSongById: flip(curry(songSelectors.selectById)),
  selectSongEntities: songSelectors.selectEntities,
  selectSongIds: songSelectors.selectIds,
  selectSongTotal: songSelectors.selectTotal,
};
export const reducer = slice.reducer;
export const actions = slice.actions;
export const name = slice.name;
