import * as z from "zod";
import * as t from "io-ts";
import { pipe } from "fp-ts/lib/function";

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

export const RetailBase2 = pipe(
  t.type({ title: t.string, manufacturer: t.string, description: t.string })
);

export const Cake2 = pipe(
  t.type({
    _tag: t.literal("cake", "cake"),
    duration: t.number
  })
)

export const Cake = z
  .object({
    _tag: z.literal("cake"),
    duration: z.number().optional(),
    size: FireworkSize,
    shotCount: z.number().optional(),
  }).merge(RetailBase);

export const Fountain = z
  .object({
    _tag: z.literal("fountain"),
    duration: z.number().optional(),
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
    duration: z.number().optional(),
    size: FireworkSize,
    shotCount: z.number().optional(),
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
    tubeCount: z.number(),
    shellCount: z.number(),
    nominalDiameter: z.number(),
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