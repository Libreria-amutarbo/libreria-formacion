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

export interface DcxDialogMockData {
  dialogId: string;
  title: string;
  bodyHtml: string;
  footerHtml?: string;
  showClose?: boolean;
  position?: DcxDialogPosition;
  closeOnBackdrop?: boolean;
  visible?: boolean;
}
