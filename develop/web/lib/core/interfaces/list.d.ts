export type DcxListVariant = 'default' | 'danger';
export interface DcxListItem {
    id?: string | number;
    text?: string;
    label?: string;
    description?: string;
    icon?: string;
    disabled?: boolean;
    divider?: boolean;
    children?: DcxListItem[];
    variant?: DcxListVariant;
    [key: string]: unknown;
}
