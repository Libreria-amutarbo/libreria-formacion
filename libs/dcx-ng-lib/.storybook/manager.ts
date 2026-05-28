import { addons } from 'storybook/manager-api';
import { dcxLightTheme, dcxDarkTheme } from './theme';

let currentTheme = dcxLightTheme;

addons.setConfig({
  theme: currentTheme,
  themes: {
    light: dcxLightTheme,
    dark: dcxDarkTheme,
  },
});

addons.register('dcx-ng/theme-manager', api => {
  const channel = api.getChannel();

  channel?.on('MANAGER_THEME_CHANGE', ({ theme }: { theme: string }) => {
    const newTheme = theme === 'dark' ? dcxDarkTheme : dcxLightTheme;

    if (newTheme !== currentTheme) {
      currentTheme = newTheme;

      addons.setConfig({
        theme: currentTheme,
        themes: {
          light: dcxLightTheme,
          dark: dcxDarkTheme,
        },
      });

      const root = document.documentElement;
      Object.entries(currentTheme).forEach(([key, value]: [string, any]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          root.style.setProperty(`--sb-${cssVar}`, String(value));
        }
      });

      document.body.style.backgroundColor =
        currentTheme.appBg || currentTheme.barBg;
      document.body.style.color = currentTheme.textColor;
    }
  });
});
