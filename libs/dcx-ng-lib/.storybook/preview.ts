import type { Preview } from '@storybook/angular';
import { dcxTheme } from './theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: dcxTheme,
    },
  },
};

export default preview;