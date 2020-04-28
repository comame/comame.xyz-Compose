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

/***/ "./src/API/YouTubeApiOptions/VideosAPIOptions.ts":
/*!*******************************************************!*\
  !*** ./src/API/YouTubeApiOptions/VideosAPIOptions.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isVideoAPIResponse(arg) {
    return typeof arg == 'object' && arg.kind == 'youtube#videoListResponse';
}
exports.isVideoAPIResponse = isVideoAPIResponse;


/***/ }),

/***/ "./src/config/apiEndpoints.ts":
/*!************************************!*\
  !*** ./src/config/apiEndpoints.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.youtube = {
    search: 'https://www.googleapis.com/youtube/v3/search',
    activities: 'https://www.googleapis.com/youtube/v3/activities',
    videos: 'https://www.googleapis.com/youtube/v3/videos'
};
exports.self = {
    videos: '/api/videos'
};


/***/ }),

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
    '磁富モノエ': 'UCaFhsCKSSS821N-EcWmPkUQ',
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
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const mongodb_1 = __webpack_require__(/*! mongodb */ "mongodb");
const websubExpressHandler_1 = __webpack_require__(/*! ./websubExpressHandler */ "./src/server/websubExpressHandler.ts");
const fetchVideo_1 = __webpack_require__(/*! ./fetchVideo */ "./src/server/fetchVideo.ts");
const cache_1 = __webpack_require__(/*! ./cache */ "./src/server/cache.ts");
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
    const videoId = await websubExpressHandler_1.websubExpressHandler(req, res, db);
    if (!videoId)
        return;
    const video = await fetchVideo_1.fetchVideo(videoId);
    if (!video)
        return;
    await cache_1.cacheResponse(db, [video]);
});
// @ts-ignore: req unused
app.get('/sub/logs', async (req, res) => {
    const data = await db.collection('subs-log').find().sort({ time: -1 }).limit(100).toArray();
    res.send(JSON.stringify(data, void 0, 2));
});
mongodb_1.MongoClient.connect('mongodb://mongo:27017', { useUnifiedTopology: true }, (err, client) => {
    if (err)
        throw err;
    db = client.db('voms-timeline');
    app.listen(80, () => {
        console.log('LISTEN');
    });
});


/***/ }),

/***/ "./src/server/cache.ts":
/*!*****************************!*\
  !*** ./src/server/cache.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const videoTime_1 = __webpack_require__(/*! ../util/videoTime */ "./src/util/videoTime.ts");
async function cacheResponse(db, videos) {
    const metadataCollection = db.collection('metadata');
    await metadataCollection.updateOne({}, {
        lastUpdated: new Date().getTime()
    }, {
        upsert: true
    });
    const videosCollection = db.collection('videos');
    await Promise.all(videos.map(video => videosCollection.updateOne({
        _id: video.id
    }, {
        _id: video.id,
        time: videoTime_1.getVideoTime(video).getTime(),
        item: video
    }, {
        upsert: true
    })));
}
exports.cacheResponse = cacheResponse;
async function getCached(db, limit = 50) {
    const metadataCollection = db.collection('metadata');
    const videosCollection = db.collection('videos');
    const cacheMetadata = await metadataCollection.findOne({});
    const videoCaches = await videosCollection.find()
        .sort('time', -1)
        .limit(limit)
        .toArray();
    const videos = videoCaches.map(it => it.item);
    const lastUpdated = cacheMetadata === null || cacheMetadata === void 0 ? void 0 : cacheMetadata.lastUpdated;
    return { lastUpdated, videos };
}
exports.getCached = getCached;


/***/ }),

/***/ "./src/server/dotenv.ts":
/*!******************************!*\
  !*** ./src/server/dotenv.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __webpack_require__(/*! path */ "path");
exports.dotenv = Object.fromEntries(fs_1.default.readFileSync(path_1.resolve(__dirname, '../../.env'), {
    encoding: 'utf8'
}).split('\n').map(line => line.split('=')));


/***/ }),

/***/ "./src/server/fetch.ts":
/*!*****************************!*\
  !*** ./src/server/fetch.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(__webpack_require__(/*! https */ "https"));
async function fetch(url, option) {
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(url, option !== null && option !== void 0 ? option : {}, (res) => {
            let responseText = '';
            res.on('data', (chunk) => {
                if (typeof chunk == 'string') {
                    responseText += chunk;
                }
                else {
                    responseText += new TextDecoder('utf-8').decode(chunk);
                }
            });
            res.on('end', () => {
                const headers = {};
                for (const key of Object.keys(res.headers)) {
                    const value = res.headers[key];
                    if (typeof value == 'undefined')
                        continue;
                    if (Array.isArray(value)) {
                        headers[key] = value.join(' ');
                        continue;
                    }
                    headers[key] = value;
                }
                resolve(new Response(headers, res.statusCode, res.url, responseText));
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        req.end();
    });
}
exports.fetch = fetch;
class Response {
    constructor(headers, status, url, responseText) {
        this.headers = headers;
        this.status = status;
        this.url = url;
        if (200 <= status && status < 300) {
            this.ok = true;
        }
        else {
            this.ok = false;
        }
        this.json = async () => JSON.parse(responseText);
        this.text = async () => responseText;
    }
}
exports.Response = Response;


/***/ }),

/***/ "./src/server/fetchVideo.ts":
/*!**********************************!*\
  !*** ./src/server/fetchVideo.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const VideosAPIOptions_1 = __webpack_require__(/*! ../API/YouTubeApiOptions/VideosAPIOptions */ "./src/API/YouTubeApiOptions/VideosAPIOptions.ts");
const fetch_1 = __webpack_require__(/*! ./fetch */ "./src/server/fetch.ts");
const apiEndpoints_1 = __webpack_require__(/*! ../config/apiEndpoints */ "./src/config/apiEndpoints.ts");
const dotenv_1 = __webpack_require__(/*! ./dotenv */ "./src/server/dotenv.ts");
const urlQueryBuilder_1 = __webpack_require__(/*! ../util/urlQueryBuilder */ "./src/util/urlQueryBuilder.ts");
async function fetchVideo(videoId) {
    const options = {
        part: ['id', 'snippet', 'liveStreamingDetails'],
        id: videoId,
        key: dotenv_1.dotenv.GOOGLE_API_KEY
    };
    const requestUrl = urlQueryBuilder_1.buildUrlQuery(apiEndpoints_1.youtube.videos, {
        ...options,
        part: options.part.join(',')
    });
    const res = await fetch_1.fetch(requestUrl);
    const json = await res.json();
    if (!VideosAPIOptions_1.isVideoAPIResponse(json)) {
        throw 'ERROR';
    }
    return json.items[0];
}
exports.fetchVideo = fetchVideo;


/***/ }),

/***/ "./src/server/websubExpressHandler.ts":
/*!********************************************!*\
  !*** ./src/server/websubExpressHandler.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "crypto"));
const fast_xml_parser_1 = __webpack_require__(/*! fast-xml-parser */ "fast-xml-parser");
const dotenv_1 = __webpack_require__(/*! ./dotenv */ "./src/server/dotenv.ts");
const channels_1 = __webpack_require__(/*! ../config/channels */ "./src/config/channels.ts");
async function websubExpressHandler(req, res, db) {
    var _a, _b, _c, _d, _e;
    const queryObj = Object.fromEntries((_b = (_a = req.originalUrl.split('?')[1]) === null || _a === void 0 ? void 0 : _a.split('&').map(it => it.split('='))) !== null && _b !== void 0 ? _b : []);
    const logRequest = async ({ queryObj, subscribeObject, result, rawBody = '' }) => {
        await db.collection('subs-log').insertOne({ time: Date.now(), req: {
                url: req.originalUrl,
                query: Object.fromEntries(Object.entries(queryObj !== null && queryObj !== void 0 ? queryObj : {}).map(it => {
                    return [it[0].replace(/\./g, '_'), it[1]];
                })),
                method: req.method,
                body: subscribeObject,
                headers: req.headers,
                result,
                rawBody
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
        await logRequest({ subscribeObject: req.body, result: 500, rawBody: req.body });
        return;
    }
    const hmacKey = dotenv_1.dotenv.WEBSUB_HUB_SECRET;
    const hmacDigest = crypto_1.default.createHmac('sha1', hmacKey).update(req.body).digest('hex');
    const requestedHmacDigest = (_c = req.header('x-hub-signature')) === null || _c === void 0 ? void 0 : _c.slice('sha1='.length);
    if (hmacDigest != requestedHmacDigest) {
        console.error('Invalid digest request');
        res.send('ok');
        await logRequest({ subscribeObject: req.body, result: 200500, rawBody: req.body });
        return;
    }
    res.send('ok');
    const subscribeObject = fast_xml_parser_1.parse(req.body);
    const updatedVideoId = (_e = (_d = subscribeObject.feed) === null || _d === void 0 ? void 0 : _d.entry) === null || _e === void 0 ? void 0 : _e['yt:videoId'];
    await logRequest({ subscribeObject, result: 200, rawBody: req.body });
    return updatedVideoId;
}
exports.websubExpressHandler = websubExpressHandler;


/***/ }),

/***/ "./src/util/DateString.ts":
/*!********************************!*\
  !*** ./src/util/DateString.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function asDate(dateString) {
    return new Date(dateString);
}
exports.asDate = asDate;


/***/ }),

/***/ "./src/util/urlQueryBuilder.ts":
/*!*************************************!*\
  !*** ./src/util/urlQueryBuilder.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function buildUrlQuery(url, query) {
    const queryString = Object.keys(query).map(key => {
        const value = query[key];
        if (typeof value == 'undefined')
            return;
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }).filter(it => typeof it != 'undefined').join('&');
    return url + '?' + queryString;
}
exports.buildUrlQuery = buildUrlQuery;


/***/ }),

/***/ "./src/util/videoTime.ts":
/*!*******************************!*\
  !*** ./src/util/videoTime.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DateString_1 = __webpack_require__(/*! ./DateString */ "./src/util/DateString.ts");
function getVideoTime(video) {
    var _a, _b, _c;
    if ((_a = video.liveStreamingDetails) === null || _a === void 0 ? void 0 : _a.actualEndTime) {
        return DateString_1.asDate(video.liveStreamingDetails.actualEndTime);
    }
    if ((_b = video.liveStreamingDetails) === null || _b === void 0 ? void 0 : _b.scheduledStartTime) {
        return DateString_1.asDate(video.liveStreamingDetails.scheduledStartTime);
    }
    else {
        return DateString_1.asDate((_c = video.snippet) === null || _c === void 0 ? void 0 : _c.publishedAt);
    }
}
exports.getVideoTime = getVideoTime;


/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

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