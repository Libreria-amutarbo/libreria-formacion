import { DcxListItem } from '../interfaces';
export declare const LIST_ITEMS_WITH_DIVIDER: DcxListItem[];
export declare const LIST_ENABLED_DISABLED_ITEMS: DcxListItem[];
export declare const LIST_DISABLED_ONLY: DcxListItem[];
export declare const LIST_DIVIDER_ONLY: DcxListItem[];
export declare const DEFAULT_LIST_ITEMS: DcxListItem[];
export declare const SIMPLE_LIST_ITEMS: DcxListItem[];
export declare const LIST_ITEMS_WITH_ICONS: {
    text: string;
    icon: string;
}[];
export declare const LIST_ITEMS_WITH_SUBLISTS: ({
    text: string;
    icon: string;
    children: {
        text: string;
    }[];
} | {
    text: string;
    icon: string;
    children?: undefined;
})[];
export declare const LIST_ITEMS_WITH_NESTED_SUBLISTS: DcxListItem[];
export declare const SELECTABLE_LIST_ITEMS: {
    text: string;
    icon: string;
}[];
export declare const MIXED_LIST_ITEMS: DcxListItem[];
export declare const LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION: DcxListItem[];
export declare const MULTI_SELECT_LIST_ITEMS: {
    text: string;
    icon: string;
}[];
export declare const DANGER_LIST_ITEMS: DcxListItem[];
