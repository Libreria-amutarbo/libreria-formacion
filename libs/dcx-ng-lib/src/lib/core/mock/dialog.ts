import { DcxDialogPosition, DcxDialogMockData } from '../interfaces';

export const DCX_DIALOG_DEFAULTS = {
  title: '',
  visible: false,
  showClose: true,
  position: 'center',
  closeOnBackdrop: true,
};

export const DIALOG_ID_DEFAULT = 'dialog-info';
export const DIALOG_TITLE_DEFAULT = 'Información';
export const DIALOG_BODY_HTML_DEFAULT =
  '<p>Este es un mensaje informativo dentro del diálogo.</p>';
export const DIALOG_FOOTER_HTML_DEFAULT =
  '<dcx-ng-button label="Aceptar" variant="primary" (buttonClick)="closeDialog()" />';
export const DIALOG_SHOW_CLOSE_DEFAULT = true;
export const DIALOG_POSITION_DEFAULT: DcxDialogPosition = 'center';
export const DIALOG_CLOSE_ON_BACKDROP_DEFAULT = true;
export const DIALOG_VISIBLE_DEFAULT = false;

export const DIALOG_DEFAULT_ARGS: DcxDialogMockData = {
  dialogId: DIALOG_ID_DEFAULT,
  title: DIALOG_TITLE_DEFAULT,
  bodyHtml: DIALOG_BODY_HTML_DEFAULT,
  footerHtml: DIALOG_FOOTER_HTML_DEFAULT,
  showClose: DIALOG_SHOW_CLOSE_DEFAULT,
  position: DIALOG_POSITION_DEFAULT,
  closeOnBackdrop: DIALOG_CLOSE_ON_BACKDROP_DEFAULT,
  visible: DIALOG_VISIBLE_DEFAULT,
};
