"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentConfigurationGenerator = componentConfigurationGenerator;
exports.componentConfigurationGeneratorInternal = componentConfigurationGeneratorInternal;
exports.updateTsConfigForComponentTesting = updateTsConfigForComponentTesting;
const devkit_1 = require("@nx/devkit");
const ts_solution_setup_1 = require("@nx/js/src/utils/typescript/ts-solution-setup");
const versions_1 = require("../../utils/versions");
const base_setup_1 = require("../base-setup/base-setup");
const init_1 = require("../init/init");
function componentConfigurationGenerator(tree, options) {
    return componentConfigurationGeneratorInternal(tree, {
        addPlugin: false,
        ...options,
    });
}
async function componentConfigurationGeneratorInternal(tree, options) {
    (0, ts_solution_setup_1.assertNotUsingTsSolutionSetup)(tree, 'cypress', 'component-configuration');
    const tasks = [];
    const opts = normalizeOptions(tree, options);
    if (!(0, versions_1.getInstalledCypressMajorVersion)(tree)) {
        tasks.push(await (0, init_1.default)(tree, {
            ...opts,
            skipFormat: true,
        }));
    }
    const nxJson = (0, devkit_1.readNxJson)(tree);
    const hasPlugin = nxJson.plugins?.some((p) => typeof p === 'string'
        ? p === '@nx/cypress/plugin'
        : p.plugin === '@nx/cypress/plugin');
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, opts.project);
    tasks.push(updateDeps(tree, opts));
    addProjectFiles(tree, projectConfig, opts);
    if (!hasPlugin || opts.addExplicitTargets) {
        addTargetToProject(tree, projectConfig, opts);
    }
    updateNxJsonConfiguration(tree, hasPlugin);
    updateTsConfigForComponentTesting(tree, projectConfig);
    if (!opts.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
    return (0, devkit_1.runTasksInSerial)(...tasks);
}
function normalizeOptions(tree, options) {
    const cyVersion = (0, versions_1.getInstalledCypressMajorVersion)(tree);
    if (cyVersion && cyVersion < 10) {
        throw new Error('Cypress version of 10 or higher is required to use component testing. See the migration guide to upgrade. https://nx.dev/cypress/v11-migration-guide');
    }
    const nxJson = (0, devkit_1.readNxJson)(tree);
    const addPlugin = process.env.NX_ADD_PLUGINS !== 'false' &&
        nxJson.useInferencePlugins !== false;
    return {
        addPlugin,
        ...options,
        framework: options.framework ?? null,
        directory: options.directory ?? 'cypress',
    };
}
function updateDeps(tree, opts) {
    const pkgVersions = (0, versions_1.versions)(tree);
    const devDeps = {
        cypress: pkgVersions.cypressVersion,
    };
    if (opts.bundler === 'vite') {
        devDeps['@cypress/vite-dev-server'] =
            pkgVersions.cypressViteDevServerVersion;
    }
    else {
        devDeps['@cypress/webpack-dev-server'] = pkgVersions.cypressWebpackVersion;
        devDeps['html-webpack-plugin'] = pkgVersions.htmlWebpackPluginVersion;
    }
    return (0, devkit_1.addDependenciesToPackageJson)(tree, {}, devDeps, undefined, true);
}
function addProjectFiles(tree, projectConfig, opts) {
    (0, base_setup_1.addBaseCypressSetup)(tree, {
        project: opts.project,
        directory: opts.directory,
        jsx: opts.jsx,
    });
    (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, 'files'), projectConfig.root, {
        ...opts,
        projectRoot: projectConfig.root,
        offsetFromRoot: (0, devkit_1.offsetFromRoot)(projectConfig.root),
        linter: isEslintInstalled(tree) ? 'eslint' : 'none',
        ext: '',
    });
}
function addTargetToProject(tree, projectConfig, opts) {
    projectConfig.targets['component-test'] = {
        executor: '@nx/cypress:cypress',
        options: {
            cypressConfig: (0, devkit_1.joinPathFragments)(projectConfig.root, 'cypress.config.ts'),
            testingType: 'component',
        },
    };
    (0, devkit_1.updateProjectConfiguration)(tree, opts.project, projectConfig);
}
function updateNxJsonConfiguration(tree, hasPlugin) {
    const nxJson = (0, devkit_1.readNxJson)(tree);
    const productionFileSet = nxJson.namedInputs?.production;
    if (productionFileSet) {
        nxJson.namedInputs.production = Array.from(new Set([
            ...productionFileSet,
            '!{projectRoot}/cypress/**/*',
            '!{projectRoot}/**/*.cy.[jt]s?(x)',
            '!{projectRoot}/cypress.config.[jt]s',
        ]));
    }
    if (!hasPlugin) {
        const cacheableOperations = nxJson.tasksRunnerOptions?.default?.options?.cacheableOperations;
        if (cacheableOperations &&
            !cacheableOperations.includes('component-test')) {
            cacheableOperations.push('component-test');
        }
        nxJson.targetDefaults ??= {};
        nxJson.targetDefaults['component-test'] ??= {};
        nxJson.targetDefaults['component-test'].cache ??= true;
        nxJson.targetDefaults['component-test'] ??= {};
        nxJson.targetDefaults['component-test'].inputs ??= [
            'default',
            productionFileSet ? '^production' : '^default',
        ];
    }
    (0, devkit_1.updateNxJson)(tree, nxJson);
}
function updateTsConfigForComponentTesting(tree, projectConfig) {
    let tsConfigPath = null;
    for (const candidate of ['tsconfig.lib.json', 'tsconfig.app.json']) {
        const p = (0, devkit_1.joinPathFragments)(projectConfig.root, candidate);
        if (tree.exists(p))
            tsConfigPath = p;
    }
    if (tsConfigPath !== null) {
        (0, devkit_1.updateJson)(tree, tsConfigPath, (json) => {
            const excluded = new Set([
                ...(json.exclude || []),
                'cypress/**/*',
                'cypress.config.ts',
                '**/*.cy.ts',
                '**/*.cy.js',
                '**/*.cy.tsx',
                '**/*.cy.jsx',
            ]);
            json.exclude = Array.from(excluded);
            return json;
        });
    }
    const projectBaseTsConfig = (0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.json');
    if (tree.exists(projectBaseTsConfig)) {
        (0, devkit_1.updateJson)(tree, projectBaseTsConfig, (json) => {
            if (json.references) {
                const hasCyTsConfig = json.references.some((r) => r.path.includes('./cypress/tsconfig.json'));
                if (!hasCyTsConfig) {
                    json.references.push({ path: './cypress/tsconfig.json' });
                }
            }
            else {
                const excluded = new Set([
                    ...(json.exclude || []),
                    'cypress/**/*',
                    'cypress.config.ts',
                    '**/*.cy.ts',
                    '**/*.cy.js',
                    '**/*.cy.tsx',
                    '**/*.cy.jsx',
                ]);
                json.exclude = Array.from(excluded);
            }
            return json;
        });
    }
}
function isEslintInstalled(tree) {
    const { dependencies, devDependencies } = (0, devkit_1.readJson)(tree, 'package.json');
    return !!(dependencies?.eslint || devDependencies?.eslint);
}
exports.default = componentConfigurationGenerator;
