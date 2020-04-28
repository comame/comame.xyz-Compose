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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/channels.ts":
/*!********************************!*\
  !*** ./src/config/channels.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.channels = {
    '天野ピカミィ': 'UCajhBT4nMrg3DLS-bLL2RCg',
    '緋笠トモシカ': 'UC3vzVK_N_SUVKqbX69L_X4g',
    '磁富モノエ': 'UCaFhsCKSSS821N-EcWmPkUQ'
};


/***/ }),

/***/ "./src/server/app.ts":
/*!***************************!*\
  !*** ./src/server/app.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const mongodb_1 = __importDefault(__webpack_require__(/*! mongodb */ "mongodb"));
const fast_xml_parser_1 = __webpack_require__(/*! fast-xml-parser */ "fast-xml-parser");
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const channels_1 = __webpack_require__(/*! ../config/channels */ "./src/config/channels.ts");
const MongoClient = mongodb_1.default.MongoClient;
const app = express_1.default();
let db;
// Parse body as string
// @ts-ignore: req unused
app.use((req, res, next) => {
    let bodyText = '';
    req.on('data', (chunk) => {
        if (typeof chunk == 'string') {
            bodyText += chunk;
        }
        else {
            bodyText += chunk.toString('utf8');
        }
    });
    req.on('end', () => {
        req.body = bodyText;
        next();
    });
});
app.get('**', express_1.default.static(path_1.default.resolve(__dirname, '../front')));
app.all('/sub/hook', async (req, res) => {
    var _a, _b, _c;
    const queryObj = Object.fromEntries((_b = (_a = req.originalUrl.split('?')[1]) === null || _a === void 0 ? void 0 : _a.split('&').map(it => it.split('='))) !== null && _b !== void 0 ? _b : []);
    const logRequest = async ({ queryObj, subscribeObject, result }) => {
        await db.collection('subs-log').insertOne({ time: Date.now(), req: {
                url: req.originalUrl,
                query: Object.fromEntries(Object.entries(queryObj !== null && queryObj !== void 0 ? queryObj : {}).map(it => {
                    return [it[0].replace(/\./g, '_'), it[1]];
                })),
                method: req.method,
                body: subscribeObject,
                headers: req.headers,
                result
            } });
    };
    if (queryObj['hub.mode'] == 'subscribe') {
        const acceptChannelIds = Object.entries(channels_1.channels).map(it => it[1]);
        const acceptTopics = acceptChannelIds.map(id => ('https://www.youtube.com/xml/feeds/videos.xml?channel_id=' + id)
            .replace(/\?/g, '%3F')
            .replace(/\=/g, '%3D'));
        if (!acceptTopics.includes(queryObj['hub.topic'])) {
            res.sendStatus(404);
            await logRequest({ queryObj, result: 404 });
        }
        else {
            const challenge = queryObj['hub.challenge'];
            res.send(challenge);
            await logRequest({ queryObj, result: 200 });
        }
        return;
    }
    else if (queryObj['hub.mode'] == 'unsubscribe') {
        res.sendStatus(404);
        await logRequest({ queryObj, result: 404 });
        return;
    }
    else if (queryObj['hub.mode'] == 'denied') {
        res.send();
        await logRequest({ queryObj, result: 200 });
        return;
    }
    if (fast_xml_parser_1.validate(req.body) !== true) {
        const error = fast_xml_parser_1.validate(req.body);
        console.error('VALIDATE ERROR', error);
        res.status(500).send('error');
        await logRequest({ subscribeObject: req.body, result: 500 });
        return;
    }
    res.send('ok');
    const subscribeObject = fast_xml_parser_1.parse(req.body);
    const updatedVideoId = (_c = subscribeObject.entry) === null || _c === void 0 ? void 0 : _c['yt:videoId'];
    console.log('UpdatedVideoId', updatedVideoId);
    await logRequest({ subscribeObject, result: 200 });
});
// @ts-ignore: req unused
app.get('/sub/logs', async (req, res) => {
    const data = await db.collection('subs-log').find().sort({ time: -1 }).limit(100).toArray();
    res.send(JSON.stringify(data, void 0, 2));
});
MongoClient.connect('mongodb://mongo:27017', { useUnifiedTopology: true }, (err, client) => {
    if (err)
        throw err;
    db = client.db('voms-timeline');
    app.listen(80, () => {
        console.log('LISTEN');
    });
});


/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fast-xml-parser":
/*!**********************************!*\
  !*** external "fast-xml-parser" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fast-xml-parser");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map