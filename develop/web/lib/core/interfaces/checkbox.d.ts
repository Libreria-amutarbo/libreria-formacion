export type DcxCheckBoxVariant = 'primary' | 'secondary';
export type DcxCheckboxValue = true | false | null;
export type DcxCheckboxLabelPosition = 'left' | 'right';
export type DcxCheckboxAriaChecked = 'true' | 'false' | 'mixed';
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
