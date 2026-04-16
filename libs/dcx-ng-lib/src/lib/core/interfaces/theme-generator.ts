export type ThemeTokenGroup =
  | 'background'
  | 'text'
  | 'border'
  | 'semantic';

export interface ThemeToken {
  name: string;
  value: string;
  defaultValue: string;
  label: string;
  group: ThemeTokenGroup;
}
