"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationGenerator = configurationGenerator;
exports.configurationGeneratorInternal = configurationGeneratorInternal;
const devkit_1 = require("@nx/devkit");
const project_name_and_root_utils_1 = require("@nx/devkit/src/generators/project-name-and-root-utils");
const prompt_1 = require("@nx/devkit/src/generators/prompt");
const js_1 = require("@nx/js");
const generator_prompts_1 = require("@nx/js/src/utils/generator-prompts");
const package_manager_workspaces_1 = require("@nx/js/src/utils/package-manager-workspaces");
const ts_solution_setup_1 = require("@nx/js/src/utils/typescript/ts-solution-setup");
const path_1 = require("path");
const add_linter_1 = require("../../utils/add-linter");
const config_1 = require("../../utils/config");
const versions_1 = require("../../utils/versions");
const base_setup_1 = require("../base-setup/base-setup");
const init_1 = require("../init/init");
function configurationGenerator(tree, options) {
    return configurationGeneratorInternal(tree, {
        addPlugin: false,
        ...options,
    });
}
async function configurationGeneratorInternal(tree, options) {
    const opts = await normalizeOptions(tree, options);
    const tasks = [];
    const projectGraph = await (0, devkit_1.createProjectGraphAsync)();
    if (!(0, versions_1.getInstalledCypressMajorVersion)(tree)) {
        tasks.push(await (0, js_1.initGenerator)(tree, { ...options, skipFormat: true }));
        tasks.push(await (0, init_1.default)(tree, {
            ...opts,
            skipFormat: true,
        }));
    }
    else if (opts.addPlugin) {
        await (0, init_1.addPlugin)(tree, projectGraph, false);
    }
    const nxJson = (0, devkit_1.readNxJson)(tree);
    const hasPlugin = nxJson.plugins?.some((p) => typeof p === 'string'
        ? p === '@nx/cypress/plugin'
        : p.plugin === '@nx/cypress/plugin');
    await addFiles(tree, opts, projectGraph, hasPlugin);
    if (!hasPlugin) {
        addTarget(tree, opts, projectGraph);
    }
    const projectTsConfigPath = (0, devkit_1.joinPathFragments)(opts.projectRoot, 'tsconfig.json');
    if (tree.exists(projectTsConfigPath)) {
        (0, devkit_1.updateJson)(tree, projectTsConfigPath, (json) => {
            // Cypress uses commonjs, unless the project is also using commonjs (or does not set "module" i.e. uses default of commonjs),
            // then we need to set the moduleResolution to node10 or else Cypress will fail with TS5095 error.
            // See: https://github.com/cypress-io/cypress/issues/27731
            if ((json.compilerOptions?.module ||
                json.compilerOptions?.module !== 'commonjs') &&
                json.compilerOptions?.moduleResolution) {
                json.compilerOptions.moduleResolution = 'node10';
            }
            return json;
        });
    }
    const { root: projectRoot } = (0, devkit_1.readProjectConfiguration)(tree, options.project);
    const isTsSolutionSetup = (0, ts_solution_setup_1.isUsingTsSolutionSetup)(tree);
    if (isTsSolutionSetup) {
        createPackageJson(tree, opts);
        ignoreTestOutput(tree);
        if (!options.rootProject) {
            // add the project tsconfig to the workspace root tsconfig.json references
            (0, devkit_1.updateJson)(tree, 'tsconfig.json', (json) => {
                json.references ??= [];
                json.references.push({ path: './' + projectRoot });
                return json;
            });
        }
    }
    const linterTask = await (0, add_linter_1.addLinterToCyProject)(tree, {
        ...opts,
        cypressDir: opts.directory,
    });
    tasks.push(linterTask);
    if (!opts.skipPackageJson) {
        tasks.push(ensureDependencies(tree, opts));
    }
    if (!opts.skipFormat) {
        await (0, devkit_1.formatFiles)(tree);
    }
    if (isTsSolutionSetup) {
        const projectPackageManagerWorkspaceState = (0, package_manager_workspaces_1.getProjectPackageManagerWorkspaceState)(tree, projectRoot);
        if (projectPackageManagerWorkspaceState !== 'included') {
            tasks.push((0, package_manager_workspaces_1.getProjectPackageManagerWorkspaceStateWarningTask)(projectPackageManagerWorkspaceState, tree.root));
        }
    }
    return (0, devkit_1.runTasksInSerial)(...tasks);
}
function ensureDependencies(tree, options) {
    const pkgVersions = (0, versions_1.versions)(tree);
    const devDependencies = {
        '@types/node': pkgVersions.typesNodeVersion,
    };
    if (options.bundler === 'vite') {
        devDependencies['vite'] = pkgVersions.viteVersion;
    }
    return (0, devkit_1.addDependenciesToPackageJson)(tree, {}, devDependencies, undefined, true);
}
async function normalizeOptions(tree, options) {
    const linter = await (0, generator_prompts_1.normalizeLinterOption)(tree, options.linter);
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, options.project);
    if (projectConfig?.targets?.e2e) {
        throw new Error(`Project ${options.project} already has an e2e target.
Rename or remove the existing e2e target.`);
    }
    if (!options.baseUrl &&
        !options.devServerTarget &&
        !projectConfig?.targets?.serve) {
        const { devServerTarget, baseUrl } = await promptForMissingServeData(options.project);
        options.devServerTarget = devServerTarget;
        options.baseUrl = baseUrl;
    }
    if (!options.baseUrl &&
        !options.devServerTarget &&
        !projectConfig?.targets?.serve) {
        throw new Error(`The project ${options.project} does not have a 'serve' target.
In this case you need to provide a devServerTarget,'<projectName>:<targetName>[:<configName>]', or a baseUrl option`);
    }
    options.directory ??= 'src';
    const devServerTarget = options.devServerTarget ??
        (projectConfig?.targets?.serve ? `${options.project}:serve` : undefined);
    if (!options.baseUrl && !devServerTarget) {
        throw new Error('Either baseUrl or devServerTarget must be provided');
    }
    const nxJson = (0, devkit_1.readNxJson)(tree);
    options.addPlugin ??=
        process.env.NX_ADD_PLUGINS !== 'false' &&
            nxJson.useInferencePlugins !== false;
    return {
        ...options,
        bundler: options.bundler ?? 'webpack',
        projectRoot: projectConfig.root,
        rootProject: options.rootProject ?? projectConfig.root === '.',
        linter,
        devServerTarget,
    };
}
async function promptForMissingServeData(projectName) {
    const { devServerTarget, port } = await (0, prompt_1.promptWhenInteractive)([
        {
            type: 'input',
            name: 'devServerTarget',
            message: 'What is the name of the target used to serve the application locally?',
            initial: `${projectName}:serve`,
        },
        {
            type: 'numeral',
            name: 'port',
            message: 'What port will the application be served on?',
            initial: 3000,
        },
    ], {
        devServerTarget: `${projectName}:serve`,
        port: 3000,
    });
    return {
        devServerTarget,
        baseUrl: `http://localhost:${port}`,
    };
}
async function addFiles(tree, options, projectGraph, hasPlugin) {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, options.project);
    const cyVersion = (0, versions_1.getInstalledCypressMajorVersion)(tree);
    const filesToUse = cyVersion && cyVersion < 10 ? 'v9' : 'v10';
    const hasTsConfig = tree.exists((0, devkit_1.joinPathFragments)(projectConfig.root, 'tsconfig.json'));
    const offsetFromProjectRoot = options.directory
        .split('/')
        .map((_) => '..')
        .join('/');
    const fileOpts = {
        ...options,
        dir: options.directory ?? 'src',
        ext: options.js ? 'js' : 'ts',
        offsetFromRoot: (0, devkit_1.offsetFromRoot)(projectConfig.root),
        offsetFromProjectRoot,
        projectRoot: projectConfig.root,
        tsConfigPath: hasTsConfig
            ? `${offsetFromProjectRoot}/tsconfig.json`
            : (0, js_1.getRelativePathToRootTsConfig)(tree, projectConfig.root),
        tmpl: '',
    };
    (0, devkit_1.generateFiles)(tree, (0, path_1.join)(__dirname, 'files', filesToUse), projectConfig.root, fileOpts);
    if (filesToUse === 'v10') {
        (0, base_setup_1.addBaseCypressSetup)(tree, {
            project: options.project,
            directory: options.directory,
            jsx: options.jsx,
            js: options.js,
        });
        const cyFile = (0, devkit_1.joinPathFragments)(projectConfig.root, options.js ? 'cypress.config.js' : 'cypress.config.ts');
        let webServerCommands;
        let ciWebServerCommand;
        let ciBaseUrl;
        if (hasPlugin && options.webServerCommands && options.ciWebServerCommand) {
            webServerCommands = options.webServerCommands;
            ciWebServerCommand = options.ciWebServerCommand;
            ciBaseUrl = options.ciBaseUrl;
        }
        else if (hasPlugin && options.devServerTarget) {
            webServerCommands = {};
            webServerCommands.default = 'nx run ' + options.devServerTarget;
            const parsedTarget = (0, devkit_1.parseTargetString)(options.devServerTarget, projectGraph);
            const devServerProjectConfig = (0, devkit_1.readProjectConfiguration)(tree, parsedTarget.project);
            // Add production e2e target if serve target is found
            if (parsedTarget.configuration !== 'production' &&
                devServerProjectConfig?.targets?.[parsedTarget.target]
                    ?.configurations?.['production']) {
                webServerCommands.production = `nx run ${parsedTarget.project}:${parsedTarget.target}:production`;
            }
            // Add ci/static e2e target if serve target is found
            if (devServerProjectConfig?.targets?.['serve-static']) {
                ciWebServerCommand = `nx run ${parsedTarget.project}:serve-static`;
            }
        }
        const updatedCyConfig = await (0, config_1.addDefaultE2EConfig)(tree.read(cyFile, 'utf-8'), {
            cypressDir: options.directory,
            bundler: options.bundler === 'vite' ? 'vite' : undefined,
            webServerCommands,
            ciWebServerCommand: ciWebServerCommand,
            ciBaseUrl,
        }, options.baseUrl);
        tree.write(cyFile, updatedCyConfig);
    }
    if (cyVersion &&
        cyVersion < 7 &&
        tree.exists((0, devkit_1.joinPathFragments)(projectConfig.root, 'src', 'plugins', 'index.js'))) {
        (0, devkit_1.updateJson)(tree, (0, path_1.join)(projectConfig.root, 'cypress.json'), (json) => {
            json.pluginsFile = './src/plugins/index';
            return json;
        });
    }
    else if (cyVersion < 10) {
        const pluginPath = (0, path_1.join)(projectConfig.root, 'src/plugins/index.js');
        if (tree.exists(pluginPath)) {
            tree.delete(pluginPath);
        }
    }
    if (options.js) {
        (0, devkit_1.toJS)(tree);
    }
}
function addTarget(tree, opts, projectGraph) {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, opts.project);
    const cyVersion = (0, versions_1.getInstalledCypressMajorVersion)(tree);
    projectConfig.targets ??= {};
    projectConfig.targets.e2e = {
        executor: '@nx/cypress:cypress',
        options: {
            cypressConfig: (0, devkit_1.joinPathFragments)(projectConfig.root, cyVersion && cyVersion < 10
                ? 'cypress.json'
                : `cypress.config.${opts.js ? 'js' : 'ts'}`),
            testingType: 'e2e',
        },
    };
    if (opts.devServerTarget) {
        const parsedTarget = (0, devkit_1.parseTargetString)(opts.devServerTarget, projectGraph);
        projectConfig.targets.e2e.options = {
            ...projectConfig.targets.e2e.options,
            devServerTarget: opts.devServerTarget,
            port: opts.port,
        };
        const devServerProjectConfig = (0, devkit_1.readProjectConfiguration)(tree, parsedTarget.project);
        // Add production e2e target if serve target is found
        if (parsedTarget.configuration !== 'production' &&
            devServerProjectConfig.targets?.[parsedTarget.target]?.configurations?.['production']) {
            projectConfig.targets.e2e.configurations ??= {};
            projectConfig.targets.e2e.configurations['production'] = {
                devServerTarget: `${parsedTarget.project}:${parsedTarget.target}:production`,
            };
        }
        // Add ci/static e2e target if serve target is found
        if (devServerProjectConfig.targets?.['serve-static']) {
            projectConfig.targets.e2e.configurations ??= {};
            projectConfig.targets.e2e.configurations.ci = {
                devServerTarget: `${parsedTarget.project}:serve-static`,
            };
        }
    }
    else if (opts.baseUrl) {
        projectConfig.targets.e2e.options = {
            ...projectConfig.targets.e2e.options,
            baseUrl: opts.baseUrl,
        };
    }
    (0, devkit_1.updateProjectConfiguration)(tree, opts.project, projectConfig);
}
function createPackageJson(tree, options) {
    const projectConfig = (0, devkit_1.readProjectConfiguration)(tree, options.project);
    const packageJsonPath = (0, devkit_1.joinPathFragments)(projectConfig.root, 'package.json');
    if (tree.exists(packageJsonPath)) {
        return;
    }
    const importPath = (0, project_name_and_root_utils_1.resolveImportPath)(tree, projectConfig.name, projectConfig.root);
    const packageJson = {
        name: importPath,
        version: '0.0.1',
        private: true,
    };
    if (options.project !== importPath) {
        packageJson.nx = { name: options.project };
    }
    (0, devkit_1.writeJson)(tree, packageJsonPath, packageJson);
}
function ignoreTestOutput(tree) {
    if (!tree.exists('.gitignore')) {
        devkit_1.logger.warn(`Couldn't find a root .gitignore file to update.`);
    }
    let content = tree.read('.gitignore', 'utf-8');
    if (/^test-output$/gm.test(content)) {
        return;
    }
    content = `${content}\ntest-output\n`;
    tree.write('.gitignore', content);
}
exports.default = configurationGenerator;
