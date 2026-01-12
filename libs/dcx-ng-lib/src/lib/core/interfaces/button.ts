export type DcxButtonType = 'button' | 'submit' | 'reset';
export type DcxButtonVariant = 'primary' | 'secondary' | 'link';

export const ICON_POSITION = {
  start: 'start',
  end: 'end',
};

export type DcxIconPosition =
  (typeof ICON_POSITION)[keyof typeof ICON_POSITION];
