export type DcxSize = 's' | 'm' | 'l' | 'xl' | 'auto';

export enum DcxPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export type DcxPositionType = `${DcxPosition}`;

export type DcxLayout = 'vertical' | 'horizontal';

export type DcxAlign = 'start' | 'center' | 'end';

export type DcxSpacing = 'xs' | 's' | 'm' | 'l' | 'xl';
