import type {
  DcxInputOtpSize,
  DcxInputOtpType,
  DcxInputOtpInputMode,
} from '../interfaces/inputOtp';

export const DCXINPUT_OTP_SIZES: DcxInputOtpSize[] = ['small', 'medium', 'large'];
export const DCXINPUT_OTP_TYPES: DcxInputOtpType[] = ['text', 'password', 'tel'];
export const DCXINPUT_OTP_INPUT_MODES: DcxInputOtpInputMode[] = ['text', 'numeric'];
