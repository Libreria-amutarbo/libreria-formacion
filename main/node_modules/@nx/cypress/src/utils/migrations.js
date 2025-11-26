"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cypressProjectConfigs = cypressProjectConfigs;
exports.getObjectProperty = getObjectProperty;
exports.removeObjectProperty = removeObjectProperty;
exports.updateObjectProperty = updateObjectProperty;
const devkit_1 = require("@nx/devkit");
const ensure_typescript_1 = require("@nx/js/src/utils/typescript/ensure-typescript");
const path_1 = require("path");
const config_1 = require("./config");
let ts;
async function* cypressProjectConfigs(tree) {
    const projects = (0, devkit_1.getProjects)(tree);
    for (const [projectName, projectConfig] of projects) {
        const targetWithExecutor = Object.values(projectConfig.targets ?? {}).find((target) => target.executor === '@nx/cypress:cypress');
        if (targetWithExecutor) {
            for (const [, options] of allTargetOptions(targetWithExecutor)) {
                if (options.cypressConfig) {
                    yield {
                        projectName,
                        projectConfig,
                        cypressConfigPath: options.cypressConfig,
                    };
                }
            }
        }
        else {
            // might be using the crystal plugin
            const result = await (0, devkit_1.globAsync)(tree, [
                path_1.posix.join(projectConfig.root, config_1.CYPRESS_CONFIG_FILE_NAME_PATTERN),
            ]);
            if (result.length > 0) {
                yield {
                    projectName,
                    projectConfig,
                    cypressConfigPath: result[0],
                };
            }
        }
    }
}
function getObjectProperty(config, name) {
    ts ??= (0, ensure_typescript_1.ensureTypescript)();
    return config.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText() === name);
}
function removeObjectProperty(config, property) {
    ts ??= (0, ensure_typescript_1.ensureTypescript)();
    return ts.factory.updateObjectLiteralExpression(config, config.properties.filter((p) => p !== property));
}
function updateObjectProperty(config, property, { newName, newValue }) {
    ts ??= (0, ensure_typescript_1.ensureTypescript)();
    if (!newName && !newValue) {
        throw new Error('newName or newValue must be provided');
    }
    return ts.factory.updateObjectLiteralExpression(config, config.properties.map((p) => p === property
        ? ts.factory.updatePropertyAssignment(p, newName ? ts.factory.createIdentifier(newName) : p.name, newValue ? newValue : p.initializer)
        : p));
}
function* allTargetOptions(target) {
    if (target.options) {
        yield [undefined, target.options];
    }
    if (!target.configurations) {
        return;
    }
    for (const [name, options] of Object.entries(target.configurations)) {
        if (options !== undefined) {
            yield [name, options];
        }
    }
}
