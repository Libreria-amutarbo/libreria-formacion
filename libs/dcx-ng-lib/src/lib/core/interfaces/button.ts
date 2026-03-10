export type DcxButtonType = 'button' | 'submit' | 'reset';
export type DcxButtonVariant =
  | 'primary'
  | 'secondary'
  | 'terciary'
  | 'icon-only'
  | 'text';

export const ICON_POSITION = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
};

export type DcxIconPosition =
  (typeof ICON_POSITION)[keyof typeof ICON_POSITION];
