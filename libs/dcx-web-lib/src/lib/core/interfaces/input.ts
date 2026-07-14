export enum DcxInputType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  SEARCH = 'search',
  TEL = 'tel',
  URL = 'url',
  FILE = 'file',
  RADIO = 'radio',
  RANGE = 'range',
}

export const DCX_INPUT_TYPES: DcxInputType[] = Object.values(DcxInputType) as DcxInputType[];

export interface DcxInputErrorMessage {
  type: string;
  message: string;
}