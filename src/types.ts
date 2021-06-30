import * as z from "zod";

const InputNumber = z
  .string()
  .optional()
  .transform((s) => (s ? Number(s) : undefined));

export const FireworkSize = z.union([
  z.literal("large"),
  z.literal("medium"),
  z.literal("small"),
]);
export const RetailBase = z.object({
  title: z.string().nonempty(),
  manufacturer: z.string(),
  description: z.string(),
});


export const CakeBase = z.object({
  _tag: z.literal("cake"),
  duration: InputNumber,
  size: FireworkSize,
  shotCount: InputNumber,
});

export const FountainBase = z.object({
  _tag: z.literal("fountain"),
  duration: InputNumber,
  size: FireworkSize,
});

export const RocketBase = z.object({
  _tag: z.literal("rocket"),
});

export const PreloadedMortarBase = z.object({
  _tag: z.literal("preloadedMortar"),
});

export const RomanCandleBase = z.object({
  _tag: z.literal("romanCandle"),
  duration: InputNumber,
  size: FireworkSize,
  shotCount: InputNumber,
});

export const ShellEffect = z.union([
  z.literal("brocade"),
  z.literal("chrysanthemum"),
  z.literal("willow"),
  z.literal("strobe"),
  z.literal("salute"),
  z.literal("peony"),
  z.literal("nishiki"),
  z.literal("tourbillion"),
  z.literal("flyingFish"),
]);

export const MortarBase = z.object({
  _tag: z.literal("mortar"),
  tubeCount: InputNumber,
  shellCount: InputNumber,
  nominalDiameter: InputNumber,
});

export const FireworkBase = z.union([
  MortarBase,
  RomanCandleBase,
  PreloadedMortarBase,
  RocketBase,
  FountainBase,
  CakeBase,
]);


export const Mortar = MortarBase.merge(RetailBase);
export const RomanCandle = RomanCandleBase.merge(RetailBase);
export const PreloadedMortar = PreloadedMortarBase.merge(RetailBase);
export const Rocket = RocketBase.merge(RetailBase);
export const Fountain = FountainBase.merge(RetailBase);
export const Cake = CakeBase.merge(RetailBase);

export const RetailUnit = z.union([
  Mortar,
  RomanCandle,
  PreloadedMortar,
  Rocket,
  Fountain,
  Cake,
]);

export type RetailBase = z.infer<typeof RetailBase>;
export type RetailUnit = z.infer<typeof RetailUnit>;
export type FireworkBase = z.infer<typeof FireworkBase>;

export type Mortar = z.infer<typeof Mortar>;
export type RomanCandle = z.infer<typeof RomanCandle>;
export type PreloadedMortar = z.infer<typeof PreloadedMortar>;
export type Rocket = z.infer<typeof Rocket>;
export type Fountain = z.infer<typeof Fountain>;
export type Cake = z.infer<typeof Cake>;

export type MortarBase = z.infer<typeof MortarBase>;
export type RomanCandleBase = z.infer<typeof RomanCandleBase>;
export type PreloadedMortarBase = z.infer<typeof PreloadedMortarBase>;
export type RocketBase = z.infer<typeof RocketBase>;
export type FountainBase = z.infer<typeof FountainBase>;
export type CakeBase = z.infer<typeof CakeBase>;
