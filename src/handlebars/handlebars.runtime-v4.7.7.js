/** !

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') { module.exports = factory(); } else if (typeof define === 'function' && define.amd) { define([], factory); } else if (typeof exports === 'object') { exports.Handlebars = factory(); } else { root.Handlebars = factory(); }
}(this, () =>
/** *** */ (function (modules) { // webpackBootstrap
        /** *** */ 	// The module cache
        /** *** */ 	const installedModules = {};

        /** *** */ 	// The require function
        /** *** */ 	function __webpack_require__(moduleId) {
            /** *** */ 		// Check if module is in cache
            /** *** */ 		if (installedModules[moduleId])
            /** *** */ 			{ return installedModules[moduleId].exports; }

            /** *** */ 		// Create a new module (and put it into the cache)
            /** *** */ 		const module = installedModules[moduleId] = {
                /** *** */ 			exports: {},
                /** *** */ 			id: moduleId,
                /** *** */ 			loaded: false,
                /** *** */ 		};

            /** *** */ 		// Execute the module function
            /** *** */ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            /** *** */ 		// Flag the module as loaded
            /** *** */ 		module.loaded = true;

            /** *** */ 		// Return the exports of the module
            /** *** */ 		return module.exports;
            /** *** */ 	}

        /** *** */ 	// expose the modules object (__webpack_modules__)
        /** *** */ 	__webpack_require__.m = modules;

        /** *** */ 	// expose the module cache
        /** *** */ 	__webpack_require__.c = installedModules;

        /** *** */ 	// __webpack_public_path__
        /** *** */ 	__webpack_require__.p = '';

        /** *** */ 	// Load entry module and return exports
        /** *** */ 	return __webpack_require__(0);
        /** *** */ }([
        /* 0 */
        /***/ (function (module, exports, __webpack_require__) {
            const _interopRequireWildcard = __webpack_require__(1).default;

            const _interopRequireDefault = __webpack_require__(2).default;

            exports.__esModule = true;

            const _handlebarsBase = __webpack_require__(3);

            const base = _interopRequireWildcard(_handlebarsBase);

            // Each of these augment the Handlebars object. No need to setup here.
            // (This is done to easily share code between commonjs and browse envs)

            const _handlebarsSafeString = __webpack_require__(36);

            const _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

            const _handlebarsException = __webpack_require__(5);

            const _handlebarsException2 = _interopRequireDefault(_handlebarsException);

            const _handlebarsUtils = __webpack_require__(4);

            const Utils = _interopRequireWildcard(_handlebarsUtils);

            const _handlebarsRuntime = __webpack_require__(37);

            const runtime = _interopRequireWildcard(_handlebarsRuntime);

            const _handlebarsNoConflict = __webpack_require__(43);

            const _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

            // For compatibility and usage outside of module systems, make the Handlebars object a namespace
            function create() {
	  const hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2.default;
	  hb.Exception = _handlebarsException2.default;
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
            }

            const inst = create();
            inst.create = create;

            _handlebarsNoConflict2.default(inst);

            inst.default = inst;

            exports.default = inst;
            module.exports = exports.default;
            /***/ }),
        /* 1 */
        /***/ (function (module, exports) {
            exports.default = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  }
	    const newObj = {};

	    if (obj != null) {
	      for (const key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj.default = obj;
	    return newObj;
            };

            exports.__esModule = true;
            /***/ }),
        /* 2 */
        /***/ (function (module, exports) {
            exports.default = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj,
	  };
            };

            exports.__esModule = true;
            /***/ }),
        /* 3 */
        /***/ (function (module, exports, __webpack_require__) {
            const _interopRequireDefault = __webpack_require__(2).default;

            exports.__esModule = true;
            exports.HandlebarsEnvironment = HandlebarsEnvironment;

            const _utils = __webpack_require__(4);

            const _exception = __webpack_require__(5);

            const _exception2 = _interopRequireDefault(_exception);

            const _helpers = __webpack_require__(9);

            const _decorators = __webpack_require__(29);

            const _logger = __webpack_require__(31);

            const _logger2 = _interopRequireDefault(_logger);

            const _internalProtoAccess = __webpack_require__(32);

            const VERSION = '4.7.7';
            exports.VERSION = VERSION;
            const COMPILER_REVISION = 8;
            exports.COMPILER_REVISION = COMPILER_REVISION;
            const LAST_COMPATIBLE_COMPILER_REVISION = 7;

            exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
            const REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0 <4.3.0',
	  8: '>= 4.3.0',
            };

            exports.REVISION_CHANGES = REVISION_CHANGES;
            const objectType = '[object Object]';

            function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
            }

            HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2.default,
	  log: _logger2.default.log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2.default('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2.default(`Attempting to register a partial called "${name}" as undefined`);
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2.default('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  },
	  /**
	   * Reset the memory of illegal property accesses that have already been logged.
	   * @deprecated should only be used in handlebars test-cases
	   */
	  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
	    _internalProtoAccess.resetLoggedProperties();
	  },
            };

            const { log } = _logger2.default;

            exports.log = log;
            exports.createFrame = _utils.createFrame;
            exports.logger = _logger2.default;
            /***/ }),
        /* 4 */
        /***/ (function (module, exports) {
            exports.__esModule = true;
            exports.extend = extend;
            exports.indexOf = indexOf;
            exports.escapeExpression = escapeExpression;
            exports.isEmpty = isEmpty;
            exports.createFrame = createFrame;
            exports.blockParams = blockParams;
            exports.appendContextPath = appendContextPath;
            const escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;',
            };

            const badChars = /[&<>"'`=]/g;
	    const possible = /[&<>"'`=]/;

            function escapeChar(chr) {
	  return escape[chr];
            }

            function extend(obj /* , ...source */) {
	  for (let i = 1; i < arguments.length; i++) {
	    for (const key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
            }

            const { toString } = Object.prototype;

            exports.toString = toString;
            // Sourced from lodash
            // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
            /* eslint-disable func-style */
            let isFunction = function isFunction(value) {
	  return typeof value === 'function';
            };
            // fallback for older versions of Chrome and Safari
            /* istanbul ignore next */
            if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
            }
            exports.isFunction = isFunction;

            /* eslint-enable func-style */

            /* istanbul ignore next */
            const isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
            };

            exports.isArray = isArray;
            // Older IE versions do not directly support indexOf so we must implement our own, sadly.

            function indexOf(array, value) {
	  for (let i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
            }

            function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } if (string == null) {
	      return '';
	    } if (!string) {
	      return `${string}`;
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = `${string}`;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
            }

            function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } if (isArray(value) && value.length === 0) {
	    return true;
	  }
	    return false;
            }

            function createFrame(object) {
	  const frame = extend({}, object);
	  frame._parent = object;
	  return frame;
            }

            function blockParams(params, ids) {
	  params.path = ids;
	  return params;
            }

            function appendContextPath(contextPath, id) {
	  return (contextPath ? `${contextPath}.` : '') + id;
            }
            /***/ }),
        /* 5 */
        /***/ (function (module, exports, __webpack_require__) {
            const _Object$defineProperty = __webpack_require__(6).default;

            exports.__esModule = true;
            const errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

            function Exception(message, node) {
	  const loc = node && node.loc;
	      let line;
	      let endLineNumber;
	      let column;
	      let endColumn;

	  if (loc) {
	    line = loc.start.line;
	    endLineNumber = loc.end.line;
	    column = loc.start.column;
	    endColumn = loc.end.column;

	    message += ` - ${line}:${column}`;
	  }

	  const tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (let idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  try {
	    if (loc) {
	      this.lineNumber = line;
	      this.endLineNumber = endLineNumber;

	      // Work around issue under safari where we can't directly set the column value
	      /* istanbul ignore next */
	      if (_Object$defineProperty) {
	        Object.defineProperty(this, 'column', {
	          value: column,
	          enumerable: true,
	        });
	        Object.defineProperty(this, 'endColumn', {
	          value: endColumn,
	          enumerable: true,
	        });
	      } else {
	        this.column = column;
	        this.endColumn = endColumn;
	      }
	    }
	  } catch (nop) {
	    /* Ignore if the browser is very particular */
	  }
            }

            Exception.prototype = new Error();

            exports.default = Exception;
            module.exports = exports.default;
            /***/ }),
        /* 6 */
        /***/ (function (module, exports, __webpack_require__) {
            module.exports = { default: __webpack_require__(7), __esModule: true };
            /***/ }),
        /* 7 */
        /***/ (function (module, exports, __webpack_require__) {
            const $ = __webpack_require__(8);
            module.exports = function defineProperty(it, key, desc) {
	  return $.setDesc(it, key, desc);
            };
            /***/ }),
        /* 8 */
        /***/ (function (module, exports) {
            const $Object = Object;
            module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: {}.propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach,
            };
            /***/ }),
        /* 9 */
        /***/ (function (module, exports, __webpack_require__) {
            const _interopRequireDefault = __webpack_require__(2).default;

            exports.__esModule = true;
            exports.registerDefaultHelpers = registerDefaultHelpers;
            exports.moveHelperToHooks = moveHelperToHooks;

            const _helpersBlockHelperMissing = __webpack_require__(10);

            const _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

            const _helpersEach = __webpack_require__(11);

            const _helpersEach2 = _interopRequireDefault(_helpersEach);

            const _helpersHelperMissing = __webpack_require__(24);

            const _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

            const _helpersIf = __webpack_require__(25);

            const _helpersIf2 = _interopRequireDefault(_helpersIf);

            const _helpersLog = __webpack_require__(26);

            const _helpersLog2 = _interopRequireDefault(_helpersLog);

            const _helpersLookup = __webpack_require__(27);

            const _helpersLookup2 = _interopRequireDefault(_helpersLookup);

            const _helpersWith = __webpack_require__(28);

            const _helpersWith2 = _interopRequireDefault(_helpersWith);

            function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2.default(instance);
	  _helpersEach2.default(instance);
	  _helpersHelperMissing2.default(instance);
	  _helpersIf2.default(instance);
	  _helpersLog2.default(instance);
	  _helpersLookup2.default(instance);
	  _helpersWith2.default(instance);
            }

            function moveHelperToHooks(instance, helperName, keepHelper) {
	  if (instance.helpers[helperName]) {
	    instance.hooks[helperName] = instance.helpers[helperName];
	    if (!keepHelper) {
	      delete instance.helpers[helperName];
	    }
	  }
            }
            /***/ }),
        /* 10 */
        /***/ (function (module, exports, __webpack_require__) {
            exports.__esModule = true;

            const _utils = __webpack_require__(4);

            exports.default = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    const { inverse } = options;
	        const { fn } = options;

	    if (context === true) {
	      return fn(this);
	    } if (context === false || context == null) {
	      return inverse(this);
	    } if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      }
	        return inverse(this);
	    }
	      if (options.data && options.ids) {
	        const data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data };
	      }

	      return fn(context, options);
	  });
            };

            module.exports = exports.default;
            /***/ }),
        /* 11 */
        /***/ (function (module, exports, __webpack_require__) {
            /* WEBPACK VAR INJECTION */(function (global) {
                const _Object$keys = __webpack_require__(12).default;

                const _interopRequireDefault = __webpack_require__(2).default;

                exports.__esModule = true;

                const _utils = __webpack_require__(4);

                const _exception = __webpack_require__(5);

                const _exception2 = _interopRequireDefault(_exception);

                exports.default = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2.default('Must pass iterator to #each');
	    }

	    const { fn } = options;
	        const { inverse } = options;
	        let i = 0;
	        let ret = '';
	        let data;
	        let contextPath;

	    if (options.data && options.ids) {
	      contextPath = `${_utils.appendContextPath(options.data.contextPath, options.ids[0])}.`;
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret += fn(context[field], {
	        data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null]),
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else if (global.Symbol && context[global.Symbol.iterator]) {
	        const newContext = [];
	        const iterator = context[global.Symbol.iterator]();
	        for (let it = iterator.next(); !it.done; it = iterator.next()) {
	          newContext.push(it.value);
	        }
	        context = newContext;
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        (function () {
	          let priorKey;

	          _Object$keys(context).forEach((key) => {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          });
	          if (priorKey !== undefined) {
	            execIteration(priorKey, i - 1, true);
	          }
	        }());
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
                };

                module.exports = exports.default;
                /* WEBPACK VAR INJECTION */ }.call(exports, (function () { return this; }())));
            /***/ }),
        /* 12 */
        /***/ (function (module, exports, __webpack_require__) {
            module.exports = { default: __webpack_require__(13), __esModule: true };
            /***/ }),
        /* 13 */
        /***/ (function (module, exports, __webpack_require__) {
            __webpack_require__(14);
            module.exports = __webpack_require__(20).Object.keys;
            /***/ }),
        /* 14 */
        /***/ (function (module, exports, __webpack_require__) {
            // 19.1.2.14 Object.keys(O)
            const toObject = __webpack_require__(15);

            __webpack_require__(17)('keys', ($keys) => function keys(it) {
	    return $keys(toObject(it));
	  });
            /***/ }),
        /* 15 */
        /***/ (function (module, exports, __webpack_require__) {
            // 7.1.13 ToObject(argument)
            const defined = __webpack_require__(16);
            module.exports = function (it) {
	  return Object(defined(it));
            };
            /***/ }),
        /* 16 */
        /***/ (function (module, exports) {
            // 7.2.1 RequireObjectCoercible(argument)
            module.exports = function (it) {
	  if (it == undefined) throw TypeError(`Can't call method on  ${it}`);
	  return it;
            };
            /***/ }),
        /* 17 */
        /***/ (function (module, exports, __webpack_require__) {
            // most Object methods by ES6 should accept primitives
            const $export = __webpack_require__(18);
            const core = __webpack_require__(20);
            const fails = __webpack_require__(23);
            module.exports = function (KEY, exec) {
	  const fn = (core.Object || {})[KEY] || Object[KEY];
                const exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(() => { fn(1); }), 'Object', exp);
            };
            /***/ }),
        /* 18 */
        /***/ (function (module, exports, __webpack_require__) {
            const global = __webpack_require__(19);
            const core = __webpack_require__(20);
            const ctx = __webpack_require__(21);
            const PROTOTYPE = 'prototype';

            var $export = function (type, name, source) {
	  const IS_FORCED = type & $export.F;
                const IS_GLOBAL = type & $export.G;
                const IS_STATIC = type & $export.S;
                const IS_PROTO = type & $export.P;
                const IS_BIND = type & $export.B;
                const IS_WRAP = type & $export.W;
                const exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
                const target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
                let key; let own; let
                    out;
	  if (IS_GLOBAL)source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] !== 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      const F = function (param) {
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    }(out)) : IS_PROTO && typeof out === 'function' ? ctx(Function.call, out) : out;
	    if (IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
            };
            // type bitmap
            $export.F = 1; // forced
            $export.G = 2; // global
            $export.S = 4; // static
            $export.P = 8; // proto
            $export.B = 16; // bind
            $export.W = 32; // wrap
            module.exports = $export;
            /***/ }),
        /* 19 */
        /***/ (function (module, exports) {
            // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
            const global = module.exports = typeof window !== 'undefined' && window.Math == Math
	  ? window : typeof self !== 'undefined' && self.Math == Math ? self : Function('return this')();
            if (typeof __g === 'number')__g = global; // eslint-disable-line no-undef
            /***/ }),
        /* 20 */
        /***/ (function (module, exports) {
            const core = module.exports = { version: '1.2.6' };
            if (typeof __e === 'number')__e = core; // eslint-disable-line no-undef
            /***/ }),
        /* 21 */
        /***/ (function (module, exports, __webpack_require__) {
            // optional / simple context binding
            const aFunction = __webpack_require__(22);
            module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
            };
            /***/ }),
        /* 22 */
        /***/ (function (module, exports) {
            module.exports = function (it) {
	  if (typeof it !== 'function') throw TypeError(`${it} is not a function!`);
	  return it;
            };
            /***/ }),
        /* 23 */
        /***/ (function (module, exports) {
            module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
            };
            /***/ }),
        /* 24 */
        /***/ (function (module, exports, __webpack_require__) {
            const _interopRequireDefault = __webpack_require__(2).default;

            exports.__esModule = true;

            const _exception = __webpack_require__(5);

            const _exception2 = _interopRequireDefault(_exception);

            exports.default = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    }
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2.default(`Missing helper: "${arguments[arguments.length - 1].name}"`);
	  });
            };

            module.exports = exports.default;
            /***/ }),
        /* 25 */
        /***/ (function (module, exports, __webpack_require__) {
            const _interopRequireDefault = __webpack_require__(2).default;

            exports.__esModule = true;

            const _utils = __webpack_require__(4);

            const _exception = __webpack_require__(5);

            const _exception2 = _interopRequireDefault(_exception);

            exports.default = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (arguments.length != 2) {
	      throw new _exception2.default('#if requires exactly one argument');
	    }
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    }
	      return options.fn(this);
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    if (arguments.length != 2) {
	      throw new _exception2.default('#unless requires exactly one argument');
	    }
	    return instance.helpers.if.call(this, conditional, {
	      fn: options.inverse,
	      inverse: options.fn,
	      hash: options.hash,
	    });
	  });
            };

            module.exports = exports.default;
            /***/ }),
        /* 26 */
        /***/ (function (module, exports) {
            exports.__esModule = true;

            exports.default = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    const args = [undefined];
	        const options = arguments[arguments.length - 1];
	    for (let i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    let level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
            };

            module.exports = exports.default;
            /***/ }),
        /* 27 */
        /***/ (function (module, exports) {
            exports.__esModule = true;

            exports.default = function (instance) {
	  instance.registerHelper('lookup', (obj, field, options) => {
	    if (!obj) {
	      // Note for 5.0: Change to "obj == null" in 5.0
	      return obj;
	    }
	    return options.lookupProperty(obj, field);
	  });
            };

            module.exports = exports.default;
            /***/ }),
        /* 28 */
        /***/ (function (module, exports, __webpack_require__) {
            const _interopRequireDefault = __webpack_require__(2).default;

            exports.__esModule = true;

            const _utils = __webpack_require__(4);

            const _exception = __webpack_require__(5);

            const _exception2 = _interopRequireDefault(_exception);

            exports.default = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (arguments.length != 2) {
	      throw new _exception2.default('#with requires exactly one argument');
	    }
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    const { fn } = options;

	    if (!_utils.isEmpty(context)) {
	      let { data } = options;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath]),
	      });
	    }
	      return options.inverse(this);
	  });
            };

            module.exports = exports.default;
            /***/ }),
        /* 29 */
        /***/ (function (module, exports, __webpack_require__) {
            const _interopRequireDefault = __webpack_require__(2).default;

            exports.__esModule = true;
            exports.registerDefaultDecorators = registerDefaultDecorators;

            const _decoratorsInline = __webpack_require__(30);

            const _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

            function registerDefaultDecorators(instance) {
	  _decoratorsInline2.default(instance);
            }
            /***/ }),
        /* 30 */
        /***/ (function (module, exports, __webpack_require__) {
            exports.__esModule = true;

            const _utils = __webpack_require__(4);

            exports.default = function (instance) {
	  instance.registerDecorator('inline', (fn, props, container, options) => {
	    let ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        const original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        const ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
            };

            module.exports = exports.default;
            /***/ }),
        /* 31 */
        /***/ (function (module, exports, __webpack_require__) {
            exports.__esModule = true;

            const _utils = __webpack_require__(4);

            var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      const levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      let method = logger.methodMap[level];
	      // eslint-disable-next-line no-console
	      if (!console[method]) {
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  },
            };

            exports.default = logger;
            module.exports = exports.default;
            /***/ }),
        /* 32 */
        /***/ (function (module, exports, __webpack_require__) {
            const _Object$create = __webpack_require__(33).default;

            const _Object$keys = __webpack_require__(12).default;

            const _interopRequireWildcard = __webpack_require__(1).default;

            exports.__esModule = true;
            exports.createProtoAccessControl = createProtoAccessControl;
            exports.resultIsAllowed = resultIsAllowed;
            exports.resetLoggedProperties = resetLoggedProperties;

            const _createNewLookupObject = __webpack_require__(35);

            const _logger = __webpack_require__(31);

            const logger = _interopRequireWildcard(_logger);

            const loggedProperties = _Object$create(null);

            function createProtoAccessControl(runtimeOptions) {
	  const defaultMethodWhiteList = _Object$create(null);
	  defaultMethodWhiteList.constructor = false;
	  defaultMethodWhiteList.__defineGetter__ = false;
	  defaultMethodWhiteList.__defineSetter__ = false;
	  defaultMethodWhiteList.__lookupGetter__ = false;

	  const defaultPropertyWhiteList = _Object$create(null);
	  // eslint-disable-next-line no-proto
	  defaultPropertyWhiteList.__proto__ = false;

	  return {
	    properties: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
	      defaultValue: runtimeOptions.allowProtoPropertiesByDefault,
	    },
	    methods: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
	      defaultValue: runtimeOptions.allowProtoMethodsByDefault,
	    },
	  };
            }

            function resultIsAllowed(result, protoAccessControl, propertyName) {
	  if (typeof result === 'function') {
	    return checkWhiteList(protoAccessControl.methods, propertyName);
	  }
	    return checkWhiteList(protoAccessControl.properties, propertyName);
            }

            function checkWhiteList(protoAccessControlForType, propertyName) {
	  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
	    return protoAccessControlForType.whitelist[propertyName] === true;
	  }
	  if (protoAccessControlForType.defaultValue !== undefined) {
	    return protoAccessControlForType.defaultValue;
	  }
	  logUnexpecedPropertyAccessOnce(propertyName);
	  return false;
            }

            function logUnexpecedPropertyAccessOnce(propertyName) {
	  if (loggedProperties[propertyName] !== true) {
	    loggedProperties[propertyName] = true;
	    logger.log('error', `Handlebars: Access has been denied to resolve the property "${propertyName}" because it is not an "own property" of its parent.\n` + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
	  }
            }

            function resetLoggedProperties() {
	  _Object$keys(loggedProperties).forEach((propertyName) => {
	    delete loggedProperties[propertyName];
	  });
            }
            /***/ }),
        /* 33 */
        /***/ (function (module, exports, __webpack_require__) {
            module.exports = { default: __webpack_require__(34), __esModule: true };
            /***/ }),
        /* 34 */
        /***/ (function (module, exports, __webpack_require__) {
            const $ = __webpack_require__(8);
            module.exports = function create(P, D) {
	  return $.create(P, D);
            };
            /***/ }),
        /* 35 */
        /***/ (function (module, exports, __webpack_require__) {
            const _Object$create = __webpack_require__(33).default;

            exports.__esModule = true;
            exports.createNewLookupObject = createNewLookupObject;

            const _utils = __webpack_require__(4);

            /**
	 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
	 * The resulting object can be used with "object[property]" to check if a property exists
	 * @param {...object} sources a varargs parameter of source objects that will be merged
	 * @returns {object}
	 */

            function createNewLookupObject() {
	  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	    sources[_key] = arguments[_key];
	  }

	  return _utils.extend.apply(undefined, [_Object$create(null)].concat(sources));
            }
            /***/ }),
        /* 36 */
        /***/ (function (module, exports) {
            // Build out our basic SafeString type

            exports.__esModule = true;
            function SafeString(string) {
	  this.string = string;
            }

            SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return `${this.string}`;
            };

            exports.default = SafeString;
            module.exports = exports.default;
            /***/ }),
        /* 37 */
        /***/ (function (module, exports, __webpack_require__) {
            const _Object$seal = __webpack_require__(38).default;

            const _Object$keys = __webpack_require__(12).default;

            const _interopRequireWildcard = __webpack_require__(1).default;

            const _interopRequireDefault = __webpack_require__(2).default;

            exports.__esModule = true;
            exports.checkRevision = checkRevision;
            exports.template = template;
            exports.wrapProgram = wrapProgram;
            exports.resolvePartial = resolvePartial;
            exports.invokePartial = invokePartial;
            exports.noop = noop;

            const _utils = __webpack_require__(4);

            const Utils = _interopRequireWildcard(_utils);

            const _exception = __webpack_require__(5);

            const _exception2 = _interopRequireDefault(_exception);

            const _base = __webpack_require__(3);

            const _helpers = __webpack_require__(9);

            const _internalWrapHelper = __webpack_require__(42);

            const _internalProtoAccess = __webpack_require__(32);

            function checkRevision(compilerInfo) {
	  const compilerRevision = compilerInfo && compilerInfo[0] || 1;
	      const currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
	    return;
	  }

	  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
	    const runtimeVersions = _base.REVISION_CHANGES[currentRevision];
	        const compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	    throw new _exception2.default('Template was precompiled with an older version of Handlebars than the current runtime. ' + `Please update your precompiler to a newer version (${runtimeVersions}) or downgrade your runtime to an older version (${compilerVersions}).`);
	  } else {
	    // Use the embedded version info since the runtime doesn't know about this revision yet
	    throw new _exception2.default('Template was precompiled with a newer version of Handlebars than the current runtime. ' + `Please update your runtime to a newer version (${compilerInfo[1]}).`);
	  }
            }

            function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2.default('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2.default(`Unknown template object: ${typeof templateSpec}`);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as pseudo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
	  const templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }
	    partial = env.VM.resolvePartial.call(this, partial, context, options);

	    const extendedOptions = Utils.extend({}, options, {
	      hooks: this.hooks,
	      protoAccessControl: this.protoAccessControl,
	    });

	    let result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, extendedOptions);
	    }
	    if (result != null) {
	      if (options.indent) {
	        const lines = result.split('\n');
	        for (let i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    }
	      throw new _exception2.default(`The partial ${options.name} could not be compiled when running in runtime-only mode`);
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name, loc) {
	      if (!obj || !(name in obj)) {
	        throw new _exception2.default(`"${name}" not defined in ${obj}`, {
	          loc,
	        });
	      }
	      return container.lookupProperty(obj, name);
	    },
	    lookupProperty: function lookupProperty(parent, propertyName) {
	      const result = parent[propertyName];
	      if (result == null) {
	        return result;
	      }
	      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
	        return result;
	      }

	      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
	        return result;
	      }
	      return undefined;
	    },
	    lookup: function lookup(depths, name) {
	      const len = depths.length;
	      for (let i = 0; i < len; i++) {
	        const result = depths[i] && container.lookupProperty(depths[i], name);
	        if (result != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      const ret = templateSpec[i];
	      ret.decorator = templateSpec[`${i}_d`];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      let programWrapper = this.programs[i];
	          const fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    mergeIfNeeded: function mergeIfNeeded(param, common) {
	      let obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },
	    // An empty object to use as replacement for null-contexts
	    nullContext: _Object$seal({}),

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler,
	  };

	  function ret(context) {
	    const options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    let { data } = options;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    let depths;
	        const blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /* , options */) {
	      return `${templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths)}`;
	    }

	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }

	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      const mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
	      wrapHelpersToPassLookupProperty(mergedHelpers, container);
	      container.helpers = mergedHelpers;

	      if (templateSpec.usePartial) {
	        // Use mergeIfNeeded here to prevent compiling global partials multiple times
	        container.partials = container.mergeIfNeeded(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = Utils.extend({}, env.decorators, options.decorators);
	      }

	      container.hooks = {};
	      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);

	      const keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
	      _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
	      _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
	    } else {
	      container.protoAccessControl = options.protoAccessControl; // internal option
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	      container.hooks = options.hooks;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2.default('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2.default('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
            }

            function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    const options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    let currentDepths = depths;
	    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
            }

            /**
	 * This is currently part of the official API, therefore implementation details should not be changed.
	 */

            function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
            }

            function invokePartial(partial, context, options) {
	  // Use the current closure context to save the partial-block if this partial
	  const currentPartialBlock = options.data && options.data['partial-block'];
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  let partialBlock;
	  if (options.fn && options.fn !== noop) {
	    (function () {
	      options.data = _base.createFrame(options.data);
	      // Wrapper function to get access to currentPartialBlock from the closure
	      const { fn } = options;
	      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
	        const options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        // Restore the partial-block from the closure for the execution of the block
	        // i.e. the part inside the block of the partial call.
	        options.data = _base.createFrame(options.data);
	        options.data['partial-block'] = currentPartialBlock;
	        return fn(context, options);
	      };
	      if (fn.partials) {
	        options.partials = Utils.extend({}, options.partials, fn.partials);
	      }
	    }());
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2.default(`The partial ${options.name} could not be found`);
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
            }

            function noop() {
	  return '';
            }

            function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
            }

            function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    const props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
            }

            function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
	  _Object$keys(mergedHelpers).forEach((helperName) => {
	    const helper = mergedHelpers[helperName];
	    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
	  });
            }

            function passLookupPropertyOption(helper, container) {
	  const { lookupProperty } = container;
	  return _internalWrapHelper.wrapHelper(helper, (options) => Utils.extend({ lookupProperty }, options));
            }
            /***/ }),
        /* 38 */
        /***/ (function (module, exports, __webpack_require__) {
            module.exports = { default: __webpack_require__(39), __esModule: true };
            /***/ }),
        /* 39 */
        /***/ (function (module, exports, __webpack_require__) {
            __webpack_require__(40);
            module.exports = __webpack_require__(20).Object.seal;
            /***/ }),
        /* 40 */
        /***/ (function (module, exports, __webpack_require__) {
            // 19.1.2.17 Object.seal(O)
            const isObject = __webpack_require__(41);

            __webpack_require__(17)('seal', ($seal) => function seal(it) {
	    return $seal && isObject(it) ? $seal(it) : it;
	  });
            /***/ }),
        /* 41 */
        /***/ (function (module, exports) {
            module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
            };
            /***/ }),
        /* 42 */
        /***/ (function (module, exports) {
            exports.__esModule = true;
            exports.wrapHelper = wrapHelper;

            function wrapHelper(helper, transformOptionsFn) {
	  if (typeof helper !== 'function') {
	    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
	    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
	    return helper;
	  }
	  const wrapper = function wrapper() /* dynamic arguments */{
	    const options = arguments[arguments.length - 1];
	    arguments[arguments.length - 1] = transformOptionsFn(options);
	    return helper.apply(this, arguments);
	  };
	  return wrapper;
            }
            /***/ }),
        /* 43 */
        /***/ (function (module, exports) {
            /* WEBPACK VAR INJECTION */(function (global) {
                exports.__esModule = true;

                exports.default = function (Handlebars) {
	  /* istanbul ignore next */
	  const root = typeof global !== 'undefined' ? global : window;
	      const $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
                };

                module.exports = exports.default;
                /* WEBPACK VAR INJECTION */ }.call(exports, (function () { return this; }())));
            /***/ }),
        /** *** */ ]))));
