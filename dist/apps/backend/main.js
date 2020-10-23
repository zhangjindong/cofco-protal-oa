/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const config_1 = __webpack_require__(6);
const logger_middleware_1 = __webpack_require__(48);
const transform_interceptor_1 = __webpack_require__(56);
const http_exception_filter_1 = __webpack_require__(57);
const any_exception_filter_1 = __webpack_require__(58);
const validation_pipe_1 = __webpack_require__(59);
const swagger_1 = __webpack_require__(9);
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('port');
    app.setGlobalPrefix('api');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('首页Nodejs Api')
        .setDescription('The portal API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('apidoc', app, document);
    app.use(logger_middleware_1.logger);
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new any_exception_filter_1.AllExceptionsFilter());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.listen(port);
}
bootstrap();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_controller_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(5);
const angular_module_1 = __webpack_require__(10);
const config_1 = __webpack_require__(6);
const organization_module_1 = __webpack_require__(25);
const keycloak_admin_module_1 = __webpack_require__(28);
const user_module_1 = __webpack_require__(33);
const message_module_1 = __webpack_require__(35);
const keycloak_registration_module_1 = __webpack_require__(38);
const configuration_1 = __webpack_require__(42);
const redis_session_module_1 = __webpack_require__(43);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            angular_module_1.AngularModule.forRoot({
                rootPath: 'dist/www',
            }),
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
            organization_module_1.OrganizationModule,
            keycloak_admin_module_1.KeycloakAdminModule,
            user_module_1.UserModule,
            message_module_1.MessageModule,
            keycloak_registration_module_1.KeycloakRegistrationModule,
            redis_session_module_1.RedisSessionModule.register({
                session: {
                    secret: 'secret',
                    saveUninitialized: false,
                    resave: false,
                },
                redis: {
                    host: 'localhost',
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(5);
const config_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(7);
const operators_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(9);
let AppController = class AppController {
    constructor(appService, configService) {
        this.appService = appService;
        this.configService = configService;
    }
    getLinks() {
        return this.configService.get('links');
    }
    getEnvs(params) {
        return this.configService.get(params.env);
    }
    hello() {
        return rxjs_1.from([1, 2, 3, 4, 5, 6]).pipe(operators_1.tap(v => common_1.Logger.log(v)), operators_1.map(v => v + 1), operators_1.mergeMap(v => {
            if (v == 3) {
                common_1.Logger.log('00000');
                return rxjs_1.throwError('不存在3');
            }
            else {
                return rxjs_1.of({ code: 200, data: v });
            }
        }), operators_1.mergeMap(v => {
            common_1.Logger.log('1111');
            if (v.code !== 200) {
                return rxjs_1.throwError('不存在4');
            }
            else {
                return rxjs_1.of({ code: 200, data: v.data * 2 });
            }
        }), operators_1.catchError(err => {
            common_1.Logger.log(err);
            return rxjs_1.of({ code: 500, err });
        }));
    }
};
__decorate([
    common_1.Get('links'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getLinks", null);
__decorate([
    common_1.Get('env/:env'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "getEnvs", null);
__decorate([
    common_1.Get('hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_a = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _a : Object)
], AppController.prototype, "hello", null);
AppController = __decorate([
    swagger_1.ApiBearerAuth(),
    common_1.Controller(''),
    __metadata("design:paramtypes", [typeof (_b = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/config");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AngularModule_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularModule = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const angular_constants_1 = __webpack_require__(11);
const angular_providers_1 = __webpack_require__(12);
const angular_options_interface_1 = __webpack_require__(24);
const abstract_loader_1 = __webpack_require__(13);
let AngularModule = AngularModule_1 = class AngularModule {
    constructor(ngOptions, loader, httpAdapterHost) {
        this.ngOptions = ngOptions;
        this.loader = loader;
        this.httpAdapterHost = httpAdapterHost;
    }
    static forRoot(options = {}) {
        options.rootPath = options.rootPath || angular_constants_1.DEFAULT_ROOT_PATH;
        options.renderPath = options.renderPath || angular_constants_1.DEFAULT_RENDER_PATH;
        return {
            module: AngularModule_1,
            providers: [
                {
                    provide: angular_constants_1.ANGULAR_MODULE_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
    async onModuleInit() {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        this.loader.register(httpAdapter, this.ngOptions);
    }
};
AngularModule = AngularModule_1 = __decorate([
    common_1.Module({
        providers: [...angular_providers_1.angularProviders],
    }),
    __param(0, common_1.Inject(angular_constants_1.ANGULAR_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [typeof (_a = typeof angular_options_interface_1.AngularModuleOptions !== "undefined" && angular_options_interface_1.AngularModuleOptions) === "function" ? _a : Object, typeof (_b = typeof abstract_loader_1.AbstractLoader !== "undefined" && abstract_loader_1.AbstractLoader) === "function" ? _b : Object, typeof (_c = typeof core_1.HttpAdapterHost !== "undefined" && core_1.HttpAdapterHost) === "function" ? _c : Object])
], AngularModule);
exports.AngularModule = AngularModule;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_RENDER_PATH = exports.DEFAULT_ROOT_PATH = exports.ANGULAR_MODULE_OPTIONS = void 0;
exports.ANGULAR_MODULE_OPTIONS = 'ANGULAR_MODULE_OPTIONS';
exports.DEFAULT_ROOT_PATH = 'client/dist';
exports.DEFAULT_RENDER_PATH = '*';


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.angularProviders = void 0;
const core_1 = __webpack_require__(1);
const abstract_loader_1 = __webpack_require__(13);
const express_loader_1 = __webpack_require__(15);
const fastify_loader_1 = __webpack_require__(20);
const noop_loader_1 = __webpack_require__(23);
exports.angularProviders = [
    {
        provide: abstract_loader_1.AbstractLoader,
        useFactory: (httpAdapterHost) => {
            if (!httpAdapterHost) {
                return new noop_loader_1.NoopLoader();
            }
            const httpAdapter = httpAdapterHost.httpAdapter;
            if (httpAdapter &&
                httpAdapter.constructor &&
                httpAdapter.constructor.name === 'FastifyAdapter') {
                return new fastify_loader_1.FastifyLoader();
            }
            return new express_loader_1.ExpressLoader();
        },
        inject: [core_1.HttpAdapterHost],
    },
];


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLoader = void 0;
const common_1 = __webpack_require__(3);
const path_1 = __webpack_require__(14);
let AbstractLoader = class AbstractLoader {
    getIndexFilePath(clientPath) {
        return path_1.join(clientPath, 'index.html');
    }
};
AbstractLoader = __decorate([
    common_1.Injectable()
], AbstractLoader);
exports.AbstractLoader = AbstractLoader;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressLoader = void 0;
const common_1 = __webpack_require__(3);
const angular_utils_1 = __webpack_require__(16);
const abstract_loader_1 = __webpack_require__(13);
const historyApiFallback = __webpack_require__(18);
let ExpressLoader = class ExpressLoader extends abstract_loader_1.AbstractLoader {
    register(httpAdapter, options) {
        const app = httpAdapter.getInstance();
        const express = angular_utils_1.loadPackage('express', 'AngularModule', () => __webpack_require__(19));
        const clientPath = options.rootPath;
        const indexFilePath = this.getIndexFilePath(clientPath);
        app.use(historyApiFallback({
            logger: (...logs) => common_1.Logger.log(logs.join(' ')),
            rewrites: [
                {
                    from: /^\/api\/(.*)$/,
                    to(context) {
                        return `/${context.match[2]}/${context.match[3]}`;
                    },
                },
            ],
        }));
        app.use(express.static(clientPath, options.serveStaticOptions));
        app.get(options.renderPath, (req, res) => {
            console.log(req.path);
            res.sendFile(indexFilePath);
        });
    }
};
ExpressLoader = __decorate([
    common_1.Injectable()
], ExpressLoader);
exports.ExpressLoader = ExpressLoader;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPackage = void 0;
const common_1 = __webpack_require__(3);
const MISSING_REQUIRED_DEPENDENCY = (name, reason) => `The "${name}" package is missing. Please, make sure to install this library ($ npm install ${name}) to take advantage of ${reason}.`;
const logger = new common_1.Logger('PackageLoader');
function loadPackage(packageName, context, loaderFn) {
    try {
        return loaderFn ? loaderFn() : __webpack_require__(17)(packageName);
    }
    catch (e) {
        logger.error(MISSING_REQUIRED_DEPENDENCY(packageName, context));
        process.exit(1);
    }
}
exports.loadPackage = loadPackage;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 17;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("connect-history-api-fallback");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyLoader = void 0;
const common_1 = __webpack_require__(3);
const fs = __webpack_require__(21);
const angular_utils_1 = __webpack_require__(16);
const abstract_loader_1 = __webpack_require__(13);
let FastifyLoader = class FastifyLoader extends abstract_loader_1.AbstractLoader {
    register(httpAdapter, options) {
        const app = httpAdapter.getInstance();
        const fastifyStatic = angular_utils_1.loadPackage('fastify-static', 'AngularModule', () => __webpack_require__(22));
        const _a = options.serveStaticOptions || {}, { setHeaders, redirect } = _a, send = __rest(_a, ["setHeaders", "redirect"]);
        const clientPath = options.rootPath;
        const indexFilePath = this.getIndexFilePath(clientPath);
        app.register(fastifyStatic, {
            root: clientPath,
            setHeaders,
            redirect,
            send,
        });
        app.get(options.renderPath, (req, res) => {
            const stream = fs.createReadStream(indexFilePath);
            res.type('text/html').send(stream);
        });
    }
};
FastifyLoader = __decorate([
    common_1.Injectable()
], FastifyLoader);
exports.FastifyLoader = FastifyLoader;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("fastify-static");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopLoader = void 0;
const common_1 = __webpack_require__(3);
const abstract_loader_1 = __webpack_require__(13);
let NoopLoader = class NoopLoader extends abstract_loader_1.AbstractLoader {
    register(httpAdapter, options) { }
};
NoopLoader = __decorate([
    common_1.Injectable()
], NoopLoader);
exports.NoopLoader = NoopLoader;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const common_1 = __webpack_require__(3);
const organization_controller_1 = __webpack_require__(26);
const organization_service_1 = __webpack_require__(27);
let OrganizationModule = class OrganizationModule {
};
OrganizationModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        controllers: [organization_controller_1.OrganizationController],
        providers: [organization_service_1.OrganizationService],
        exports: [organization_service_1.OrganizationService],
    })
], OrganizationModule);
exports.OrganizationModule = OrganizationModule;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const common_1 = __webpack_require__(3);
const organization_service_1 = __webpack_require__(27);
const operators_1 = __webpack_require__(8);
const rxjs_1 = __webpack_require__(7);
let OrganizationController = class OrganizationController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    getInvitation(params) {
        return this.organizationService.invitationCheckCode(params.code).pipe(operators_1.map((value) => value.data), operators_1.switchMap(value => this.organizationService.getInvitation(value)), operators_1.map(result => {
            if (result.status === 200 && result.data) {
                return { code: 200, data: result.data };
            }
            else {
                return { code: 200, data: null };
            }
        }));
    }
};
__decorate([
    common_1.Get('invitation/:code'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_a = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _a : Object)
], OrganizationController.prototype, "getInvitation", null);
OrganizationController = __decorate([
    common_1.Controller('cus'),
    __metadata("design:paramtypes", [typeof (_b = typeof organization_service_1.OrganizationService !== "undefined" && organization_service_1.OrganizationService) === "function" ? _b : Object])
], OrganizationController);
exports.OrganizationController = OrganizationController;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(6);
let OrganizationService = class OrganizationService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    invitationCheckCode(code) {
        return this.httpService.get(`${this.configService.get('service.orgAddress')}/customer/invitation/check/${code}`);
    }
    getInvitation(oid) {
        return this.httpService.get(`${this.configService.get('service.orgAddress')}/customer/baseinfo/${oid}`);
    }
    invitationDeleteCode(code) {
        return this.httpService.delete(`${this.configService.get('service.orgAddress')}/customer/invitation/${code}`);
    }
};
OrganizationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof common_1.HttpService !== "undefined" && common_1.HttpService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], OrganizationService);
exports.OrganizationService = OrganizationService;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakAdminModule = void 0;
const common_1 = __webpack_require__(3);
const keycloak_admin_service_1 = __webpack_require__(29);
const keycloak_admin_controller_1 = __webpack_require__(32);
const keycloak_admin_1 = __webpack_require__(30);
let KeycloakAdminModule = class KeycloakAdminModule {
};
KeycloakAdminModule = __decorate([
    common_1.Module({
        providers: [keycloak_admin_service_1.KeycloakAdminService, keycloak_admin_1.default],
        controllers: [keycloak_admin_controller_1.KeycloakAdminController],
        exports: [keycloak_admin_service_1.KeycloakAdminService],
    })
], KeycloakAdminModule);
exports.KeycloakAdminModule = KeycloakAdminModule;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakAdminService = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(6);
const keycloak_admin_1 = __webpack_require__(30);
const openid_client_1 = __webpack_require__(31);
const rxjs_1 = __webpack_require__(7);
const operators_1 = __webpack_require__(8);
let KeycloakAdminService = class KeycloakAdminService {
    constructor(configService) {
        this.configService = configService;
        this.connectKeycloakServer();
    }
    connectKeycloakServer() {
        try {
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
            const keycloakConfig = this.configService.get('keycloak');
            const kcAdminClient = new keycloak_admin_1.default({
                baseUrl: keycloakConfig.url,
                realmName: keycloakConfig.realmName,
            });
            common_1.Logger.log('链接keycloak ');
            kcAdminClient
                .auth(keycloakConfig.admin)
                .then(() => {
                common_1.Logger.log('链接keycloak 成功');
                kcAdminClient.setConfig({ realmName: keycloakConfig.realmName });
                this.kcAdminClient = kcAdminClient;
                return this.refreshToken();
            })
                .catch(error => {
                common_1.Logger.log('', '链接keycloak错误');
            });
        }
        catch (error) {
            common_1.Logger.log('', '链接keycloak错222误');
        }
    }
    async refreshToken() {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        const keycloakConfig = this.configService.get('keycloak');
        const keycloakIssuer = await openid_client_1.Issuer.discover(`${keycloakConfig.url}/realms/${keycloakConfig.realmName}`);
        const client = new keycloakIssuer.Client({
            client_id: 'admin-cli',
            client_secret: keycloakConfig.admin.clientSecret,
        });
        let tokenSet = await client.grant({
            grant_type: 'password',
            username: keycloakConfig.admin.username,
            password: keycloakConfig.admin.password,
        });
        this.refreshTokenIntervalId = setInterval(async () => {
            try {
                process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
                const refreshToken = tokenSet.refresh_token;
                tokenSet = await client.refresh(refreshToken);
                common_1.Logger.log(tokenSet.refresh_expires_in, '刷新管理员token refresh_expires_in:');
                this.kcAdminClient.setAccessToken(tokenSet.access_token);
            }
            catch (error) {
                common_1.Logger.log(error, '刷新管理员token 异常');
                clearInterval(this.refreshTokenIntervalId);
                common_1.Logger.log('', '重新登录keycloak admin-cli');
                this.connectKeycloakServer();
            }
        }, 58 * 1000);
    }
    registerUser(user) {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        let userid, groupId, clientId;
        const clientRoles = [];
        const { externalId, password } = user.attributes;
        const credential = {
            temporary: false,
            type: 'password',
            value: password[0],
        };
        common_1.Logger.log(user);
        delete user.attributes.password;
        delete user.attributes.reppassword;
        const userObj = {
            attributes: user.attributes,
            email: user.email,
            enabled: user.enabled,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
        };
        common_1.Logger.log(userObj);
        const adduser$ = rxjs_1.from(this.kcAdminClient.users.find({
            username: userObj.username,
        })).pipe(operators_1.tap(() => common_1.Logger.log('查询用户名是否存在')), operators_1.mergeMap((users) => {
            return users.length > 0
                ? rxjs_1.throwError('用户名已存在')
                : this.kcAdminClient.users.find({
                    email: userObj.email,
                });
        }), operators_1.tap(() => common_1.Logger.log('查询Email是否存在')), operators_1.mergeMap((users) => {
            return users.length > 0
                ? rxjs_1.throwError('Email已存在')
                : this.kcAdminClient.groups.find({ search: externalId });
        }), operators_1.mergeMap(groups => {
            if (groups && groups.length > 0 && groups[0].id) {
                groupId = groups[0].id;
                return this.kcAdminClient.users.create(userObj);
            }
            else {
                return rxjs_1.throwError('未找到该组：' + externalId);
            }
        }), operators_1.tap(value => common_1.Logger.log(value, '查询组')), operators_1.tap(id => {
            common_1.Logger.log(id, '已创建用户ID');
        }), operators_1.mergeMap(id => {
            if (id && id.id !== '') {
                userid = id.id;
                return this.kcAdminClient.users.resetPassword({
                    id: userid,
                    credential: credential,
                });
            }
            else {
                return rxjs_1.throwError('Keycloak用户创建失败');
            }
        }), operators_1.mergeMap(() => this.kcAdminClient.users.addToGroup({ id: userid, groupId })), operators_1.tap(() => common_1.Logger.log('添加到组')));
        const userroles = user.roles;
        const customerroles = this.configService.get('customerroles');
        const clients = Object.keys(customerroles);
        const clientid = rxjs_1.from(clients).pipe(operators_1.mergeMap(client => this.kcAdminClient.clients.find({
            clientId: client,
        })), operators_1.mergeMap(clients => rxjs_1.of(...clients)), operators_1.map(client => ({ id: client.id, clientId: client.clientId })));
        const rolelist = clientid.pipe(operators_1.mergeMap(client => rxjs_1.from(this.kcAdminClient.clients.listRoles({
            id: client.id,
        })).pipe(operators_1.map(rolelist => {
            let userrole = userroles.reduce((pre, cur, i) => [...pre, ...customerroles[client.clientId][cur]], []);
            userrole = Array.from(new Set(userrole));
            return rolelist.filter((role, i, list) => {
                return userrole.includes(role.name);
            });
        }), operators_1.map(rolelist => ({
            uuid: client.id,
            clientId: client.clientId,
            roles: rolelist,
        })))), operators_1.scan((acc, cur, i) => [cur, ...acc], []), operators_1.last(), operators_1.tap(v => common_1.Logger.log(v, 'roleList = ')));
        return adduser$.pipe(operators_1.mergeMap(() => rolelist), operators_1.mergeMap(roleObjs => rxjs_1.from(roleObjs).pipe(operators_1.mergeMap(roleObj => this.kcAdminClient.users.addClientRoleMappings({
            id: userid,
            clientUniqueId: roleObj.uuid,
            roles: roleObj.roles,
        })))), operators_1.mergeMap(() => rxjs_1.of({ code: 200, data: '注册成功' })), operators_1.catchError(error => {
            return rxjs_1.of({ code: 500, error });
        }));
    }
    findUserByUserName(username, email) {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        let user = {};
        if (!!username) {
            user = Object.assign(Object.assign({}, user), { username });
        }
        if (!!email) {
            user = Object.assign(Object.assign({}, user), { email });
        }
        return rxjs_1.from(this.kcAdminClient.users.find(user)).pipe(operators_1.tap(result => common_1.Logger.log(result, '检查用户')));
    }
};
KeycloakAdminService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], KeycloakAdminService);
exports.KeycloakAdminService = KeycloakAdminService;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("keycloak-admin");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("openid-client");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakAdminController = void 0;
const common_1 = __webpack_require__(3);
let KeycloakAdminController = class KeycloakAdminController {
};
KeycloakAdminController = __decorate([
    common_1.Controller('keycloak-admin')
], KeycloakAdminController);
exports.KeycloakAdminController = KeycloakAdminController;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = __webpack_require__(3);
const user_controller_1 = __webpack_require__(34);
const keycloak_admin_module_1 = __webpack_require__(28);
const organization_module_1 = __webpack_require__(25);
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [keycloak_admin_module_1.KeycloakAdminModule, organization_module_1.OrganizationModule],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = __webpack_require__(3);
const keycloak_admin_service_1 = __webpack_require__(29);
const rxjs_1 = __webpack_require__(7);
const operators_1 = __webpack_require__(8);
const organization_service_1 = __webpack_require__(27);
const config_1 = __webpack_require__(6);
let UserController = class UserController {
    constructor(keycloakAdminService, organizationService, configService) {
        this.keycloakAdminService = keycloakAdminService;
        this.organizationService = organizationService;
        this.configService = configService;
    }
    registerUser(user, client, code) {
        return this.keycloakAdminService.registerUser(user).pipe(operators_1.mergeMap(result => {
            if (result.code === 200) {
                return this.organizationService.invitationDeleteCode(code);
            }
            else {
                return rxjs_1.throwError('用户注册失败');
            }
        }), operators_1.mergeMap(result => {
            if ((result.status || result.code) === 200) {
                return rxjs_1.of({ code: 200, data: '注册成功' });
            }
            else {
                return rxjs_1.throwError('用户注册失败');
            }
        }), operators_1.catchError(error => {
            return rxjs_1.of({ code: 500, error: error });
        }));
    }
    checkUserName(username) {
        return this.keycloakAdminService.findUserByUserName(username, null);
    }
    checkEmail(email) {
        return this.keycloakAdminService.findUserByUserName(null, email);
    }
    testRoleMapping() {
        const userid = '';
        const userroles = ['CoreEnterprise'];
        const customerroles = this.configService.get('customerroles');
        const clients = Object.keys(customerroles);
        const clientid = rxjs_1.from(clients).pipe(operators_1.mergeMap(client => this.keycloakAdminService.kcAdminClient.clients.find({
            clientId: client,
        })), operators_1.mergeMap(clients => rxjs_1.of(...clients)), operators_1.map(client => ({ id: client.id, clientId: client.clientId })));
        const rolelist = clientid.pipe(operators_1.mergeMap(client => rxjs_1.from(this.keycloakAdminService.kcAdminClient.clients.listRoles({
            id: client.id,
        })).pipe(operators_1.map(rolelist => {
            let userrole = userroles.reduce((pre, cur, i) => [...pre, ...customerroles[client.clientId][cur]], []);
            userrole = Array.from(new Set(userrole));
            return rolelist.filter((role, i, list) => {
                return userrole.includes(role.name);
            });
        }), operators_1.map(rolelist => ({
            uuid: client.id,
            clientId: client.clientId,
            roles: rolelist,
        })))));
        return rolelist.pipe(operators_1.scan((acc, cur, i) => [cur, ...acc], []), operators_1.last(), operators_1.tap(v => common_1.Logger.log(v, '==3')));
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('user')),
    __param(1, common_1.Body('client')),
    __param(2, common_1.Body('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", typeof (_a = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _a : Object)
], UserController.prototype, "registerUser", null);
__decorate([
    common_1.Get('check/username/:username'),
    __param(0, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _b : Object)
], UserController.prototype, "checkUserName", null);
__decorate([
    common_1.Get('check/email/:email'),
    __param(0, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _c : Object)
], UserController.prototype, "checkEmail", null);
__decorate([
    common_1.Get('testRole'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _d : Object)
], UserController.prototype, "testRoleMapping", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [typeof (_e = typeof keycloak_admin_service_1.KeycloakAdminService !== "undefined" && keycloak_admin_service_1.KeycloakAdminService) === "function" ? _e : Object, typeof (_f = typeof organization_service_1.OrganizationService !== "undefined" && organization_service_1.OrganizationService) === "function" ? _f : Object, typeof (_g = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _g : Object])
], UserController);
exports.UserController = UserController;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = __webpack_require__(3);
const message_controller_1 = __webpack_require__(36);
const message_service_1 = __webpack_require__(37);
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        controllers: [message_controller_1.MessageController],
        providers: [message_service_1.MessageService],
    })
], MessageModule);
exports.MessageModule = MessageModule;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = __webpack_require__(3);
const message_service_1 = __webpack_require__(37);
const rxjs_1 = __webpack_require__(7);
const operators_1 = __webpack_require__(8);
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    sendVertify(phonenumber) {
        return this.messageService.sendPhoneVertify(phonenumber).pipe(operators_1.map(result => {
            if (result && (result.code || result.status) === 200) {
                return { code: 200 };
            }
            else {
                return { code: 500, error: '获取验证码失败' };
            }
        }), operators_1.mergeMap(result => {
            if (result.code === 200) {
                return this.messageService.getVertifyInvalidTime().pipe(operators_1.map(result => {
                    if (result && (result.code || result.status) === 200) {
                        return { code: 200, data: result.data };
                    }
                    else {
                        return rxjs_1.throwError('获取验证码失效时间失败');
                    }
                }));
            }
            else {
                return rxjs_1.of(result);
            }
        }), operators_1.catchError(error => rxjs_1.of({ code: 500, error })));
    }
    checkVertify(phonenumber, code) {
        return this.messageService.checkPhoneVertify(phonenumber, code).pipe(operators_1.map(result => {
            if (result && (result.code || result.status) === 200) {
                return { code: 200 };
            }
            else {
                return { code: 500, error: '验证码发送失败' };
            }
        }), operators_1.catchError(error => rxjs_1.of({ code: 500, error })));
    }
};
__decorate([
    common_1.Get('ali/send/:phonenumber'),
    __param(0, common_1.Param('phonenumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_a = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _a : Object)
], MessageController.prototype, "sendVertify", null);
__decorate([
    common_1.Get('ali/check/:phonenumber/:code'),
    __param(0, common_1.Param('phonenumber')),
    __param(1, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_b = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _b : Object)
], MessageController.prototype, "checkVertify", null);
MessageController = __decorate([
    common_1.Controller('message'),
    __metadata("design:paramtypes", [typeof (_c = typeof message_service_1.MessageService !== "undefined" && message_service_1.MessageService) === "function" ? _c : Object])
], MessageController);
exports.MessageController = MessageController;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(7);
const operators_1 = __webpack_require__(8);
let MessageService = class MessageService {
    constructor(configService, http) {
        this.configService = configService;
        this.http = http;
    }
    getVertifyInvalidTime() {
        return this.http.get(`${this.configService.get(`service.messageAddress`)}/aliMessage/vertify/`);
    }
    sendPhoneVertify(phonenumber) {
        return this.http
            .get(`${this.configService.get(`service.messageAddress`)}/aliMessage/vertify/${phonenumber}`)
            .pipe(operators_1.catchError(error => {
            common_1.Logger.error(error);
            return rxjs_1.of({ code: 500, error });
        }));
    }
    checkPhoneVertify(phonenumber, code) {
        return this.http.get(`${this.configService.get(`service.messageAddress`)}/aliMessage/vertify/${phonenumber}/${code}`);
    }
};
MessageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof common_1.HttpService !== "undefined" && common_1.HttpService) === "function" ? _b : Object])
], MessageService);
exports.MessageService = MessageService;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakRegistrationModule = void 0;
const common_1 = __webpack_require__(3);
const keycloak_registration_controller_1 = __webpack_require__(39);
const keycloak_registration_service_1 = __webpack_require__(40);
let KeycloakRegistrationModule = class KeycloakRegistrationModule {
};
KeycloakRegistrationModule = __decorate([
    common_1.Module({
        controllers: [keycloak_registration_controller_1.KeycloakRegistrationController],
        providers: [keycloak_registration_service_1.KeycloakRegistrationService]
    })
], KeycloakRegistrationModule);
exports.KeycloakRegistrationModule = KeycloakRegistrationModule;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakRegistrationController = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(9);
const rxjs_1 = __webpack_require__(7);
const operators_1 = __webpack_require__(8);
const keycloak_registration_service_1 = __webpack_require__(40);
let KeycloakRegistrationController = class KeycloakRegistrationController {
    constructor(config, keycloakRegistration) {
        this.config = config;
        this.keycloakRegistration = keycloakRegistration;
    }
    clientRegistration(accessToken) {
        const keycloakConfig = this.config.get('keycloak');
        return rxjs_1.combineLatest(this.keycloakRegistration
            .createClient({
            accessToken,
            endpoint: `${this.config.get('keycloak.url')}/realms/${this.config.get('keycloak.realmName')}/clients-registrations`,
        }, {
            clientId: this.config.get('keycloak.api.client'),
            serviceAccountsEnabled: true,
            adminUrl: keycloakConfig.adminUrl,
            bearerOnly: true,
            secret: keycloakConfig.api.secret,
            name: keycloakConfig.api.name,
            description: keycloakConfig.api.description,
        })
            .pipe(operators_1.tap(res => {
            common_1.Logger.error(res);
        }), operators_1.catchError(err => {
            common_1.Logger.log(err);
            return rxjs_1.of({ code: 500, err });
        })), this.keycloakRegistration.createClient({
            accessToken,
            endpoint: `${this.config.get('keycloak.url')}/realms/${this.config.get('keycloak.realmName')}/clients-registrations`,
        }, {
            clientId: this.config.get('keycloak.web.client'),
            serviceAccountsEnabled: true,
            adminUrl: keycloakConfig.adminUrl,
            name: keycloakConfig.web.name,
            description: keycloakConfig.web.description,
            publicClient: true,
            baseUrl: keycloakConfig.adminUrl,
            rootUrl: keycloakConfig.adminUrl,
            redirectUris: [`${keycloakConfig.adminUrl}/*`],
            webOrigins: [keycloakConfig.adminUrl, '*'],
            directAccessGrantsEnabled: true,
        }));
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('accessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_a = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _a : Object)
], KeycloakRegistrationController.prototype, "clientRegistration", null);
KeycloakRegistrationController = __decorate([
    swagger_1.ApiTags('keycloak-registration'),
    common_1.Controller('keycloak-registration'),
    __metadata("design:paramtypes", [typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof keycloak_registration_service_1.KeycloakRegistrationService !== "undefined" && keycloak_registration_service_1.KeycloakRegistrationService) === "function" ? _c : Object])
], KeycloakRegistrationController);
exports.KeycloakRegistrationController = KeycloakRegistrationController;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakRegistrationService = void 0;
const common_1 = __webpack_require__(3);
const rxjs_1 = __webpack_require__(7);
const keycloakClientRegistration = __webpack_require__(41);
const operators_1 = __webpack_require__(8);
let KeycloakRegistrationService = class KeycloakRegistrationService {
    getClient(options, clientId) {
        return rxjs_1.from(keycloakClientRegistration.get(options, clientId)).pipe(operators_1.catchError(error => {
            return rxjs_1.of({ code: 500, error });
        }));
    }
    createClient(options, client) {
        return rxjs_1.from(keycloakClientRegistration.create(options, client));
    }
};
KeycloakRegistrationService = __decorate([
    common_1.Injectable()
], KeycloakRegistrationService);
exports.KeycloakRegistrationService = KeycloakRegistrationService;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("keycloak-client-registration");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    links: {
        coreweb: process.env.LINK_COREWEB || 'http://factbusicorewebnewpaas.service.sd/',
    },
    keycloak: {
        url: process.env.SERVICE_KEYCLOAK_ADDRESS || 'http://localhost:8081/auth',
        realmName: process.env.KEYCLOAK_REALM_NAME || 'cofco',
        adminUrl: process.env.KEYCLOAK_ROOTURL || 'http://portal.baoli.com:4200',
        api: {
            client: process.env.KEYCLOAK_CLIENT || 'test_portal_node',
            name: process.env.KEYCLOAK_NAME || '门户服务端',
            description: process.env.KEYCLOAK_DESCRIPTION || '门户服务端',
            secret: process.env.KEYCLOAK_SECRET || 'd94f33fb-7752-4d03-9b88-a6f1c0ed9d52',
        },
        web: {
            client: process.env.KEYCLOAK_WEB_CLIENT || 'test_portal_web',
            name: process.env.KEYCLOAK_WEB_NAME || '门户客户端',
            description: process.env.KEYCLOAK_WEB_DESCRIPTION || '门户客户端',
        },
        admin: {
            clientId: process.env.KEYCLOAK_ADMIN_CLI_CLIENT_ID || 'admin-cli',
            username: process.env.KEYCLOAK_ADMIN_CLI_USERNAME || 'cofco_admin',
            password: process.env.KEYCLOAK_ADMIN_CLI_PASSWORD || '111111',
            grantType: process.env.KEYCLOAK_ADMIN_CLI_GRANT_TYPE || 'password',
            clientSecret: process.env.KEYCLOAK_ADMIN_CLI_CLIENT_SECRET ||
                '73e6416a-4baa-4391-9e0c-29f16256151a',
        },
    },
    roles: {
        business: 'factbusicoreweb_business',
        approval: 'factbusicoreweb_approval',
        system: 'factbusicoreweb_system',
        assets: 'factbusicoreweb_assets',
        funding: 'factbusicoreweb_funding',
        banking: 'factbusicoreweb_banking',
        enterprise: 'factbusicoreweb_enterprise',
        factor: 'factbusicoreweb_factor',
        cashier: 'factbusicoreweb_cashier',
        platform: 'factbusicoreweb_platform',
    },
    customerroles: {
        factbusicorewebnewpaas: {
            'enterprise-role-coreweb-chain-cust': [
                'factbusicoreweb_business',
                'factbusicoreweb_approval',
                'LSQYSHJS',
                'LSQYYWJS',
                'cofco-enterprise-admin',
            ],
            FBLPTF: [],
            CoreEnterprise: [
                'factbusicoreweb_business',
                'factbusicoreweb_approval',
                'HXQYSHJS',
                'HXQYYWJS',
                'cofco-enterprise-admin',
            ],
            CoreEnterpriseUnit: [
                'factbusicoreweb_business',
                'factbusicoreweb_approval',
                'HXQYSHJS',
                'HXQYYWJS',
                'cofco-enterprise-admin',
            ],
            LawFirm: [],
            Club: [],
            PlanManager: [],
            RatingAgencies: [],
            Funder: [],
            NonGrainCreditDebtor: [],
        },
        'realm-management': {
            'enterprise-role-coreweb-chain-cust': ['realm-admin'],
            FBLPTF: ['realm-admin'],
            CoreEnterprise: ['realm-admin'],
            CoreEnterpriseUnit: ['realm-admin'],
            LawFirm: ['realm-admin'],
            Club: ['realm-admin'],
            PlanManager: ['realm-admin'],
            RatingAgencies: ['realm-admin'],
            Funder: ['realm-admin'],
            NonGrainCreditDebtor: ['realm-admin'],
        },
    },
    service: {
        orgAddress: process.env.SERVICE_ORGANIZATION_ADDRESS ||
            'http://organization.service.consul',
        messageAddress: process.env.SERVICE_MESSAGE_ADDRESS || 'http://message.service.consul',
    },
});


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisSessionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSessionModule = void 0;
const common_1 = __webpack_require__(3);
const ConnectRedis = __webpack_require__(44);
const session = __webpack_require__(45);
const nestjs_session_1 = __webpack_require__(46);
const Redis = __webpack_require__(47);
const RedisStore = ConnectRedis(session);
let RedisSessionModule = RedisSessionModule_1 = class RedisSessionModule {
    static register(options) {
        options.session.store = new RedisStore({
            client: new Redis(options.redis),
        });
        return {
            imports: [nestjs_session_1.SessionModule.forRoot(options)],
            module: RedisSessionModule_1,
        };
    }
};
RedisSessionModule = RedisSessionModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], RedisSessionModule);
exports.RedisSessionModule = RedisSessionModule;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("nestjs-session");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("ioredis");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const log4js_1 = __webpack_require__(49);
function logger(req, res, next) {
    const code = res.statusCode;
    next();
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>logger：
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body.data)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    if (code >= 500) {
        log4js_1.Logger.error(logFormat);
    }
    else if (code >= 400) {
        log4js_1.Logger.warn(logFormat);
    }
    else {
        log4js_1.Logger.access(logFormat);
        log4js_1.Logger.log(logFormat);
    }
}
exports.logger = logger;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ContextTrace = exports.LoggerLevel = void 0;
const Path = __webpack_require__(14);
const Log4js = __webpack_require__(50);
const Util = __webpack_require__(51);
const Moment = __webpack_require__(52);
const StackTrace = __webpack_require__(53);
const Chalk = __webpack_require__(54);
const log4js_1 = __webpack_require__(55);
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel["ALL"] = "ALL";
    LoggerLevel["MARK"] = "MARK";
    LoggerLevel["TRACE"] = "TRACE";
    LoggerLevel["DEBUG"] = "DEBUG";
    LoggerLevel["INFO"] = "INFO";
    LoggerLevel["WARN"] = "WARN";
    LoggerLevel["ERROR"] = "ERROR";
    LoggerLevel["FATAL"] = "FATAL";
    LoggerLevel["OFF"] = "OFF";
})(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
class ContextTrace {
    constructor(context, path, lineNumber, columnNumber) {
        this.context = context;
        this.path = path;
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
    }
}
exports.ContextTrace = ContextTrace;
Log4js.addLayout('Awesome-nest', (logConfig) => {
    return (logEvent) => {
        let moduleName = '';
        let position = '';
        const messageList = [];
        logEvent.data.forEach((value) => {
            if (value instanceof ContextTrace) {
                moduleName = value.context;
                if (value.lineNumber && value.columnNumber) {
                    position = `${value.lineNumber}, ${value.columnNumber}`;
                }
                return;
            }
            if (typeof value !== 'string') {
                value = Util.inspect(value, false, 3, true);
            }
            messageList.push(value);
        });
        const messageOutput = messageList.join(' ');
        const positionOutput = position ? ` [${position}]` : '';
        const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
        const dateOutput = `${Moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss')}`;
        const moduleOutput = moduleName
            ? `[${moduleName}] `
            : '[LoggerService] ';
        let levelOutput = `[${logEvent.level}] ${messageOutput}`;
        switch (logEvent.level.toString()) {
            case LoggerLevel.DEBUG:
                levelOutput = Chalk.green(levelOutput);
                break;
            case LoggerLevel.INFO:
                levelOutput = Chalk.cyan(levelOutput);
                break;
            case LoggerLevel.WARN:
                levelOutput = Chalk.yellow(levelOutput);
                break;
            case LoggerLevel.ERROR:
                levelOutput = Chalk.red(levelOutput);
                break;
            case LoggerLevel.FATAL:
                levelOutput = Chalk.hex('#DD4C35')(levelOutput);
                break;
            default:
                levelOutput = Chalk.grey(levelOutput);
                break;
        }
        return `${Chalk.green(typeOutput)}${dateOutput}  ${Chalk.yellow(moduleOutput)}${levelOutput}${positionOutput}`;
    };
});
Log4js.configure(log4js_1.default);
const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;
class Logger {
    static trace(...args) {
        logger.trace(Logger.getStackTrace(), ...args);
    }
    static debug(...args) {
        logger.debug(Logger.getStackTrace(), ...args);
    }
    static log(...args) {
        logger.info(Logger.getStackTrace(), ...args);
    }
    static info(...args) {
        logger.info(Logger.getStackTrace(), ...args);
    }
    static warn(...args) {
        logger.warn(Logger.getStackTrace(), ...args);
    }
    static warning(...args) {
        logger.warn(Logger.getStackTrace(), ...args);
    }
    static error(...args) {
        logger.error(Logger.getStackTrace(), ...args);
    }
    static fatal(...args) {
        logger.fatal(Logger.getStackTrace(), ...args);
    }
    static access(...args) {
        const loggerCustom = Log4js.getLogger('http');
        loggerCustom.info(Logger.getStackTrace(), ...args);
    }
    static getStackTrace(deep = 2) {
        const stackList = StackTrace.getSync();
        const stackInfo = stackList[deep];
        const lineNumber = stackInfo.lineNumber;
        const columnNumber = stackInfo.columnNumber;
        const fileName = stackInfo.fileName;
        const basename = Path.basename(fileName);
        return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
    }
}
exports.Logger = Logger;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("log4js");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("stacktrace-js");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(14);
const baseLogPath = path.resolve(__dirname, '../../logs');
const log4jsConfig = {
    appenders: {
        console: {
            type: 'console',
        },
        access: {
            type: 'dateFile',
            filename: `${baseLogPath}/access/access.log`,
            alwaysIncludePattern: true,
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            numBackups: 3,
            category: 'http',
            keepFileExt: true,
        },
        app: {
            type: 'dateFile',
            filename: `${baseLogPath}/app-out/app.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
            },
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            numBackups: 3,
            keepFileExt: true,
        },
        errorFile: {
            type: 'dateFile',
            filename: `${baseLogPath}/errors/error.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
            },
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            numBackups: 3,
            keepFileExt: true,
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        },
    },
    categories: {
        default: {
            appenders: ['console', 'app', 'errors'],
            level: 'DEBUG',
        },
        info: { appenders: ['console', 'app', 'errors'], level: 'info' },
        access: { appenders: ['console', 'app', 'errors'], level: 'info' },
        http: { appenders: ['access'], level: 'DEBUG' },
    },
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID',
};
exports.default = log4jsConfig;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = __webpack_require__(3);
const operators_1 = __webpack_require__(8);
const log4js_1 = __webpack_require__(49);
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const req = context.getArgByIndex(1).req;
        return next.handle().pipe(operators_1.map(data => {
            if (!!data) {
                const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TransformInterceptor
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    User: ${JSON.stringify(req.user)}
    Response data:\n ${!!data.data ? JSON.stringify(data.data) : JSON.stringify(data)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
                log4js_1.Logger.info(logFormat);
                log4js_1.Logger.access(logFormat);
            }
            return data;
        }));
    }
};
TransformInterceptor = __decorate([
    common_1.Injectable()
], TransformInterceptor);
exports.TransformInterceptor = TransformInterceptor;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(3);
const log4js_1 = __webpack_require__(49);
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<HttpExceptionFilter：
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
        log4js_1.Logger.info(logFormat);
        response.status(status).json({
            statusCode: status,
            error: exception.message,
            msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
        });
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = __webpack_require__(3);
const log4js_1 = __webpack_require__(49);
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const config = exception instanceof common_1.HttpException ? exception.getResponse() : '';
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<AllExceptionsFilter:
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
        log4js_1.Logger.error(logFormat);
        response.status(status).json({
            statusCode: status,
            msg: `Service Error: ${exception}`,
        });
    }
};
AllExceptionsFilter = __decorate([
    common_1.Catch()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(60);
const class_transformer_1 = __webpack_require__(61);
const log4js_1 = __webpack_require__(49);
let ValidationPipe = class ValidationPipe {
    async transform(value, { metatype }) {
        console.log(`value:`, value, 'metatype: ', metatype);
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = class_transformer_1.plainToClass(metatype, value);
        const errors = await class_validator_1.validate(object);
        if (errors.length > 0) {
            const msg = Object.values(errors[0].constraints)[0];
            log4js_1.Logger.error(`Validation failed: ${msg}`);
            throw new common_1.BadRequestException(`Validation failed: ${msg}`);
        }
        return value;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
ValidationPipe = __decorate([
    common_1.Injectable()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("class-transformer");

/***/ })
/******/ ]);