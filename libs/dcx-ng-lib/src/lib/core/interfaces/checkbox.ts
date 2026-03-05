export type CheckBoxVariant = 'primary' | 'accent' | 'error';
export type CheckboxValue = true | false | null;

export interface DcxCheckbox {
  id: string;
  value: CheckboxValue;
  label: string;
  disabled?: boolean;
}
