export enum DcxInputType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  SEARCH = 'search',
  TEL = 'tel',
  URL = 'url'
}

export interface DcxInputErrorMessage {
  type: string;
  message: string;
}