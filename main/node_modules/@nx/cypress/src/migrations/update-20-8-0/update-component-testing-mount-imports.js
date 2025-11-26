"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const devkit_1 = require("@nx/devkit");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
const tsquery_1 = require("@phenomnomnominal/tsquery");
const semver_1 = require("semver");
const config_1 = require("../../utils/config");
const migrations_1 = require("../../utils/migrations");
let printer;
let ts;
async function default_1(tree) {
    const projectGraph = await (0, devkit_1.createProjectGraphAsync)();
    for await (const { cypressConfigPath, projectName, projectConfig, } of (0, migrations_1.cypressProjectConfigs)(tree)) {
        if (!tree.exists(cypressConfigPath)) {
            // cypress config file doesn't exist, so skip
            continue;
        }
        ts ??= (0, ensure_typescript_1.ensureTypescript)();
        printer ??= ts.createPrinter();
        const migrationInfo = parseMigrationInfo(tree, cypressConfigPath, projectName, projectGraph);
        if (!migrationInfo) {
            continue;
        }
        if (migrationInfo.framework === 'angular') {
            migrateAngularFramework(tree, projectConfig, migrationInfo.isLegacyVersion);
        }
        else if (migrationInfo.framework === 'react') {
            migrateReactFramework(tree, projectConfig);
        }
    }
    await (0, devkit_1.formatFiles)(tree);
}
function parseMigrationInfo(tree, cypressConfigPath, projectName, projectGraph) {
    const cypressConfig = tree.read(cypressConfigPath, 'utf-8');
    const config = (0, config_1.resolveCypressConfigObject)(cypressConfig);
    if (!config) {
        // couldn't find the config object, leave as is
        return null;
    }
    if (!(0, migrations_1.getObjectProperty)(config, 'component')) {
        // no component config, leave as is
        return null;
    }
    const framework = resolveFramework(cypressConfig, config, projectName, projectGraph);
    if (framework === 'react') {
        return { framework: 'react' };
    }
    if (framework === 'angular') {
        const angularCoreDep = projectGraph.dependencies[projectName].find((d) => 
        // account for possible different versions of angular core
        d.target.startsWith('npm:@angular/core'));
        if (angularCoreDep) {
            const angularVersion = projectGraph.externalNodes?.[angularCoreDep.target]?.data?.version;
            if ((0, semver_1.valid)(angularVersion) && (0, semver_1.lt)(angularVersion, '17.2.0')) {
                return {
                    framework: 'angular',
                    isLegacyVersion: true,
                };
            }
        }
        return {
            framework: 'angular',
            isLegacyVersion: false,
        };
    }
    return null;
}
function resolveFramework(cypressConfig, config, projectName, projectGraph) {
    const frameworkProperty = tsquery_1.tsquery.query(config, 'PropertyAssignment:has(Identifier[name=component]) PropertyAssignment:has(Identifier[name=devServer]) PropertyAssignment:has(Identifier[name=framework])')[0];
    if (frameworkProperty) {
        return ts.isStringLiteral(frameworkProperty.initializer)
            ? frameworkProperty.initializer.getText().replace(/['"`]/g, '')
            : null;
    }
    // component might be assigned to an Nx preset function call, so we try to
    // infer the framework from the Nx preset import
    const sourceFile = tsquery_1.tsquery.ast(cypressConfig);
    const nxPresetModuleSpecifiers = [
        '@nx/angular/plugins/component-testing',
        '@nx/react/plugins/component-testing',
        '@nx/next/plugins/component-testing',
        '@nx/remix/plugins/component-testing',
    ];
    const nxPresetImportModuleSpecifier = sourceFile.statements
        .find((s) => ts.isImportDeclaration(s) &&
        nxPresetModuleSpecifiers.includes(s.moduleSpecifier.getText().replace(/['"`]/g, '')))
        ?.moduleSpecifier.getText()
        .replace(/['"`]/g, '');
    if (nxPresetImportModuleSpecifier) {
        const plugin = nxPresetImportModuleSpecifier.split('/').at(1);
        return plugin === 'angular' ? 'angular' : 'react';
    }
    // it might be set to something else, so we fall back to checking the
    // project dependencies
    if (projectGraph.dependencies[projectName]?.some((d) => d.target.startsWith('npm:@angular/core'))) {
        return 'angular';
    }
    if (projectGraph.dependencies[projectName]?.some((d) => d.target.startsWith('npm:react') || d.target.startsWith('npm:next'))) {
        return 'react';
    }
    return null;
}
// https://docs.cypress.io/app/references/migration-guide#Angular-1720-CT-no-longer-supported
function migrateAngularFramework(tree, projectConfig, isLegacyVersion) {
    (0, devkit_1.visitNotIgnoredFiles)(tree, projectConfig.root, (filePath) => {
        if (!isJsTsFile(filePath)) {
            return;
        }
        const content = tree.read(filePath, 'utf-8');
        let updatedFileContent;
        if (isLegacyVersion) {
            let needPackage = false;
            updatedFileContent = tsquery_1.tsquery.replace(content, 'ImportDeclaration', importTransformerFactory(content, 'cypress/angular', '@cypress/angular', () => {
                needPackage = true;
            }));
            if (needPackage) {
                (0, devkit_1.addDependenciesToPackageJson)(tree, {}, { '@cypress/angular': '^2.1.0' }, undefined, true);
            }
        }
        else {
            updatedFileContent = tsquery_1.tsquery.replace(content, 'ImportDeclaration', importTransformerFactory(content, 'cypress/angular-signals', 'cypress/angular'));
        }
        tree.write(filePath, updatedFileContent);
    });
}
// https://docs.cypress.io/app/references/migration-guide#React-18-CT-no-longer-supported
function migrateReactFramework(tree, projectConfig) {
    (0, devkit_1.visitNotIgnoredFiles)(tree, projectConfig.root, (filePath) => {
        if (!isJsTsFile(filePath)) {
            return;
        }
        const content = tree.read(filePath, 'utf-8');
        const updatedContent = tsquery_1.tsquery.replace(content, 'ImportDeclaration', importTransformerFactory(content, 'cypress/react18', 'cypress/react'));
        tree.write(filePath, updatedContent);
    });
}
function importTransformerFactory(fileContent, sourceModuleSpecifier, targetModuleSpecifier, matchImportCallback) {
    return (node) => {
        if (node.moduleSpecifier.getText().replace(/['"`]/g, '') ===
            sourceModuleSpecifier) {
            matchImportCallback?.();
            const updatedImport = ts.factory.updateImportDeclaration(node, node.modifiers, node.importClause, ts.factory.createStringLiteral(targetModuleSpecifier), node.attributes);
            return printer.printNode(ts.EmitHint.Unspecified, updatedImport, tsquery_1.tsquery.ast(fileContent));
        }
        return node.getText();
    };
}
function isJsTsFile(filePath) {
    return /\.[cm]?[jt]sx?$/.test(filePath);
}
