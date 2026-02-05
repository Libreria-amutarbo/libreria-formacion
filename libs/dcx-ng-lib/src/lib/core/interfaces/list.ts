export interface DcxListItem {
    text: string;
    icon?: string;
    children?: DcxListItemType[];
}

export type DcxListItemType = string | number | DcxListItem;