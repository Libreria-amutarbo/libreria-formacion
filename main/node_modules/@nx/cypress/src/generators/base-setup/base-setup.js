"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBaseCypressSetup = addBaseCypressSetup;
const devkit_1 = require("@nx/devkit");
const js_1 = require("@nx/js");
const ts_solution_setup_1 = require("@nx/js/src/utils/typescript/ts-solution-setup");
const path_1 = require("path");
function addBaseCypressSetup(tree, options) {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, options.project);
    if (tree.exists((0, devkit_1.joinPathFragments)(projectConfig.root, 'cypress.config.ts')) ||
        tree.exists((0, devkit_1.joinPathFragments)(projectConfig.root, 'cypress.config.js'))) {
        return;
    }
    const opts = normalizeOptions(tree, projectConfig, options);
    const isUsingTsSolutionConfig = (0, ts_solution_setup_1.isUsingTsSolutionSetup)(tree);
    const templateVars = {
        ...opts,
        jsx: !!opts.jsx,
        offsetFromRoot: (0, devkit_1.offsetFromRoot)(projectConfig.root),
        offsetFromProjectRoot: opts.hasTsConfig ? opts.offsetFromProjectRoot : '',
        tsConfigPath: 
        // TS solution setup should always extend from tsconfig.base.json to use shared compilerOptions, the project's tsconfig.json will not have compilerOptions.
        isUsingTsSolutionConfig
            ? (0, js_1.getRelativePathToRootTsConfig)(tree, opts.hasTsConfig
                ? (0, devkit_1.joinPathFragments)(projectConfig.root, options.directory)
                : // If an existing tsconfig.json file does not exist, then cypress tsconfig will be moved to the project root.
                    projectConfig.root)
            : opts.hasTsConfig
                ? `${opts.offsetFromProjectRoot}tsconfig.json`
                : (0, js_1.getRelativePathToRootTsConfig)(tree, projectConfig.root),
        linter: isEslintInstalled(tree) ? 'eslint' : 'none',
        ext: '',
    };
    (0, devkit_1.generateFiles)(tree, (0, path_1.join)(__dirname, 'files/common'), projectConfig.root, templateVars);
    (0, devkit_1.generateFiles)(tree, isUsingTsSolutionConfig
        ? (0, path_1.join)(__dirname, 'files/tsconfig/ts-solution')
        : (0, path_1.join)(__dirname, 'files/tsconfig/non-ts-solution'), projectConfig.root, templateVars);
    if (options.js) {
        if (isEsmProject(tree, projectConfig.root)) {
            (0, devkit_1.generateFiles)(tree, (0, path_1.join)(__dirname, 'files/config-js-esm'), projectConfig.root, templateVars);
        }
        else {
            (0, devkit_1.generateFiles)(tree, (0, path_1.join)(__dirname, 'files/config-js-cjs'), projectConfig.root, templateVars);
        }
    }
    else {
        (0, devkit_1.generateFiles)(tree, (0, path_1.join)(__dirname, 'files/config-ts'), projectConfig.root, templateVars);
    }
    if (opts.hasTsConfig) {
        (0, devkit_1.updateJson)(tree, (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.json'), (json) => {
            // tsconfig doesn't have references so it shouldn't add them
            // like in the case of nextjs apps.
            if (!json.references) {
                return json;
            }
            const tsconfigPath = `./${options.directory}/tsconfig.json`;
            if (!json.references.some((ref) => ref.path === tsconfigPath)) {
                json.references.push({
                    path: tsconfigPath,
                });
            }
            return json;
        });
    }
    else {
        tree.rename((0, devkit_1.joinPathFragments)(projectConfig.root, options.directory, 'tsconfig.json'), (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.json'));
    }
}
function normalizeOptions(tree, projectConfig, options) {
    options.directory ??= 'cypress';
    const offsetFromProjectRoot = options.directory
        .split('/')
        .map((_) => '..')
        .join('/');
    const hasTsConfig = tree.exists((0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.json'));
    return {
        ...options,
        projectConfig,
        offsetFromProjectRoot: `${offsetFromProjectRoot}/`,
        hasTsConfig,
    };
}
function isEsmProject(tree, projectRoot) {
    let packageJson;
    if (tree.exists((0, devkit_1.joinPathFragments)(projectRoot, 'package.json'))) {
        packageJson = (0, devkit_1.readJson)(tree, (0, devkit_1.joinPathFragments)(projectRoot, 'package.json'));
    }
    else {
        packageJson = (0, devkit_1.readJson)(tree, 'package.json');
    }
    return packageJson.type === 'module';
}
function isEslintInstalled(tree) {
    const { dependencies, devDependencies } = (0, devkit_1.readJson)(tree, 'package.json');
    return !!(dependencies?.eslint || devDependencies?.eslint);
}
