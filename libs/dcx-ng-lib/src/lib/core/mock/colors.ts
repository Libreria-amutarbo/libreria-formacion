// colors.ts
export const palette = {
  primary: {
    100: '#e6f0fa',
    200: '#b3d4f0',
    300: '#88b6e6',
    400: '#4d9cd8',
    500: '#0058ab',
    600: '#004080',
    700: '#121a38',
  },
  grey: {
    100: '#f7f8fa',
    200: '#e1e3e6',
    300: '#c8cdcd',
    400: '#a9adb3',
    500: '#696e75',
    600: '#4f545a',
    700: '#2a2e33',
  },
  base: {
    white: '#ffffff',
  },
  semantic: {
    'light-blue-700': '#1d88f2',
    'red-800': '#b00020',
    'red-700': '#b91c1c',
    'red-300': '#fee2e2',
  },
};

export const tokens = {
  text: {
    title: palette.grey[700], // #2a2e33
    body: palette.grey[700], // #2a2e33
    'label-default': palette.grey[700], // #2a2e33
    'label-base': palette.base.white, // #ffffff
    disabled: palette.grey[500], // #696e75
    'disabled-dark': palette.grey[600], // #4f545a
    error: palette.semantic['red-800'], // #b00020
  },
  background: {
    default: palette.base.white, // #ffffff
    primary: palette.primary[500], // #0058ab
    'primary-hover': palette.primary[600], // #004080
    'primary-pressed': palette.primary[700], // #121a38
    secondary: palette.grey[700], // #2a2e33
    'secondary-light': palette.grey[400], // #a9adb3
    pressed: palette.grey[200], // #e1e3e6
    disabled: palette.grey[200], // #e1e3e6
    hover: palette.grey[100], // #f7f8fa
    error: palette.semantic['red-300'], // #fee2e2
  },
  content: {
    'default-white': palette.base.white, // #ffffff
    'default-dark': palette.grey[700], // #2a2e33
    primary: palette.primary[500], // #0058ab
    hover: palette.grey[400], // #a9adb3
    terciary: palette.grey[200], // #e1e3e6
    disabled: palette.grey[500], // #696e75
    'disabled-dark': palette.grey[600], // #4f545a
    'error-text': palette.semantic['red-800'], // #b00020
    error: palette.semantic['red-700'], // #b91c1c
  },
  border: {
    primary: palette.primary[500], // #0058ab
    default: palette.grey[700], // #2a2e33
    hover: palette.grey[200], // #e1e3e6
    terciary: palette.grey[200], // #e1e3e6
    disabled: palette.primary[400], // #4d9cd8
    focus: palette.semantic['light-blue-700'], // #1d88f2
    error: palette.semantic['red-700'], // #b91c1c
  },
};
