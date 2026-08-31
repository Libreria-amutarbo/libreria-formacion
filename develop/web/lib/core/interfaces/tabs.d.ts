export interface DcxTabItem {
    id: string;
    label: string;
    disabled?: boolean;
    icon?: string;
    badge?: string | number;
}
export type DcxTabsVariant = 'line' | 'pill' | 'brand' | 'subtle';
