export const DCX_CHIP_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'gray',
] as const;

export type DcxChipColorType = typeof DCX_CHIP_COLORS[number];

export const DCX_CHIP_VARIANTS = ['choice', 'filter'] as const;

export type DcxChipVariantType = typeof DCX_CHIP_VARIANTS[number];

export const DCX_CHIP_ICONS = [
  'house',
  'person',
  'gear',
  'star',
  'code-slash',
  'terminal',
  'palette',
  'book',
  'bug',
] as const;

export type DcxChipIconType = typeof DCX_CHIP_ICONS[number];

export const DCX_CHIP_TYPES = ['with-image', 'with-icon', 'label-only'] as const;

export type DcxChipType = typeof DCX_CHIP_TYPES[number];