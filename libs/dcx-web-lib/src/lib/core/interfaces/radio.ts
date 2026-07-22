export const RADIO_SIZES = ['s', 'm', 'l'];
export type DcxRadioSize = (typeof RADIO_SIZES)[number];

export interface DcxRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}
