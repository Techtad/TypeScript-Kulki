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
/*! exports provided: Tiles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tiles\", function() { return Tiles; });\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ \"./src/settings.ts\");\n/* harmony import */ var _visuals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visuals */ \"./src/visuals.ts\");\n/* harmony import */ var _pathfinding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pathfinding */ \"./src/pathfinding.ts\");\n\r\n\r\n\r\nvar Board;\r\nvar Tiles;\r\nvar NextDisplay;\r\nvar NextColors;\r\nvar IsPlaying = false;\r\nvar SelectedTile = null;\r\nvar ScoreDisplay;\r\nvar Score = 0;\r\nvar PathTiles = [];\r\nvar Color;\r\n(function (Color) {\r\n    Color[Color[\"Empty\"] = 0] = \"Empty\";\r\n    Color[Color[\"gray\"] = 1] = \"gray\";\r\n    Color[Color[\"red\"] = 2] = \"red\";\r\n    Color[Color[\"green\"] = 3] = \"green\";\r\n    Color[Color[\"blue\"] = 4] = \"blue\";\r\n    Color[Color[\"teal\"] = 5] = \"teal\";\r\n    Color[Color[\"yellow\"] = 6] = \"yellow\";\r\n    Color[Color[\"pink\"] = 7] = \"pink\";\r\n})(Color || (Color = {}));\r\nfunction randomColor() {\r\n    return Color[Color[Math.floor(1 +\r\n        Math.random() *\r\n            (Object.keys(Color).filter(function (v) {\r\n                return !isNaN(parseInt(v));\r\n            }).length -\r\n                1))]];\r\n}\r\nfunction traversible(x, y) {\r\n    return (x >= 0 &&\r\n        x < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardWidth &&\r\n        y >= 0 &&\r\n        y < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardHeight &&\r\n        Tiles[x][y].color == Color.Empty);\r\n}\r\nvar BoardTile = /** @class */ (function () {\r\n    function BoardTile(x, y, clickCallback, color) {\r\n        var _this = this;\r\n        this.x = x;\r\n        this.y = y;\r\n        this._div = _visuals__WEBPACK_IMPORTED_MODULE_1__[\"Square\"](x, y, _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize);\r\n        this._div.classList.add(\"board-tile\");\r\n        this._div.style.left = x * _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize + \"px\";\r\n        this._div.style.top = y * _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize + \"px\";\r\n        this._div.setAttribute(\"x\", x.toString());\r\n        this._div.setAttribute(\"y\", y.toString());\r\n        this._color = color | Color.Empty;\r\n        this._div.addEventListener(\"click\", function () {\r\n            clickCallback(x, y);\r\n            _this.updatePathDisplay();\r\n        });\r\n        this._div.addEventListener(\"mouseenter\", this.updatePathDisplay.bind(this));\r\n    }\r\n    BoardTile.prototype.updatePathDisplay = function () {\r\n        for (var _i = 0, PathTiles_1 = PathTiles; _i < PathTiles_1.length; _i++) {\r\n            var tile = PathTiles_1[_i];\r\n            tile.div.classList.remove(\"path\");\r\n        }\r\n        PathTiles = [];\r\n        if (SelectedTile != null && SelectedTile != this) {\r\n            var path = new _pathfinding__WEBPACK_IMPORTED_MODULE_2__[\"Path\"]([SelectedTile.x, SelectedTile.y], [this.x, this.y], traversible);\r\n            for (var _a = 0, _b = path.points; _a < _b.length; _a++) {\r\n                var p = _b[_a];\r\n                Tiles[p.x][p.y].div.classList.add(\"path\");\r\n                PathTiles.push(Tiles[p.x][p.y]);\r\n            }\r\n        }\r\n    };\r\n    Object.defineProperty(BoardTile.prototype, \"div\", {\r\n        get: function () {\r\n            return this._div;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(BoardTile.prototype, \"color\", {\r\n        get: function () {\r\n            return this._color;\r\n        },\r\n        set: function (c) {\r\n            this._div.innerHTML = \"\";\r\n            this.marble = null;\r\n            if (c != Color.Empty) {\r\n                this.marble = _visuals__WEBPACK_IMPORTED_MODULE_1__[\"Circle\"](_settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize / 4, _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize / 4, _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize / 4);\r\n                this.marble.classList.add(\"marble\");\r\n                this.marble.style.backgroundColor = Color[c];\r\n                this._div.appendChild(this.marble);\r\n            }\r\n            this._color = c;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return BoardTile;\r\n}());\r\nvar Game = {\r\n    init: function () {\r\n        document.getElementById(\"start-btn\").addEventListener(\"click\", Game.start);\r\n        SelectedTile = null;\r\n        ScoreDisplay = document.getElementById(\"score-text\");\r\n        Game.updateScore(0);\r\n        Board = document.getElementById(\"game-board\");\r\n        Board.innerHTML = \"\";\r\n        Tiles = [];\r\n        for (var x = 0; x < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardWidth; x++) {\r\n            Tiles.push([]);\r\n            for (var y = 0; y < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardHeight; y++) {\r\n                Tiles[x].push(null);\r\n            }\r\n        }\r\n        Game.createBoard();\r\n        Game.nextBatch();\r\n    },\r\n    start: function () {\r\n        IsPlaying = true;\r\n        Game.init();\r\n    },\r\n    over: function () {\r\n        IsPlaying = false;\r\n        for (var _i = 0, Tiles_1 = Tiles; _i < Tiles_1.length; _i++) {\r\n            var row = Tiles_1[_i];\r\n            for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {\r\n                var tile = row_1[_a];\r\n                tile.div.classList.remove(\"board-tile\");\r\n            }\r\n        }\r\n        NextDisplay.innerHTML = \"KONIEC GRY\";\r\n        alert(\"Koniec gry! Twój wynik: \" + Score);\r\n    },\r\n    createBoard: function () {\r\n        for (var x = 0; x < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardWidth; x++) {\r\n            for (var y = 0; y < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardHeight; y++) {\r\n                var tile = new BoardTile(x, y, Game.tileClicked);\r\n                Tiles[x][y] = tile;\r\n                Board.appendChild(tile.div);\r\n            }\r\n        }\r\n        for (var i = 0; i < 5; i++)\r\n            Game.placeAtRandomSpot(randomColor());\r\n    },\r\n    nextBatch: function () {\r\n        NextDisplay = document.getElementById(\"next-display\");\r\n        NextDisplay.innerHTML = \"\";\r\n        NextColors = [];\r\n        for (var i = 0; i < 3; i++) {\r\n            var color = randomColor();\r\n            NextColors.push(color);\r\n            var marble = _visuals__WEBPACK_IMPORTED_MODULE_1__[\"Circle\"](0, 0, _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TileSize / 4);\r\n            marble.classList.add(\"marble\");\r\n            marble.style.display = \"inline-block\";\r\n            marble.style.position = \"initial\";\r\n            marble.style.backgroundColor = Color[color];\r\n            marble.style.margin = \"0 5px 0 5px\";\r\n            NextDisplay.appendChild(marble);\r\n        }\r\n    },\r\n    nextRound: function () {\r\n        for (var _i = 0, NextColors_1 = NextColors; _i < NextColors_1.length; _i++) {\r\n            var c = NextColors_1[_i];\r\n            Game.placeAtRandomSpot(c);\r\n        }\r\n        if (!IsPlaying)\r\n            return;\r\n        if (Game.freeTilesCount() == 0) {\r\n            Game.over();\r\n            return;\r\n        }\r\n        Game.nextBatch();\r\n    },\r\n    freeTilesCount: function () {\r\n        var count = 0;\r\n        for (var _i = 0, Tiles_2 = Tiles; _i < Tiles_2.length; _i++) {\r\n            var row = Tiles_2[_i];\r\n            for (var _a = 0, row_2 = row; _a < row_2.length; _a++) {\r\n                var tile = row_2[_a];\r\n                if (tile.color == Color.Empty)\r\n                    count++;\r\n            }\r\n        }\r\n        return count;\r\n    },\r\n    placeAtRandomSpot: function (color) {\r\n        if (!IsPlaying)\r\n            return;\r\n        if (Game.freeTilesCount() == 0)\r\n            Game.over();\r\n        var randX = Math.floor(Math.random() * _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardWidth);\r\n        var randY = Math.floor(Math.random() * _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardHeight);\r\n        if (Tiles[randX][randY].color == Color.Empty) {\r\n            Tiles[randX][randY].color = color;\r\n            Game.checkForFive(randX, randY);\r\n        }\r\n        else\r\n            Game.placeAtRandomSpot(color);\r\n    },\r\n    tileClicked: function (x, y) {\r\n        if (!IsPlaying)\r\n            return;\r\n        if (SelectedTile == null) {\r\n            if (Tiles[x][y].color != Color.Empty) {\r\n                SelectedTile = Tiles[x][y];\r\n                SelectedTile.div.setAttribute(\"selected\", \"\");\r\n            }\r\n        }\r\n        else {\r\n            if (Tiles[x][y].color == Color.Empty) {\r\n                var path = new _pathfinding__WEBPACK_IMPORTED_MODULE_2__[\"Path\"]([SelectedTile.x, SelectedTile.y], [x, y], traversible);\r\n                if (path.length == 0)\r\n                    return;\r\n                Tiles[x][y].color = SelectedTile.color;\r\n                Tiles[SelectedTile.x][SelectedTile.y].color = Color.Empty;\r\n                SelectedTile.div.removeAttribute(\"selected\");\r\n                SelectedTile = null;\r\n                if (!Game.checkForFive(x, y))\r\n                    Game.nextRound();\r\n            }\r\n            else {\r\n                SelectedTile.div.removeAttribute(\"selected\");\r\n                if (Tiles[x][y] != SelectedTile) {\r\n                    SelectedTile = Tiles[x][y];\r\n                    SelectedTile.div.setAttribute(\"selected\", \"\");\r\n                }\r\n                else {\r\n                    SelectedTile = null;\r\n                }\r\n            }\r\n        }\r\n    },\r\n    checkForFive: function (x, y) {\r\n        var color = Tiles[x][y].color;\r\n        if (color == Color.Empty)\r\n            return;\r\n        var checkPos = function (posX, posY, posColor) {\r\n            return (posX >= 0 &&\r\n                posX < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardWidth &&\r\n                posY >= 0 &&\r\n                posY < _settings__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BoardHeight &&\r\n                Tiles[posX][posY].color == posColor);\r\n        };\r\n        var toRemove = [];\r\n        var countInDir = function (dirX, dirY, c, remove) {\r\n            if (remove) {\r\n                toRemove.push([x, y]);\r\n            }\r\n            var count = 1;\r\n            var offsetX = dirX;\r\n            var offsetY = dirY;\r\n            while (checkPos(x + offsetX, y + offsetY, color)) {\r\n                if (remove) {\r\n                    toRemove.push([x + offsetX, y + offsetY]);\r\n                }\r\n                count++;\r\n                offsetX += dirX;\r\n                offsetY += dirY;\r\n            }\r\n            dirX = -dirX;\r\n            dirY = -dirY;\r\n            offsetX = dirX;\r\n            offsetY = dirY;\r\n            while (checkPos(x + offsetX, y + offsetY, color)) {\r\n                if (remove) {\r\n                    toRemove.push([x + offsetX, y + offsetY]);\r\n                }\r\n                count++;\r\n                offsetX += dirX;\r\n                offsetY += dirY;\r\n            }\r\n            if (count >= 5 && !remove)\r\n                countInDir(dirX, dirY, c, true);\r\n        };\r\n        countInDir(-1, -1, color);\r\n        countInDir(-1, 0, color);\r\n        countInDir(-1, 1, color);\r\n        countInDir(0, -1, color);\r\n        for (var _i = 0, toRemove_1 = toRemove; _i < toRemove_1.length; _i++) {\r\n            var coords = toRemove_1[_i];\r\n            Tiles[coords[0]][coords[1]].color = Color.Empty;\r\n            Score++;\r\n        }\r\n        Game.updateScore(Score);\r\n        return toRemove.length > 0;\r\n        /* console.log(x, y, Color[color], \"\\\\\", countInDir(-1, -1, color));\r\n        console.log(x, y, Color[color], \"-\", countInDir(-1, 0, color));\r\n        console.log(x, y, Color[color], \"/\", countInDir(-1, 1, color));\r\n        console.log(x, y, Color[color], \"|\", countInDir(0, -1, color)); */\r\n    },\r\n    updateScore: function (newScore) {\r\n        Score = newScore;\r\n        ScoreDisplay.innerHTML = Score.toString();\r\n    }\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\r\n\n\n//# sourceURL=webpack:///./src/game.ts?");

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

/***/ "./src/pathfinding.ts":
/*!****************************!*\
  !*** ./src/pathfinding.ts ***!
  \****************************/
/*! exports provided: Path */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Path\", function() { return Path; });\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar Point = /** @class */ (function () {\r\n    function Point(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    Point.prototype.distanceTo = function (other) {\r\n        return Math.sqrt(Math.pow((other.x - this.x), 2) + Math.pow((other.y - this.y), 2));\r\n    };\r\n    Point.prototype.equalTo = function (other) {\r\n        return this.x == other.x && this.y == other.y;\r\n    };\r\n    Point.prototype.toTuple = function () {\r\n        return [this.x, this.y];\r\n    };\r\n    return Point;\r\n}());\r\nvar Node = /** @class */ (function (_super) {\r\n    __extends(Node, _super);\r\n    function Node(x, y, prev, dest) {\r\n        var _this = _super.call(this, x, y) || this;\r\n        _this.previous = prev;\r\n        _this.toDest = _this.distanceTo(dest);\r\n        return _this;\r\n    }\r\n    Object.defineProperty(Node.prototype, \"sum\", {\r\n        get: function () {\r\n            return this.fromStart + this.toDest;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Node.prototype, \"previous\", {\r\n        set: function (prev) {\r\n            this.prev = prev;\r\n            this.fromStart = prev == null ? 0 : prev.fromStart + 1;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Node.prototype.toPoint = function () {\r\n        return new Point(this.x, this.y);\r\n    };\r\n    return Node;\r\n}(Point));\r\nvar Path = /** @class */ (function () {\r\n    function Path(start, dest, traversibleFunc) {\r\n        this._points = [];\r\n        this.found = false;\r\n        this.startPoint = new Point(start[0], start[1]);\r\n        this.destination = new Point(dest[0], dest[1]);\r\n        this.open = new Array();\r\n        this.open.push(new Node(this.startPoint.x, this.startPoint.y, null, this.destination));\r\n        this.closed = new Array();\r\n        var current;\r\n        while (this.open.length > 0) {\r\n            current = this.open.shift();\r\n            this.closed.push(current);\r\n            if (current.toPoint().equalTo(this.destination)) {\r\n                this.found = true;\r\n                break;\r\n            }\r\n            for (var _i = 0, _a = this.neigbors(current); _i < _a.length; _i++) {\r\n                var nbr = _a[_i];\r\n                if (!traversibleFunc(nbr.x, nbr.y))\r\n                    continue;\r\n                //console.log(nbr);\r\n                var inOpen = this.nodeInArray(nbr, this.open);\r\n                //console.log(nbr, this.open, inOpen);\r\n                if (inOpen != null) {\r\n                    if (nbr.sum < inOpen.sum)\r\n                        this.open[this.open.indexOf(inOpen)].prev = current;\r\n                }\r\n                else\r\n                    this.open.push(nbr);\r\n            }\r\n            this.open.sort(function (a, b) {\r\n                return a.sum - b.sum;\r\n            });\r\n        }\r\n        if (this.found) {\r\n            this.points.push(this.destination);\r\n            while (current.prev != null) {\r\n                this.points.push(current);\r\n                current = current.prev;\r\n            }\r\n            this.points.push(current);\r\n            this.points.reverse();\r\n        }\r\n    }\r\n    Path.prototype.nodeInArray = function (p, a) {\r\n        var filtered = a.filter(function (n) {\r\n            return n.equalTo(p);\r\n        });\r\n        //console.log(a, p, filtered);\r\n        return filtered.length == 1 ? filtered[0] : null;\r\n    };\r\n    Path.prototype.neigbors = function (n) {\r\n        var dirs = [\r\n            [-1, 0],\r\n            [0, -1],\r\n            [1, 0],\r\n            [0, 1]\r\n        ];\r\n        var nodes = new Array();\r\n        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {\r\n            var dir = dirs_1[_i];\r\n            var p = new Point(n.x + dir[0], n.y + dir[1]);\r\n            if (this.nodeInArray(p, this.closed) == null)\r\n                nodes.push(new Node(p.x, p.y, n, this.destination));\r\n        }\r\n        return nodes;\r\n    };\r\n    Object.defineProperty(Path.prototype, \"length\", {\r\n        get: function () {\r\n            return this._points.length;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Path.prototype, \"points\", {\r\n        get: function () {\r\n            return this._points;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return Path;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/pathfinding.ts?");

/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    BoardWidth: 9,\r\n    BoardHeight: 9,\r\n    TileSize: 50\r\n});\r\n\n\n//# sourceURL=webpack:///./src/settings.ts?");

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