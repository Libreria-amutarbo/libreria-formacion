
const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  
...nx.configs['flat/angular'],
...nx.configs['flat/angular-template'],


  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/*.min.js',
      '**/coverage',
    ],
  },

  // Configuración específica para archivos de ejemplo/demo
  {
    files: [
      '**/*.stories.ts',
      '**/*.spec.ts',
      '**/examples/**/*',
      '**/demo/**/*',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'prefer-const': 'off',
    },
  },

  // Reglas para límites de módulos Nx
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },

  // Configuraciones globales más permisivas para desarrollo
  {
   files: ['tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|^form\\d+$',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
