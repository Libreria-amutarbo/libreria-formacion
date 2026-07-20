export type DcxInputOtpSize = 'small' | 'medium' | 'large';

export type DcxInputOtpType = 'text' | 'password' | 'tel';

export type DcxInputOtpInputMode = 'text' | 'numeric';

export interface DcxInputOtpTemplateContext {
  $implicit: string;
  token: string;
  index: number;
  events: {
    input: (event: Event) => void;
    keydown: (event: KeyboardEvent) => void;
    paste: (event: ClipboardEvent) => void;
    focus: (event: FocusEvent) => void;
    blur: (event: FocusEvent) => void;
  };
  attrs: {
    type: DcxInputOtpType;
    inputmode: DcxInputOtpInputMode;
    autocomplete: string;
    maxlength: number;
    placeholder: string;
    ariaLabel: string;
    disabled: boolean;
    value: string;
  };
}