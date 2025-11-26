var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const TEST_RUNNER_STORYBOOK_URL = "{{storybookUrl}}";
const TEST_RUNNER_VERSION = "{{testRunnerVersion}}";
const TEST_RUNNER_FAIL_ON_CONSOLE = "{{failOnConsole}}";
const TEST_RUNNER_RENDERED_EVENT = "{{renderedEvent}}";
const TEST_RUNNER_VIEW_MODE = "{{viewMode}}";
const TEST_RUNNER_LOG_LEVEL = "{{logLevel}}";
const TEST_RUNNER_DEBUG_PRINT_LIMIT = parseInt("{{debugPrintLimit}}", 10);
const bold = /* @__PURE__ */ __name((message) => `\x1B[1m${message}\x1B[22m`, "bold");
const magenta = /* @__PURE__ */ __name((message) => `\x1B[35m${message}\x1B[39m`, "magenta");
const blue = /* @__PURE__ */ __name((message) => `\x1B[34m${message}\x1B[39m`, "blue");
const red = /* @__PURE__ */ __name((message) => `\x1B[31m${message}\x1B[39m`, "red");
const yellow = /* @__PURE__ */ __name((message) => `\x1B[33m${message}\x1B[39m`, "yellow");
var LIMIT_REPLACE_NODE = "[...]";
var CIRCULAR_REPLACE_NODE = "[Circular]";
var arr = [];
var replacerStack = [];
function defaultOptions() {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  };
}
__name(defaultOptions, "defaultOptions");
function stringify(obj, replacer, spacer, options) {
  if (typeof options === "undefined") {
    options = defaultOptions();
  }
  decirc(obj, "", 0, [], void 0, 0, options);
  var res;
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(obj, replacer, spacer);
    } else {
      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
    }
  } catch (_) {
    return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
  } finally {
    while (arr.length !== 0) {
      var part = arr.pop();
      if (part && part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3]);
      } else if (part) {
        part[0][part[1]] = part[2];
      }
    }
  }
  return res;
}
__name(stringify, "stringify");
function decirc(val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1;
  var i;
  if (typeof val === "object" && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
        return;
      }
    }
    if (depth > options.depthLimit || edgeIndex + 1 > options.edgesLimit) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent);
      return;
    }
    stack.push(val);
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i.toString(), i, stack, val, depth, options);
      }
    } else {
      var keys = Object.keys(val);
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        decirc(val[key], key, i, stack, val, depth, options);
      }
    }
    stack.pop();
  }
}
__name(decirc, "decirc");
function setReplace(replace, val, k, parent) {
  if (!parent)
    return;
  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
  if (propertyDescriptor && propertyDescriptor.get !== void 0) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, {
        value: replace
      });
      arr.push([
        parent,
        k,
        val,
        propertyDescriptor
      ]);
    } else {
      replacerStack.push([
        val,
        k,
        replace
      ]);
    }
  } else {
    parent[k] = replace;
    arr.push([
      parent,
      k,
      val
    ]);
  }
}
__name(setReplace, "setReplace");
function replaceGetterValues(replacer) {
  const effectiveReplacer = replacer ?? ((_k, v) => v);
  return function(key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i];
        if (part[1] === key && part[0] === val) {
          val = part[2];
          replacerStack.splice(i, 1);
          break;
        }
      }
    }
    return effectiveReplacer.call(this, key, val);
  };
}
__name(replaceGetterValues, "replaceGetterValues");
function composeMessage(args) {
  if (args instanceof Error) {
    return `${args.name}: ${args.message}
${args.stack}`;
  }
  if (typeof args === "undefined")
    return "undefined";
  if (typeof args === "string")
    return args;
  return stringify(args, null, null, {
    depthLimit: 5,
    edgesLimit: 100
  });
}
__name(composeMessage, "composeMessage");
function truncate(input, limit) {
  if (input.length > limit) {
    return input.substring(0, limit) + "\u2026";
  }
  return input;
}
__name(truncate, "truncate");
function addToUserAgent(extra) {
  const originalUserAgent = globalThis.navigator.userAgent;
  if (!originalUserAgent.includes(extra)) {
    Object.defineProperty(globalThis.navigator, "userAgent", {
      get: function() {
        return [
          originalUserAgent,
          extra
        ].join(" ");
      },
      configurable: true
    });
  }
}
__name(addToUserAgent, "addToUserAgent");
let StorybookTestRunnerError = /* @__PURE__ */ __name(class StorybookTestRunnerError2 extends Error {
  constructor(storyId, errorMessage, logs = [], isMessageFormatted = false) {
    const message = isMessageFormatted ? errorMessage : StorybookTestRunnerError2.buildErrorMessage(storyId, errorMessage, logs);
    super(message);
    this.name = "StorybookTestRunnerError";
  }
  static buildErrorMessage(storyId, errorMessage, logs = []) {
    const storyUrl = `${TEST_RUNNER_STORYBOOK_URL}?path=/story/${storyId}`;
    const finalStoryUrl = `${storyUrl}&addonPanel=storybook/interactions/panel`;
    const separator = "\n\n--------------------------------------------------";
    const finalLogs = logs.filter((err) => !err.includes(errorMessage));
    const extraLogs = finalLogs.length > 0 ? separator + "\n\nBrowser logs:\n\n" + finalLogs.join("\n\n") : "";
    const message = `
An error occurred in the following story. Access the link for full output:
${finalStoryUrl}

Message:
 ${truncate(errorMessage, TEST_RUNNER_DEBUG_PRINT_LIMIT)}
${extraLogs}`;
    return message;
  }
}, "StorybookTestRunnerError");
async function __throwError(storyId, errorMessage, logs) {
  throw new StorybookTestRunnerError(storyId, errorMessage, logs);
}
__name(__throwError, "__throwError");
async function __waitForStorybook() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject();
    }, 1e4);
    if (document.querySelector("#root") || document.querySelector("#storybook-root")) {
      clearTimeout(timeout);
      return resolve();
    }
    const observer = new MutationObserver(() => {
      if (document.querySelector("#root") || document.querySelector("#storybook-root")) {
        clearTimeout(timeout);
        resolve();
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
__name(__waitForStorybook, "__waitForStorybook");
async function __getContext(storyId) {
  return globalThis.__STORYBOOK_PREVIEW__.storyStore.loadStory({
    storyId
  });
}
__name(__getContext, "__getContext");
function isServerComponentError(error) {
  return typeof error === "string" && (error.includes("Only Server Components can be async at the moment.") || error.includes("A component was suspended by an uncached promise.") || error.includes("async/await is not yet supported in Client Components"));
}
__name(isServerComponentError, "isServerComponentError");
async function __test(storyId) {
  try {
    await __waitForStorybook();
  } catch (err) {
    const message = `Timed out waiting for Storybook to load after 10 seconds. Are you sure the Storybook is running correctly in that URL? Is the Storybook private (e.g. under authentication layers)?


HTML: ${document.body.innerHTML}`;
    throw new StorybookTestRunnerError(storyId, message);
  }
  const channel = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
  if (!channel) {
    throw new StorybookTestRunnerError(storyId, "The test runner could not access the Storybook channel. Are you sure the Storybook is running correctly in that URL?");
  }
  addToUserAgent(`(StorybookTestRunner@${TEST_RUNNER_VERSION})`);
  let logs = [];
  let hasErrors = false;
  const logLevelMapping = {
    log: [
      "info",
      "verbose"
    ],
    warn: [
      "info",
      "warn",
      "verbose"
    ],
    error: [
      "info",
      "warn",
      "error",
      "verbose"
    ],
    info: [
      "verbose"
    ],
    trace: [
      "verbose"
    ],
    debug: [
      "verbose"
    ],
    group: [
      "verbose"
    ],
    groupCollapsed: [
      "verbose"
    ],
    table: [
      "verbose"
    ],
    dir: [
      "verbose"
    ]
  };
  const spyOnConsole = /* @__PURE__ */ __name((method, name) => {
    const originalFn = console[method].bind(console);
    console[method] = function() {
      const isConsoleError = method === "error";
      if (isConsoleError && isServerComponentError(arguments?.[0])) {
        return;
      }
      const shouldCollectError = TEST_RUNNER_FAIL_ON_CONSOLE === "true" && method === "error";
      if (shouldCollectError) {
        hasErrors = true;
      }
      let message = Array.from(arguments).map(composeMessage).join(", ");
      if (method === "trace") {
        const stackTrace = new Error().stack;
        message += `
${stackTrace}
`;
      }
      if (logLevelMapping[method].includes(TEST_RUNNER_LOG_LEVEL) || shouldCollectError) {
        const prefix = `${bold(name)}: `;
        logs.push(prefix + message);
      }
      originalFn(...arguments);
    };
  }, "spyOnConsole");
  const spiedMethods = {
    // info
    log: blue,
    info: blue,
    // warn
    warn: yellow,
    // error
    error: red,
    // verbose
    dir: magenta,
    trace: magenta,
    group: magenta,
    groupCollapsed: magenta,
    table: magenta,
    debug: magenta
  };
  Object.entries(spiedMethods).forEach(([method, color]) => {
    spyOnConsole(method, color(method));
  });
  const cleanup = /* @__PURE__ */ __name((_listeners) => {
    Object.entries(_listeners).forEach(([eventName, listener]) => {
      channel.off(eventName, listener);
    });
  }, "cleanup");
  return new Promise((resolve, reject) => {
    const rejectWithFormattedError = /* @__PURE__ */ __name((storyId2, message) => {
      const errorMessage = StorybookTestRunnerError.buildErrorMessage(storyId2, message, logs);
      testRunner_errorMessageFormatter(errorMessage).then((formattedMessage) => {
        reject(new StorybookTestRunnerError(storyId2, formattedMessage, logs, true));
      }).catch((error) => {
        reject(new StorybookTestRunnerError(storyId2, "There was an error when executing the errorMessageFormatter defiend in your Storybook test-runner config file. Please fix it and rerun the tests:\n\n" + error.message));
      });
    }, "rejectWithFormattedError");
    const listeners = {
      [TEST_RUNNER_RENDERED_EVENT]: () => {
        cleanup(listeners);
        if (hasErrors) {
          rejectWithFormattedError(storyId, "Browser console errors");
        } else {
          resolve(document.getElementById("root"));
        }
      },
      storyUnchanged: () => {
        cleanup(listeners);
        resolve(document.getElementById("root"));
      },
      storyErrored: ({ description }) => {
        cleanup(listeners);
        rejectWithFormattedError(storyId, description);
      },
      storyThrewException: (error) => {
        cleanup(listeners);
        rejectWithFormattedError(storyId, error.message);
      },
      playFunctionThrewException: (error) => {
        cleanup(listeners);
        rejectWithFormattedError(storyId, error.message);
      },
      unhandledErrorsWhilePlaying: ([error]) => {
        cleanup(listeners);
        rejectWithFormattedError(storyId, error.message);
      },
      storyMissing: (id) => {
        cleanup(listeners);
        if (id === storyId) {
          rejectWithFormattedError(storyId, "The story was missing when trying to access it.");
        }
      }
    };
    Object.entries(listeners).forEach(([eventName, listener]) => {
      channel.on(eventName, listener);
    });
    channel.emit("setCurrentStory", {
      storyId,
      viewMode: TEST_RUNNER_VIEW_MODE
    });
  });
}
__name(__test, "__test");
