export default {
  displayName: 'dcx-web-lib',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleNameMapper: {
    '^.+\\.css\\?inline$': '<rootDir>/src/lib/testing/mock-css.ts',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|lit|@lit|lit-html|lit-element)'],
  moduleFileExtensions: ['ts', 'js', 'html', 'mjs'],
  coverageDirectory: '../../coverage/libs/dcx-web-lib',
};
