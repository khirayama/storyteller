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
/******/ 	return __webpack_require__(__webpack_require__.s = "./twitter/index.js");
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

/***/ "./twitter/index.js":
/*!**************************!*\
  !*** ./twitter/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lib = __webpack_require__(/*! ../../lib */ "../lib/index.js");

var _story = __webpack_require__(/*! ./story */ "./twitter/story.js");

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

/***/ "./twitter/story.js":
/*!**************************!*\
  !*** ./twitter/story.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.story = void 0;
var transitionColor = '#1da1f2';
var home = {
  id: '/home',
  title: {
    text: 'Home Screen'
  },
  description: {
    fontSize: 14,
    text: "url: /\nDisplay timeline"
  },
  grid: {
    x: 0,
    y: 0
  },
  screen: {
    width: 300,
    imagePath: './images/home.png'
  },
  transitions: [{
    color: transitionColor,
    to: {
      description: {
        text: 'transition rate: 5%(Example)'
      },
      id: '/posts/show',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      description: {
        text: 'transition rate: 5%(Example)'
      },
      x: 244,
      y: 247,
      radius: 8
    }
  }, {
    color: transitionColor,
    room: {
      x: 60,
      y: 60
    },
    to: {
      id: '/posts/new',
      offset: {
        x: 0,
        y: 60
      }
    },
    from: {
      x: 271,
      y: 517,
      radius: 8
    }
  }, {
    color: transitionColor,
    room: {
      x: 30,
      y: -30
    },
    to: {
      id: '/search',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 128,
      y: 63,
      radius: 8
    }
  }, {
    color: transitionColor,
    to: {
      id: '/notifications/index',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 204,
      y: 63,
      radius: 8
    }
  }, {
    color: transitionColor,
    room: {
      x: -30,
      y: 90
    },
    to: {
      id: '/menu',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 21,
      y: 31,
      radius: 8
    }
  }]
};
var postsShow = {
  id: '/posts/show',
  grid: {
    x: 1,
    y: 0
  },
  screen: {
    width: 300,
    imagePath: './images/posts_show.png'
  },
  transitions: [{
    color: transitionColor,
    room: {
      x: 120,
      y: 0
    },
    to: {
      id: '/posts/new',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 271,
      y: 517,
      radius: 8
    }
  }]
};
var postsNew = {
  id: '/posts/new',
  grid: {
    x: 1,
    y: 1
  },
  screen: {
    width: 300,
    imagePath: './images/posts_new.png'
  },
  transitions: [{
    color: transitionColor,
    room: {
      x: 0,
      y: 30
    },
    to: {
      id: '/home',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 271,
      y: 20,
      radius: 8
    }
  }]
};
var search = {
  id: '/search',
  grid: {
    x: 1,
    y: 2
  },
  screen: {
    width: 300,
    imagePath: './images/search.png'
  },
  transitions: []
};
var notificationsIndex = {
  id: '/notifications/index',
  grid: {
    x: 1,
    y: 3
  },
  screen: {
    width: 300,
    imagePath: './images/notifications_index.png'
  },
  transitions: []
};
var menu = {
  id: '/menu',
  grid: {
    x: 1,
    y: 4
  },
  screen: {
    width: 300,
    imagePath: './images/menu.png'
  },
  transitions: [{
    color: transitionColor,
    to: {
      id: '/profile',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
      x: 21,
      y: 31,
      radius: 8
    }
  }]
};
var profile = {
  id: '/profile',
  grid: {
    x: 2,
    y: 0
  },
  screen: {
    width: 300,
    imagePath: './images/profile.png'
  },
  transitions: []
};
var story = [home, postsShow, postsNew, search, notificationsIndex, menu, profile];
exports.story = story;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2xpYi9ib2FyZC1jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uLi9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL2xpYi91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbGliL3ZpZXdzL2JvYXJkLmpzIiwid2VicGFjazovLy8uLi9saWIvdmlld3MvcGFnZS5qcyIsIndlYnBhY2s6Ly8vLi4vbGliL3ZpZXdzL3RyYW5zaXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vdHdpdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90d2l0dGVyL3N0b3J5LmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiQm9hcmRDb250cm9sbGVyIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJpIiwibGVuZ3RoIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImtleSIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsInByb3RvdHlwZSIsImJvYXJkIiwidHJhbnMiLCJlbmFibGVkIiwieCIsInkiLCJwb3MiLCJzY2FsZSIsInNldEV2ZW50TGlzdGVuZXIiLCJ6b29tIiwidHJhbnNsYXRlIiwicG9zaXRpb24iLCJzaXplIiwid2lkdGgiLCJoZWlnaHQiLCJnZXRDZW50ZXIiLCJydWxlcnMiLCJjZW50ZXIiLCJnZXRTaXplIiwiZml0IiwicGFkZGluZ1giLCJwYWRkaW5nWSIsImVsIiwiX3RoaXMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1pblNjYWxlIiwibWF4U2NhbGUiLCJkZWx0YVkiLCJjbGllbnRYIiwiY2xpZW50WSIsImRpZmYiLCJnZXQiLCJfdXRpbHMiLCJzdGFydFN0b3J5IiwiX2JvYXJkIiwiQm9hcmQiLCJfYm9hcmRDb250cm9sbGVyIiwicmVxdWlyZSIsInN0b3J5IiwiX3N0b3J5IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInNjZW5lIiwicmVzb2x2ZSIsInNjcmVlbiIsImltYWdlUGF0aCIsImltZyIsIkltYWdlIiwic3JjIiwiX3NjYWxlIiwidGhlbiIsIl9wYWdlIiwiX3RyYW5zaXRpb24iLCJvcHRpb25zIiwiY29udGV4dCIsImdldENvbnRleHQiLCJfZ2VuZXJhdGVSdWxlcnMiLCJwYWdlcyIsIl9jbGVhciIsIl9yZW5kZXIiLCJfZmluZFBhZ2UiLCJwYWdlSWQiLCJmaWx0ZXIiLCJwYWdlIiwiaWQiLCJwYWRkaW5nIiwic29ydCIsInNjZW5lMSIsInNjZW5lMiIsImdyaWQiLCJjdXJyZW50UnVsZXJYIiwibmV4dFJ1bGVyWCIsIm5leHROZXdSdWxlclgiLCJfaSIsIl9zY2VuZSIsImN1cnJlbnRSdWxlclkiLCJuZXh0UnVsZXJZIiwibmV4dE5ld1J1bGVyWSIsImNsZWFyUmVjdCIsIl9yZW5kZXJSdWxlcnMiLCJjb2xvciIsInJ1bGVyQ29sb3IiLCJiZWdpblBhdGgiLCJzdHJva2VTdHlsZSIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsIl9pMiIsIl9yZW5kZXJQYWdlcyIsImZvckVhY2giLCJQYWdlIiwicHVzaCIsIl9yZW5kZXJUcmFuc2l0aW9ucyIsIl90aGlzMiIsInRyYW5zaXRpb25zIiwidHJhbnNpdGlvbiIsInRhcmdldFBhZ2UiLCJ0byIsIlRyYW5zaXRpb24iLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicmVuZGVyIiwidGl0bGVGb250U2l6ZSIsImZvbnRTaXplIiwiZmlsbFN0eWxlIiwidGV4dEFsaWduIiwiZm9udCIsImNvbmNhdCIsImZpbGxUZXh0IiwidGV4dCIsImRlc2NyaXB0aW9uRm9udFNpemUiLCJ0ZXh0cyIsInNwbGl0Iiwic2hhZG93Q29sb3IiLCJzaGFkb3dCbHVyIiwic2hhZG93T2Zmc2V0WCIsInNoYWRvd09mZnNldFkiLCJkcmF3SW1hZ2UiLCJmaWxsUmVjdCIsIl9yZWYiLCJyZW5kZXJTdGFydFBvaW50IiwiX3JlZjIiLCJzdGFydFgiLCJzdGFydFkiLCJyYWRpdXMiLCJhcmMiLCJNYXRoIiwiUEkiLCJmaWxsIiwicmVuZGVyVHJhbnNpdGlvbkxpbmUiLCJfcmVmMyIsImVuZFgiLCJlbmRZIiwicm9vbSIsImN1cnJlbnRHcmlkIiwidGFyZ2V0R3JpZCIsInJlbmRlckVuZEFycm93IiwiX3JlZjQiLCJjbG9zZVBhdGgiLCJyZW5kZXJGcm9tRGVzY3JpcHRpb24iLCJfcmVmNSIsImZyb20iLCJyZW5kZXJUb0Rlc2NyaXB0aW9uIiwiX3JlZjYiLCJ0b09mZnNldCIsIm9mZnNldCIsImNvbnNvbGUiLCJsb2ciLCJEYXRlIiwidG9TdHJpbmciLCJnZW5lcmF0ZWRTdG9yeSIsImNhbnZhc0VsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250cm9sbGVyIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwidHJhbnNpdGlvbkNvbG9yIiwiaG9tZSIsInBvc3RzU2hvdyIsInBvc3RzTmV3Iiwic2VhcmNoIiwibm90aWZpY2F0aW9uc0luZGV4IiwibWVudSIsInByb2ZpbGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIs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LEdBRm1CO0FBTXpCOEMsVUFBUTtBQUNOdEMsV0FBTyxHQUREO0FBRU51QyxlQUFXO0FBRkwsR0FOaUI7QUFVekJpRCxlQUFhO0FBVlksQ0FBM0I7QUFhQSxJQUFNcUUsT0FBTztBQUNYbkcsTUFBSSxPQURPO0FBRVhLLFFBQU07QUFDSnhFLE9BQUcsQ0FEQztBQUVKQyxPQUFHO0FBRkMsR0FGSztBQU1YOEMsVUFBUTtBQUNOdEMsV0FBTyxHQUREO0FBRU51QyxlQUFXO0FBRkwsR0FORztBQVVYaUQsZUFBYSxDQUFDO0FBQ1pkLFdBQU82RSxlQURLO0FBRVo1RCxRQUFJO0FBQ0ZqQyxVQUFJLFVBREY7QUFFRmlGLGNBQVE7QUFDTnBKLFdBQUcsQ0FERztBQUVOQyxXQUFHO0FBRkc7QUFGTixLQUZRO0FBU1orSSxVQUFNO0FBQ0poSixTQUFHLEVBREM7QUFFSkMsU0FBRyxFQUZDO0FBR0o4SCxjQUFRO0FBSEo7QUFUTSxHQUFEO0FBVkYsQ0FBYjtBQTJCQSxJQUFNd0MsVUFBVTtBQUNkcEcsTUFBSSxVQURVO0FBRWRLLFFBQU07QUFDSnhFLE9BQUcsQ0FEQztBQUVKQyxPQUFHO0FBRkMsR0FGUTtBQU1kOEMsVUFBUTtBQUNOdEMsV0FBTyxHQUREO0FBRU51QyxlQUFXO0FBRkwsR0FOTTtBQVVkaUQsZUFBYTtBQVZDLENBQWhCO0FBYU8sSUFBTTVELFFBQVEsQ0FBQzRILElBQUQsRUFBT0MsU0FBUCxFQUFrQkMsUUFBbEIsRUFBNEJDLE1BQTVCLEVBQW9DQyxrQkFBcEMsRUFBd0RDLElBQXhELEVBQThEQyxPQUE5RCxDQUFkIiwiZmlsZSI6InR3aXR0ZXIvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdHdpdHRlci9pbmRleC5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Cb2FyZENvbnRyb2xsZXIgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxudmFyIEJvYXJkQ29udHJvbGxlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJvYXJkQ29udHJvbGxlcihib2FyZCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb2FyZENvbnRyb2xsZXIpO1xuXG4gICAgdGhpcy50cmFucyA9IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMucG9zID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICB0aGlzLnNldEV2ZW50TGlzdGVuZXIoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb2FyZENvbnRyb2xsZXIsIFt7XG4gICAga2V5OiBcInpvb21cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gem9vbShzY2FsZSkge1xuICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgdGhpcy5ib2FyZC56b29tKHRoaXMuc2NhbGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0cmFuc2xhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHgsIHkpIHtcbiAgICAgIHRoaXMucG9zLnggKz0geDtcbiAgICAgIHRoaXMucG9zLnkgKz0geTtcbiAgICAgIHRoaXMuYm9hcmQudHJhbnNsYXRlKHgsIHkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwb3NpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3NpdGlvbih4LCB5KSB7XG4gICAgICB0aGlzLnRyYW5zbGF0ZSgtMSAqIHRoaXMucG9zLngsIC0xICogdGhpcy5wb3MueSk7XG4gICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHRoaXMuYm9hcmQuc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0Q2VudGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENlbnRlcigpIHtcbiAgICAgIHZhciBydWxlcnMgPSB0aGlzLmJvYXJkLnJ1bGVycztcbiAgICAgIHZhciBjZW50ZXIgPSB7XG4gICAgICAgIHg6IChydWxlcnMueFswXSArIHJ1bGVycy54W3J1bGVycy54Lmxlbmd0aCAtIDFdKSAvIDIsXG4gICAgICAgIHk6IChydWxlcnMueVswXSArIHJ1bGVycy55W3J1bGVycy55Lmxlbmd0aCAtIDFdKSAvIDJcbiAgICAgIH07XG4gICAgICByZXR1cm4gY2VudGVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRTaXplXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgICB2YXIgcnVsZXJzID0gdGhpcy5ib2FyZC5ydWxlcnM7XG4gICAgICB2YXIgc2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IHJ1bGVycy54W3J1bGVycy54Lmxlbmd0aCAtIDFdLFxuICAgICAgICBoZWlnaHQ6IHJ1bGVycy55W3J1bGVycy55Lmxlbmd0aCAtIDFdXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZpdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaXQocGFkZGluZ1gsIHBhZGRpbmdZKSB7XG4gICAgICB2YXIgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xuICAgICAgdmFyIHdpZHRoID0gdGhpcy5ib2FyZC5lbC53aWR0aCAtIHBhZGRpbmdYICogMjtcbiAgICAgIHZhciBzY2FsZSA9IHdpZHRoIC8gc2l6ZS53aWR0aDtcbiAgICAgIHRoaXMucG9zaXRpb24ocGFkZGluZ1gsIHBhZGRpbmdZKTtcbiAgICAgIHRoaXMuem9vbShzY2FsZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldEV2ZW50TGlzdGVuZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIG1pblNjYWxlID0gMC4wNTtcbiAgICAgICAgdmFyIG1heFNjYWxlID0gMTA7XG5cbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWSA+IDApIHtcbiAgICAgICAgICBfdGhpcy5zY2FsZSAqPSAwLjk1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLnNjYWxlICo9IDEuMDU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3RoaXMuc2NhbGUgPCBtaW5TY2FsZSkge1xuICAgICAgICAgIF90aGlzLnNjYWxlID0gbWluU2NhbGU7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4U2NhbGUgPCBfdGhpcy5zY2FsZSkge1xuICAgICAgICAgIF90aGlzLnNjYWxlID0gbWF4U2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy5ib2FyZC56b29tKF90aGlzLnNjYWxlKTtcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBfdGhpcy50cmFucy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMudHJhbnMueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIF90aGlzLnRyYW5zLnkgPSBldmVudC5jbGllbnRZO1xuICAgICAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChfdGhpcy50cmFucy5lbmFibGVkKSB7XG4gICAgICAgICAgdmFyIGRpZmYgPSB7XG4gICAgICAgICAgICB4OiBldmVudC5jbGllbnRYIC0gX3RoaXMudHJhbnMueCxcbiAgICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgLSBfdGhpcy50cmFucy55XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIF90aGlzLnRyYW5zbGF0ZShkaWZmLngsIGRpZmYueSk7XG5cbiAgICAgICAgICBfdGhpcy50cmFucy54ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgICBfdGhpcy50cmFucy55ID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMudHJhbnMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvYXJkQ29udHJvbGxlcjtcbn0oKTtcblxuZXhwb3J0cy5Cb2FyZENvbnRyb2xsZXIgPSBCb2FyZENvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdGFydFN0b3J5XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF91dGlscy5zdGFydFN0b3J5O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkJvYXJkXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9ib2FyZC5Cb2FyZDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJCb2FyZENvbnRyb2xsZXJcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2JvYXJkQ29udHJvbGxlci5Cb2FyZENvbnRyb2xsZXI7XG4gIH1cbn0pO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbnZhciBfYm9hcmQgPSByZXF1aXJlKFwiLi92aWV3cy9ib2FyZFwiKTtcblxudmFyIF9ib2FyZENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi9ib2FyZC1jb250cm9sbGVyXCIpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5zdGFydFN0b3J5ID0gc3RhcnRTdG9yeTtcblxuZnVuY3Rpb24gc3RhcnRTdG9yeShzdG9yeSkge1xuICB2YXIgX3N0b3J5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdG9yeSkpO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChfc3RvcnkubWFwKGZ1bmN0aW9uIChzY2VuZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgaWYgKHNjZW5lLnNjcmVlbi5pbWFnZVBhdGgpIHtcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gc2NlbmUuc2NyZWVuLmltYWdlUGF0aDtcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBzY2VuZS5zY3JlZW4uaW1nID0gaW1nO1xuXG4gICAgICAgICAgaWYgKHNjZW5lLnNjcmVlbi53aWR0aCAmJiAhc2NlbmUuc2NyZWVuLmhlaWdodCkge1xuICAgICAgICAgICAgdmFyIHNjYWxlID0gaW1nLndpZHRoIC8gc2NlbmUuc2NyZWVuLndpZHRoO1xuICAgICAgICAgICAgc2NlbmUuc2NyZWVuLmhlaWdodCA9IGltZy5oZWlnaHQgLyBzY2FsZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXNjZW5lLnNjcmVlbi53aWR0aCAmJiBzY2VuZS5zY3JlZW4uaGVpZ2h0KSB7XG4gICAgICAgICAgICB2YXIgX3NjYWxlID0gaW1nLmhlaWdodCAvIHNjZW5lLnNjcmVlbi5oZWlnaHQ7XG5cbiAgICAgICAgICAgIHNjZW5lLnNjcmVlbi53aWR0aCA9IGltZy53aWR0aCAvIF9zY2FsZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9zdG9yeTtcbiAgfSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkJvYXJkID0gdm9pZCAwO1xuXG52YXIgX3BhZ2UgPSByZXF1aXJlKFwiLi9wYWdlXCIpO1xuXG52YXIgX3RyYW5zaXRpb24gPSByZXF1aXJlKFwiLi90cmFuc2l0aW9uXCIpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbi8qXG4gKiBCb2FyZFxuICogLSBjb25zdHJ1Y3RvclxuICogICAtIG9wdGlvbnNcbiAqICAgICAtIHJ1bGVyQ29sb3JcbiAqICAgICAtIHBhZGRpbmdcbiAqICAgICAgIC0geFxuICogICAgICAgLSB5XG4gKiAtIHNpemVcbiAqIC0gem9vbVxuICogLSB0cmFuc2xhdGVcbiAqIC0gX2ZpbmRQYWdlXG4gKiAtIF9nZW5lcmF0ZVJ1bGVyc1xuICogLSBfY2xlYXJcbiAqIC0gX3JlbmRlclJ1bGVyc1xuICogLSBfcmVuZGVyUGFnZXNcbiAqIC0gX3JlbmRlclRyYW5zaXRpb25zXG4gKi9cbnZhciBCb2FyZCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJvYXJkKGVsLCBzdG9yeSwgb3B0aW9ucykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb2FyZCk7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuc3RvcnkgPSBzdG9yeTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucnVsZXJzID0gdGhpcy5fZ2VuZXJhdGVSdWxlcnModGhpcy5zdG9yeSk7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5wYWdlcyA9IFtdO1xuXG4gICAgdGhpcy5fY2xlYXIoKTtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEJvYXJkLCBbe1xuICAgIGtleTogXCJzaXplXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgdGhpcy5fY2xlYXIoKTtcblxuICAgICAgdGhpcy5lbC53aWR0aCA9IHdpZHRoO1xuICAgICAgdGhpcy5lbC5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ6b29tXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHpvb20oc2NhbGUpIHtcbiAgICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYW5zbGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmFuc2xhdGUoeCwgeSkge1xuICAgICAgdGhpcy5fY2xlYXIoKTtcblxuICAgICAgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9maW5kUGFnZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZmluZFBhZ2UocGFnZUlkKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYWdlcy5maWx0ZXIoZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHBhZ2UuaWQgPT09IHBhZ2VJZDtcbiAgICAgIH0pWzBdIHx8IG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9nZW5lcmF0ZVJ1bGVyc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2VuZXJhdGVSdWxlcnMoc3RvcnkpIHtcbiAgICAgIHZhciBydWxlcnMgPSB7XG4gICAgICAgIHg6IFtdLFxuICAgICAgICB5OiBbXVxuICAgICAgfTtcbiAgICAgIHZhciBwYWRkaW5nID0gdGhpcy5vcHRpb25zLnBhZGRpbmc7IC8vIEdlbmVyYXRlIHggcnVsZXJzXG5cbiAgICAgIHN0b3J5LnNvcnQoZnVuY3Rpb24gKHNjZW5lMSwgc2NlbmUyKSB7XG4gICAgICAgIHJldHVybiBzY2VuZTEuZ3JpZC54IC0gc2NlbmUyLmdyaWQueDtcbiAgICAgIH0pO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzY2VuZSA9IHN0b3J5W2ldO1xuICAgICAgICB2YXIgeCA9IHNjZW5lLmdyaWQueDtcbiAgICAgICAgdmFyIGN1cnJlbnRSdWxlclggPSBydWxlcnMueFt4XSB8fCBudWxsO1xuICAgICAgICB2YXIgbmV4dFJ1bGVyWCA9IHJ1bGVycy54W3ggKyAxXSB8fCBudWxsO1xuXG4gICAgICAgIGlmIChjdXJyZW50UnVsZXJYID09PSBudWxsKSB7XG4gICAgICAgICAgcnVsZXJzLnhbeF0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5leHROZXdSdWxlclggPSBydWxlcnMueFt4XSArIHNjZW5lLnNjcmVlbi53aWR0aCArIHBhZGRpbmcueDtcblxuICAgICAgICBpZiAobmV4dFJ1bGVyWCA9PT0gbnVsbCkge1xuICAgICAgICAgIHJ1bGVycy54W3ggKyAxXSA9IG5leHROZXdSdWxlclg7XG4gICAgICAgIH0gZWxzZSBpZiAobmV4dFJ1bGVyWCA8IG5leHROZXdSdWxlclgpIHtcbiAgICAgICAgICBydWxlcnMueFt4ICsgMV0gPSBuZXh0TmV3UnVsZXJYO1xuICAgICAgICB9XG4gICAgICB9IC8vIEdlbmVyYXRlIHkgcnVsZXJzXG5cblxuICAgICAgc3Rvcnkuc29ydChmdW5jdGlvbiAoc2NlbmUxLCBzY2VuZTIpIHtcbiAgICAgICAgcmV0dXJuIHNjZW5lMS5ncmlkLnkgLSBzY2VuZTIuZ3JpZC55O1xuICAgICAgfSk7XG5cbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBzdG9yeS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIF9zY2VuZSA9IHN0b3J5W19pXTtcbiAgICAgICAgdmFyIHkgPSBfc2NlbmUuZ3JpZC55O1xuICAgICAgICB2YXIgY3VycmVudFJ1bGVyWSA9IHJ1bGVycy55W3ldIHx8IG51bGw7XG4gICAgICAgIHZhciBuZXh0UnVsZXJZID0gcnVsZXJzLnlbeSArIDFdIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRSdWxlclkgPT09IG51bGwpIHtcbiAgICAgICAgICBydWxlcnMueVt5XSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV4dE5ld1J1bGVyWSA9IHJ1bGVycy55W3ldICsgX3NjZW5lLnNjcmVlbi5oZWlnaHQgKyBwYWRkaW5nLnk7XG5cbiAgICAgICAgaWYgKG5leHRSdWxlclkgPT09IG51bGwpIHtcbiAgICAgICAgICBydWxlcnMueVt5ICsgMV0gPSBuZXh0TmV3UnVsZXJZO1xuICAgICAgICB9IGVsc2UgaWYgKG5leHRSdWxlclkgPCBuZXh0TmV3UnVsZXJZKSB7XG4gICAgICAgICAgcnVsZXJzLnlbeSArIDFdID0gbmV4dE5ld1J1bGVyWTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcnVsZXJzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfY2xlYXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NsZWFyKCkge1xuICAgICAgLy8gVE9ETzogT3B0aW1pemUgY2xlYXJSZWN0IHNpemVcbiAgICAgIHRoaXMuY29udGV4dC5zY2FsZSgxIC8gdGhpcy5zY2FsZSwgMSAvIHRoaXMuc2NhbGUpO1xuICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgtMTAwMDAsIC0xMDAwMCwgMTAwMDAwLCAxMDAwMDApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfcmVuZGVyUnVsZXJzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZW5kZXJSdWxlcnMoKSB7XG4gICAgICB2YXIgY29sb3IgPSB0aGlzLm9wdGlvbnMucnVsZXJDb2xvciB8fCAncmdiYSgyMTYsIDUzLCA1MywgMC43MiknO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucnVsZXJzLngubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLnJ1bGVycy54W2ldO1xuICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgsIC0xMDAwMDApO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHgsIDEwMDAwMCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgdGhpcy5ydWxlcnMueS5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgIHZhciB5ID0gdGhpcy5ydWxlcnMueVtfaTJdO1xuICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKC0xMDAwMDAsIHkpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKDEwMDAwMCwgeSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3JlbmRlclBhZ2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZW5kZXJQYWdlcygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuc3RvcnkuZm9yRWFjaChmdW5jdGlvbiAoc2NlbmUpIHtcbiAgICAgICAgdmFyIHggPSBzY2VuZS5ncmlkLng7XG4gICAgICAgIHZhciB5ID0gc2NlbmUuZ3JpZC55O1xuICAgICAgICB2YXIgcGFnZSA9IG5ldyBfcGFnZS5QYWdlKF90aGlzLmNvbnRleHQsIHNjZW5lLCBfdGhpcy5ydWxlcnMpO1xuXG4gICAgICAgIF90aGlzLnBhZ2VzLnB1c2gocGFnZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3JlbmRlclRyYW5zaXRpb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZW5kZXJUcmFuc2l0aW9ucygpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB0aGlzLnBhZ2VzLmZvckVhY2goZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgcGFnZS5zY2VuZS50cmFuc2l0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgdmFyIHRhcmdldFBhZ2UgPSBfdGhpczIuX2ZpbmRQYWdlKHRyYW5zaXRpb24udG8uaWQpO1xuXG4gICAgICAgICAgbmV3IF90cmFuc2l0aW9uLlRyYW5zaXRpb24oX3RoaXMyLmNvbnRleHQsIHtcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYWdlOiB0YXJnZXRQYWdlLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgICAgICAgICAgIHJ1bGVyczogX3RoaXMyLnJ1bGVyc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfcmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZW5kZXIoKSB7XG4gICAgICB0aGlzLl9yZW5kZXJQYWdlcygpO1xuXG4gICAgICB0aGlzLl9yZW5kZXJUcmFuc2l0aW9ucygpO1xuXG4gICAgICB0aGlzLl9yZW5kZXJSdWxlcnMoKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQm9hcmQ7XG59KCk7XG5cbmV4cG9ydHMuQm9hcmQgPSBCb2FyZDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUGFnZSA9IHZvaWQgMDtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG52YXIgUGFnZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFBhZ2UoY29udGV4dCwgc2NlbmUsIHJ1bGVycykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQYWdlKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMucnVsZXJzID0gcnVsZXJzO1xuICAgIHRoaXMuaWQgPSB0aGlzLnNjZW5lLmlkO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnNjZW5lLnRpdGxlO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLnNjZW5lLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMuc2NlbmUuZ3JpZDtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLnNjZW5lLnNjcmVlbi5oZWlnaHQ7XG4gICAgdGhpcy54ID0gdGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueF0gKyAodGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueCArIDFdIC0gdGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueF0gLSB0aGlzLndpZHRoKSAvIDI7XG4gICAgdGhpcy55ID0gdGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueV0gKyAodGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueSArIDFdIC0gdGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueV0gLSB0aGlzLmhlaWdodCkgLyAyO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUGFnZSwgW3tcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBjb2xvciA9IHRoaXMuc2NlbmUuY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC4zMiknO1xuICAgICAgdmFyIHRpdGxlRm9udFNpemUgPSAodGhpcy50aXRsZSB8fCB7fSkuZm9udFNpemUgfHwgMTQ7XG5cbiAgICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzY2Nic7XG4gICAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gXCJcIi5jb25jYXQodGl0bGVGb250U2l6ZSwgXCJweCBzYW4tc2VyaWZcIik7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRpdGxlLnRleHQsIHRoaXMueCwgdGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueV0gKyB0aXRsZUZvbnRTaXplLCB0aGlzLndpZHRoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uRm9udFNpemUgPSB0aGlzLmRlc2NyaXB0aW9uLmZvbnRTaXplO1xuICAgICAgICB2YXIgdGV4dHMgPSB0aGlzLmRlc2NyaXB0aW9uLnRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyM2NjYnO1xuICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IFwiXCIuY29uY2F0KGRlc2NyaXB0aW9uRm9udFNpemUsIFwicHggc2FuLXNlcmlmXCIpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgdGV4dCA9IHRleHRzW2ldO1xuICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0LCB0aGlzLngsIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgdGl0bGVGb250U2l6ZSArIGRlc2NyaXB0aW9uRm9udFNpemUgKiAoaSArIDIpLCB0aGlzLndpZHRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQuc2hhZG93Q29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjI0KSc7XG4gICAgICB0aGlzLmNvbnRleHQuc2hhZG93Qmx1ciA9IDM7XG4gICAgICB0aGlzLmNvbnRleHQuc2hhZG93T2Zmc2V0WCA9IDA7XG4gICAgICB0aGlzLmNvbnRleHQuc2hhZG93T2Zmc2V0WSA9IDA7XG5cbiAgICAgIGlmICh0aGlzLnNjZW5lLnNjcmVlbi5pbWcpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLnNjZW5lLnNjcmVlbi5pbWcsIHRoaXMueCwgdGhpcy55LCB0aGlzLnNjZW5lLnNjcmVlbi53aWR0aCwgdGhpcy5zY2VuZS5zY3JlZW4uaGVpZ2h0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGgsIHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGV4dC5zaGFkb3dCbHVyID0gMDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUGFnZTtcbn0oKTtcblxuZXhwb3J0cy5QYWdlID0gUGFnZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuVHJhbnNpdGlvbiA9IHZvaWQgMDtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG52YXIgVHJhbnNpdGlvbiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFRyYW5zaXRpb24oY29udGV4dCwgX3JlZikge1xuICAgIHZhciBwYWdlID0gX3JlZi5wYWdlLFxuICAgICAgICB0YXJnZXRQYWdlID0gX3JlZi50YXJnZXRQYWdlLFxuICAgICAgICB0cmFuc2l0aW9uID0gX3JlZi50cmFuc2l0aW9uLFxuICAgICAgICBydWxlcnMgPSBfcmVmLnJ1bGVycztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUcmFuc2l0aW9uKTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB0aGlzLnRhcmdldFBhZ2UgPSB0YXJnZXRQYWdlO1xuICAgIHRoaXMudHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG4gICAgdGhpcy5ydWxlcnMgPSBydWxlcnM7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhUcmFuc2l0aW9uLCBbe1xuICAgIGtleTogXCJyZW5kZXJTdGFydFBvaW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclN0YXJ0UG9pbnQoX3JlZjIpIHtcbiAgICAgIHZhciBzdGFydFggPSBfcmVmMi5zdGFydFgsXG4gICAgICAgICAgc3RhcnRZID0gX3JlZjIuc3RhcnRZLFxuICAgICAgICAgIHJhZGl1cyA9IF9yZWYyLnJhZGl1cztcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5hcmMoc3RhcnRYLCBzdGFydFksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyVHJhbnNpdGlvbkxpbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyVHJhbnNpdGlvbkxpbmUoX3JlZjMpIHtcbiAgICAgIHZhciBzdGFydFggPSBfcmVmMy5zdGFydFgsXG4gICAgICAgICAgc3RhcnRZID0gX3JlZjMuc3RhcnRZLFxuICAgICAgICAgIGVuZFggPSBfcmVmMy5lbmRYLFxuICAgICAgICAgIGVuZFkgPSBfcmVmMy5lbmRZLFxuICAgICAgICAgIHJvb20gPSBfcmVmMy5yb29tO1xuICAgICAgdmFyIGN1cnJlbnRHcmlkID0gdGhpcy5wYWdlLmdyaWQ7XG4gICAgICB2YXIgdGFyZ2V0R3JpZCA9IHRoaXMudGFyZ2V0UGFnZS5ncmlkO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XG5cbiAgICAgIGlmIChjdXJyZW50R3JpZC55ID4gdGFyZ2V0R3JpZC55KSB7XG4gICAgICAgIC8vIGxpbmVUbyB0b3AuXG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oc3RhcnRYLCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRHcmlkLnkgPCB0YXJnZXRHcmlkLnkpIHtcbiAgICAgICAgLy8gbGluZVRvIGJvdHRvbS5cbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzdGFydFgsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueSArIDFdICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueSArIDFdICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50R3JpZC55ID09PSB0YXJnZXRHcmlkLnkgJiYgY3VycmVudEdyaWQueCA+IHRhcmdldEdyaWQueCkge1xuICAgICAgICAvLyBsaW5lVG8gbGVmdFxuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA9PT0gdGFyZ2V0R3JpZC55ICYmIGN1cnJlbnRHcmlkLnggPCB0YXJnZXRHcmlkLngpIHtcbiAgICAgICAgLy8gbGluZVRvIHJpZ2h0XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIHN0YXJ0WSk7XG5cbiAgICAgICAgaWYgKHRhcmdldEdyaWQueCAtIGN1cnJlbnRHcmlkLnggPiAxKSB7XG4gICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgZW5kWSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLnksIGVuZFkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZFgsIGVuZFkpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJFbmRBcnJvd1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJFbmRBcnJvdyhfcmVmNCkge1xuICAgICAgdmFyIGVuZFggPSBfcmVmNC5lbmRYLFxuICAgICAgICAgIGVuZFkgPSBfcmVmNC5lbmRZO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhlbmRYLCBlbmRZKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oZW5kWCAtIDE0LCBlbmRZICsgMTApO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYIC0gMTQsIGVuZFkgLSAxMCk7XG4gICAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJGcm9tRGVzY3JpcHRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyRnJvbURlc2NyaXB0aW9uKF9yZWY1KSB7XG4gICAgICB2YXIgc3RhcnRYID0gX3JlZjUuc3RhcnRYLFxuICAgICAgICAgIHN0YXJ0WSA9IF9yZWY1LnN0YXJ0WTtcblxuICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbi5mcm9tLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbkZvbnRTaXplID0gdGhpcy50cmFuc2l0aW9uLmZyb20uZGVzY3JpcHRpb24uZm9udFNpemUgfHwgMTI7XG4gICAgICAgIHZhciB0ZXh0cyA9IHRoaXMudHJhbnNpdGlvbi5mcm9tLmRlc2NyaXB0aW9uLnRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyM2NjYnO1xuICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IFwiXCIuY29uY2F0KGRlc2NyaXB0aW9uRm9udFNpemUsIFwicHggc2FuLXNlcmlmXCIpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgdGV4dCA9IHRleHRzW2ldO1xuICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0LCBzdGFydFggKyBkZXNjcmlwdGlvbkZvbnRTaXplLCBzdGFydFkgLSB0ZXh0cy5sZW5ndGggKiBkZXNjcmlwdGlvbkZvbnRTaXplICsgZGVzY3JpcHRpb25Gb250U2l6ZSAqIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclRvRGVzY3JpcHRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyVG9EZXNjcmlwdGlvbihfcmVmNikge1xuICAgICAgdmFyIGVuZFggPSBfcmVmNi5lbmRYLFxuICAgICAgICAgIGVuZFkgPSBfcmVmNi5lbmRZO1xuXG4gICAgICBpZiAodGhpcy50cmFuc2l0aW9uLnRvLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbkZvbnRTaXplID0gdGhpcy50cmFuc2l0aW9uLnRvLmRlc2NyaXB0aW9uLmZvbnRTaXplIHx8IDEyO1xuICAgICAgICB2YXIgdGV4dHMgPSB0aGlzLnRyYW5zaXRpb24udG8uZGVzY3JpcHRpb24udGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzY2Nic7XG4gICAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSAncmlnaHQnO1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IFwiXCIuY29uY2F0KGRlc2NyaXB0aW9uRm9udFNpemUsIFwicHggc2FuLXNlcmlmXCIpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgdGV4dCA9IHRleHRzW2ldO1xuICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0LCBlbmRYIC0gZGVzY3JpcHRpb25Gb250U2l6ZSAqIDIsIGVuZFkgLSB0ZXh0cy5sZW5ndGggKiBkZXNjcmlwdGlvbkZvbnRTaXplICsgZGVzY3JpcHRpb25Gb250U2l6ZSAqIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgZnJvbSA9IHRoaXMudHJhbnNpdGlvbi5mcm9tIHx8IHtcbiAgICAgICAgeDogdGhpcy5wYWdlLndpZHRoLFxuICAgICAgICB5OiAwLFxuICAgICAgICByYWRpdXM6IDEyXG4gICAgICB9O1xuICAgICAgdmFyIHRvT2Zmc2V0ID0gdGhpcy50cmFuc2l0aW9uLnRvLm9mZnNldCB8fCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgY29sb3I6IHRoaXMudHJhbnNpdGlvbi5jb2xvciB8fCAncmdiYSgwLCAwLCAwLCAwLjQ4KScsXG4gICAgICAgIHJhZGl1czogZnJvbS5yYWRpdXMsXG4gICAgICAgIHJvb206IHRoaXMudHJhbnNpdGlvbi5yb29tIHx8IHtcbiAgICAgICAgICB4OiAwLFxuICAgICAgICAgIHk6IDBcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnRYOiB0aGlzLnBhZ2UueCArIGZyb20ueCxcbiAgICAgICAgc3RhcnRZOiB0aGlzLnBhZ2UueSArIGZyb20ueSxcbiAgICAgICAgZW5kWDogdGhpcy50YXJnZXRQYWdlLnggKyB0b09mZnNldC54LFxuICAgICAgICBlbmRZOiB0aGlzLnRhcmdldFBhZ2UueSArIHRvT2Zmc2V0LnlcbiAgICAgIH07XG4gICAgICB0aGlzLnJlbmRlckZyb21EZXNjcmlwdGlvbihvcHRpb25zKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IG9wdGlvbnMuY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gb3B0aW9ucy5jb2xvcjtcbiAgICAgIHRoaXMucmVuZGVyU3RhcnRQb2ludChvcHRpb25zKTtcbiAgICAgIHRoaXMucmVuZGVyVHJhbnNpdGlvbkxpbmUob3B0aW9ucyk7XG4gICAgICB0aGlzLnJlbmRlckVuZEFycm93KG9wdGlvbnMpO1xuICAgICAgdGhpcy5yZW5kZXJUb0Rlc2NyaXB0aW9uKG9wdGlvbnMpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBUcmFuc2l0aW9uO1xufSgpO1xuXG5leHBvcnRzLlRyYW5zaXRpb24gPSBUcmFuc2l0aW9uOyIsImltcG9ydCB7IHN0YXJ0U3RvcnksIEJvYXJkLCBCb2FyZENvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9saWInO1xuaW1wb3J0IHsgc3RvcnkgfSBmcm9tICcuL3N0b3J5Jztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBTdGFydCBhcHAgYXQgJHsobmV3IERhdGUoKSkudG9TdHJpbmcoKX0uYCk7XG5cbiAgc3RhcnRTdG9yeShzdG9yeSkudGhlbigoZ2VuZXJhdGVkU3RvcnkpID0+IHtcbiAgICBjb25zdCBjYW52YXNFbGVtZW50ID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdG9yeXRlbGxlcicpO1xuXG4gICAgY29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoY2FudmFzRWxlbWVudCwgZ2VuZXJhdGVkU3RvcnksIHtcbiAgICAgIHBhZGRpbmc6IHtcbiAgICAgICAgeDogMzIwLFxuICAgICAgICB5OiAyMDAsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBCb2FyZENvbnRyb2xsZXIoYm9hcmQpO1xuICAgIGNvbnRyb2xsZXIuc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICBjb250cm9sbGVyLmZpdCgxMDAsIDEwMCk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIucG9zaXRpb24oMCwgMCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJjb25zdCB0cmFuc2l0aW9uQ29sb3IgPSAnIzFkYTFmMic7XG5cbmNvbnN0IGhvbWUgPSB7XG4gIGlkOiAnL2hvbWUnLFxuICB0aXRsZToge1xuICAgIHRleHQ6ICdIb21lIFNjcmVlbidcbiAgfSxcbiAgZGVzY3JpcHRpb246IHtcbiAgICBmb250U2l6ZTogMTQsXG4gICAgdGV4dDogXCJ1cmw6IC9cXG5EaXNwbGF5IHRpbWVsaW5lXCJcbiAgfSxcbiAgZ3JpZDoge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL2hvbWUucG5nJ1xuICB9LFxuICB0cmFuc2l0aW9uczogW3tcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHRvOiB7XG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0ZXh0OiAndHJhbnNpdGlvbiByYXRlOiA1JShFeGFtcGxlKSdcbiAgICAgIH0sXG4gICAgICBpZDogJy9wb3N0cy9zaG93JyxcbiAgICAgIG9mZnNldDoge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAzMFxuICAgICAgfVxuICAgIH0sXG4gICAgZnJvbToge1xuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdGV4dDogJ3RyYW5zaXRpb24gcmF0ZTogNSUoRXhhbXBsZSknXG4gICAgICB9LFxuICAgICAgeDogMjQ0LFxuICAgICAgeTogMjQ3LFxuICAgICAgcmFkaXVzOiA4XG4gICAgfVxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7XG4gICAgICB4OiA2MCxcbiAgICAgIHk6IDYwXG4gICAgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgICAgIG9mZnNldDoge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiA2MFxuICAgICAgfVxuICAgIH0sXG4gICAgZnJvbToge1xuICAgICAgeDogMjcxLFxuICAgICAgeTogNTE3LFxuICAgICAgcmFkaXVzOiA4XG4gICAgfVxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7XG4gICAgICB4OiAzMCxcbiAgICAgIHk6IC0zMFxuICAgIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL3NlYXJjaCcsXG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMzBcbiAgICAgIH1cbiAgICB9LFxuICAgIGZyb206IHtcbiAgICAgIHg6IDEyOCxcbiAgICAgIHk6IDYzLFxuICAgICAgcmFkaXVzOiA4XG4gICAgfVxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvbm90aWZpY2F0aW9ucy9pbmRleCcsXG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMzBcbiAgICAgIH1cbiAgICB9LFxuICAgIGZyb206IHtcbiAgICAgIHg6IDIwNCxcbiAgICAgIHk6IDYzLFxuICAgICAgcmFkaXVzOiA4XG4gICAgfVxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7XG4gICAgICB4OiAtMzAsXG4gICAgICB5OiA5MFxuICAgIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL21lbnUnLFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDMwXG4gICAgICB9XG4gICAgfSxcbiAgICBmcm9tOiB7XG4gICAgICB4OiAyMSxcbiAgICAgIHk6IDMxLFxuICAgICAgcmFkaXVzOiA4XG4gICAgfVxuICB9XVxufTtcblxuY29uc3QgcG9zdHNTaG93ID0ge1xuICBpZDogJy9wb3N0cy9zaG93JyxcbiAgZ3JpZDoge1xuICAgIHg6IDEsXG4gICAgeTogMFxuICB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3Bvc3RzX3Nob3cucG5nJ1xuICB9LFxuICB0cmFuc2l0aW9uczogW3tcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHJvb206IHtcbiAgICAgIHg6IDEyMCxcbiAgICAgIHk6IDBcbiAgICB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9wb3N0cy9uZXcnLFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDMwXG4gICAgICB9XG4gICAgfSxcbiAgICBmcm9tOiB7XG4gICAgICB4OiAyNzEsXG4gICAgICB5OiA1MTcsXG4gICAgICByYWRpdXM6IDhcbiAgICB9XG4gIH1dXG59O1xuXG5jb25zdCBwb3N0c05ldyA9IHtcbiAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgZ3JpZDoge1xuICAgIHg6IDEsXG4gICAgeTogMVxuICB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3Bvc3RzX25ldy5wbmcnXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbe1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgcm9vbToge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDMwXG4gICAgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvaG9tZScsXG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMzBcbiAgICAgIH1cbiAgICB9LFxuICAgIGZyb206IHtcbiAgICAgIHg6IDI3MSxcbiAgICAgIHk6IDIwLFxuICAgICAgcmFkaXVzOiA4XG4gICAgfVxuICB9XVxufTtcblxuY29uc3Qgc2VhcmNoID0ge1xuICBpZDogJy9zZWFyY2gnLFxuICBncmlkOiB7XG4gICAgeDogMSxcbiAgICB5OiAyXG4gIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvc2VhcmNoLnBuZydcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFtdXG59O1xuXG5jb25zdCBub3RpZmljYXRpb25zSW5kZXggPSB7XG4gIGlkOiAnL25vdGlmaWNhdGlvbnMvaW5kZXgnLFxuICBncmlkOiB7XG4gICAgeDogMSxcbiAgICB5OiAzXG4gIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvbm90aWZpY2F0aW9uc19pbmRleC5wbmcnXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbXVxufTtcblxuY29uc3QgbWVudSA9IHtcbiAgaWQ6ICcvbWVudScsXG4gIGdyaWQ6IHtcbiAgICB4OiAxLFxuICAgIHk6IDRcbiAgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy9tZW51LnBuZydcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcHJvZmlsZScsXG4gICAgICBvZmZzZXQ6IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMzBcbiAgICAgIH1cbiAgICB9LFxuICAgIGZyb206IHtcbiAgICAgIHg6IDIxLFxuICAgICAgeTogMzEsXG4gICAgICByYWRpdXM6IDhcbiAgICB9XG4gIH1dXG59O1xuXG5jb25zdCBwcm9maWxlID0ge1xuICBpZDogJy9wcm9maWxlJyxcbiAgZ3JpZDoge1xuICAgIHg6IDIsXG4gICAgeTogMFxuICB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3Byb2ZpbGUucG5nJ1xuICB9LFxuICB0cmFuc2l0aW9uczogW11cbn07XG5cbmV4cG9ydCBjb25zdCBzdG9yeSA9IFtob21lLCBwb3N0c1Nob3csIHBvc3RzTmV3LCBzZWFyY2gsIG5vdGlmaWNhdGlvbnNJbmRleCwgbWVudSwgcHJvZmlsZV07XG4iXSwic291cmNlUm9vdCI6IiJ9