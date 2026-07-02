export type DialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export const DIALOG_POSITION_LIST: DialogPosition[] = [
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

export interface DialogData {
  dialogId: string;
  title: string;
  bodyHtml: string;
  footerHtml?: string;
  showClose?: boolean;
  position?: DialogPosition;
  closeOnBackdrop?: boolean;
  visible?: boolean;
}
