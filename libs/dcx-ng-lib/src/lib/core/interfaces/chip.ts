import { Signal } from '@angular/core';

export enum ThemeColors {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  GRAY = 'grey',
}

export enum ChipTypeValues {
  LABEL_ONLY = 'label-only',
  WITH_ICON = 'with-icon',
  WITH_IMAGE = 'with-image',
}

export type ChipType = `${ChipTypeValues}`;

export type ThemeColorsType = `${ThemeColors}`;

export enum ChipVariant {
  FILTER = 'filter',
  CHOICE = 'choice',
}

export type ChipVariantType = `${ChipVariant}`;

export interface DcxNgChipComponentInputs {
  label: Signal<string>;
  color: Signal<ThemeColorsType>;
  icon: Signal<string>;
  image: Signal<string>;
  variant: Signal<ChipVariantType>;
}
