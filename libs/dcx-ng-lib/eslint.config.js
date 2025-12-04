const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.base.config.js');

module.exports = [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      // Desactivar reglas de module boundaries para evitar dependencias circulares
      '@nx/enforce-module-boundaries': 'off',

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'dcx-ng',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'dcx-ng',
          style: 'kebab-case',
        },
      ],

      // Configurar variables no utilizadas con patrones de ignorado
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // Ignorar argumentos que empiecen con _
          varsIgnorePattern: '^_', // Ignorar variables que empiecen con _
          ignoreRestSiblings: true, // Ignorar propiedades rest siblings
          destructuredArrayIgnorePattern: '^_', // Ignorar destructuring arrays con _
        },
      ],

      // Permitir any en ciertos contextos
      '@typescript-eslint/no-explicit-any': 'off',

      // Permitir funciones vacías (útil para callbacks)
      '@typescript-eslint/no-empty-function': 'off',

      // Permitir non-null assertions
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // Reglas específicas para archivos de Stories
  {
    files: ['**/*.stories.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'off',
    },
  },

  // Reglas específicas para archivos de Test
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      // Desactivar reglas de accesibilidad y template problemáticas
      '@angular-eslint/template/valid-aria': 'off',
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/click-events-have-key-events': 'off',
    },
  },
];
