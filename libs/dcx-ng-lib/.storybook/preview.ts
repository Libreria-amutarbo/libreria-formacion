import type { Preview } from '@storybook/angular';
import { addons } from 'storybook/preview-api';
import { themes } from 'storybook/theming';
import {
  FORCE_RE_RENDER,
  GLOBALS_UPDATED,
  STORY_CHANGED,
} from 'storybook/internal/core-events';

const channel = addons.getChannel();

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('storybook-globals');
    if (stored) {
      try {
        const globals = JSON.parse(stored);
        return globals.theme || 'light';
      } catch (e) {
        void e;
      }
    }
  }
  return 'light';
};

const initialTheme = getInitialTheme();

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Manager theme',
      defaultValue: initialTheme,
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
      theme: initialTheme === 'dark' ? themes.dark : themes.normal,
    },
  },
  decorators: [
    (story, context) => {
      const selectedTheme = context.globals['theme'] || 'light';
      const docsTheme = selectedTheme === 'dark' ? themes.dark : themes.normal;

      if (context.parameters['docs']) {
        (context.parameters['docs'] as any).theme = docsTheme;
      }

      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', selectedTheme);
      }

      return story();
    },
  ],
};

if (typeof document !== 'undefined') {
  const syncTheme = (theme: string) => {
    const docsTheme = theme === 'dark' ? themes.dark : themes.normal;
    if (preview.parameters && preview.parameters['docs']) {
      (preview.parameters['docs'] as any).theme = docsTheme;
    }
    document.documentElement.setAttribute('data-theme', theme);
    channel.emit('MANAGER_THEME_CHANGE', { theme });
    channel.emit(FORCE_RE_RENDER);
  };

  channel.on(GLOBALS_UPDATED, ({ globals }) => {
    if (globals?.theme) syncTheme(globals.theme);
  });

  channel.on(STORY_CHANGED, () => {
    const stored = localStorage.getItem('storybook-globals');
    if (stored) {
      try {
        const globals = JSON.parse(stored);
        if (globals.theme) syncTheme(globals.theme);
      } catch (e) {
        void e;
      }
    }
  });

  channel.on(STORY_CHANGED, () => {
    const stored = localStorage.getItem('storybook-globals');
    if (stored) {
      try {
        const globals = JSON.parse(stored);
        const theme = globals.theme || 'light';
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
        }
      } catch (e) {
        void e;
      }
    }
  });
}

export default preview;
