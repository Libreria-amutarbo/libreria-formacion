export type DcxRadioSize = 's' | 'm' | 'l';
export type DcxRadioValue = string | null;
export interface DcxRadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}
