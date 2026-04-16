import { DcxSize } from '../interfaces';

const dividerSizeMap: Record<DcxSize, string> = {
  s: '5rem',
  m: '15rem',
  l: '30rem',
  xl: '35rem',
  auto: '100%',
};

const dividerTypeMap: Record<string, string> = {
  default: 'solid',
  dot: 'dotted',
  dash: 'dashed',
};

export const mapSizeToCssValue = (size: DcxSize): string => {
  return dividerSizeMap[size];
};

export const mapTypeToCssValue = (type: string): string => {
  return dividerTypeMap[type] || 'solid';
};
