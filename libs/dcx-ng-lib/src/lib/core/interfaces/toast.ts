export type DcxToastType = 'info' | 'success' | 'warning' | 'error';

export const DCX_TOAST_ICON_BY_TYPE: Record<DcxToastType, string> = {
    info: 'info-circle',
    success: 'check-circle',
    warning: 'exclamation-diamond',
    error: 'x-circle',
};

export interface DcxToastOptions {
    message: string;
    type?: DcxToastType;
    autoDismiss?: boolean;
    durationMs?: number;
    iconName?: string;
    actionLabel?: string;
    actionIconName?: string;
    actionAriaLabel?: string;
    dismissible?: boolean;
}

export interface DcxToastInstance extends DcxToastOptions {
    id: string;
}

export type DcxToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export const DCX_TOAST_TYPE_LIST: DcxToastType[] = [
    'info',
    'success',
    'warning',
    'error',
];

export const DCX_TOAST_DEFAULT_OPTIONS: Omit<DcxToastOptions, 'message'> = {
    type: 'info',
    autoDismiss: false,
    durationMs: 5000,
    actionLabel: 'Deshacer',
};
