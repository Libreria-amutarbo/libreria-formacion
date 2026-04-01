export type DcxListVariant = 'default' | 'danger';

export interface DcxListItem {
  text?: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  children?: DcxListItem[];
  variant?: DcxListVariant;
}