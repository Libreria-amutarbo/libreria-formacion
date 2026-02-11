import {
  DcxLayout,
  DcxAlign,
  DcxSize,
  DcxPosition,
  DcxIconSpacing,
  DcxSpacing,
} from '@dcx-ng-components/dcx-ng-lib';

export const LAYOUT_LIST: DcxLayout[] = ['vertical', 'horizontal'];

export const ALIGN_LIST: DcxAlign[] = ['start', 'center', 'end'];

export const SIZE_LIST: DcxSize[] = ['s', 'm', 'l', 'xl', 'auto'];

export const POSITION_LIST: DcxPosition[] = Object.values(DcxPosition);

export const ICON_SPACING_LIST: DcxIconSpacing[] = [
  'none',
  'compact',
  'spacious',
];

export const LAYOUT_DEFAULT: DcxLayout = 'vertical';

export const ALIGN_DEFAULT: DcxAlign = 'center';

export const SIZE_DEFAULT: DcxSize = 's';

export const SPACING_DEFAULT: DcxSpacing = 'xs';
export const SPACING_LIST: DcxSpacing[] = ['xs', 's', 'm', 'l', 'xl'];

export const ICON_SPACING_DEFAULT: DcxIconSpacing = 'none';

export const DISABLED = false;
