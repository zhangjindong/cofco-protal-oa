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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);




function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_1__["NestFactory"].create(_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);
        const apps = app.get(_app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"]);
        console.dir(apps.getHello());
        yield app.listen(3000);
    });
}
bootstrap();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _nestjs_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _config_configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);






let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _nestjs_config__WEBPACK_IMPORTED_MODULE_2__["ConfigModule"].forRoot({
                load: [_config_configuration__WEBPACK_IMPORTED_MODULE_5__["default"]],
                isGlobal: true,
            }),
        ],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_3__["AppController"]],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"]],
    })
], AppModule);



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppController", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let AppController = class AppController {
    constructor(appService, configService) {
        this.appService = appService;
        this.configService = configService;
        debugger;
    }
    getHello() {
        console.dir(this);
        return JSON.stringify(this);
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])()
], AppController.prototype, "getHello", null);
AppController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('hello')
], AppController);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let AppService = class AppService {
    constructor() {
        this.name = 'asdf';
    }
    getHello() {
        return 'Hello World!';
    }
};
AppService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AppService);



/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/config");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (() => ({
    // 端口
    port: parseInt(process.env.PORT, 10) || 8080,
    links: {
        coreweb: process.env.LINK_COREWEB || 'http://factbusicorewebnewpaas.service.sd/',
    },
    // keycloak
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
    // 角色
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
    // 机构用户默认角色
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
}));


/***/ })
/******/ ]);