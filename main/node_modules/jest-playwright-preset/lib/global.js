"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teardown = exports.setup = void 0;
/* eslint-disable no-console */
const jest_process_manager_1 = require("jest-process-manager");
const utils_1 = require("./utils");
let didAlreadyRunInWatchMode = false;
const logMessage = ({ message, action, }) => {
    console.log('');
    console.error(message);
    console.error(`\n☝️ You ${action} in jest-playwright.config.js`);
    process.exit(1);
};
async function setup(jestConfig) {
    // TODO It won't work if config doesn't exist in root directory or in jest.config.js file
    const config = await (0, utils_1.readConfig)(jestConfig.rootDir);
    // If we are in watch mode - only setupServer() once.
    if (jestConfig.watch || jestConfig.watchAll) {
        if (didAlreadyRunInWatchMode)
            return;
        didAlreadyRunInWatchMode = true;
    }
    if (config.serverOptions) {
        try {
            await (0, jest_process_manager_1.setup)(config.serverOptions);
        }
        catch (error) {
            if (!(error instanceof Error))
                throw error;
            if (error.code === jest_process_manager_1.ERROR_TIMEOUT) {
                logMessage({
                    message: error.message,
                    action: 'can set "serverOptions.launchTimeout"',
                });
            }
            if (error.code === jest_process_manager_1.ERROR_NO_COMMAND) {
                logMessage({
                    message: error.message,
                    action: 'must set "serverOptions.command"',
                });
            }
            throw error;
        }
    }
}
exports.setup = setup;
async function teardown(jestConfig) {
    const { serverOptions } = await (0, utils_1.readConfig)(jestConfig.rootDir);
    if (!jestConfig.watch && !jestConfig.watchAll) {
        await (0, jest_process_manager_1.teardown)(serverOptions === null || serverOptions === void 0 ? void 0 : serverOptions.teardown);
    }
}
exports.teardown = teardown;
