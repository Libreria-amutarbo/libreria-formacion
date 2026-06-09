export type DcxInputOtpSize = 'small' | 'medium' | 'large';

export interface DcxInputOtpTemplateContext {
  $implicit: string;
  token: string;
  index: number;
  events: {
    input: (event: Event) => void;
    keydown: (event: KeyboardEvent) => void;
    paste: (event: ClipboardEvent) => void;
    focus: () => void;
    blur: () => void;
  };
  attrs: {
    type: 'text' | 'password' | 'tel';
    inputmode: 'text' | 'numeric';
    autocomplete: string;
    maxlength: number;
    placeholder: string;
    ariaLabel: string;
    disabled: boolean;
    value: string;
  };
}