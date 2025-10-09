import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/lib/stories/**/*.stories.ts', '../src/lib/stories/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: async (config, { configType }) => {
    // Configure CSS and SCSS loaders ONLY for global files, not component files
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Add CSS rule for global CSS files (exclude Angular component files)
    config.module.rules.push({
      test: /\.css$/i,
      exclude: /\.component\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ],
    });

    // Add SCSS rule for global SCSS files (exclude Angular component files and ngResource)
    config.module.rules.push({
      test: /\.scss$/i,
      exclude: [/\.component\.scss$/, /\?ngResource/],
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ],
    });

    return config;
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
