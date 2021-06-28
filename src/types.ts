import * as z from "zod";

const InputNumber = z.string().transform(s => s ? Number(s) : undefined);

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

export const Cake = z
  .object({
    _tag: z.literal("cake"),
    duration: InputNumber,
    size: FireworkSize,
    shotCount: InputNumber,
  }).merge(RetailBase);

export const Fountain = z
  .object({
    _tag: z.literal("fountain"),
    duration: InputNumber,
    size: FireworkSize,
  })
  .merge(RetailBase);

export const Rocket = z
  .object({
    _tag: z.literal("rocket"),
  })
  .merge(RetailBase);

export const PreloadedMortar = z
  .object({
    _tag: z.literal("preloadedMortar"),
  })
  .merge(RetailBase);

export const RomanCandle = z
  .object({
    _tag: z.literal("romanCandle"),
    duration: InputNumber,
    size: FireworkSize,
    shotCount: InputNumber,
  })
  .merge(RetailBase);

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

export const Mortar = z
  .object({
    _tag: z.literal("mortar"),
    tubeCount: InputNumber,
    shellCount: InputNumber,
    nominalDiameter: InputNumber,
  })
  .merge(RetailBase);

export const RetailUnit = z.union([
  Mortar,
  RomanCandle,
  PreloadedMortar,
  Rocket,
  Fountain,
  Cake,
]);

export type RetailUnit = z.infer<typeof RetailUnit>;
export type Mortar = z.infer<typeof Mortar>;
export type RomanCandle = z.infer<typeof RomanCandle>;
export type PreloadedMortar = z.infer<typeof PreloadedMortar>;
export type Rocket = z.infer<typeof Rocket>;
export type Fountain = z.infer<typeof Fountain>;
export type Cake = z.infer<typeof Cake>;