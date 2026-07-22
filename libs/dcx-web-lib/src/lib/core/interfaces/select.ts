export interface DcxSelectOptions {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type DcxSelectValue = string | number | null;

export type MoveDirection = 'next' | 'prev' | 'first' | 'last';
