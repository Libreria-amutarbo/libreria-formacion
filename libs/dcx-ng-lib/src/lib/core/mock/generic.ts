import {
  DcxLayout,
  DcxAlign,
  DcxSize,
  DcxPosition,
  DcxIconSpacing,
} from '@dcx-ng-components/dcx-ng-lib';

export const LAYOUT_LIST: DcxLayout[] = ['vertical', 'horizontal'];

export const ALIGN_LIST: DcxAlign[] = ['start', 'center', 'end'];

export const SIZE_LIST: DcxSize[] = ['s', 'm', 'l'];

export const POSITION_LIST: DcxPosition[] = Object.values(DcxPosition);

export const ICON_SPACING_LIST: DcxIconSpacing[] = [
  'none',
  'compact',
  'spacious',
];

export const LAYOUT_DEFAULT: DcxLayout = 'vertical';

export const ALIGN_DEFAULT: DcxAlign = 'center';

export const SIZE_DEFAULT: DcxSize = 's';

export const ICON_SPACING_DEFAULT: DcxIconSpacing = 'none';
