import { Signal } from "@angular/core";

export enum ThemeColors {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  GRAY = 'gray',
  GRAY_LIGHT = 'gray-light'
}

export type ChipType = 'label-only' | 'with-icon' | 'with-image';
export enum ChipTypeValues {
  LABEL_ONLY = 'label-only',
  WITH_ICON = 'with-icon',
  WITH_IMAGE = 'with-image'
};

export type ThemeColorsType = `${ThemeColors}`;

export interface DcxNgChipComponentInputs {
  label: Signal<string>;
  color: Signal<ThemeColorsType>;
  removable: Signal<boolean>;
  icon: Signal<string>;
  image: Signal<string>;
}