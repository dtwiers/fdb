import { Duration } from "date-fns";

export type FireworkBase<T extends string> = {
  title: string;
  manufacturer: string;
  _tag: T;
};

export type FireworkSize = "large" | "medium" | "small";

export type WithDuration<T> = T & {
  duration: Duration;
};

export type WithSize<T> = T & {
  size: FireworkSize;
};

export type WithShotCount<T> = T & {
  shotCount: number;
};

export type Cake = WithDuration<WithSize<WithShotCount<FireworkBase<"Cake">>>>;

export type Fountain = WithDuration<WithSize<FireworkBase<"Fountain">>>;

export type ShellEffect =
  | "Brocade"
  | "Chrysanthemum"
  | "Willow"
  | "Strobe"
  | "Salute"
  | "Peony"
  | "Nishiki"
  | "Tourbillion"
  | "Flying Fish";

export type ArtilleryShell = FireworkBase<"Artillery Shell"> & {
  usesStandardConsumerTubes: boolean;
  effects: ShellEffect[];
  color?: string;
};

export type Rocket = FireworkBase<"Rocket">;

export type RomanCandle = WithDuration<
  WithShotCount<FireworkBase<"Roman Candle">>
>;

export type RetailUnit = {
  items: Rocket[] | RomanCandle[] | ArtilleryShell[] | Fountain[] | Cake[];
  tubeCount?: number;
};
