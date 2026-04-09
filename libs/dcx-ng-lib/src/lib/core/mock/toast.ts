import {
    DcxToastOptions,
    DcxToastType,
    DCX_TOAST_DEFAULT_OPTIONS,
} from '../interfaces';

export const DCX_TOAST_MESSAGE_DEFAULT = 'Proyecto guardado correctamente';
export const DCX_TOAST_ACTION_LABEL_DEFAULT = 'Deshacer';

export const DCX_TOAST_MOCK_TYPES: DcxToastType[] = [
    'info',
    'success',
    'warning',
    'error',
];

export const DCX_TOAST_DEFAULT_ARGS: DcxToastOptions = {
    message: DCX_TOAST_MESSAGE_DEFAULT,
    ...DCX_TOAST_DEFAULT_OPTIONS,
};

export const DCX_TOAST_SUCCESS_WITH_ACTION: DcxToastOptions = {
    message: 'Archivo exportado con exito',
    type: 'success',
    autoDismiss: false,
    durationMs: 5000,
};
