export interface DcxTabItem {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: string; // opcional si tu botón lo permite
}
export type DcxTabsVariant = 'line' | 'pill' | 'brand';
