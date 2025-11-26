"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const devkit_1 = require("@nx/devkit");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
const tsquery_1 = require("@phenomnomnominal/tsquery");
const config_1 = require("../../utils/config");
const migrations_1 = require("../../utils/migrations");
let printer;
let ts;
// https://docs.cypress.io/app/references/changelog#:~:text=The%20experimentalFetchPolyfill%20configuration%20option%20was,cy.intercept()%20for%20handling%20fetch%20requests
async function default_1(tree) {
    for await (const { cypressConfigPath } of (0, migrations_1.cypressProjectConfigs)(tree)) {
        if (!tree.exists(cypressConfigPath)) {
            // cypress config file doesn't exist, so skip
            continue;
        }
        ts ??= (0, ensure_typescript_1.ensureTypescript)();
        printer ??= ts.createPrinter();
        const cypressConfig = tree.read(cypressConfigPath, 'utf-8');
        const updatedConfig = removeExperimentalFetchPolyfill(cypressConfig);
        tree.write(cypressConfigPath, updatedConfig);
    }
    await (0, devkit_1.formatFiles)(tree);
}
function removeExperimentalFetchPolyfill(cypressConfig) {
    const config = (0, config_1.resolveCypressConfigObject)(cypressConfig);
    if (!config) {
        // couldn't find the config object, leave as is
        return cypressConfig;
    }
    const sourceFile = tsquery_1.tsquery.ast(cypressConfig);
    const updatedConfig = ts.factory.updateObjectLiteralExpression(config, config.properties
        // remove the experimentalFetchPolyfill property from the top level config object
        .filter((p) => !ts.isPropertyAssignment(p) ||
        p.name.getText() !== 'experimentalFetchPolyfill')
        .map((p) => {
        if (ts.isPropertyAssignment(p) &&
            ['component', 'e2e'].includes(p.name.getText()) &&
            ts.isObjectLiteralExpression(p.initializer)) {
            // remove the experimentalFetchPolyfill property from the component or e2e config object
            return ts.factory.updatePropertyAssignment(p, p.name, ts.factory.updateObjectLiteralExpression(p.initializer, p.initializer.properties.filter((ip) => !ts.isPropertyAssignment(ip) ||
                ip.name.getText() !== 'experimentalFetchPolyfill')));
        }
        return p;
    }));
    return cypressConfig.replace(config.getText(), printer.printNode(ts.EmitHint.Unspecified, updatedConfig, sourceFile));
}
