import * as R from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/function";
export const ensureArray = <T>(a: T | T[]): T[] => (Array.isArray(a) ? a : [a]);

export const pick =
  <T extends { [k: string]: unknown}, K extends keyof T>(...keys: K[]) =>
  (record: T): Pick<T, K> =>
    pipe(
      record,
      R.filterWithIndex<string, T>((i) => keys.includes(i))
    );
