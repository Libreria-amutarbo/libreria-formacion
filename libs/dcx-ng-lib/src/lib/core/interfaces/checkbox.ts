export type DcxCheckBoxVariant = 'primary' | 'accent' | 'error';
export type DcxCheckboxValue = true | false | null;
export type DcxCheckboxLabelPosition = 'left' | 'right';

export interface DcxCheckbox {
  id: string;
  value: DcxCheckboxValue;
  label?: string;
  labelPosition?: DcxCheckboxLabelPosition;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
}
