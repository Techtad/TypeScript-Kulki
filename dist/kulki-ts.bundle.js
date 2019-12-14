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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ \"./src/settings.ts\");\n/* harmony import */ var _visuals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visuals */ \"./src/visuals.ts\");\n\r\n\r\nvar Board;\r\nvar Tiles;\r\nvar Game = {\r\n    start: function () {\r\n        Board = document.getElementById(\"game-board\");\r\n        Board.innerHTML = \"\";\r\n        Tiles = [];\r\n        for (var x = 0; x < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardWidth; x++) {\r\n            Tiles.push([]);\r\n            for (var y = 0; y < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardHeight; y++) {\r\n                Tiles[x].push(null);\r\n            }\r\n        }\r\n        this.createBoard();\r\n    },\r\n    createBoard: function () {\r\n        for (var x = 0; x < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardWidth; x++) {\r\n            for (var y = 0; y < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardHeight; y++) {\r\n                var tile = new BoardTile(x * _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize, y * _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize);\r\n                Tiles[x][y] = tile;\r\n                console.log();\r\n                tile.color = randomColor();\r\n                Board.appendChild(tile.div);\r\n            }\r\n        }\r\n    }\r\n};\r\nvar Color;\r\n(function (Color) {\r\n    Color[Color[\"Empty\"] = 0] = \"Empty\";\r\n    Color[Color[\"gray\"] = 1] = \"gray\";\r\n    Color[Color[\"red\"] = 2] = \"red\";\r\n    Color[Color[\"green\"] = 3] = \"green\";\r\n    Color[Color[\"blue\"] = 4] = \"blue\";\r\n    Color[Color[\"teal\"] = 5] = \"teal\";\r\n    Color[Color[\"yellow\"] = 6] = \"yellow\";\r\n    Color[Color[\"pink\"] = 7] = \"pink\";\r\n})(Color || (Color = {}));\r\nfunction randomColor() {\r\n    return Color[Color[Math.floor(1 +\r\n        Math.random() *\r\n            (Object.keys(Color).filter(function (v) {\r\n                return !isNaN(parseInt(v));\r\n            }).length -\r\n                1))]];\r\n}\r\nvar BoardTile = /** @class */ (function () {\r\n    function BoardTile(x, y) {\r\n        this._div = _visuals__WEBPACK_IMPORTED_MODULE_1__[\"Square\"](x, y, _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize);\r\n        this._div.classList.add(\"board-tile\");\r\n        this._div.style.left = x + \"px\";\r\n        this._div.style.top = y + \"px\";\r\n        this._color = Color.Empty;\r\n        this._div.addEventListener(\"click\", this.onClick);\r\n    }\r\n    BoardTile.prototype.onClick = function () { };\r\n    Object.defineProperty(BoardTile.prototype, \"div\", {\r\n        get: function () {\r\n            return this._div;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(BoardTile.prototype, \"color\", {\r\n        get: function () {\r\n            return this._color;\r\n        },\r\n        set: function (c) {\r\n            this._div.innerHTML = \"\";\r\n            this.marble = null;\r\n            if (c != Color.Empty) {\r\n                this.marble = _visuals__WEBPACK_IMPORTED_MODULE_1__[\"Circle\"](_settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize / 4, _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize / 4, _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize / 4);\r\n                this.marble.classList.add(\"marble\");\r\n                this.marble.style.backgroundColor = Color[c];\r\n                this._div.appendChild(this.marble);\r\n            }\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return BoardTile;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\r\n\n\n//# sourceURL=webpack:///./src/game.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.ts\");\n\r\nfunction main() {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].start();\r\n}\r\naddEventListener(\"DOMContentLoaded\", main);\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Settings = {\r\n    BoardWidth: 9,\r\n    BoardHeight: 9,\r\n    TileSize: 50\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Settings);\r\n\n\n//# sourceURL=webpack:///./src/settings.ts?");

/***/ }),

/***/ "./src/visuals.ts":
/*!************************!*\
  !*** ./src/visuals.ts ***!
  \************************/
/*! exports provided: Square, Circle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Square\", function() { return Square; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Circle\", function() { return Circle; });\nfunction Square(x, y, dim) {\r\n    var div = document.createElement(\"div\");\r\n    div.style.position = \"absolute\";\r\n    div.style.left = x.toString() + \"px\";\r\n    div.style.top = y.toString() + \"px\";\r\n    div.style.width = dim.toString() + \"px\";\r\n    div.style.height = dim.toString() + \"px\";\r\n    return div;\r\n}\r\nfunction Circle(x, y, radius) {\r\n    var div = document.createElement(\"div\");\r\n    div.style.position = \"absolute\";\r\n    div.style.left = x.toString() + \"px\";\r\n    div.style.top = y.toString() + \"px\";\r\n    div.style.width = (radius * 2).toString() + \"px\";\r\n    div.style.height = (radius * 2).toString() + \"px\";\r\n    div.style.borderRadius = radius.toString() + \"px\";\r\n    return div;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/visuals.ts?");

/***/ })

/******/ });