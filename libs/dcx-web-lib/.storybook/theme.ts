import { create } from '@storybook/theming/create';

export const dcxLightTheme = create({
  base: 'light',
  colorPrimary: '#0070ad',
  colorSecondary: '#0070ad',
  appBg: '#f7f9fc',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#d9e2ec',
  appBorderRadius: 8,
  fontBase: "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontCode:
    "'Roboto Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  textColor: '#1f2933',
  textInverseColor: '#ffffff',
  textMutedColor: '#52606d',
  barTextColor: '#52606d',
  barSelectedColor: '#0070ad',
  barHoverColor: '#005b8c',
  barBg: '#eef4f8',
  inputBg: '#ffffff',
  inputBorder: '#bcccdc',
  inputTextColor: '#1f2933',
  inputBorderRadius: 6,
  brandTitle: 'DCX Library',
  brandUrl: 'https://libreria-amutarbo.github.io/libreria-formacion/develop/',
});

export const dcxDarkTheme = create({
  base: 'dark',
  colorPrimary: '#0070ad',
  colorSecondary: '#0070ad',
  appBg: '#1a1d23',
  appContentBg: '#262c35',
  appPreviewBg: '#262c35',
  appBorderColor: '#3a3f4a',
  appBorderRadius: 8,
  fontBase: "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontCode:
    "'Roboto Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  textColor: '#e8ecf1',
  textInverseColor: '#1a1d23',
  textMutedColor: '#9facbe',
  barTextColor: '#9facbe',
  barSelectedColor: '#0070ad',
  barHoverColor: '#0089d8',
  barBg: '#1a1d23',
  inputBg: '#3a3f4a',
  inputBorder: '#4a5265',
  inputTextColor: '#e8ecf1',
  inputBorderRadius: 6,
  brandTitle: 'DCX Library',
  brandUrl: 'https://libreria-amutarbo.github.io/libreria-formacion/develop/',
});

export const getTheme = (isDark: boolean) =>
  isDark ? dcxDarkTheme : dcxLightTheme;
