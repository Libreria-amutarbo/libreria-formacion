export const DIVIDER_ORIENTATIONS = [
  'horizontal',
  'vertical',
] as const;

export const DIVIDER_TYPES = [
  'default',
  'dot',
  'dash',
] as const;

export const DIVIDER_SIZES = [
  's',
  'm',
  'l',
  'xl',
  'auto',
] as const;

export type DividerOrientation =
  (typeof DIVIDER_ORIENTATIONS)[number];

export type DividerType =
  (typeof DIVIDER_TYPES)[number];

export type DividerSize =
  (typeof DIVIDER_SIZES)[number];