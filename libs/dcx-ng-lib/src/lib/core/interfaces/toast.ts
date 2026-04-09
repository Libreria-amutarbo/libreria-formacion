export type DcxToastType = 'info' | 'success' | 'warning' | 'error';

export const DCX_TOAST_ICON_BY_TYPE: Record<DcxToastType, string> = {
    info: 'info-circle',
    success: 'check-circle',
    warning: 'exclamation-diamond',
    error: 'x-circle',
};

export const DCX_TOAST_COLOR_BY_TYPE: Record<DcxToastType, string> = {
    info: 'var(--color-info, #1db8f2)',
    success: 'var(--color-success, #16a34a)',
    warning: 'var(--color-warning, #d97706)',
    error: 'var(--color-error, #dc2626)',
};

export interface DcxToastOptions {
    message: string;
    type?: DcxToastType;
    autoDismiss?: boolean;
    durationMs?: number;
    iconName?: string;
}

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
};
