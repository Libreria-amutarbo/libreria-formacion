"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const devkit_1 = require("@nx/devkit");
const config_utils_1 = require("@nx/devkit/src/utils/config-utils");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
const tsquery_1 = require("@phenomnomnominal/tsquery");
const node_path_1 = require("node:path");
const config_1 = require("../../utils/config");
const migrations_1 = require("../../utils/migrations");
let printer;
let ts;
// https://docs.cypress.io/app/references/migration-guide#CT-Just-in-Time-Compile-changes
async function default_1(tree) {
    for await (const { cypressConfigPath } of (0, migrations_1.cypressProjectConfigs)(tree)) {
        if (!tree.exists(cypressConfigPath)) {
            // cypress config file doesn't exist, so skip
            continue;
        }
        const updatedConfig = await updateCtJustInTimeCompile(tree, cypressConfigPath);
        tree.write(cypressConfigPath, updatedConfig);
    }
    await (0, devkit_1.formatFiles)(tree);
}
async function updateCtJustInTimeCompile(tree, cypressConfigPath) {
    const cypressConfig = tree.read(cypressConfigPath, 'utf-8');
    const config = (0, config_1.resolveCypressConfigObject)(cypressConfig);
    if (!config) {
        // couldn't find the config object, leave as is
        return cypressConfig;
    }
    if (!(0, migrations_1.getObjectProperty)(config, 'component')) {
        // no component config, leave as is
        return cypressConfig;
    }
    ts ??= (0, ensure_typescript_1.ensureTypescript)();
    printer ??= ts.createPrinter();
    const sourceFile = tsquery_1.tsquery.ast(cypressConfig);
    let updatedConfig = config;
    const bundler = await resolveBundler(updatedConfig, cypressConfigPath);
    const isViteBundler = bundler === 'vite';
    const existingJustInTimeCompileProperty = (0, migrations_1.getObjectProperty)(updatedConfig, 'experimentalJustInTimeCompile');
    if (existingJustInTimeCompileProperty) {
        if (isViteBundler ||
            existingJustInTimeCompileProperty.initializer.kind ===
                ts.SyntaxKind.TrueKeyword) {
            // if it's using vite or it's set to true (the new default value), remove it
            updatedConfig = (0, migrations_1.removeObjectProperty)(updatedConfig, existingJustInTimeCompileProperty);
        }
        else {
            // rename to justInTimeCompile
            updatedConfig = (0, migrations_1.updateObjectProperty)(updatedConfig, existingJustInTimeCompileProperty, { newName: 'justInTimeCompile' });
        }
    }
    const componentProperty = (0, migrations_1.getObjectProperty)(updatedConfig, 'component');
    if (componentProperty &&
        ts.isObjectLiteralExpression(componentProperty.initializer)) {
        const componentConfigObject = componentProperty.initializer;
        const existingJustInTimeCompileProperty = (0, migrations_1.getObjectProperty)(componentConfigObject, 'experimentalJustInTimeCompile');
        if (existingJustInTimeCompileProperty) {
            if (isViteBundler ||
                existingJustInTimeCompileProperty.initializer.kind ===
                    ts.SyntaxKind.TrueKeyword) {
                // if it's using vite or it's set to true (the new default value), remove it
                updatedConfig = (0, migrations_1.updateObjectProperty)(updatedConfig, componentProperty, {
                    newValue: (0, migrations_1.removeObjectProperty)(componentConfigObject, existingJustInTimeCompileProperty),
                });
            }
            else {
                // rename to justInTimeCompile
                updatedConfig = (0, migrations_1.updateObjectProperty)(updatedConfig, componentProperty, {
                    newValue: (0, migrations_1.updateObjectProperty)(componentConfigObject, existingJustInTimeCompileProperty, { newName: 'justInTimeCompile' }),
                });
            }
        }
    }
    return cypressConfig.replace(config.getText(), printer.printNode(ts.EmitHint.Unspecified, updatedConfig, sourceFile));
}
async function resolveBundler(config, cypressConfigPath) {
    const bundlerProperty = tsquery_1.tsquery.query(config, 'PropertyAssignment:has(Identifier[name=component]) PropertyAssignment:has(Identifier[name=devServer]) PropertyAssignment:has(Identifier[name=bundler])')[0];
    if (bundlerProperty) {
        return ts.isStringLiteral(bundlerProperty.initializer)
            ? bundlerProperty.initializer.getText().replace(/['"`]/g, '')
            : null;
    }
    try {
        // we can't statically resolve the bundler from the config, so we load the config
        const cypressConfig = await (0, config_utils_1.loadConfigFile)((0, node_path_1.join)(devkit_1.workspaceRoot, cypressConfigPath));
        return cypressConfig.component?.devServer?.bundler;
    }
    catch {
        return null;
    }
}
