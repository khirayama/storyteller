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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board-controller.js":
/*!*********************************!*\
  !*** ./src/board-controller.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardController = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      this.board.translate(x, y);
    }
  }, {
    key: "size",
    value: function size(width, height) {
      this.board.size(width, height);
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils/index.js");

var _board = __webpack_require__(/*! ./views/board */ "./src/views/board.js");

var _sampleStory = __webpack_require__(/*! ./sample-story */ "./src/sample-story.js");

var _boardController = __webpack_require__(/*! ./board-controller */ "./src/board-controller.js");

window.addEventListener('DOMContentLoaded', function () {
  console.log("Start app at ".concat(new Date().toString(), "."));
  (0, _utils.startStory)(_sampleStory.story).then(function (generatedStory) {
    var canvasElement = window.document.querySelector('.storyteller');
    var board = new _board.Board(canvasElement, generatedStory, {
      rulerColor: 'rgba(0, 0, 0, 0.36)',
      padding: {
        x: 320,
        y: 200
      }
    });
    var controller = new _boardController.BoardController(board);
    controller.size(window.innerWidth, window.innerHeight);
    controller.zoom(0.2);
    controller.translate(80, 100);
  });
});

/***/ }),

/***/ "./src/sample-story.js":
/*!*****************************!*\
  !*** ./src/sample-story.js ***!
  \*****************************/
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

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
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

/***/ "./src/views/board.js":
/*!****************************!*\
  !*** ./src/views/board.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

var _page = __webpack_require__(/*! ./page */ "./src/views/page.js");

var _transition = __webpack_require__(/*! ./transition */ "./src/views/transition.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

/***/ "./src/views/page.js":
/*!***************************!*\
  !*** ./src/views/page.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Page =
/*#__PURE__*/
function () {
  function Page(context, scene, rulers) {
    _classCallCheck(this, Page);

    this.context = context;
    this.scene = scene;
    this.rulers = rulers;
    this.id = this.scene.id;
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
      this.context.fillStyle = color;

      if (this.scene.screen.img) {
        this.context.drawImage(this.scene.screen.img, this.x, this.y, this.scene.screen.width, this.scene.screen.height);
      } else {
        this.context.fillRect(this.x, this.y, this.scene.screen.width, this.scene.screen.height);
      }
    }
  }]);

  return Page;
}();

exports.Page = Page;

/***/ }),

/***/ "./src/views/transition.js":
/*!*********************************!*\
  !*** ./src/views/transition.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transition = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
          startY = _ref2.startY;
      this.context.beginPath();
      this.context.arc(startX, startY, 12, 0, Math.PI * 2);
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
    key: "render",
    value: function render() {
      var from = this.transition.from || {
        x: this.page.width,
        y: 0
      };
      var toOffset = this.transition.to.offset || {
        x: 0,
        y: 0
      };
      var options = {
        color: this.transition.color || 'rgba(0, 0, 0, 0.48)',
        room: this.transition.room || {
          x: 0,
          y: 0
        },
        startX: this.page.x + from.x,
        startY: this.page.y + from.y,
        endX: this.targetPage.x + toOffset.x,
        endY: this.targetPage.y + toOffset.y
      };
      this.context.strokeStyle = options.color;
      this.context.fillStyle = options.color;
      this.renderStartPoint(options);
      this.renderTransitionLine(options);
      this.renderEndArrow(options);
    }
  }]);

  return Transition;
}();

exports.Transition = Transition;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zYW1wbGUtc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9ib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvdHJhbnNpdGlvbi5qcyJdLCJuYW1lcyI6WyJCb2FyZENvbnRyb2xsZXIiLCJib2FyZCIsInRyYW5zIiwiZW5hYmxlZCIsIngiLCJ5Iiwic2NhbGUiLCJzZXRFdmVudExpc3RlbmVyIiwiem9vbSIsInRyYW5zbGF0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2l6ZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwibWluU2NhbGUiLCJtYXhTY2FsZSIsImRlbHRhWSIsImNsaWVudFgiLCJjbGllbnRZIiwiZGlmZiIsImNvbnNvbGUiLCJsb2ciLCJEYXRlIiwidG9TdHJpbmciLCJzdG9yeSIsInRoZW4iLCJnZW5lcmF0ZWRTdG9yeSIsImNhbnZhc0VsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJCb2FyZCIsInJ1bGVyQ29sb3IiLCJwYWRkaW5nIiwiY29udHJvbGxlciIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInNjcmVlbiIsImltYWdlUGF0aCIsImNyZWF0ZVNjZW5lIiwiaWQiLCJncmlkWCIsImdyaWRZIiwic2NlbmUiLCJncmlkIiwidHJhbnNpdGlvbnMiLCJpIiwiaiIsInRyYW5zaXRpb24iLCJmcm9tIiwidG8iLCJvZmZzZXQiLCJjb2xvciIsInJvb20iLCJwdXNoIiwic3RhcnRTdG9yeSIsIl9zdG9yeSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJpbWciLCJJbWFnZSIsInNyYyIsInJlc29sdmUiLCJlbCIsIm9wdGlvbnMiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInJ1bGVycyIsIl9nZW5lcmF0ZVJ1bGVycyIsInBhZ2VzIiwiX2NsZWFyIiwiX3JlbmRlciIsInBhZ2VJZCIsImZpbHRlciIsInBhZ2UiLCJzb3J0Iiwic2NlbmUxIiwic2NlbmUyIiwibGVuZ3RoIiwiY3VycmVudFJ1bGVyWCIsIm5leHRSdWxlclgiLCJuZXh0TmV3UnVsZXJYIiwiY3VycmVudFJ1bGVyWSIsIm5leHRSdWxlclkiLCJuZXh0TmV3UnVsZXJZIiwiY2xlYXJSZWN0IiwiYmVnaW5QYXRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJmb3JFYWNoIiwiUGFnZSIsInRhcmdldFBhZ2UiLCJfZmluZFBhZ2UiLCJUcmFuc2l0aW9uIiwiX3JlbmRlclBhZ2VzIiwiX3JlbmRlclRyYW5zaXRpb25zIiwiX3JlbmRlclJ1bGVycyIsInJlbmRlciIsImZpbGxTdHlsZSIsImRyYXdJbWFnZSIsImZpbGxSZWN0Iiwic3RhcnRYIiwic3RhcnRZIiwiYXJjIiwiTWF0aCIsIlBJIiwiZmlsbCIsImVuZFgiLCJlbmRZIiwiY3VycmVudEdyaWQiLCJ0YXJnZXRHcmlkIiwiY2xvc2VQYXRoIiwidG9PZmZzZXQiLCJyZW5kZXJTdGFydFBvaW50IiwicmVuZGVyVHJhbnNpdGlvbkxpbmUiLCJyZW5kZXJFbmRBcnJvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFF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akQsV0FBRyxDQUR5QztBQUU1Q0MsV0FBRztBQUZ5QyxPQUE5QztBQUlBLFVBQU1pRSxVQUFVO0FBQ2RoQixlQUFPLEtBQUtKLFVBQUwsQ0FBZ0JJLEtBQWhCLElBQXlCLHFCQURsQjtBQUVkQyxjQUFNLEtBQUtMLFVBQUwsQ0FBZ0JLLElBQWhCLElBQXdCO0FBQUNuRCxhQUFHLENBQUo7QUFBT0MsYUFBRztBQUFWLFNBRmhCO0FBR2R3RyxnQkFBUSxLQUFLN0IsSUFBTCxDQUFVNUUsQ0FBVixHQUFjK0MsS0FBSy9DLENBSGI7QUFJZDBHLGdCQUFRLEtBQUs5QixJQUFMLENBQVUzRSxDQUFWLEdBQWM4QyxLQUFLOUMsQ0FKYjtBQUtkOEcsY0FBTSxLQUFLaEIsVUFBTCxDQUFnQi9GLENBQWhCLEdBQW9Cb0gsU0FBU3BILENBTHJCO0FBTWRnSCxjQUFNLEtBQUtqQixVQUFMLENBQWdCOUYsQ0FBaEIsR0FBb0JtSCxTQUFTbkg7QUFOckIsT0FBaEI7QUFTQSxXQUFLa0UsT0FBTCxDQUFhc0IsV0FBYixHQUEyQnZCLFFBQVFoQixLQUFuQztBQUNBLFdBQUtpQixPQUFMLENBQWFtQyxTQUFiLEdBQXlCcEMsUUFBUWhCLEtBQWpDO0FBRUEsV0FBS21FLGdCQUFMLENBQXNCbkQsT0FBdEI7QUFDQSxXQUFLb0Qsb0JBQUwsQ0FBMEJwRCxPQUExQjtBQUNBLFdBQUtxRCxjQUFMLENBQW9CckQsT0FBcEI7QUFDRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgY2xhc3MgQm9hcmRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoYm9hcmQpIHtcbiAgICB0aGlzLnRyYW5zID0ge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9O1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuXG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuXG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVyKCk7XG4gIH1cblxuICB6b29tKHNjYWxlKSB7XG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMuYm9hcmQuem9vbSh0aGlzLnNjYWxlKTtcbiAgfVxuXG4gIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgdGhpcy5ib2FyZC50cmFuc2xhdGUoeCwgeSk7XG4gIH1cblxuICBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmJvYXJkLnNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVyKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgbWluU2NhbGUgPSAwLjA1O1xuICAgICAgY29uc3QgbWF4U2NhbGUgPSAxMDtcblxuICAgICAgaWYoZXZlbnQuZGVsdGFZID4gMCkge1xuICAgICAgICB0aGlzLnNjYWxlICo9IDAuOTU7XG4gICAgICB9ZWxzZSB7XG4gICAgICAgIHRoaXMuc2NhbGUgKj0gMS4wNTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgbWluU2NhbGUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IG1pblNjYWxlO1xuICAgICAgfSBlbHNlIGlmIChtYXhTY2FsZSA8IHRoaXMuc2NhbGUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IG1heFNjYWxlO1xuICAgICAgfVxuICAgICAgdGhpcy5ib2FyZC56b29tKHRoaXMuc2NhbGUpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy50cmFucy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJhbnMueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICB0aGlzLnRyYW5zLnkgPSBldmVudC5jbGllbnRZO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLnRyYW5zLmVuYWJsZWQpIHtcbiAgICAgICAgY29uc3QgZGlmZiA9IHtcbiAgICAgICAgICB4OiBldmVudC5jbGllbnRYIC0gdGhpcy50cmFucy54LFxuICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgLSB0aGlzLnRyYW5zLnksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKGRpZmYueCwgZGlmZi55KTtcbiAgICAgICAgdGhpcy50cmFucy54ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgdGhpcy50cmFucy55ID0gZXZlbnQuY2xpZW50WTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIHRoaXMudHJhbnMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBzdGFydFN0b3J5IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gJy4vdmlld3MvYm9hcmQnO1xuaW1wb3J0IHsgc3RvcnkgfSBmcm9tICcuL3NhbXBsZS1zdG9yeSc7XG5pbXBvcnQgeyBCb2FyZENvbnRyb2xsZXIgfSBmcm9tICcuL2JvYXJkLWNvbnRyb2xsZXInO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coYFN0YXJ0IGFwcCBhdCAkeyhuZXcgRGF0ZSgpKS50b1N0cmluZygpfS5gKTtcblxuICBzdGFydFN0b3J5KHN0b3J5KS50aGVuKChnZW5lcmF0ZWRTdG9yeSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3J5dGVsbGVyJyk7XG5cbiAgICBjb25zdCBib2FyZCA9IG5ldyBCb2FyZChjYW52YXNFbGVtZW50LCBnZW5lcmF0ZWRTdG9yeSwge1xuICAgICAgcnVsZXJDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC4zNiknLFxuICAgICAgcGFkZGluZzoge1xuICAgICAgICB4OiAzMjAsXG4gICAgICAgIHk6IDIwMCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEJvYXJkQ29udHJvbGxlcihib2FyZCk7XG4gICAgY29udHJvbGxlci5zaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGNvbnRyb2xsZXIuem9vbSgwLjIpO1xuICAgIGNvbnRyb2xsZXIudHJhbnNsYXRlKDgwLCAxMDApO1xuICB9KTtcbn0pO1xuIiwiY29uc3Qgc2NyZWVuID0ge1xuICB3aWR0aDogMzc1LFxuICBoZWlnaHQ6IDY2NyxcbiAgaW1hZ2VQYXRoOiBudWxsLFxufTtcblxuZnVuY3Rpb24gY3JlYXRlU2NlbmUoaWQsIGdyaWRYLCBncmlkWSkge1xuICBjb25zdCBzY2VuZSA9IHtcbiAgICBpZCxcbiAgICBzY3JlZW4sXG4gICAgZ3JpZDoge1xuICAgICAgeDogZ3JpZFgsXG4gICAgICB5OiBncmlkWSxcbiAgICB9LFxuICAgIHRyYW5zaXRpb25zOiBbXSxcbiAgfTtcbiAgaWYgKGdyaWRYID09PSAyICYmIGdyaWRZID09PSAyKSB7XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA1OyBqKyspIHtcbiAgICAgICAgY29uc3QgaWQgPSBgc2NlbmUtJHtpfS0ke2p9YDtcbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbj0ge1xuICAgICAgICAgIGZyb206IHtcbiAgICAgICAgICAgIHg6IHNjcmVlbi53aWR0aCAvIDIgKyAoaSAtIDIpICogNjAgLSAoKGogJSAyID09PSAwKSA/IDMwIDogMCksXG4gICAgICAgICAgICB5OiBzY3JlZW4uaGVpZ2h0IC8gMiArIChqIC0gMikgKiA2MCAtICgoaSAlIDIgPT09IDApID8gMzAgOiAwKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRvOiB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICB5OiAzMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGkgPT09IDAgfHwgaSA9PT0gNCkge1xuICAgICAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7eDogLTUwLCB5OiAtNTB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gMSkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdncmVlbic7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7eDogLTMwLCB5OiAtMzB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gMikge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdibHVlJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHt4OiAtMTAsIHk6IC0xMH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSAzKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7eDogMTAsIHk6IDEwfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGogPT09IDQpIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uY29sb3IgPSAncHVycGxlJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHt4OiAzMCwgeTogMzB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gMSB8fCBpID09PSAzKSB7XG4gICAgICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uY29sb3IgPSAncmVkJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHt4OiAtNTAsIHk6IDUwfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGogPT09IDEpIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uY29sb3IgPSAnZ3JlZW4nO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5yb29tID0ge3g6IC0zMCwgeTogMzB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gMikge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdibHVlJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHt4OiAtMTAsIHk6IDEwfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGogPT09IDMpIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uY29sb3IgPSAneWVsbG93JztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHt4OiAxMCwgeTogLTEwfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGogPT09IDQpIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uY29sb3IgPSAncHVycGxlJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHt4OiAzMCwgeTogLTMwfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5yb29tID0ge3g6IDQwLCB5OiA0MH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSAxKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ2dyZWVuJztcbiAgICAgICAgICAgIHRyYW5zaXRpb24ucm9vbSA9IHt4OiAyMCwgeTogMjB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gMikge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdibGFjayc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7eDogMCwgeTogMH07XG4gICAgICAgICAgfSBlbHNlIGlmIChqID09PSAzKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmNvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLnJvb20gPSB7eDogLTIwLCB5OiAtMjB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gNCkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5jb2xvciA9ICdwdXJwbGUnO1xuICAgICAgICAgICAgdHJhbnNpdGlvbi5yb29tID0ge3g6IC00MCwgeTogLTQwfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNpdGlvbnMucHVzaCh0cmFuc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2NlbmUudHJhbnNpdGlvbnMgPSB0cmFuc2l0aW9ucztcbiAgfVxuICByZXR1cm4gc2NlbmU7XG59XG5cbmNvbnN0IHN0b3J5ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgNTsgaisrKSB7XG4gICAgY29uc3QgaWQgPSBgc2NlbmUtJHtpfS0ke2p9YDtcbiAgICBjb25zdCBzY2VuZSA9IGNyZWF0ZVNjZW5lKGlkLCBpLCBqKTtcbiAgICBzdG9yeS5wdXNoKHNjZW5lKTtcbiAgfVxufVxuXG5leHBvcnQge3N0b3J5fTtcbiIsImV4cG9ydCBmdW5jdGlvbiBzdGFydFN0b3J5KHN0b3J5KSB7XG4gIGNvbnN0IF9zdG9yeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3RvcnkpKTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoX3N0b3J5Lm1hcCgoc2NlbmUpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAoc2NlbmUuc2NyZWVuLmltYWdlUGF0aCkge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHNjZW5lLnNjcmVlbi5pbWFnZVBhdGg7XG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgc2NlbmUuc2NyZWVuLmltZyA9IGltZztcbiAgICAgICAgICBpZiAoc2NlbmUuc2NyZWVuLndpZHRoICYmICFzY2VuZS5zY3JlZW4uaGVpZ2h0KSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZSA9IGltZy53aWR0aCAvIHNjZW5lLnNjcmVlbi53aWR0aDtcbiAgICAgICAgICAgIHNjZW5lLnNjcmVlbi5oZWlnaHQgPSBpbWcuaGVpZ2h0IC8gc2NhbGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghc2NlbmUuc2NyZWVuLndpZHRoICYmIHNjZW5lLnNjcmVlbi5oZWlnaHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gaW1nLmhlaWdodCAvIHNjZW5lLnNjcmVlbi5oZWlnaHQ7XG4gICAgICAgICAgICBzY2VuZS5zY3JlZW4ud2lkdGggPSBpbWcud2lkdGggLyBzY2FsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkpLnRoZW4oKCkgPT4ge1xuICAgIHJldHVybiBfc3Rvcnk7XG4gIH0pO1xufVxuXG4iLCJpbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICcuL3RyYW5zaXRpb24nO1xuXG4vKlxuICogQm9hcmRcbiAqIC0gY29uc3RydWN0b3JcbiAqICAgLSBvcHRpb25zXG4gKiAgICAgLSBydWxlckNvbG9yXG4gKiAgICAgLSBwYWRkaW5nXG4gKiAgICAgICAtIHhcbiAqICAgICAgIC0geVxuICogLSBzaXplXG4gKiAtIHpvb21cbiAqIC0gdHJhbnNsYXRlXG4gKiAtIF9maW5kUGFnZVxuICogLSBfZ2VuZXJhdGVSdWxlcnNcbiAqIC0gX2NsZWFyXG4gKiAtIF9yZW5kZXJSdWxlcnNcbiAqIC0gX3JlbmRlclBhZ2VzXG4gKiAtIF9yZW5kZXJUcmFuc2l0aW9uc1xuICovXG5cbmV4cG9ydCBjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKGVsLCBzdG9yeSwgb3B0aW9ucykge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5zdG9yeSA9IHN0b3J5O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5ydWxlcnMgPSB0aGlzLl9nZW5lcmF0ZVJ1bGVycyh0aGlzLnN0b3J5KTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnBhZ2VzID0gW107XG5cbiAgICB0aGlzLl9jbGVhcigpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5fY2xlYXIoKTtcblxuICAgIHRoaXMuZWwud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgem9vbShzY2FsZSkge1xuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuXG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICB0cmFuc2xhdGUoeCwgeSkge1xuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHgsIHkpO1xuICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgX2ZpbmRQYWdlKHBhZ2VJZCkge1xuICAgIHJldHVybiB0aGlzLnBhZ2VzLmZpbHRlcihwYWdlID0+IHtcbiAgICAgIHJldHVybiBwYWdlLmlkID09PSBwYWdlSWQ7XG4gICAgfSlbMF0gfHwgbnVsbDtcbiAgfVxuXG4gIF9nZW5lcmF0ZVJ1bGVycyhzdG9yeSkge1xuICAgIGNvbnN0IHJ1bGVycyA9IHtcbiAgICAgIHg6IFtdLFxuICAgICAgeTogW10sXG4gICAgfTtcbiAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5vcHRpb25zLnBhZGRpbmc7XG5cbiAgICAvLyBHZW5lcmF0ZSB4IHJ1bGVyc1xuICAgIHN0b3J5LnNvcnQoKHNjZW5lMSwgc2NlbmUyKSA9PiB7XG4gICAgICByZXR1cm4gKHNjZW5lMS5ncmlkLnggLSBzY2VuZTIuZ3JpZC54KTtcbiAgICB9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzY2VuZSA9IHN0b3J5W2ldO1xuICAgICAgY29uc3QgeCA9IHNjZW5lLmdyaWQueDtcbiAgICAgIGNvbnN0IGN1cnJlbnRSdWxlclggPSBydWxlcnMueFt4XSB8fCBudWxsO1xuICAgICAgY29uc3QgbmV4dFJ1bGVyWCA9IHJ1bGVycy54W3ggKyAxXSB8fCBudWxsO1xuXG4gICAgICBpZiAoY3VycmVudFJ1bGVyWCA9PT0gbnVsbCkge1xuICAgICAgICBydWxlcnMueFt4XSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5leHROZXdSdWxlclggPSBydWxlcnMueFt4XSArIHNjZW5lLnNjcmVlbi53aWR0aCArIHBhZGRpbmcueDtcbiAgICAgIGlmIChuZXh0UnVsZXJYID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy54W3ggKyAxXSA9IG5leHROZXdSdWxlclg7XG4gICAgICB9IGVsc2UgaWYgKG5leHRSdWxlclggPCBuZXh0TmV3UnVsZXJYKSB7XG4gICAgICAgIHJ1bGVycy54W3ggKyAxXSA9IG5leHROZXdSdWxlclg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgeSBydWxlcnNcbiAgICBzdG9yeS5zb3J0KChzY2VuZTEsIHNjZW5lMikgPT4ge1xuICAgICAgcmV0dXJuIChzY2VuZTEuZ3JpZC55IC0gc2NlbmUyLmdyaWQueSk7XG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2NlbmUgPSBzdG9yeVtpXTtcbiAgICAgIGNvbnN0IHkgPSBzY2VuZS5ncmlkLnk7XG4gICAgICBjb25zdCBjdXJyZW50UnVsZXJZID0gcnVsZXJzLnlbeV0gfHwgbnVsbDtcbiAgICAgIGNvbnN0IG5leHRSdWxlclkgPSBydWxlcnMueVt5ICsgMV0gfHwgbnVsbDtcblxuICAgICAgaWYgKGN1cnJlbnRSdWxlclkgPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnlbeV0gPSAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0TmV3UnVsZXJZID0gcnVsZXJzLnlbeV0gKyBzY2VuZS5zY3JlZW4uaGVpZ2h0ICsgcGFkZGluZy55O1xuICAgICAgaWYgKG5leHRSdWxlclkgPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnlbeSArIDFdID0gbmV4dE5ld1J1bGVyWTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dFJ1bGVyWSA8IG5leHROZXdSdWxlclkpIHtcbiAgICAgICAgcnVsZXJzLnlbeSArIDFdID0gbmV4dE5ld1J1bGVyWTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZXJzO1xuICB9XG5cbiAgX2NsZWFyKCkge1xuICAgIC8vIFRPRE86IE9wdGltaXplIGNsZWFyUmVjdCBzaXplXG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKDEgLyB0aGlzLnNjYWxlLCAxIC8gdGhpcy5zY2FsZSk7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgtMTAwMDAsIC0xMDAwMCwgMTAwMDAwLCAxMDAwMDApO1xuICB9XG5cbiAgX3JlbmRlclJ1bGVycygpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMub3B0aW9ucy5ydWxlckNvbG9yIHx8ICdyZ2JhKDIxNiwgNTMsIDUzLCAwLjcyKSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucnVsZXJzLngubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSB0aGlzLnJ1bGVycy54W2ldO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgsIC0xMDAwMDApO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh4LCAxMDAwMDApO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ydWxlcnMueS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeSA9IHRoaXMucnVsZXJzLnlbaV07XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oLTEwMDAwMCwgeSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKDEwMDAwMCwgeSk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuICB9XG5cbiAgX3JlbmRlclBhZ2VzKCkge1xuICAgIHRoaXMuc3RvcnkuZm9yRWFjaChzY2VuZSA9PiB7XG4gICAgICBjb25zdCB4ID0gc2NlbmUuZ3JpZC54O1xuICAgICAgY29uc3QgeSA9IHNjZW5lLmdyaWQueTtcbiAgICAgIGNvbnN0IHBhZ2UgPSBuZXcgUGFnZSh0aGlzLmNvbnRleHQsIHNjZW5lLCB0aGlzLnJ1bGVycyk7XG4gICAgICB0aGlzLnBhZ2VzLnB1c2gocGFnZSk7XG4gICAgfSk7XG4gIH1cblxuICBfcmVuZGVyVHJhbnNpdGlvbnMoKSB7XG4gICAgdGhpcy5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgcGFnZS5zY2VuZS50cmFuc2l0aW9ucy5mb3JFYWNoKCh0cmFuc2l0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldFBhZ2UgPSB0aGlzLl9maW5kUGFnZSh0cmFuc2l0aW9uLnRvLmlkKTtcbiAgICAgICAgbmV3IFRyYW5zaXRpb24odGhpcy5jb250ZXh0LCB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICB0YXJnZXRQYWdlLFxuICAgICAgICAgIHRyYW5zaXRpb24sXG4gICAgICAgICAgcnVsZXJzOiB0aGlzLnJ1bGVycyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9yZW5kZXIoKSB7XG4gICAgdGhpcy5fcmVuZGVyUGFnZXMoKTtcbiAgICB0aGlzLl9yZW5kZXJUcmFuc2l0aW9ucygpO1xuICAgIHRoaXMuX3JlbmRlclJ1bGVycygpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQsIHNjZW5lLCBydWxlcnMpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnJ1bGVycyA9IHJ1bGVycztcbiAgICB0aGlzLmlkID0gdGhpcy5zY2VuZS5pZDtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLnNjZW5lLmdyaWQ7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMuc2NlbmUuc2NyZWVuLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zY2VuZS5zY3JlZW4uaGVpZ2h0O1xuICAgIHRoaXMueCA9IHRoaXMucnVsZXJzLnhbdGhpcy5ncmlkLnhdICsgKCh0aGlzLnJ1bGVycy54W3RoaXMuZ3JpZC54ICsgMV0gLSB0aGlzLnJ1bGVycy54W3RoaXMuZ3JpZC54XSAtIHRoaXMud2lkdGgpIC8gMik7XG4gICAgdGhpcy55ID0gdGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueV0gKyAoKHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnkgKyAxXSAtIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldIC0gdGhpcy5oZWlnaHQpIC8gMik7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5zY2VuZS5jb2xvciB8fCAncmdiYSgwLCAwLCAwLCAwLjMyKSc7XG5cbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgaWYgKHRoaXMuc2NlbmUuc2NyZWVuLmltZykge1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLnNjZW5lLnNjcmVlbi5pbWcsIHRoaXMueCwgdGhpcy55LCB0aGlzLnNjZW5lLnNjcmVlbi53aWR0aCwgdGhpcy5zY2VuZS5zY3JlZW4uaGVpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLnNjZW5lLnNjcmVlbi53aWR0aCwgdGhpcy5zY2VuZS5zY3JlZW4uaGVpZ2h0KTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUcmFuc2l0aW9uIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwge3BhZ2UsIHRhcmdldFBhZ2UsIHRyYW5zaXRpb24sIHJ1bGVyc30pIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgdGhpcy50YXJnZXRQYWdlID0gdGFyZ2V0UGFnZTtcbiAgICB0aGlzLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICAgIHRoaXMucnVsZXJzID0gcnVsZXJzO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlclN0YXJ0UG9pbnQoe3N0YXJ0WCwgc3RhcnRZfSkge1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuYXJjKHN0YXJ0WCwgc3RhcnRZLCAxMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcmVuZGVyVHJhbnNpdGlvbkxpbmUoe3N0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCByb29tfSkge1xuICAgIGNvbnN0IGN1cnJlbnRHcmlkID0gdGhpcy5wYWdlLmdyaWQ7XG4gICAgY29uc3QgdGFyZ2V0R3JpZCA9IHRoaXMudGFyZ2V0UGFnZS5ncmlkO1xuXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oc3RhcnRYLCBzdGFydFkpO1xuICAgIGlmIChjdXJyZW50R3JpZC55ID4gdGFyZ2V0R3JpZC55KSB7XG4gICAgICAvLyBsaW5lVG8gdG9wLlxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzdGFydFgsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA8IHRhcmdldEdyaWQueSkge1xuICAgICAgLy8gbGluZVRvIGJvdHRvbS5cbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oc3RhcnRYLCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnkgKyAxXSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55ICsgMV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA9PT0gdGFyZ2V0R3JpZC55ICYmIGN1cnJlbnRHcmlkLnggPiB0YXJnZXRHcmlkLngpIHtcbiAgICAgIC8vIGxpbmVUbyBsZWZ0XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRHcmlkLnkgPT09IHRhcmdldEdyaWQueSAmJiBjdXJyZW50R3JpZC54IDwgdGFyZ2V0R3JpZC54KSB7XG4gICAgICAvLyBsaW5lVG8gcmlnaHRcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICBpZiAodGFyZ2V0R3JpZC54IC0gY3VycmVudEdyaWQueCA+IDEpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIGVuZFkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueSwgZW5kWSk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5saW5lVG8oZW5kWCwgZW5kWSk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcmVuZGVyRW5kQXJyb3coe2VuZFgsIGVuZFl9KSB7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oZW5kWCwgZW5kWSk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYIC0gMTQsIGVuZFkgKyAxMCk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYIC0gMTQsIGVuZFkgLSAxMCk7XG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGZyb20gPSB0aGlzLnRyYW5zaXRpb24uZnJvbSB8fCB7XG4gICAgICB4OiB0aGlzLnBhZ2Uud2lkdGgsXG4gICAgICB5OiAwLFxuICAgIH07XG4gICAgY29uc3QgdG9PZmZzZXQgPSB0aGlzLnRyYW5zaXRpb24udG8ub2Zmc2V0IHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGNvbG9yOiB0aGlzLnRyYW5zaXRpb24uY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC40OCknLFxuICAgICAgcm9vbTogdGhpcy50cmFuc2l0aW9uLnJvb20gfHwge3g6IDAsIHk6IDB9LFxuICAgICAgc3RhcnRYOiB0aGlzLnBhZ2UueCArIGZyb20ueCxcbiAgICAgIHN0YXJ0WTogdGhpcy5wYWdlLnkgKyBmcm9tLnksXG4gICAgICBlbmRYOiB0aGlzLnRhcmdldFBhZ2UueCArIHRvT2Zmc2V0LngsXG4gICAgICBlbmRZOiB0aGlzLnRhcmdldFBhZ2UueSArIHRvT2Zmc2V0LnksXG4gICAgfTtcblxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IG9wdGlvbnMuY29sb3I7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IG9wdGlvbnMuY29sb3I7XG5cbiAgICB0aGlzLnJlbmRlclN0YXJ0UG9pbnQob3B0aW9ucyk7XG4gICAgdGhpcy5yZW5kZXJUcmFuc2l0aW9uTGluZShvcHRpb25zKTtcbiAgICB0aGlzLnJlbmRlckVuZEFycm93KG9wdGlvbnMpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9