export interface DcxListItem {
    text: string;
    icon?: string;
    disabled?: boolean;
    children?: DcxListItem[];
}