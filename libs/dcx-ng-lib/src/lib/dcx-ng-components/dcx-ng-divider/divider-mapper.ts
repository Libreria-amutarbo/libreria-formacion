import { DcxSize } from '../../core/interfaces';

const dividerSizeMap: Record<DcxSize, string> = {
  s: '5rem',
  m: '15rem',
  l: '30rem',
  xl: '35rem',
  auto: '100%',
};

export const mapSizeToCssValue = (size: DcxSize): string => {
  return dividerSizeMap[size];
};
