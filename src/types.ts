import { Duration } from "date-fns";

type FireworkBase<T extends string> = {
  _tag: T;
};

export type WithId<T> = T & { id: string };

export type FireworkSize = "large" | "medium" | "small";

export type WithDuration<T> = T & {
  duration: number;
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
  effects: ShellEffect[];
  color?: string;
  breakCount: number;
};

export type Rocket = FireworkBase<"Rocket">;

export type RomanCandle = WithDuration<WithShotCount<FireworkBase<"Roman Candle">>>;

export type PreloadedMortar = FireworkBase<"Preloaded Mortar">;

export type Firework = Rocket | RomanCandle | ArtilleryShell | Fountain | Cake | PreloadedMortar;

type BaseRetailUnit = {
  title: string;
  manufacturer: string;
  description: string;
};

export type MortarPackage = {
  _tag: "MortarRetailUnit";
  tubeCount: number;
  shells: ArtilleryShell[];
  nominalSize: number;
};

export type RetailUnit = BaseRetailUnit & (MortarPackage | Rocket | RomanCandle | Fountain | Cake | PreloadedMortar);
