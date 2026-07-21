export type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export declare const DIALOG_POSITION_LIST: DialogPosition[];
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
