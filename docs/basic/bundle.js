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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./basic/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../lib/board-controller.js":
/*!**********************************!*\
  !*** ../lib/board-controller.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardController = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var BoardController =
/*#__PURE__*/
function () {
  function BoardController(board) {
    _classCallCheck(this, BoardController);

    this.trans = {
      enabled: false,
      x: 0,
      y: 0
    };
    this.pos = {
      x: 0,
      y: 0
    };
    this.scale = 1;
    this.board = board;
    this.setEventListener();
  }

  _createClass(BoardController, [{
    key: "zoom",
    value: function zoom(scale) {
      this.scale = scale;
      this.board.zoom(this.scale);
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      this.pos.x += x;
      this.pos.y += y;
      this.board.translate(x, y);
    }
  }, {
    key: "position",
    value: function position(x, y) {
      this.translate(-1 * this.pos.x, -1 * this.pos.y);
      this.translate(x, y);
    }
  }, {
    key: "size",
    value: function size(width, height) {
      this.board.size(width, height);
    }
  }, {
    key: "getCenter",
    value: function getCenter() {
      var rulers = this.board.rulers;
      var center = {
        x: (rulers.x[0] + rulers.x[rulers.x.length - 1]) / 2,
        y: (rulers.y[0] + rulers.y[rulers.y.length - 1]) / 2
      };
      return center;
    }
  }, {
    key: "getSize",
    value: function getSize() {
      var rulers = this.board.rulers;
      var size = {
        width: rulers.x[rulers.x.length - 1],
        height: rulers.y[rulers.y.length - 1]
      };
      return size;
    }
  }, {
    key: "fit",
    value: function fit(paddingX, paddingY) {
      var size = this.getSize();
      var width = this.board.el.width - paddingX * 2;
      var scale = width / size.width;
      this.position(paddingX, paddingY);
      this.zoom(scale);
    }
  }, {
    key: "setEventListener",
    value: function setEventListener() {
      var _this = this;

      window.addEventListener('contextmenu', function (event) {
        event.preventDefault();
      });
      window.addEventListener('wheel', function (event) {
        var minScale = 0.05;
        var maxScale = 10;

        if (event.deltaY > 0) {
          _this.scale *= 0.95;
        } else {
          _this.scale *= 1.05;
        }

        if (_this.scale < minScale) {
          _this.scale = minScale;
        } else if (maxScale < _this.scale) {
          _this.scale = maxScale;
        }

        _this.board.zoom(_this.scale);
      });
      window.addEventListener('mousedown', function (event) {
        _this.trans.enabled = true;
        _this.trans.x = event.clientX;
        _this.trans.y = event.clientY;
      });
      window.addEventListener('mousemove', function (event) {
        if (_this.trans.enabled) {
          var diff = {
            x: event.clientX - _this.trans.x,
            y: event.clientY - _this.trans.y
          };

          _this.translate(diff.x, diff.y);

          _this.trans.x = event.clientX;
          _this.trans.y = event.clientY;
        }
      });
      window.addEventListener('mouseup', function () {
        _this.trans.enabled = false;
      });
    }
  }]);

  return BoardController;
}();

exports.BoardController = BoardController;

/***/ }),

/***/ "../lib/index.js":
/*!***********************!*\
  !*** ../lib/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "startStory", {
  enumerable: true,
  get: function get() {
    return _utils.startStory;
  }
});
Object.defineProperty(exports, "Board", {
  enumerable: true,
  get: function get() {
    return _board.Board;
  }
});
Object.defineProperty(exports, "BoardController", {
  enumerable: true,
  get: function get() {
    return _boardController.BoardController;
  }
});

var _utils = __webpack_require__(/*! ./utils */ "../lib/utils/index.js");

var _board = __webpack_require__(/*! ./views/board */ "../lib/views/board.js");

var _boardController = __webpack_require__(/*! ./board-controller */ "../lib/board-controller.js");

/***/ }),

/***/ "../lib/utils/index.js":
/*!*****************************!*\
  !*** ../lib/utils/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startStory = startStory;

function startStory(story) {
  var _story = JSON.parse(JSON.stringify(story));

  return Promise.all(_story.map(function (scene) {
    return new Promise(function (resolve) {
      if (scene.screen.imagePath) {
        var img = new Image();
        img.src = scene.screen.imagePath;
        img.addEventListener('load', function (event) {
          scene.screen.img = img;

          if (scene.screen.width && !scene.screen.height) {
            var scale = img.width / scene.screen.width;
            scene.screen.height = img.height / scale;
          }

          if (!scene.screen.width && scene.screen.height) {
            var _scale = img.height / scene.screen.height;

            scene.screen.width = img.width / _scale;
          }

          resolve();
        });
      } else {
        resolve();
      }
    });
  })).then(function () {
    return _story;
  });
}

/***/ }),

/***/ "../lib/views/board.js":
/*!*****************************!*\
  !*** ../lib/views/board.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

var _page = __webpack_require__(/*! ./page */ "../lib/views/page.js");

var _transition = __webpack_require__(/*! ./transition */ "../lib/views/transition.js");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/*
 * Board
 * - constructor
 *   - options
 *     - rulerColor
 *     - padding
 *       - x
 *       - y
 * - size
 * - zoom
 * - translate
 * - _findPage
 * - _generateRulers
 * - _clear
 * - _renderRulers
 * - _renderPages
 * - _renderTransitions
 */


var Board =
/*#__PURE__*/
function () {
  function Board(el, story, options) {
    _classCallCheck(this, Board);

    this.el = el;
    this.context = this.el.getContext('2d');
    this.story = story;
    this.options = options;
    this.rulers = this._generateRulers(this.story);
    this.scale = 1;
    this.pages = [];

    this._clear();

    this._render();
  }

  _createClass(Board, [{
    key: "size",
    value: function size(width, height) {
      this._clear();

      this.el.width = width;
      this.el.height = height;

      this._render();
    }
  }, {
    key: "zoom",
    value: function zoom(scale) {
      this._clear();

      this.scale = scale;
      this.context.scale(this.scale, this.scale);

      this._render();
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      this._clear();

      this.context.translate(x, y);
      this.context.scale(this.scale, this.scale);

      this._render();
    }
  }, {
    key: "_findPage",
    value: function _findPage(pageId) {
      return this.pages.filter(function (page) {
        return page.id === pageId;
      })[0] || null;
    }
  }, {
    key: "_generateRulers",
    value: function _generateRulers(story) {
      var rulers = {
        x: [],
        y: []
      };
      var padding = this.options.padding; // Generate x rulers

      story.sort(function (scene1, scene2) {
        return scene1.grid.x - scene2.grid.x;
      });

      for (var i = 0; i < story.length; i++) {
        var scene = story[i];
        var x = scene.grid.x;
        var currentRulerX = rulers.x[x] || null;
        var nextRulerX = rulers.x[x + 1] || null;

        if (currentRulerX === null) {
          rulers.x[x] = 0;
        }

        var nextNewRulerX = rulers.x[x] + scene.screen.width + padding.x;

        if (nextRulerX === null) {
          rulers.x[x + 1] = nextNewRulerX;
        } else if (nextRulerX < nextNewRulerX) {
          rulers.x[x + 1] = nextNewRulerX;
        }
      } // Generate y rulers


      story.sort(function (scene1, scene2) {
        return scene1.grid.y - scene2.grid.y;
      });

      for (var _i = 0; _i < story.length; _i++) {
        var _scene = story[_i];
        var y = _scene.grid.y;
        var currentRulerY = rulers.y[y] || null;
        var nextRulerY = rulers.y[y + 1] || null;

        if (currentRulerY === null) {
          rulers.y[y] = 0;
        }

        var nextNewRulerY = rulers.y[y] + _scene.screen.height + padding.y;

        if (nextRulerY === null) {
          rulers.y[y + 1] = nextNewRulerY;
        } else if (nextRulerY < nextNewRulerY) {
          rulers.y[y + 1] = nextNewRulerY;
        }
      }

      return rulers;
    }
  }, {
    key: "_clear",
    value: function _clear() {
      // TODO: Optimize clearRect size
      this.context.scale(1 / this.scale, 1 / this.scale);
      this.context.clearRect(-10000, -10000, 100000, 100000);
    }
  }, {
    key: "_renderRulers",
    value: function _renderRulers() {
      var color = this.options.rulerColor || 'rgba(216, 53, 53, 0.72)';

      for (var i = 0; i < this.rulers.x.length; i++) {
        var x = this.rulers.x[i];
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(x, -100000);
        this.context.lineTo(x, 100000);
        this.context.stroke();
      }

      for (var _i2 = 0; _i2 < this.rulers.y.length; _i2++) {
        var y = this.rulers.y[_i2];
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(-100000, y);
        this.context.lineTo(100000, y);
        this.context.stroke();
      }
    }
  }, {
    key: "_renderPages",
    value: function _renderPages() {
      var _this = this;

      this.story.forEach(function (scene) {
        var x = scene.grid.x;
        var y = scene.grid.y;
        var page = new _page.Page(_this.context, scene, _this.rulers);

        _this.pages.push(page);
      });
    }
  }, {
    key: "_renderTransitions",
    value: function _renderTransitions() {
      var _this2 = this;

      this.pages.forEach(function (page) {
        page.scene.transitions.forEach(function (transition) {
          var targetPage = _this2._findPage(transition.to.id);

          new _transition.Transition(_this2.context, {
            page: page,
            targetPage: targetPage,
            transition: transition,
            rulers: _this2.rulers
          });
        });
      });
    }
  }, {
    key: "_render",
    value: function _render() {
      this._renderPages();

      this._renderTransitions();

      this._renderRulers();
    }
  }]);

  return Board;
}();

exports.Board = Board;

/***/ }),

/***/ "../lib/views/page.js":
/*!****************************!*\
  !*** ../lib/views/page.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Page =
/*#__PURE__*/
function () {
  function Page(context, scene, rulers) {
    _classCallCheck(this, Page);

    this.context = context;
    this.scene = scene;
    this.rulers = rulers;
    this.id = this.scene.id;
    this.title = this.scene.title;
    this.description = this.scene.description;
    this.grid = this.scene.grid;
    this.width = this.scene.screen.width;
    this.height = this.scene.screen.height;
    this.x = this.rulers.x[this.grid.x] + (this.rulers.x[this.grid.x + 1] - this.rulers.x[this.grid.x] - this.width) / 2;
    this.y = this.rulers.y[this.grid.y] + (this.rulers.y[this.grid.y + 1] - this.rulers.y[this.grid.y] - this.height) / 2;
    this.render();
  }

  _createClass(Page, [{
    key: "render",
    value: function render() {
      var color = this.scene.color || 'rgba(0, 0, 0, 0.32)';
      var titleFontSize = (this.title || {}).fontSize || 14;

      if (this.title) {
        this.context.fillStyle = '#666';
        this.context.textAlign = 'left';
        this.context.font = "".concat(titleFontSize, "px san-serif");
        this.context.fillText(this.title.text, this.x, this.rulers.y[this.grid.y] + titleFontSize, this.width);
      }

      if (this.description) {
        var descriptionFontSize = this.description.fontSize;
        var texts = this.description.text.split('\n');
        this.context.fillStyle = '#666';
        this.context.textAlign = 'left';
        this.context.font = "".concat(descriptionFontSize, "px san-serif");

        for (var i = 0; i < texts.length; i++) {
          var text = texts[i];
          this.context.fillText(text, this.x, this.rulers.y[this.grid.y] + titleFontSize + descriptionFontSize * (i + 2), this.width);
        }
      }

      this.context.fillStyle = color;
      this.context.shadowColor = 'rgba(0, 0, 0, 0.24)';
      this.context.shadowBlur = 3;
      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;

      if (this.scene.screen.img) {
        this.context.drawImage(this.scene.screen.img, this.x, this.y, this.scene.screen.width, this.scene.screen.height);
      } else {
        this.context.fillRect(this.x, this.y, this.scene.screen.width, this.scene.screen.height);
      }

      this.context.shadowBlur = 0;
    }
  }]);

  return Page;
}();

exports.Page = Page;

/***/ }),

/***/ "../lib/views/transition.js":
/*!**********************************!*\
  !*** ../lib/views/transition.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transition = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Transition =
/*#__PURE__*/
function () {
  function Transition(context, _ref) {
    var page = _ref.page,
        targetPage = _ref.targetPage,
        transition = _ref.transition,
        rulers = _ref.rulers;

    _classCallCheck(this, Transition);

    this.context = context;
    this.page = page;
    this.targetPage = targetPage;
    this.transition = transition;
    this.rulers = rulers;
    this.render();
  }

  _createClass(Transition, [{
    key: "renderStartPoint",
    value: function renderStartPoint(_ref2) {
      var startX = _ref2.startX,
          startY = _ref2.startY,
          radius = _ref2.radius;
      this.context.beginPath();
      this.context.arc(startX, startY, radius, 0, Math.PI * 2);
      this.context.fill();
      this.context.stroke();
    }
  }, {
    key: "renderTransitionLine",
    value: function renderTransitionLine(_ref3) {
      var startX = _ref3.startX,
          startY = _ref3.startY,
          endX = _ref3.endX,
          endY = _ref3.endY,
          room = _ref3.room;
      var currentGrid = this.page.grid;
      var targetGrid = this.targetPage.grid;
      this.context.beginPath();
      this.context.moveTo(startX, startY);

      if (currentGrid.y > targetGrid.y) {
        // lineTo top.
        this.context.lineTo(startX, this.rulers.y[currentGrid.y] + room.y);
        this.context.lineTo(this.rulers.x[targetGrid.x] + room.x, this.rulers.y[currentGrid.y] + room.y);
        this.context.lineTo(this.rulers.x[targetGrid.x] + room.x, endY);
      } else if (currentGrid.y < targetGrid.y) {
        // lineTo bottom.
        this.context.lineTo(startX, this.rulers.y[currentGrid.y + 1] + room.y);
        this.context.lineTo(this.rulers.x[targetGrid.x] + room.x, this.rulers.y[currentGrid.y + 1] + room.y);
        this.context.lineTo(this.rulers.x[targetGrid.x] + room.x, endY);
      } else if (currentGrid.y === targetGrid.y && currentGrid.x > targetGrid.x) {
        // lineTo left
        this.context.lineTo(this.rulers.x[currentGrid.x] + room.x, startY);
        this.context.lineTo(this.rulers.x[currentGrid.x] + room.x, this.rulers.y[targetGrid.y] + room.y);
        this.context.lineTo(this.rulers.x[targetGrid.x] + room.x, this.rulers.y[targetGrid.y] + room.y);
        this.context.lineTo(this.rulers.x[targetGrid.x] + room.x, endY);
      } else if (currentGrid.y === targetGrid.y && currentGrid.x < targetGrid.x) {
        // lineTo right
        this.context.lineTo(this.rulers.x[currentGrid.x + 1] + room.x, startY);

        if (targetGrid.x - currentGrid.x > 1) {
          this.context.lineTo(this.rulers.x[currentGrid.x + 1] + room.x, this.rulers.y[targetGrid.y] + room.y);
          this.context.lineTo(this.rulers.x[targetGrid.x] + room.x, this.rulers.y[targetGrid.y] + room.y);
          this.context.lineTo(this.rulers.x[targetGrid.x] + room.x, endY);
        } else {
          this.context.lineTo(this.rulers.x[currentGrid.x + 1] + room.x, endY);
        }
      } else {
        this.context.lineTo(this.rulers.x[currentGrid.x] + room.x, startY);
        this.context.lineTo(this.rulers.x[targetGrid.x] + room.y, endY);
      }

      this.context.lineTo(endX, endY);
      this.context.stroke();
    }
  }, {
    key: "renderEndArrow",
    value: function renderEndArrow(_ref4) {
      var endX = _ref4.endX,
          endY = _ref4.endY;
      this.context.beginPath();
      this.context.moveTo(endX, endY);
      this.context.lineTo(endX - 14, endY + 10);
      this.context.lineTo(endX - 14, endY - 10);
      this.context.closePath();
      this.context.fill();
      this.context.stroke();
    }
  }, {
    key: "renderFromDescription",
    value: function renderFromDescription(_ref5) {
      var startX = _ref5.startX,
          startY = _ref5.startY;

      if (this.transition.from.description) {
        var descriptionFontSize = this.transition.from.description.fontSize || 12;
        var texts = this.transition.from.description.text.split('\n');
        this.context.fillStyle = '#666';
        this.context.textAlign = 'left';
        this.context.font = "".concat(descriptionFontSize, "px san-serif");

        for (var i = 0; i < texts.length; i++) {
          var text = texts[i];
          this.context.fillText(text, startX + descriptionFontSize, startY - texts.length * descriptionFontSize + descriptionFontSize * i);
        }
      }
    }
  }, {
    key: "renderToDescription",
    value: function renderToDescription(_ref6) {
      var endX = _ref6.endX,
          endY = _ref6.endY;

      if (this.transition.to.description) {
        var descriptionFontSize = this.transition.to.description.fontSize || 12;
        var texts = this.transition.to.description.text.split('\n');
        this.context.fillStyle = '#666';
        this.context.textAlign = 'right';
        this.context.font = "".concat(descriptionFontSize, "px san-serif");

        for (var i = 0; i < texts.length; i++) {
          var text = texts[i];
          this.context.fillText(text, endX - descriptionFontSize * 2, endY - texts.length * descriptionFontSize + descriptionFontSize * i);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var from = this.transition.from || {
        x: this.page.width,
        y: 0,
        radius: 12
      };
      var toOffset = this.transition.to.offset || {
        x: 0,
        y: 0
      };
      var options = {
        color: this.transition.color || 'rgba(0, 0, 0, 0.48)',
        radius: from.radius,
        room: this.transition.room || {
          x: 0,
          y: 0
        },
        startX: this.page.x + from.x,
        startY: this.page.y + from.y,
        endX: this.targetPage.x + toOffset.x,
        endY: this.targetPage.y + toOffset.y
      };
      this.renderFromDescription(options);
      this.context.strokeStyle = options.color;
      this.context.fillStyle = options.color;
      this.renderStartPoint(options);
      this.renderTransitionLine(options);
      this.renderEndArrow(options);
      this.renderToDescription(options);
    }
  }]);

  return Transition;
}();

exports.Transition = Transition;

/***/ }),

/***/ "./basic/index.js":
/*!************************!*\
  !*** ./basic/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lib = __webpack_require__(/*! ../../lib */ "../lib/index.js");

var _story = __webpack_require__(/*! ./story */ "./basic/story.js");

window.addEventListener('DOMContentLoaded', function () {
  console.log("Start app at ".concat(new Date().toString(), "."));
  (0, _lib.startStory)(_story.story).then(function (generatedStory) {
    var canvasElement = window.document.querySelector('.storyteller');
    var board = new _lib.Board(canvasElement, generatedStory, {
      padding: {
        x: 320,
        y: 200
      }
    });
    var controller = new _lib.BoardController(board);
    controller.size(window.innerWidth, window.innerHeight);
    controller.fit(100, 100);
    document.querySelector('.reset').addEventListener('click', function () {
      controller.position(0, 0);
    });
  });
});

/***/ }),

/***/ "./basic/story.js":
/*!************************!*\
  !*** ./basic/story.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.story = void 0;
var screen = {
  width: 375,
  height: 667,
  imagePath: null
};

function createScene(id, gridX, gridY) {
  var scene = {
    id: id,
    screen: screen,
    grid: {
      x: gridX,
      y: gridY
    },
    transitions: []
  };

  if (gridX === 2 && gridY === 2) {
    var transitions = [];

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        var _id = "scene-".concat(i, "-").concat(j);

        var transition = {
          from: {
            x: screen.width / 2 + (i - 2) * 60 - (j % 2 === 0 ? 30 : 0),
            y: screen.height / 2 + (j - 2) * 60 - (i % 2 === 0 ? 30 : 0)
          },
          to: {
            id: _id,
            offset: {
              x: 0,
              y: 30
            }
          }
        };

        if (i === 0 || i === 4) {
          if (j === 0) {
            transition.color = 'red';
            transition.room = {
              x: -50,
              y: -50
            };
          } else if (j === 1) {
            transition.color = 'green';
            transition.room = {
              x: -30,
              y: -30
            };
          } else if (j === 2) {
            transition.color = 'blue';
            transition.room = {
              x: -10,
              y: -10
            };
          } else if (j === 3) {
            transition.color = 'yellow';
            transition.room = {
              x: 10,
              y: 10
            };
          } else if (j === 4) {
            transition.color = 'purple';
            transition.room = {
              x: 30,
              y: 30
            };
          }
        }

        if (i === 1 || i === 3) {
          if (j === 0) {
            transition.color = 'red';
            transition.room = {
              x: -50,
              y: 50
            };
          } else if (j === 1) {
            transition.color = 'green';
            transition.room = {
              x: -30,
              y: 30
            };
          } else if (j === 2) {
            transition.color = 'blue';
            transition.room = {
              x: -10,
              y: 10
            };
          } else if (j === 3) {
            transition.color = 'yellow';
            transition.room = {
              x: 10,
              y: -10
            };
          } else if (j === 4) {
            transition.color = 'purple';
            transition.room = {
              x: 30,
              y: -30
            };
          }
        }

        if (i === 2) {
          if (j === 0) {
            transition.color = 'red';
            transition.room = {
              x: 40,
              y: 40
            };
          } else if (j === 1) {
            transition.color = 'green';
            transition.room = {
              x: 20,
              y: 20
            };
          } else if (j === 2) {
            transition.color = 'black';
            transition.room = {
              x: 0,
              y: 0
            };
          } else if (j === 3) {
            transition.color = 'yellow';
            transition.room = {
              x: -20,
              y: -20
            };
          } else if (j === 4) {
            transition.color = 'purple';
            transition.room = {
              x: -40,
              y: -40
            };
          }
        }

        transitions.push(transition);
      }
    }

    scene.transitions = transitions;
  }

  return scene;
}

var story = [];
exports.story = story;

for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 5; j++) {
    var id = "scene-".concat(i, "-").concat(j);
    var scene = createScene(id, i, j);
    story.push(scene);
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9ib2FyZC1jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uLi9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbGliL3ZpZXdzL2JvYXJkLmpzIiwid2VicGFjazovLy8uLi9saWIvdmlld3MvcGFnZS5qcyIsIndlYnBhY2s6Ly8vLi4vbGliL3ZpZXdzL3RyYW5zaXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYmFzaWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYmFzaWMvc3RvcnkuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJCb2FyZENvbnRyb2xsZXIiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiVHlwZUVycm9yIiwiX2RlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImkiLCJsZW5ndGgiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwia2V5IiwiX2NyZWF0ZUNsYXNzIiwicHJvdG9Qcm9wcyIsInN0YXRpY1Byb3BzIiwicHJvdG90eXBlIiwiYm9hcmQiLCJ0cmFucyIsImVuYWJsZWQiLCJ4IiwieSIsInBvcyIsInNjYWxlIiwic2V0RXZlbnRMaXN0ZW5lciIsInpvb20iLCJ0cmFuc2xhdGUiLCJwb3NpdGlvbiIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsImdldENlbnRlciIsInJ1bGVycyIsImNlbnRlciIsImdldFNpemUiLCJmaXQiLCJwYWRkaW5nWCIsInBhZGRpbmdZIiwiZWwiLCJfdGhpcyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwibWluU2NhbGUiLCJtYXhTY2FsZSIsImRlbHRhWSIsImNsaWVudFgiLCJjbGllbnRZIiwiZGlmZiIsImdldCIsIl91dGlscyIsInN0YXJ0U3RvcnkiLCJfYm9hcmQiLCJCb2FyZCIsIl9ib2FyZENvbnRyb2xsZXIiLCJyZXF1aXJlIiwic3RvcnkiLCJfc3RvcnkiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwic2NlbmUiLCJyZXNvbHZlIiwic2NyZWVuIiwiaW1hZ2VQYXRoIiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJfc2NhbGUiLCJ0aGVuIiwiX3BhZ2UiLCJfdHJhbnNpdGlvbiIsIm9wdGlvbnMiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIl9nZW5lcmF0ZVJ1bGVycyIsInBhZ2VzIiwiX2NsZWFyIiwiX3JlbmRlciIsIl9maW5kUGFnZSIsInBhZ2VJZCIsImZpbHRlciIsInBhZ2UiLCJpZCIsInBhZGRpbmciLCJzb3J0Iiwic2NlbmUxIiwic2NlbmUyIiwiZ3JpZCIsImN1cnJlbnRSdWxlclgiLCJuZXh0UnVsZXJYIiwibmV4dE5ld1J1bGVyWCIsIl9pIiwiX3NjZW5lIiwiY3VycmVudFJ1bGVyWSIsIm5leHRSdWxlclkiLCJuZXh0TmV3UnVsZXJZIiwiY2xlYXJSZWN0IiwiX3JlbmRlclJ1bGVycyIsImNvbG9yIiwicnVsZXJDb2xvciIsImJlZ2luUGF0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiX2kyIiwiX3JlbmRlclBhZ2VzIiwiZm9yRWFjaCIsIlBhZ2UiLCJwdXNoIiwiX3JlbmRlclRyYW5zaXRpb25zIiwiX3RoaXMyIiwidHJhbnNpdGlvbnMiLCJ0cmFuc2l0aW9uIiwidGFyZ2V0UGFnZSIsInRvIiwiVHJhbnNpdGlvbiIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJyZW5kZXIiLCJ0aXRsZUZvbnRTaXplIiwiZm9udFNpemUiLCJmaWxsU3R5bGUiLCJ0ZXh0QWxpZ24iLCJmb250IiwiY29uY2F0IiwiZmlsbFRleHQiLCJ0ZXh0IiwiZGVzY3JpcHRpb25Gb250U2l6ZSIsInRleHRzIiwic3BsaXQiLCJzaGFkb3dDb2xvciIsInNoYWRvd0JsdXIiLCJzaGFkb3dPZmZzZXRYIiwic2hhZG93T2Zmc2V0WSIsImRyYXdJbWFnZSIsImZpbGxSZWN0IiwiX3JlZiIsInJlbmRlclN0YXJ0UG9pbnQiLCJfcmVmMiIsInN0YXJ0WCIsInN0YXJ0WSIsInJhZGl1cyIsImFyYyIsIk1hdGgiLCJQSSIsImZpbGwiLCJyZW5kZXJUcmFuc2l0aW9uTGluZSIsIl9yZWYzIiwiZW5kWCIsImVuZFkiLCJyb29tIiwiY3VycmVudEdyaWQiLCJ0YXJnZXRHcmlkIiwicmVuZGVyRW5kQXJyb3ciLCJfcmVmNCIsImNsb3NlUGF0aCIsInJlbmRlckZyb21EZXNjcmlwdGlvbiIsIl9yZWY1IiwiZnJvbSIsInJlbmRlclRvRGVzY3JpcHRpb24iLCJfcmVmNiIsInRvT2Zmc2V0Iiwib2Zmc2V0IiwiY29uc29sZSIsImxvZyIsIkRhdGUiLCJ0b1N0cmluZyIsImdlbmVyYXRlZFN0b3J5IiwiY2FudmFzRWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRyb2xsZXIiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJjcmVhdGVTY2VuZSIsImdyaWRYIiwiZ3JpZFkiLCJqIiwiX2lkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtE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QUFFRCxTQUFPcEQsS0FBUDtBQUNEOztBQUVELElBQUlSLFFBQVEsRUFBWjtBQUNBN0QsUUFBUTZELEtBQVIsR0FBZ0JBLEtBQWhCOztBQUVBLEtBQUssSUFBSW5ELElBQUksQ0FBYixFQUFnQkEsSUFBSSxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDMUIsT0FBSyxJQUFJaUwsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLENBQXBCLEVBQXVCQSxHQUF2QixFQUE0QjtBQUMxQixRQUFJaEcsS0FBSyxTQUFTMkMsTUFBVCxDQUFnQjVILENBQWhCLEVBQW1CLEdBQW5CLEVBQXdCNEgsTUFBeEIsQ0FBK0JxRCxDQUEvQixDQUFUO0FBQ0EsUUFBSXRILFFBQVFtSCxZQUFZN0YsRUFBWixFQUFnQmpGLENBQWhCLEVBQW1CaUwsQ0FBbkIsQ0FBWjtBQUNBOUgsVUFBTXlELElBQU4sQ0FBV2pELEtBQVg7QUFDRDtBQUNGLEMiLCJmaWxlIjoiYmFzaWMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYmFzaWMvaW5kZXguanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQm9hcmRDb250cm9sbGVyID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbnZhciBCb2FyZENvbnRyb2xsZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCb2FyZENvbnRyb2xsZXIoYm9hcmQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQm9hcmRDb250cm9sbGVyKTtcblxuICAgIHRoaXMudHJhbnMgPSB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLnBvcyA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVyKCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm9hcmRDb250cm9sbGVyLCBbe1xuICAgIGtleTogXCJ6b29tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHpvb20oc2NhbGUpIHtcbiAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgIHRoaXMuYm9hcmQuem9vbSh0aGlzLnNjYWxlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidHJhbnNsYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgICB0aGlzLnBvcy54ICs9IHg7XG4gICAgICB0aGlzLnBvcy55ICs9IHk7XG4gICAgICB0aGlzLmJvYXJkLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicG9zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcG9zaXRpb24oeCwgeSkge1xuICAgICAgdGhpcy50cmFuc2xhdGUoLTEgKiB0aGlzLnBvcy54LCAtMSAqIHRoaXMucG9zLnkpO1xuICAgICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNpemVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICB0aGlzLmJvYXJkLnNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldENlbnRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDZW50ZXIoKSB7XG4gICAgICB2YXIgcnVsZXJzID0gdGhpcy5ib2FyZC5ydWxlcnM7XG4gICAgICB2YXIgY2VudGVyID0ge1xuICAgICAgICB4OiAocnVsZXJzLnhbMF0gKyBydWxlcnMueFtydWxlcnMueC5sZW5ndGggLSAxXSkgLyAyLFxuICAgICAgICB5OiAocnVsZXJzLnlbMF0gKyBydWxlcnMueVtydWxlcnMueS5sZW5ndGggLSAxXSkgLyAyXG4gICAgICB9O1xuICAgICAgcmV0dXJuIGNlbnRlcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0U2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgICAgdmFyIHJ1bGVycyA9IHRoaXMuYm9hcmQucnVsZXJzO1xuICAgICAgdmFyIHNpemUgPSB7XG4gICAgICAgIHdpZHRoOiBydWxlcnMueFtydWxlcnMueC5sZW5ndGggLSAxXSxcbiAgICAgICAgaGVpZ2h0OiBydWxlcnMueVtydWxlcnMueS5sZW5ndGggLSAxXVxuICAgICAgfTtcbiAgICAgIHJldHVybiBzaXplO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZml0KHBhZGRpbmdYLCBwYWRkaW5nWSkge1xuICAgICAgdmFyIHNpemUgPSB0aGlzLmdldFNpemUoKTtcbiAgICAgIHZhciB3aWR0aCA9IHRoaXMuYm9hcmQuZWwud2lkdGggLSBwYWRkaW5nWCAqIDI7XG4gICAgICB2YXIgc2NhbGUgPSB3aWR0aCAvIHNpemUud2lkdGg7XG4gICAgICB0aGlzLnBvc2l0aW9uKHBhZGRpbmdYLCBwYWRkaW5nWSk7XG4gICAgICB0aGlzLnpvb20oc2NhbGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzZXRFdmVudExpc3RlbmVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBtaW5TY2FsZSA9IDAuMDU7XG4gICAgICAgIHZhciBtYXhTY2FsZSA9IDEwO1xuXG4gICAgICAgIGlmIChldmVudC5kZWx0YVkgPiAwKSB7XG4gICAgICAgICAgX3RoaXMuc2NhbGUgKj0gMC45NTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5zY2FsZSAqPSAxLjA1O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF90aGlzLnNjYWxlIDwgbWluU2NhbGUpIHtcbiAgICAgICAgICBfdGhpcy5zY2FsZSA9IG1pblNjYWxlO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFNjYWxlIDwgX3RoaXMuc2NhbGUpIHtcbiAgICAgICAgICBfdGhpcy5zY2FsZSA9IG1heFNjYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuYm9hcmQuem9vbShfdGhpcy5zY2FsZSk7XG4gICAgICB9KTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgX3RoaXMudHJhbnMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIF90aGlzLnRyYW5zLnggPSBldmVudC5jbGllbnRYO1xuICAgICAgICBfdGhpcy50cmFucy55ID0gZXZlbnQuY2xpZW50WTtcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoX3RoaXMudHJhbnMuZW5hYmxlZCkge1xuICAgICAgICAgIHZhciBkaWZmID0ge1xuICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCAtIF90aGlzLnRyYW5zLngsXG4gICAgICAgICAgICB5OiBldmVudC5jbGllbnRZIC0gX3RoaXMudHJhbnMueVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBfdGhpcy50cmFuc2xhdGUoZGlmZi54LCBkaWZmLnkpO1xuXG4gICAgICAgICAgX3RoaXMudHJhbnMueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgICAgX3RoaXMudHJhbnMueSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLnRyYW5zLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBCb2FyZENvbnRyb2xsZXI7XG59KCk7XG5cbmV4cG9ydHMuQm9hcmRDb250cm9sbGVyID0gQm9hcmRDb250cm9sbGVyOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RhcnRTdG9yeVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfdXRpbHMuc3RhcnRTdG9yeTtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJCb2FyZFwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfYm9hcmQuQm9hcmQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQm9hcmRDb250cm9sbGVyXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9ib2FyZENvbnRyb2xsZXIuQm9hcmRDb250cm9sbGVyO1xuICB9XG59KTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG52YXIgX2JvYXJkID0gcmVxdWlyZShcIi4vdmlld3MvYm9hcmRcIik7XG5cbnZhciBfYm9hcmRDb250cm9sbGVyID0gcmVxdWlyZShcIi4vYm9hcmQtY29udHJvbGxlclwiKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuc3RhcnRTdG9yeSA9IHN0YXJ0U3Rvcnk7XG5cbmZ1bmN0aW9uIHN0YXJ0U3Rvcnkoc3RvcnkpIHtcbiAgdmFyIF9zdG9yeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3RvcnkpKTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoX3N0b3J5Lm1hcChmdW5jdGlvbiAoc2NlbmUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIGlmIChzY2VuZS5zY3JlZW4uaW1hZ2VQYXRoKSB7XG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHNjZW5lLnNjcmVlbi5pbWFnZVBhdGg7XG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgc2NlbmUuc2NyZWVuLmltZyA9IGltZztcblxuICAgICAgICAgIGlmIChzY2VuZS5zY3JlZW4ud2lkdGggJiYgIXNjZW5lLnNjcmVlbi5oZWlnaHQpIHtcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IGltZy53aWR0aCAvIHNjZW5lLnNjcmVlbi53aWR0aDtcbiAgICAgICAgICAgIHNjZW5lLnNjcmVlbi5oZWlnaHQgPSBpbWcuaGVpZ2h0IC8gc2NhbGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFzY2VuZS5zY3JlZW4ud2lkdGggJiYgc2NlbmUuc2NyZWVuLmhlaWdodCkge1xuICAgICAgICAgICAgdmFyIF9zY2FsZSA9IGltZy5oZWlnaHQgLyBzY2VuZS5zY3JlZW4uaGVpZ2h0O1xuXG4gICAgICAgICAgICBzY2VuZS5zY3JlZW4ud2lkdGggPSBpbWcud2lkdGggLyBfc2NhbGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfc3Rvcnk7XG4gIH0pO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Cb2FyZCA9IHZvaWQgMDtcblxudmFyIF9wYWdlID0gcmVxdWlyZShcIi4vcGFnZVwiKTtcblxudmFyIF90cmFuc2l0aW9uID0gcmVxdWlyZShcIi4vdHJhbnNpdGlvblwiKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG4vKlxuICogQm9hcmRcbiAqIC0gY29uc3RydWN0b3JcbiAqICAgLSBvcHRpb25zXG4gKiAgICAgLSBydWxlckNvbG9yXG4gKiAgICAgLSBwYWRkaW5nXG4gKiAgICAgICAtIHhcbiAqICAgICAgIC0geVxuICogLSBzaXplXG4gKiAtIHpvb21cbiAqIC0gdHJhbnNsYXRlXG4gKiAtIF9maW5kUGFnZVxuICogLSBfZ2VuZXJhdGVSdWxlcnNcbiAqIC0gX2NsZWFyXG4gKiAtIF9yZW5kZXJSdWxlcnNcbiAqIC0gX3JlbmRlclBhZ2VzXG4gKiAtIF9yZW5kZXJUcmFuc2l0aW9uc1xuICovXG52YXIgQm9hcmQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCb2FyZChlbCwgc3RvcnksIG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQm9hcmQpO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLnN0b3J5ID0gc3Rvcnk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnJ1bGVycyA9IHRoaXMuX2dlbmVyYXRlUnVsZXJzKHRoaXMuc3RvcnkpO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMucGFnZXMgPSBbXTtcblxuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb2FyZCwgW3tcbiAgICBrZXk6IFwic2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICAgIHRoaXMuZWwud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuZWwuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiem9vbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB6b29tKHNjYWxlKSB7XG4gICAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICB0aGlzLmNvbnRleHQuc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0cmFuc2xhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHgsIHkpIHtcbiAgICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoeCwgeSk7XG4gICAgICB0aGlzLmNvbnRleHQuc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfZmluZFBhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpbmRQYWdlKHBhZ2VJZCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFnZXMuZmlsdGVyKGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgIHJldHVybiBwYWdlLmlkID09PSBwYWdlSWQ7XG4gICAgICB9KVswXSB8fCBudWxsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfZ2VuZXJhdGVSdWxlcnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dlbmVyYXRlUnVsZXJzKHN0b3J5KSB7XG4gICAgICB2YXIgcnVsZXJzID0ge1xuICAgICAgICB4OiBbXSxcbiAgICAgICAgeTogW11cbiAgICAgIH07XG4gICAgICB2YXIgcGFkZGluZyA9IHRoaXMub3B0aW9ucy5wYWRkaW5nOyAvLyBHZW5lcmF0ZSB4IHJ1bGVyc1xuXG4gICAgICBzdG9yeS5zb3J0KGZ1bmN0aW9uIChzY2VuZTEsIHNjZW5lMikge1xuICAgICAgICByZXR1cm4gc2NlbmUxLmdyaWQueCAtIHNjZW5lMi5ncmlkLng7XG4gICAgICB9KTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc2NlbmUgPSBzdG9yeVtpXTtcbiAgICAgICAgdmFyIHggPSBzY2VuZS5ncmlkLng7XG4gICAgICAgIHZhciBjdXJyZW50UnVsZXJYID0gcnVsZXJzLnhbeF0gfHwgbnVsbDtcbiAgICAgICAgdmFyIG5leHRSdWxlclggPSBydWxlcnMueFt4ICsgMV0gfHwgbnVsbDtcblxuICAgICAgICBpZiAoY3VycmVudFJ1bGVyWCA9PT0gbnVsbCkge1xuICAgICAgICAgIHJ1bGVycy54W3hdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXh0TmV3UnVsZXJYID0gcnVsZXJzLnhbeF0gKyBzY2VuZS5zY3JlZW4ud2lkdGggKyBwYWRkaW5nLng7XG5cbiAgICAgICAgaWYgKG5leHRSdWxlclggPT09IG51bGwpIHtcbiAgICAgICAgICBydWxlcnMueFt4ICsgMV0gPSBuZXh0TmV3UnVsZXJYO1xuICAgICAgICB9IGVsc2UgaWYgKG5leHRSdWxlclggPCBuZXh0TmV3UnVsZXJYKSB7XG4gICAgICAgICAgcnVsZXJzLnhbeCArIDFdID0gbmV4dE5ld1J1bGVyWDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBHZW5lcmF0ZSB5IHJ1bGVyc1xuXG5cbiAgICAgIHN0b3J5LnNvcnQoZnVuY3Rpb24gKHNjZW5lMSwgc2NlbmUyKSB7XG4gICAgICAgIHJldHVybiBzY2VuZTEuZ3JpZC55IC0gc2NlbmUyLmdyaWQueTtcbiAgICAgIH0pO1xuXG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgc3RvcnkubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBfc2NlbmUgPSBzdG9yeVtfaV07XG4gICAgICAgIHZhciB5ID0gX3NjZW5lLmdyaWQueTtcbiAgICAgICAgdmFyIGN1cnJlbnRSdWxlclkgPSBydWxlcnMueVt5XSB8fCBudWxsO1xuICAgICAgICB2YXIgbmV4dFJ1bGVyWSA9IHJ1bGVycy55W3kgKyAxXSB8fCBudWxsO1xuXG4gICAgICAgIGlmIChjdXJyZW50UnVsZXJZID09PSBudWxsKSB7XG4gICAgICAgICAgcnVsZXJzLnlbeV0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5leHROZXdSdWxlclkgPSBydWxlcnMueVt5XSArIF9zY2VuZS5zY3JlZW4uaGVpZ2h0ICsgcGFkZGluZy55O1xuXG4gICAgICAgIGlmIChuZXh0UnVsZXJZID09PSBudWxsKSB7XG4gICAgICAgICAgcnVsZXJzLnlbeSArIDFdID0gbmV4dE5ld1J1bGVyWTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXh0UnVsZXJZIDwgbmV4dE5ld1J1bGVyWSkge1xuICAgICAgICAgIHJ1bGVycy55W3kgKyAxXSA9IG5leHROZXdSdWxlclk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJ1bGVycztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2NsZWFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jbGVhcigpIHtcbiAgICAgIC8vIFRPRE86IE9wdGltaXplIGNsZWFyUmVjdCBzaXplXG4gICAgICB0aGlzLmNvbnRleHQuc2NhbGUoMSAvIHRoaXMuc2NhbGUsIDEgLyB0aGlzLnNjYWxlKTtcbiAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoLTEwMDAwLCAtMTAwMDAsIDEwMDAwMCwgMTAwMDAwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3JlbmRlclJ1bGVyc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVuZGVyUnVsZXJzKCkge1xuICAgICAgdmFyIGNvbG9yID0gdGhpcy5vcHRpb25zLnJ1bGVyQ29sb3IgfHwgJ3JnYmEoMjE2LCA1MywgNTMsIDAuNzIpJztcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJ1bGVycy54Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy5ydWxlcnMueFtpXTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4LCAtMTAwMDAwKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh4LCAxMDAwMDApO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IHRoaXMucnVsZXJzLnkubGVuZ3RoOyBfaTIrKykge1xuICAgICAgICB2YXIgeSA9IHRoaXMucnVsZXJzLnlbX2kyXTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbygtMTAwMDAwLCB5KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbygxMDAwMDAsIHkpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9yZW5kZXJQYWdlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVuZGVyUGFnZXMoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB0aGlzLnN0b3J5LmZvckVhY2goZnVuY3Rpb24gKHNjZW5lKSB7XG4gICAgICAgIHZhciB4ID0gc2NlbmUuZ3JpZC54O1xuICAgICAgICB2YXIgeSA9IHNjZW5lLmdyaWQueTtcbiAgICAgICAgdmFyIHBhZ2UgPSBuZXcgX3BhZ2UuUGFnZShfdGhpcy5jb250ZXh0LCBzY2VuZSwgX3RoaXMucnVsZXJzKTtcblxuICAgICAgICBfdGhpcy5wYWdlcy5wdXNoKHBhZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9yZW5kZXJUcmFuc2l0aW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVuZGVyVHJhbnNpdGlvbnMoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdGhpcy5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgIHBhZ2Uuc2NlbmUudHJhbnNpdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAodHJhbnNpdGlvbikge1xuICAgICAgICAgIHZhciB0YXJnZXRQYWdlID0gX3RoaXMyLl9maW5kUGFnZSh0cmFuc2l0aW9uLnRvLmlkKTtcblxuICAgICAgICAgIG5ldyBfdHJhbnNpdGlvbi5UcmFuc2l0aW9uKF90aGlzMi5jb250ZXh0LCB7XG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGFnZTogdGFyZ2V0UGFnZSxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb24sXG4gICAgICAgICAgICBydWxlcnM6IF90aGlzMi5ydWxlcnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3JlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVuZGVyKCkge1xuICAgICAgdGhpcy5fcmVuZGVyUGFnZXMoKTtcblxuICAgICAgdGhpcy5fcmVuZGVyVHJhbnNpdGlvbnMoKTtcblxuICAgICAgdGhpcy5fcmVuZGVyUnVsZXJzKCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvYXJkO1xufSgpO1xuXG5leHBvcnRzLkJvYXJkID0gQm9hcmQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlBhZ2UgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxudmFyIFBhZ2UgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQYWdlKGNvbnRleHQsIHNjZW5lLCBydWxlcnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGFnZSk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnJ1bGVycyA9IHJ1bGVycztcbiAgICB0aGlzLmlkID0gdGhpcy5zY2VuZS5pZDtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5zY2VuZS50aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5zY2VuZS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLnNjZW5lLmdyaWQ7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMuc2NlbmUuc2NyZWVuLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zY2VuZS5zY3JlZW4uaGVpZ2h0O1xuICAgIHRoaXMueCA9IHRoaXMucnVsZXJzLnhbdGhpcy5ncmlkLnhdICsgKHRoaXMucnVsZXJzLnhbdGhpcy5ncmlkLnggKyAxXSAtIHRoaXMucnVsZXJzLnhbdGhpcy5ncmlkLnhdIC0gdGhpcy53aWR0aCkgLyAyO1xuICAgIHRoaXMueSA9IHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgKHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnkgKyAxXSAtIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldIC0gdGhpcy5oZWlnaHQpIC8gMjtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBhZ2UsIFt7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgY29sb3IgPSB0aGlzLnNjZW5lLmNvbG9yIHx8ICdyZ2JhKDAsIDAsIDAsIDAuMzIpJztcbiAgICAgIHZhciB0aXRsZUZvbnRTaXplID0gKHRoaXMudGl0bGUgfHwge30pLmZvbnRTaXplIHx8IDE0O1xuXG4gICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyM2NjYnO1xuICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IFwiXCIuY29uY2F0KHRpdGxlRm9udFNpemUsIFwicHggc2FuLXNlcmlmXCIpO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGhpcy50aXRsZS50ZXh0LCB0aGlzLngsIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgdGl0bGVGb250U2l6ZSwgdGhpcy53aWR0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbkZvbnRTaXplID0gdGhpcy5kZXNjcmlwdGlvbi5mb250U2l6ZTtcbiAgICAgICAgdmFyIHRleHRzID0gdGhpcy5kZXNjcmlwdGlvbi50ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjNjY2JztcbiAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBcIlwiLmNvbmNhdChkZXNjcmlwdGlvbkZvbnRTaXplLCBcInB4IHNhbi1zZXJpZlwiKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHRleHQgPSB0ZXh0c1tpXTtcbiAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgdGhpcy54LCB0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55XSArIHRpdGxlRm9udFNpemUgKyBkZXNjcmlwdGlvbkZvbnRTaXplICogKGkgKyAyKSwgdGhpcy53aWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgdGhpcy5jb250ZXh0LnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4yNCknO1xuICAgICAgdGhpcy5jb250ZXh0LnNoYWRvd0JsdXIgPSAzO1xuICAgICAgdGhpcy5jb250ZXh0LnNoYWRvd09mZnNldFggPSAwO1xuICAgICAgdGhpcy5jb250ZXh0LnNoYWRvd09mZnNldFkgPSAwO1xuXG4gICAgICBpZiAodGhpcy5zY2VuZS5zY3JlZW4uaW1nKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5zY2VuZS5zY3JlZW4uaW1nLCB0aGlzLngsIHRoaXMueSwgdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGgsIHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMuc2NlbmUuc2NyZWVuLndpZHRoLCB0aGlzLnNjZW5lLnNjcmVlbi5oZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRleHQuc2hhZG93Qmx1ciA9IDA7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBhZ2U7XG59KCk7XG5cbmV4cG9ydHMuUGFnZSA9IFBhZ2U7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlRyYW5zaXRpb24gPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxudmFyIFRyYW5zaXRpb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUcmFuc2l0aW9uKGNvbnRleHQsIF9yZWYpIHtcbiAgICB2YXIgcGFnZSA9IF9yZWYucGFnZSxcbiAgICAgICAgdGFyZ2V0UGFnZSA9IF9yZWYudGFyZ2V0UGFnZSxcbiAgICAgICAgdHJhbnNpdGlvbiA9IF9yZWYudHJhbnNpdGlvbixcbiAgICAgICAgcnVsZXJzID0gX3JlZi5ydWxlcnM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVHJhbnNpdGlvbik7XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgdGhpcy50YXJnZXRQYWdlID0gdGFyZ2V0UGFnZTtcbiAgICB0aGlzLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICAgIHRoaXMucnVsZXJzID0gcnVsZXJzO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVHJhbnNpdGlvbiwgW3tcbiAgICBrZXk6IFwicmVuZGVyU3RhcnRQb2ludFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJTdGFydFBvaW50KF9yZWYyKSB7XG4gICAgICB2YXIgc3RhcnRYID0gX3JlZjIuc3RhcnRYLFxuICAgICAgICAgIHN0YXJ0WSA9IF9yZWYyLnN0YXJ0WSxcbiAgICAgICAgICByYWRpdXMgPSBfcmVmMi5yYWRpdXM7XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHN0YXJ0WCwgc3RhcnRZLCByYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclRyYW5zaXRpb25MaW5lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclRyYW5zaXRpb25MaW5lKF9yZWYzKSB7XG4gICAgICB2YXIgc3RhcnRYID0gX3JlZjMuc3RhcnRYLFxuICAgICAgICAgIHN0YXJ0WSA9IF9yZWYzLnN0YXJ0WSxcbiAgICAgICAgICBlbmRYID0gX3JlZjMuZW5kWCxcbiAgICAgICAgICBlbmRZID0gX3JlZjMuZW5kWSxcbiAgICAgICAgICByb29tID0gX3JlZjMucm9vbTtcbiAgICAgIHZhciBjdXJyZW50R3JpZCA9IHRoaXMucGFnZS5ncmlkO1xuICAgICAgdmFyIHRhcmdldEdyaWQgPSB0aGlzLnRhcmdldFBhZ2UuZ3JpZDtcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oc3RhcnRYLCBzdGFydFkpO1xuXG4gICAgICBpZiAoY3VycmVudEdyaWQueSA+IHRhcmdldEdyaWQueSkge1xuICAgICAgICAvLyBsaW5lVG8gdG9wLlxuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHN0YXJ0WCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55XSArIHJvb20ueSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50R3JpZC55IDwgdGFyZ2V0R3JpZC55KSB7XG4gICAgICAgIC8vIGxpbmVUbyBib3R0b20uXG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oc3RhcnRYLCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnkgKyAxXSArIHJvb20ueSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnkgKyAxXSArIHJvb20ueSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA9PT0gdGFyZ2V0R3JpZC55ICYmIGN1cnJlbnRHcmlkLnggPiB0YXJnZXRHcmlkLngpIHtcbiAgICAgICAgLy8gbGluZVRvIGxlZnRcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnhdICsgcm9vbS54LCBzdGFydFkpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W3RhcmdldEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRHcmlkLnkgPT09IHRhcmdldEdyaWQueSAmJiBjdXJyZW50R3JpZC54IDwgdGFyZ2V0R3JpZC54KSB7XG4gICAgICAgIC8vIGxpbmVUbyByaWdodFxuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueCArIDFdICsgcm9vbS54LCBzdGFydFkpO1xuXG4gICAgICAgIGlmICh0YXJnZXRHcmlkLnggLSBjdXJyZW50R3JpZC54ID4gMSkge1xuICAgICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIGVuZFkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS55LCBlbmRZKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYLCBlbmRZKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyRW5kQXJyb3dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyRW5kQXJyb3coX3JlZjQpIHtcbiAgICAgIHZhciBlbmRYID0gX3JlZjQuZW5kWCxcbiAgICAgICAgICBlbmRZID0gX3JlZjQuZW5kWTtcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oZW5kWCwgZW5kWSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZFggLSAxNCwgZW5kWSArIDEwKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oZW5kWCAtIDE0LCBlbmRZIC0gMTApO1xuICAgICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyRnJvbURlc2NyaXB0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckZyb21EZXNjcmlwdGlvbihfcmVmNSkge1xuICAgICAgdmFyIHN0YXJ0WCA9IF9yZWY1LnN0YXJ0WCxcbiAgICAgICAgICBzdGFydFkgPSBfcmVmNS5zdGFydFk7XG5cbiAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24uZnJvbS5kZXNjcmlwdGlvbikge1xuICAgICAgICB2YXIgZGVzY3JpcHRpb25Gb250U2l6ZSA9IHRoaXMudHJhbnNpdGlvbi5mcm9tLmRlc2NyaXB0aW9uLmZvbnRTaXplIHx8IDEyO1xuICAgICAgICB2YXIgdGV4dHMgPSB0aGlzLnRyYW5zaXRpb24uZnJvbS5kZXNjcmlwdGlvbi50ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjNjY2JztcbiAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBcIlwiLmNvbmNhdChkZXNjcmlwdGlvbkZvbnRTaXplLCBcInB4IHNhbi1zZXJpZlwiKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHRleHQgPSB0ZXh0c1tpXTtcbiAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgc3RhcnRYICsgZGVzY3JpcHRpb25Gb250U2l6ZSwgc3RhcnRZIC0gdGV4dHMubGVuZ3RoICogZGVzY3JpcHRpb25Gb250U2l6ZSArIGRlc2NyaXB0aW9uRm9udFNpemUgKiBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJUb0Rlc2NyaXB0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclRvRGVzY3JpcHRpb24oX3JlZjYpIHtcbiAgICAgIHZhciBlbmRYID0gX3JlZjYuZW5kWCxcbiAgICAgICAgICBlbmRZID0gX3JlZjYuZW5kWTtcblxuICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbi50by5kZXNjcmlwdGlvbikge1xuICAgICAgICB2YXIgZGVzY3JpcHRpb25Gb250U2l6ZSA9IHRoaXMudHJhbnNpdGlvbi50by5kZXNjcmlwdGlvbi5mb250U2l6ZSB8fCAxMjtcbiAgICAgICAgdmFyIHRleHRzID0gdGhpcy50cmFuc2l0aW9uLnRvLmRlc2NyaXB0aW9uLnRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyM2NjYnO1xuICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gJ3JpZ2h0JztcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBcIlwiLmNvbmNhdChkZXNjcmlwdGlvbkZvbnRTaXplLCBcInB4IHNhbi1zZXJpZlwiKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHRleHQgPSB0ZXh0c1tpXTtcbiAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgZW5kWCAtIGRlc2NyaXB0aW9uRm9udFNpemUgKiAyLCBlbmRZIC0gdGV4dHMubGVuZ3RoICogZGVzY3JpcHRpb25Gb250U2l6ZSArIGRlc2NyaXB0aW9uRm9udFNpemUgKiBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGZyb20gPSB0aGlzLnRyYW5zaXRpb24uZnJvbSB8fCB7XG4gICAgICAgIHg6IHRoaXMucGFnZS53aWR0aCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgcmFkaXVzOiAxMlxuICAgICAgfTtcbiAgICAgIHZhciB0b09mZnNldCA9IHRoaXMudHJhbnNpdGlvbi50by5vZmZzZXQgfHwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9O1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiB0aGlzLnRyYW5zaXRpb24uY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC40OCknLFxuICAgICAgICByYWRpdXM6IGZyb20ucmFkaXVzLFxuICAgICAgICByb29tOiB0aGlzLnRyYW5zaXRpb24ucm9vbSB8fCB7XG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICB5OiAwXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0WDogdGhpcy5wYWdlLnggKyBmcm9tLngsXG4gICAgICAgIHN0YXJ0WTogdGhpcy5wYWdlLnkgKyBmcm9tLnksXG4gICAgICAgIGVuZFg6IHRoaXMudGFyZ2V0UGFnZS54ICsgdG9PZmZzZXQueCxcbiAgICAgICAgZW5kWTogdGhpcy50YXJnZXRQYWdlLnkgKyB0b09mZnNldC55XG4gICAgICB9O1xuICAgICAgdGhpcy5yZW5kZXJGcm9tRGVzY3JpcHRpb24ob3B0aW9ucyk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBvcHRpb25zLmNvbG9yO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IG9wdGlvbnMuY29sb3I7XG4gICAgICB0aGlzLnJlbmRlclN0YXJ0UG9pbnQob3B0aW9ucyk7XG4gICAgICB0aGlzLnJlbmRlclRyYW5zaXRpb25MaW5lKG9wdGlvbnMpO1xuICAgICAgdGhpcy5yZW5kZXJFbmRBcnJvdyhvcHRpb25zKTtcbiAgICAgIHRoaXMucmVuZGVyVG9EZXNjcmlwdGlvbihvcHRpb25zKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVHJhbnNpdGlvbjtcbn0oKTtcblxuZXhwb3J0cy5UcmFuc2l0aW9uID0gVHJhbnNpdGlvbjsiLCJpbXBvcnQgeyBzdGFydFN0b3J5LCBCb2FyZCwgQm9hcmRDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vbGliJztcbmltcG9ydCB7IHN0b3J5IH0gZnJvbSAnLi9zdG9yeSc7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhgU3RhcnQgYXBwIGF0ICR7KG5ldyBEYXRlKCkpLnRvU3RyaW5nKCl9LmApO1xuXG4gIHN0YXJ0U3Rvcnkoc3RvcnkpLnRoZW4oKGdlbmVyYXRlZFN0b3J5KSA9PiB7XG4gICAgY29uc3QgY2FudmFzRWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3Rvcnl0ZWxsZXInKTtcblxuICAgIGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKGNhbnZhc0VsZW1lbnQsIGdlbmVyYXRlZFN0b3J5LCB7XG4gICAgICBwYWRkaW5nOiB7XG4gICAgICAgIHg6IDMyMCxcbiAgICAgICAgeTogMjAwLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQm9hcmRDb250cm9sbGVyKGJvYXJkKTtcbiAgICBjb250cm9sbGVyLnNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgY29udHJvbGxlci5maXQoMTAwLCAxMDApO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2V0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb250cm9sbGVyLnBvc2l0aW9uKDAsIDApO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnN0b3J5ID0gdm9pZCAwO1xudmFyIHNjcmVlbiA9IHtcbiAgd2lkdGg6IDM3NSxcbiAgaGVpZ2h0OiA2NjcsXG4gIGltYWdlUGF0aDogbnVsbFxufTtcblxuZnVuY3Rpb24gY3JlYXRlU2NlbmUoaWQsIGdyaWRYLCBncmlkWSkge1xuICB2YXIgc2NlbmUgPSB7XG4gICAgaWQ6IGlkLFxuICAgIHNjcmVlbjogc2NyZWVuLFxuICAgIGdyaWQ6IHtcbiAgICAgIHg6IGdyaWRYLFxuICAgICAgeTogZ3JpZFlcbiAgICB9LFxuICAgIHRyYW5zaXRpb25zOiBbXVxuICB9O1xuXG4gIGlmIChncmlkWCA9PT0gMiAmJiBncmlkWSA9PT0gMikge1xuICAgIHZhciB0cmFuc2l0aW9ucyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNTsgaisrKSB7XG4gICAgICAgIHZhciBfaWQgPSBcInNjZW5lLVwiLmNvbmNhdChpLCBcIi1cIikuY29uY2F0KGopO1xuXG4gICAgICAgIHZhciB0cmFuc2l0aW9uID0ge1xuICAgICAgICAgIGZyb206IHtcbiAgICAgICAgICAgIHg6IHNjcmVlbi53aWR0aCAvIDIgKyAoaSAtIDIpICogNjAgLSAoaiAlIDIgPT09IDAgPyAzMCA6IDApLFxuICAgICAgICAgICAgeTogc2NyZWVuLmhlaWdodCAvIDIgKyAoaiAtIDIpICogNjAgLSAoaSAlIDIgPT09IDAgPyAzMCA6IDApXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0bzoge1xuICAgICAgICAgICAgaWQ6IF9pZCxcbiAgICAgICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICB5OiAzMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaSA9PT0gMCB8fCBpID09PSA0KSB7XG4gICAgICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uY29sb3IgPSAncmVkJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHtcbiAgICAgICAgICAgICAgeDogLTUwLFxuICAgICAgICAgICAgICB5OiAtNTBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSAxKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ2dyZWVuJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHtcbiAgICAgICAgICAgICAgeDogLTMwLFxuICAgICAgICAgICAgICB5OiAtMzBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSAyKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ2JsdWUnO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5yb29tID0ge1xuICAgICAgICAgICAgICB4OiAtMTAsXG4gICAgICAgICAgICAgIHk6IC0xMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGogPT09IDMpIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uY29sb3IgPSAneWVsbG93JztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHtcbiAgICAgICAgICAgICAgeDogMTAsXG4gICAgICAgICAgICAgIHk6IDEwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gNCkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdwdXJwbGUnO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5yb29tID0ge1xuICAgICAgICAgICAgICB4OiAzMCxcbiAgICAgICAgICAgICAgeTogMzBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgPT09IDEgfHwgaSA9PT0gMykge1xuICAgICAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7XG4gICAgICAgICAgICAgIHg6IC01MCxcbiAgICAgICAgICAgICAgeTogNTBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSAxKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ2dyZWVuJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHtcbiAgICAgICAgICAgICAgeDogLTMwLFxuICAgICAgICAgICAgICB5OiAzMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGogPT09IDIpIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uY29sb3IgPSAnYmx1ZSc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7XG4gICAgICAgICAgICAgIHg6IC0xMCxcbiAgICAgICAgICAgICAgeTogMTBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSAzKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7XG4gICAgICAgICAgICAgIHg6IDEwLFxuICAgICAgICAgICAgICB5OiAtMTBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSA0KSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ3B1cnBsZSc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7XG4gICAgICAgICAgICAgIHg6IDMwLFxuICAgICAgICAgICAgICB5OiAtMzBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5yb29tID0ge1xuICAgICAgICAgICAgICB4OiA0MCxcbiAgICAgICAgICAgICAgeTogNDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSAxKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ2dyZWVuJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHtcbiAgICAgICAgICAgICAgeDogMjAsXG4gICAgICAgICAgICAgIHk6IDIwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gMikge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdibGFjayc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7XG4gICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSAzKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7XG4gICAgICAgICAgICAgIHg6IC0yMCxcbiAgICAgICAgICAgICAgeTogLTIwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gNCkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdwdXJwbGUnO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5yb29tID0ge1xuICAgICAgICAgICAgICB4OiAtNDAsXG4gICAgICAgICAgICAgIHk6IC00MFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0cmFuc2l0aW9ucy5wdXNoKHRyYW5zaXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNjZW5lLnRyYW5zaXRpb25zID0gdHJhbnNpdGlvbnM7XG4gIH1cblxuICByZXR1cm4gc2NlbmU7XG59XG5cbnZhciBzdG9yeSA9IFtdO1xuZXhwb3J0cy5zdG9yeSA9IHN0b3J5O1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICBmb3IgKHZhciBqID0gMDsgaiA8IDU7IGorKykge1xuICAgIHZhciBpZCA9IFwic2NlbmUtXCIuY29uY2F0KGksIFwiLVwiKS5jb25jYXQoaik7XG4gICAgdmFyIHNjZW5lID0gY3JlYXRlU2NlbmUoaWQsIGksIGopO1xuICAgIHN0b3J5LnB1c2goc2NlbmUpO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==