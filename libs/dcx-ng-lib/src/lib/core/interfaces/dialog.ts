export type DcxDialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export const DIALOG_POSITION_LIST: DcxDialogPosition[] = [
  'center',
  'top',
  'bottom',
  'left',
  'right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

export const DCX_DIALOG_DEFAULTS = {
  title: '',
  visible: false,
  showClose: true,
  position: 'center' as DcxDialogPosition,
  closeOnBackdrop: true,
} as const;
