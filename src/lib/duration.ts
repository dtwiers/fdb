import { flow, pipe } from "fp-ts/lib/function";
import * as I from "fp-ts/lib/Identity";

export const formatDuration: (a: number) => string = flow(
  I.bindTo("rawSeconds"),
  I.bind("seconds", ({ rawSeconds }) => pipe(Math.floor(rawSeconds % 60), (seconds) => `${seconds}`.padStart(2, "0"))),
  I.bind("minutes", ({ rawSeconds }) => pipe(Math.floor(rawSeconds / 60), (minutes) => `${minutes}`.padStart(2, "0"))),
  I.map(({ minutes, seconds }) => `${minutes}:${seconds}`)
);

export type StartAndDuration = {
  start: number;
  duration: number;
};

export const overlaps = (a: StartAndDuration, b: StartAndDuration) => {
  const firstEvent = a.start >= b.start ? a : b;
  const secondEvent = a.start >= b.start ? b : a;

  return firstEvent.start + firstEvent.duration > secondEvent.start;
};
