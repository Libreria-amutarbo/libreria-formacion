export interface DcxChipProps {
  label: string;
  color: ThemeColorsType;
  icon?: string;
  image?: string;
  variant: ChipVariantType;
  removable?: boolean;
}

export type ThemeColorsType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'grey';

export type ChipVariantType = 'choice' | 'filter';
