import { DCX_TOAST_DEFAULT_OPTIONS, DcxToastOptions, DcxToastType } from '@dcx-ng-components/dcx-ng-lib';


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
    actionLabel: 'Ver detalle',
};

export const DCX_TOAST_WITH_ICON_ACTION: DcxToastOptions = {
    message: 'Sincronizacion disponible',
    type: 'info',
    autoDismiss: false,
    durationMs: 5000,
    actionLabel: 'Reintentar',
    actionIconName: 'arrow-repeat',
};

export const DCX_TOAST_ICON_ONLY_ACTION: DcxToastOptions = {
    message: 'Actualiza para ver cambios',
    type: 'warning',
    autoDismiss: false,
    durationMs: 5000,
    actionLabel: '',
    actionIconName: 'arrow-clockwise',
    actionAriaLabel: 'Actualizar contenido',
};

export const DCX_TOAST_INFO_DEMO: DcxToastOptions = {
    ...DCX_TOAST_DEFAULT_ARGS,
    message: 'Informacion actualizada correctamente',
};

export const DCX_TOAST_WARNING_DEMO: DcxToastOptions = {
    message: 'Revisa los campos marcados antes de continuar',
    type: 'warning',
    autoDismiss: true,
    durationMs: 7000,
};

export const DCX_TOAST_ERROR_DEMO: DcxToastOptions = {
    message: 'No se pudo conectar con el servidor',
    type: 'error',
    autoDismiss: true,
    durationMs: 8000,
};
