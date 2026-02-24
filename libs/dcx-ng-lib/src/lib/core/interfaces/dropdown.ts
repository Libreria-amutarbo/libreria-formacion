export type DropdownTrigger = 'click' | 'hover';

export interface DcxDropdownOptions {
  key: string;
  value: string | number;
  icon?: string;
  disabled?: boolean;
  divider?: boolean; // Si es true, este item actúa como separador
}
