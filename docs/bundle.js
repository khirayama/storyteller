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

var _twitterStory = __webpack_require__(/*! ./twitter-story */ "./src/twitter-story.js");

var _boardController = __webpack_require__(/*! ./board-controller */ "./src/board-controller.js");

//import { story } from './sample-story';
window.addEventListener('DOMContentLoaded', function () {
  console.log("Start app at ".concat(new Date().toString(), "."));
  (0, _utils.startStory)(_twitterStory.story).then(function (generatedStory) {
    var canvasElement = window.document.querySelector('.storyteller');
    var board = new _board.Board(canvasElement, generatedStory, {
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

/***/ "./src/twitter-story.js":
/*!******************************!*\
  !*** ./src/twitter-story.js ***!
  \******************************/
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
  grid: {
    x: 0,
    y: 0
  },
  screen: {
    width: 300,
    imagePath: './images/twitter/home.png'
  },
  transitions: [{
    color: transitionColor,
    to: {
      id: '/posts/show',
      offset: {
        x: 0,
        y: 30
      }
    },
    from: {
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
    imagePath: './images/twitter/posts_show.png'
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
    imagePath: './images/twitter/posts_new.png'
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
    imagePath: './images/twitter/search.png'
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
    imagePath: './images/twitter/notifications_index.png'
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
    imagePath: './images/twitter/menu.png'
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
    imagePath: './images/twitter/profile.png'
  },
  transitions: []
};
var story = [home, postsShow, postsNew, search, notificationsIndex, menu, profile];
exports.story = story;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90d2l0dGVyLXN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3RyYW5zaXRpb24uanMiXSwibmFtZXMiOlsiQm9hcmRDb250cm9sbGVyIiwiYm9hcmQiLCJ0cmFucyIsImVuYWJsZWQiLCJ4IiwieSIsInNjYWxlIiwic2V0RXZlbnRMaXN0ZW5lciIsInpvb20iLCJ0cmFuc2xhdGUiLCJ3aWR0aCIsImhlaWdodCIsInNpemUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1pblNjYWxlIiwibWF4U2NhbGUiLCJkZWx0YVkiLCJjbGllbnRYIiwiY2xpZW50WSIsImRpZmYiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInRvU3RyaW5nIiwic3RvcnkiLCJ0aGVuIiwiZ2VuZXJhdGVkU3RvcnkiLCJjYW52YXNFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiQm9hcmQiLCJwYWRkaW5nIiwiY29udHJvbGxlciIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInRyYW5zaXRpb25Db2xvciIsImhvbWUiLCJpZCIsImdyaWQiLCJzY3JlZW4iLCJpbWFnZVBhdGgiLCJ0cmFuc2l0aW9ucyIsImNvbG9yIiwidG8iLCJvZmZzZXQiLCJmcm9tIiwicmFkaXVzIiwicm9vbSIsInBvc3RzU2hvdyIsInBvc3RzTmV3Iiwic2VhcmNoIiwibm90aWZpY2F0aW9uc0luZGV4IiwibWVudSIsInByb2ZpbGUiLCJzdGFydFN0b3J5IiwiX3N0b3J5IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInNjZW5lIiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJyZXNvbHZlIiwiZWwiLCJvcHRpb25zIiwiY29udGV4dCIsImdldENvbnRleHQiLCJydWxlcnMiLCJfZ2VuZXJhdGVSdWxlcnMiLCJwYWdlcyIsIl9jbGVhciIsIl9yZW5kZXIiLCJwYWdlSWQiLCJmaWx0ZXIiLCJwYWdlIiwic29ydCIsInNjZW5lMSIsInNjZW5lMiIsImkiLCJsZW5ndGgiLCJjdXJyZW50UnVsZXJYIiwibmV4dFJ1bGVyWCIsIm5leHROZXdSdWxlclgiLCJjdXJyZW50UnVsZXJZIiwibmV4dFJ1bGVyWSIsIm5leHROZXdSdWxlclkiLCJjbGVhclJlY3QiLCJydWxlckNvbG9yIiwiYmVnaW5QYXRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJmb3JFYWNoIiwiUGFnZSIsInB1c2giLCJ0cmFuc2l0aW9uIiwidGFyZ2V0UGFnZSIsIl9maW5kUGFnZSIsIlRyYW5zaXRpb24iLCJfcmVuZGVyUGFnZXMiLCJfcmVuZGVyVHJhbnNpdGlvbnMiLCJfcmVuZGVyUnVsZXJzIiwicmVuZGVyIiwiZmlsbFN0eWxlIiwic2hhZG93Q29sb3IiLCJzaGFkb3dCbHVyIiwic2hhZG93T2Zmc2V0WCIsInNoYWRvd09mZnNldFkiLCJkcmF3SW1hZ2UiLCJmaWxsUmVjdCIsInN0YXJ0WCIsInN0YXJ0WSIsImFyYyIsIk1hdGgiLCJQSSIsImZpbGwiLCJlbmRYIiwiZW5kWSIsImN1cnJlbnRHcmlkIiwidGFyZ2V0R3JpZCIsImNsb3NlUGF0aCIsInRvT2Zmc2V0IiwicmVuZGVyU3RhcnRQb2ludCIsInJlbmRlclRyYW5zaXRpb25MaW5lIiwicmVuZGVyRW5kQXJyb3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QU0sS0FBS3FELFVBQUwsQ0FBZ0JyRCxJQUFoQixJQUF3QjtBQUFDOUMsYUFBRyxDQUFKO0FBQU9DLGFBQUc7QUFBVixTQUhoQjtBQUlkaUgsZ0JBQVEsS0FBS3JDLElBQUwsQ0FBVTdFLENBQVYsR0FBYzRDLEtBQUs1QyxDQUpiO0FBS2RtSCxnQkFBUSxLQUFLdEMsSUFBTCxDQUFVNUUsQ0FBVixHQUFjMkMsS0FBSzNDLENBTGI7QUFNZHVILGNBQU0sS0FBS3BCLFVBQUwsQ0FBZ0JwRyxDQUFoQixHQUFvQjZILFNBQVM3SCxDQU5yQjtBQU9keUgsY0FBTSxLQUFLckIsVUFBTCxDQUFnQm5HLENBQWhCLEdBQW9CNEgsU0FBUzVIO0FBUHJCLE9BQWhCO0FBVUEsV0FBS21FLE9BQUwsQ0FBYXdCLFdBQWIsR0FBMkJ6QixRQUFRMUIsS0FBbkM7QUFDQSxXQUFLMkIsT0FBTCxDQUFhdUMsU0FBYixHQUF5QnhDLFFBQVExQixLQUFqQztBQUVBLFdBQUtxRixnQkFBTCxDQUFzQjNELE9BQXRCO0FBQ0EsV0FBSzRELG9CQUFMLENBQTBCNUQsT0FBMUI7QUFDQSxXQUFLNkQsY0FBTCxDQUFvQjdELE9BQXBCO0FBQ0QiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEJvYXJkQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGJvYXJkKSB7XG4gICAgdGhpcy50cmFucyA9IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfTtcbiAgICB0aGlzLnNjYWxlID0gMTtcblxuICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcblxuICAgIHRoaXMuc2V0RXZlbnRMaXN0ZW5lcigpO1xuICB9XG5cbiAgem9vbShzY2FsZSkge1xuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLmJvYXJkLnpvb20odGhpcy5zY2FsZSk7XG4gIH1cblxuICB0cmFuc2xhdGUoeCwgeSkge1xuICAgIHRoaXMuYm9hcmQudHJhbnNsYXRlKHgsIHkpO1xuICB9XG5cbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5ib2FyZC5zaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG1pblNjYWxlID0gMC4wNTtcbiAgICAgIGNvbnN0IG1heFNjYWxlID0gMTA7XG5cbiAgICAgIGlmKGV2ZW50LmRlbHRhWSA+IDApIHtcbiAgICAgICAgdGhpcy5zY2FsZSAqPSAwLjk1O1xuICAgICAgfWVsc2Uge1xuICAgICAgICB0aGlzLnNjYWxlICo9IDEuMDU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zY2FsZSA8IG1pblNjYWxlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBtaW5TY2FsZTtcbiAgICAgIH0gZWxzZSBpZiAobWF4U2NhbGUgPCB0aGlzLnNjYWxlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBtYXhTY2FsZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYm9hcmQuem9vbSh0aGlzLnNjYWxlKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMudHJhbnMuZW5hYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLnRyYW5zLnggPSBldmVudC5jbGllbnRYO1xuICAgICAgdGhpcy50cmFucy55ID0gZXZlbnQuY2xpZW50WTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy50cmFucy5lbmFibGVkKSB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSB7XG4gICAgICAgICAgeDogZXZlbnQuY2xpZW50WCAtIHRoaXMudHJhbnMueCxcbiAgICAgICAgICB5OiBldmVudC5jbGllbnRZIC0gdGhpcy50cmFucy55LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZShkaWZmLngsIGRpZmYueSk7XG4gICAgICAgIHRoaXMudHJhbnMueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIHRoaXMudHJhbnMueSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc3RhcnRTdG9yeSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgQm9hcmQgfSBmcm9tICcuL3ZpZXdzL2JvYXJkJztcbi8vaW1wb3J0IHsgc3RvcnkgfSBmcm9tICcuL3NhbXBsZS1zdG9yeSc7XG5pbXBvcnQgeyBzdG9yeSB9IGZyb20gJy4vdHdpdHRlci1zdG9yeSc7XG5pbXBvcnQgeyBCb2FyZENvbnRyb2xsZXIgfSBmcm9tICcuL2JvYXJkLWNvbnRyb2xsZXInO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coYFN0YXJ0IGFwcCBhdCAkeyhuZXcgRGF0ZSgpKS50b1N0cmluZygpfS5gKTtcblxuICBzdGFydFN0b3J5KHN0b3J5KS50aGVuKChnZW5lcmF0ZWRTdG9yeSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3J5dGVsbGVyJyk7XG5cbiAgICBjb25zdCBib2FyZCA9IG5ldyBCb2FyZChjYW52YXNFbGVtZW50LCBnZW5lcmF0ZWRTdG9yeSwge1xuICAgICAgcGFkZGluZzoge1xuICAgICAgICB4OiAzMjAsXG4gICAgICAgIHk6IDIwMCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEJvYXJkQ29udHJvbGxlcihib2FyZCk7XG4gICAgY29udHJvbGxlci5zaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGNvbnRyb2xsZXIuem9vbSgwLjIpO1xuICAgIGNvbnRyb2xsZXIudHJhbnNsYXRlKDgwLCAxMDApO1xuICB9KTtcbn0pO1xuIiwiY29uc3QgdHJhbnNpdGlvbkNvbG9yID0gJyMxZGExZjInO1xuXG5jb25zdCBob21lID0ge1xuICBpZDogJy9ob21lJyxcbiAgZ3JpZDogeyB4OiAwLCB5OiAwIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9ob21lLnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbe1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL3Bvc3RzL3Nob3cnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyNDQsIHk6IDI0NywgcmFkaXVzOiA4LCB9LFxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDYwLCB5OiA2MCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiA2MCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiA1MTcsIHJhZGl1czogOCwgfSxcbiAgfSwge1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgcm9vbTogeyB4OiAzMCwgeTogLTMwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9zZWFyY2gnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAxMjgsIHk6IDYzLCByYWRpdXM6IDgsIH0sXG4gIH0sIHtcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9ub3RpZmljYXRpb25zL2luZGV4JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjA0LCB5OiA2MywgcmFkaXVzOiA4LCB9LFxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IC0zMCwgeTogOTAsIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL21lbnUnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyMSwgeTogMzEsIHJhZGl1czogOCwgfSxcbiAgfV0sXG59O1xuXG5jb25zdCBwb3N0c1Nob3cgPSB7XG4gIGlkOiAnL3Bvc3RzL3Nob3cnLFxuICBncmlkOiB7IHg6IDEsIHk6IDAgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL3Bvc3RzX3Nob3cucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDEyMCwgeTogMCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiA1MTcsIHJhZGl1czogOCwgfSxcbiAgfV0sXG59O1xuXG5jb25zdCBwb3N0c05ldyA9IHtcbiAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAxIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9wb3N0c19uZXcucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9ob21lJyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiAyMCwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHNlYXJjaCA9IHtcbiAgaWQ6ICcvc2VhcmNoJyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAyIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9zZWFyY2gucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFtdLFxufTtcblxuY29uc3Qgbm90aWZpY2F0aW9uc0luZGV4ID0ge1xuICBpZDogJy9ub3RpZmljYXRpb25zL2luZGV4JyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAzIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9ub3RpZmljYXRpb25zX2luZGV4LnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbXSxcbn07XG5cbmNvbnN0IG1lbnUgPSB7XG4gIGlkOiAnL21lbnUnLFxuICBncmlkOiB7IHg6IDEsIHk6IDQgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL21lbnUucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcHJvZmlsZScsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDIxLCB5OiAzMSwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHByb2ZpbGUgPSB7XG4gIGlkOiAnL3Byb2ZpbGUnLFxuICBncmlkOiB7IHg6IDIsIHk6IDAgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL3Byb2ZpbGUucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFtdLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0b3J5ID0gW1xuICBob21lLFxuICBwb3N0c1Nob3csXG4gIHBvc3RzTmV3LFxuICBzZWFyY2gsXG4gIG5vdGlmaWNhdGlvbnNJbmRleCxcbiAgbWVudSxcbiAgcHJvZmlsZSxcbl07XG4iLCJleHBvcnQgZnVuY3Rpb24gc3RhcnRTdG9yeShzdG9yeSkge1xuICBjb25zdCBfc3RvcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0b3J5KSk7XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKF9zdG9yeS5tYXAoKHNjZW5lKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKHNjZW5lLnNjcmVlbi5pbWFnZVBhdGgpIHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSBzY2VuZS5zY3JlZW4uaW1hZ2VQYXRoO1xuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgIHNjZW5lLnNjcmVlbi5pbWcgPSBpbWc7XG4gICAgICAgICAgaWYgKHNjZW5lLnNjcmVlbi53aWR0aCAmJiAhc2NlbmUuc2NyZWVuLmhlaWdodCkge1xuICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBpbWcud2lkdGggLyBzY2VuZS5zY3JlZW4ud2lkdGg7XG4gICAgICAgICAgICBzY2VuZS5zY3JlZW4uaGVpZ2h0ID0gaW1nLmhlaWdodCAvIHNjYWxlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXNjZW5lLnNjcmVlbi53aWR0aCAmJiBzY2VuZS5zY3JlZW4uaGVpZ2h0KSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZSA9IGltZy5oZWlnaHQgLyBzY2VuZS5zY3JlZW4uaGVpZ2h0O1xuICAgICAgICAgICAgc2NlbmUuc2NyZWVuLndpZHRoID0gaW1nLndpZHRoIC8gc2NhbGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKS50aGVuKCgpID0+IHtcbiAgICByZXR1cm4gX3N0b3J5O1xuICB9KTtcbn1cblxuIiwiaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZSc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAnLi90cmFuc2l0aW9uJztcblxuLypcbiAqIEJvYXJkXG4gKiAtIGNvbnN0cnVjdG9yXG4gKiAgIC0gb3B0aW9uc1xuICogICAgIC0gcnVsZXJDb2xvclxuICogICAgIC0gcGFkZGluZ1xuICogICAgICAgLSB4XG4gKiAgICAgICAtIHlcbiAqIC0gc2l6ZVxuICogLSB6b29tXG4gKiAtIHRyYW5zbGF0ZVxuICogLSBfZmluZFBhZ2VcbiAqIC0gX2dlbmVyYXRlUnVsZXJzXG4gKiAtIF9jbGVhclxuICogLSBfcmVuZGVyUnVsZXJzXG4gKiAtIF9yZW5kZXJQYWdlc1xuICogLSBfcmVuZGVyVHJhbnNpdGlvbnNcbiAqL1xuXG5leHBvcnQgY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcihlbCwgc3RvcnksIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuc3RvcnkgPSBzdG9yeTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucnVsZXJzID0gdGhpcy5fZ2VuZXJhdGVSdWxlcnModGhpcy5zdG9yeSk7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5wYWdlcyA9IFtdO1xuXG4gICAgdGhpcy5fY2xlYXIoKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLmVsLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbC5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHpvb20oc2NhbGUpIHtcbiAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgdHJhbnNsYXRlKHgsIHkpIHtcbiAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSh4LCB5KTtcbiAgICB0aGlzLmNvbnRleHQuc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG5cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIF9maW5kUGFnZShwYWdlSWQpIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcy5maWx0ZXIocGFnZSA9PiB7XG4gICAgICByZXR1cm4gcGFnZS5pZCA9PT0gcGFnZUlkO1xuICAgIH0pWzBdIHx8IG51bGw7XG4gIH1cblxuICBfZ2VuZXJhdGVSdWxlcnMoc3RvcnkpIHtcbiAgICBjb25zdCBydWxlcnMgPSB7XG4gICAgICB4OiBbXSxcbiAgICAgIHk6IFtdLFxuICAgIH07XG4gICAgY29uc3QgcGFkZGluZyA9IHRoaXMub3B0aW9ucy5wYWRkaW5nO1xuXG4gICAgLy8gR2VuZXJhdGUgeCBydWxlcnNcbiAgICBzdG9yeS5zb3J0KChzY2VuZTEsIHNjZW5lMikgPT4ge1xuICAgICAgcmV0dXJuIChzY2VuZTEuZ3JpZC54IC0gc2NlbmUyLmdyaWQueCk7XG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2NlbmUgPSBzdG9yeVtpXTtcbiAgICAgIGNvbnN0IHggPSBzY2VuZS5ncmlkLng7XG4gICAgICBjb25zdCBjdXJyZW50UnVsZXJYID0gcnVsZXJzLnhbeF0gfHwgbnVsbDtcbiAgICAgIGNvbnN0IG5leHRSdWxlclggPSBydWxlcnMueFt4ICsgMV0gfHwgbnVsbDtcblxuICAgICAgaWYgKGN1cnJlbnRSdWxlclggPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnhbeF0gPSAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0TmV3UnVsZXJYID0gcnVsZXJzLnhbeF0gKyBzY2VuZS5zY3JlZW4ud2lkdGggKyBwYWRkaW5nLng7XG4gICAgICBpZiAobmV4dFJ1bGVyWCA9PT0gbnVsbCkge1xuICAgICAgICBydWxlcnMueFt4ICsgMV0gPSBuZXh0TmV3UnVsZXJYO1xuICAgICAgfSBlbHNlIGlmIChuZXh0UnVsZXJYIDwgbmV4dE5ld1J1bGVyWCkge1xuICAgICAgICBydWxlcnMueFt4ICsgMV0gPSBuZXh0TmV3UnVsZXJYO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIHkgcnVsZXJzXG4gICAgc3Rvcnkuc29ydCgoc2NlbmUxLCBzY2VuZTIpID0+IHtcbiAgICAgIHJldHVybiAoc2NlbmUxLmdyaWQueSAtIHNjZW5lMi5ncmlkLnkpO1xuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNjZW5lID0gc3RvcnlbaV07XG4gICAgICBjb25zdCB5ID0gc2NlbmUuZ3JpZC55O1xuICAgICAgY29uc3QgY3VycmVudFJ1bGVyWSA9IHJ1bGVycy55W3ldIHx8IG51bGw7XG4gICAgICBjb25zdCBuZXh0UnVsZXJZID0gcnVsZXJzLnlbeSArIDFdIHx8IG51bGw7XG5cbiAgICAgIGlmIChjdXJyZW50UnVsZXJZID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy55W3ldID0gMDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV4dE5ld1J1bGVyWSA9IHJ1bGVycy55W3ldICsgc2NlbmUuc2NyZWVuLmhlaWdodCArIHBhZGRpbmcueTtcbiAgICAgIGlmIChuZXh0UnVsZXJZID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy55W3kgKyAxXSA9IG5leHROZXdSdWxlclk7XG4gICAgICB9IGVsc2UgaWYgKG5leHRSdWxlclkgPCBuZXh0TmV3UnVsZXJZKSB7XG4gICAgICAgIHJ1bGVycy55W3kgKyAxXSA9IG5leHROZXdSdWxlclk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGVycztcbiAgfVxuXG4gIF9jbGVhcigpIHtcbiAgICAvLyBUT0RPOiBPcHRpbWl6ZSBjbGVhclJlY3Qgc2l6ZVxuICAgIHRoaXMuY29udGV4dC5zY2FsZSgxIC8gdGhpcy5zY2FsZSwgMSAvIHRoaXMuc2NhbGUpO1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoLTEwMDAwLCAtMTAwMDAsIDEwMDAwMCwgMTAwMDAwKTtcbiAgfVxuXG4gIF9yZW5kZXJSdWxlcnMoKSB7XG4gICAgY29uc3QgY29sb3IgPSB0aGlzLm9wdGlvbnMucnVsZXJDb2xvciB8fCAncmdiYSgyMTYsIDUzLCA1MywgMC43MiknO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJ1bGVycy54Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5ydWxlcnMueFtpXTtcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4LCAtMTAwMDAwKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeCwgMTAwMDAwKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucnVsZXJzLnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLnJ1bGVycy55W2ldO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKC0xMDAwMDAsIHkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbygxMDAwMDAsIHkpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cbiAgfVxuXG4gIF9yZW5kZXJQYWdlcygpIHtcbiAgICB0aGlzLnN0b3J5LmZvckVhY2goc2NlbmUgPT4ge1xuICAgICAgY29uc3QgeCA9IHNjZW5lLmdyaWQueDtcbiAgICAgIGNvbnN0IHkgPSBzY2VuZS5ncmlkLnk7XG4gICAgICBjb25zdCBwYWdlID0gbmV3IFBhZ2UodGhpcy5jb250ZXh0LCBzY2VuZSwgdGhpcy5ydWxlcnMpO1xuICAgICAgdGhpcy5wYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgX3JlbmRlclRyYW5zaXRpb25zKCkge1xuICAgIHRoaXMucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHBhZ2Uuc2NlbmUudHJhbnNpdGlvbnMuZm9yRWFjaCgodHJhbnNpdGlvbikgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRQYWdlID0gdGhpcy5fZmluZFBhZ2UodHJhbnNpdGlvbi50by5pZCk7XG4gICAgICAgIG5ldyBUcmFuc2l0aW9uKHRoaXMuY29udGV4dCwge1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgdGFyZ2V0UGFnZSxcbiAgICAgICAgICB0cmFuc2l0aW9uLFxuICAgICAgICAgIHJ1bGVyczogdGhpcy5ydWxlcnMsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBfcmVuZGVyKCkge1xuICAgIHRoaXMuX3JlbmRlclBhZ2VzKCk7XG4gICAgdGhpcy5fcmVuZGVyVHJhbnNpdGlvbnMoKTtcbiAgICB0aGlzLl9yZW5kZXJSdWxlcnMoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0LCBzY2VuZSwgcnVsZXJzKSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5ydWxlcnMgPSBydWxlcnM7XG4gICAgdGhpcy5pZCA9IHRoaXMuc2NlbmUuaWQ7XG4gICAgdGhpcy5ncmlkID0gdGhpcy5zY2VuZS5ncmlkO1xuICAgIHRoaXMud2lkdGggPSB0aGlzLnNjZW5lLnNjcmVlbi53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodDtcbiAgICB0aGlzLnggPSB0aGlzLnJ1bGVycy54W3RoaXMuZ3JpZC54XSArICgodGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueCArIDFdIC0gdGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueF0gLSB0aGlzLndpZHRoKSAvIDIpO1xuICAgIHRoaXMueSA9IHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgKCh0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55ICsgMV0gLSB0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55XSAtIHRoaXMuaGVpZ2h0KSAvIDIpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuc2NlbmUuY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC4zMiknO1xuXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY29udGV4dC5zaGFkb3dDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMjQpJztcbiAgICB0aGlzLmNvbnRleHQuc2hhZG93Qmx1ciA9IDM7XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd09mZnNldFggPSAwO1xuICAgIHRoaXMuY29udGV4dC5zaGFkb3dPZmZzZXRZID0gMDtcbiAgICBpZiAodGhpcy5zY2VuZS5zY3JlZW4uaW1nKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuc2NlbmUuc2NyZWVuLmltZywgdGhpcy54LCB0aGlzLnksIHRoaXMuc2NlbmUuc2NyZWVuLndpZHRoLCB0aGlzLnNjZW5lLnNjcmVlbi5oZWlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMuc2NlbmUuc2NyZWVuLndpZHRoLCB0aGlzLnNjZW5lLnNjcmVlbi5oZWlnaHQpO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQuc2hhZG93Qmx1ciA9IDA7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUcmFuc2l0aW9uIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwge3BhZ2UsIHRhcmdldFBhZ2UsIHRyYW5zaXRpb24sIHJ1bGVyc30pIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgdGhpcy50YXJnZXRQYWdlID0gdGFyZ2V0UGFnZTtcbiAgICB0aGlzLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICAgIHRoaXMucnVsZXJzID0gcnVsZXJzO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlclN0YXJ0UG9pbnQoe3N0YXJ0WCwgc3RhcnRZLCByYWRpdXN9KSB7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMoc3RhcnRYLCBzdGFydFksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcmVuZGVyVHJhbnNpdGlvbkxpbmUoe3N0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCByb29tfSkge1xuICAgIGNvbnN0IGN1cnJlbnRHcmlkID0gdGhpcy5wYWdlLmdyaWQ7XG4gICAgY29uc3QgdGFyZ2V0R3JpZCA9IHRoaXMudGFyZ2V0UGFnZS5ncmlkO1xuXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oc3RhcnRYLCBzdGFydFkpO1xuICAgIGlmIChjdXJyZW50R3JpZC55ID4gdGFyZ2V0R3JpZC55KSB7XG4gICAgICAvLyBsaW5lVG8gdG9wLlxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzdGFydFgsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA8IHRhcmdldEdyaWQueSkge1xuICAgICAgLy8gbGluZVRvIGJvdHRvbS5cbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oc3RhcnRYLCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnkgKyAxXSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55ICsgMV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA9PT0gdGFyZ2V0R3JpZC55ICYmIGN1cnJlbnRHcmlkLnggPiB0YXJnZXRHcmlkLngpIHtcbiAgICAgIC8vIGxpbmVUbyBsZWZ0XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRHcmlkLnkgPT09IHRhcmdldEdyaWQueSAmJiBjdXJyZW50R3JpZC54IDwgdGFyZ2V0R3JpZC54KSB7XG4gICAgICAvLyBsaW5lVG8gcmlnaHRcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICBpZiAodGFyZ2V0R3JpZC54IC0gY3VycmVudEdyaWQueCA+IDEpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIGVuZFkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueSwgZW5kWSk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5saW5lVG8oZW5kWCwgZW5kWSk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcmVuZGVyRW5kQXJyb3coe2VuZFgsIGVuZFl9KSB7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oZW5kWCwgZW5kWSk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYIC0gMTQsIGVuZFkgKyAxMCk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYIC0gMTQsIGVuZFkgLSAxMCk7XG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGZyb20gPSB0aGlzLnRyYW5zaXRpb24uZnJvbSB8fCB7XG4gICAgICB4OiB0aGlzLnBhZ2Uud2lkdGgsXG4gICAgICB5OiAwLFxuICAgICAgcmFkaXVzOiAxMixcbiAgICB9O1xuICAgIGNvbnN0IHRvT2Zmc2V0ID0gdGhpcy50cmFuc2l0aW9uLnRvLm9mZnNldCB8fCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBjb2xvcjogdGhpcy50cmFuc2l0aW9uLmNvbG9yIHx8ICdyZ2JhKDAsIDAsIDAsIDAuNDgpJyxcbiAgICAgIHJhZGl1czogZnJvbS5yYWRpdXMsXG4gICAgICByb29tOiB0aGlzLnRyYW5zaXRpb24ucm9vbSB8fCB7eDogMCwgeTogMH0sXG4gICAgICBzdGFydFg6IHRoaXMucGFnZS54ICsgZnJvbS54LFxuICAgICAgc3RhcnRZOiB0aGlzLnBhZ2UueSArIGZyb20ueSxcbiAgICAgIGVuZFg6IHRoaXMudGFyZ2V0UGFnZS54ICsgdG9PZmZzZXQueCxcbiAgICAgIGVuZFk6IHRoaXMudGFyZ2V0UGFnZS55ICsgdG9PZmZzZXQueSxcbiAgICB9O1xuXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gb3B0aW9ucy5jb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gb3B0aW9ucy5jb2xvcjtcblxuICAgIHRoaXMucmVuZGVyU3RhcnRQb2ludChvcHRpb25zKTtcbiAgICB0aGlzLnJlbmRlclRyYW5zaXRpb25MaW5lKG9wdGlvbnMpO1xuICAgIHRoaXMucmVuZGVyRW5kQXJyb3cob3B0aW9ucyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=