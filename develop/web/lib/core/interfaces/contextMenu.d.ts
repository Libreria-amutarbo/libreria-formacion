export type DcxListVariant = 'default' | 'danger';
export interface DcxContextMenuItem {
    id?: string;
    text?: string;
    label?: string;
    description?: string;
    icon?: string;
    disabled?: boolean;
    divider?: boolean;
    children?: DcxContextMenuItem[];
    variant?: DcxListVariant;
    action?: () => void;
    [key: string]: unknown;
}
