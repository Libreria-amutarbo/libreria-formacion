export interface DcxListItem {
    text?: string;
    icon?: string;
    disabled?: boolean;
    divider?: boolean;
    children?: DcxListItem[];
}