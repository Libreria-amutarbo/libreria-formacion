export type DcxToastType = 'info' | 'success' | 'warning' | 'error';

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
