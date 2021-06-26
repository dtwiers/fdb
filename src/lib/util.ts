import * as A from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
export const ensureArray = <T>(a: T | T[]): T[] => (Array.isArray(a) ? a : [a]);

export const pick =
  <T, K extends keyof T = keyof T>(...keys: K[]) =>
  (record: T): Pick<T, K> =>
    pipe(
      record,
      Object.entries,
      A.filter(([key]) => keys.includes(key as K)),
      Object.fromEntries
    );
