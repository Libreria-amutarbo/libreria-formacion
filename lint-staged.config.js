module.exports = {
  // Librería Angular: Aplica eslint con su config local y formatea
  'libs/dcx-ng-lib/**/*.{ts,html,scss}': (files) => [
    `eslint --config libs/dcx-ng-lib/eslint.config.js --fix ${files.join(' ')}`,
    `prettier --write ${files.join(' ')}`
  ],
  // Librería Web Components: Aplica eslint con su config local y formatea
  'libs/dcx-web-lib/**/*.{ts,html,scss}': (files) => [
    `eslint --config libs/dcx-web-lib/eslint.config.cjs --fix ${files.join(' ')}`,
    `prettier --write ${files.join(' ')}`
  ],
  // Otros archivos de texto modificados en el repositorio
  '**/*.{json,md}': (files) => [
    `prettier --write ${files.join(' ')}`
  ]
};
