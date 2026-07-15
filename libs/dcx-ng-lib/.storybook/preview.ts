import type { Preview } from '@storybook/angular';
import { addons } from '@storybook/preview-api';
import { dcxLightTheme } from './theme';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Manager theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: dcxLightTheme,
    },
  },
  decorators: [
    (story, context) => {
      const channel = addons.getChannel();
      const currentGlobals = context.globals;

      channel.emit('MANAGER_THEME_CHANGE', {
        theme: currentGlobals['theme'] || 'light',
      });

      return story();
    },
  ],
};

export default preview;
