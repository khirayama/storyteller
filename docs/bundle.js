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
    imagePath: '/images/twitter/home.png'
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
    imagePath: '/images/twitter/posts_show.png'
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
    imagePath: '/images/twitter/posts_new.png'
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
    imagePath: '/images/twitter/search.png'
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
    imagePath: '/images/twitter/notifications_index.png'
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
    imagePath: '/images/twitter/menu.png'
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
    imagePath: '/images/twitter/profile.png'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90d2l0dGVyLXN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3RyYW5zaXRpb24uanMiXSwibmFtZXMiOlsiQm9hcmRDb250cm9sbGVyIiwiYm9hcmQiLCJ0cmFucyIsImVuYWJsZWQiLCJ4IiwieSIsInNjYWxlIiwic2V0RXZlbnRMaXN0ZW5lciIsInpvb20iLCJ0cmFuc2xhdGUiLCJ3aWR0aCIsImhlaWdodCIsInNpemUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1pblNjYWxlIiwibWF4U2NhbGUiLCJkZWx0YVkiLCJjbGllbnRYIiwiY2xpZW50WSIsImRpZmYiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInRvU3RyaW5nIiwic3RvcnkiLCJ0aGVuIiwiZ2VuZXJhdGVkU3RvcnkiLCJjYW52YXNFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiQm9hcmQiLCJwYWRkaW5nIiwiY29udHJvbGxlciIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInRyYW5zaXRpb25Db2xvciIsImhvbWUiLCJpZCIsImdyaWQiLCJzY3JlZW4iLCJpbWFnZVBhdGgiLCJ0cmFuc2l0aW9ucyIsImNvbG9yIiwidG8iLCJvZmZzZXQiLCJmcm9tIiwicmFkaXVzIiwicm9vbSIsInBvc3RzU2hvdyIsInBvc3RzTmV3Iiwic2VhcmNoIiwibm90aWZpY2F0aW9uc0luZGV4IiwibWVudSIsInByb2ZpbGUiLCJzdGFydFN0b3J5IiwiX3N0b3J5IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInNjZW5lIiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJyZXNvbHZlIiwiZWwiLCJvcHRpb25zIiwiY29udGV4dCIsImdldENvbnRleHQiLCJydWxlcnMiLCJfZ2VuZXJhdGVSdWxlcnMiLCJwYWdlcyIsIl9jbGVhciIsIl9yZW5kZXIiLCJwYWdlSWQiLCJmaWx0ZXIiLCJwYWdlIiwic29ydCIsInNjZW5lMSIsInNjZW5lMiIsImkiLCJsZW5ndGgiLCJjdXJyZW50UnVsZXJYIiwibmV4dFJ1bGVyWCIsIm5leHROZXdSdWxlclgiLCJjdXJyZW50UnVsZXJZIiwibmV4dFJ1bGVyWSIsIm5leHROZXdSdWxlclkiLCJjbGVhclJlY3QiLCJydWxlckNvbG9yIiwiYmVnaW5QYXRoIiwic3Ryb2tlU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJmb3JFYWNoIiwiUGFnZSIsInB1c2giLCJ0cmFuc2l0aW9uIiwidGFyZ2V0UGFnZSIsIl9maW5kUGFnZSIsIlRyYW5zaXRpb24iLCJfcmVuZGVyUGFnZXMiLCJfcmVuZGVyVHJhbnNpdGlvbnMiLCJfcmVuZGVyUnVsZXJzIiwicmVuZGVyIiwiZmlsbFN0eWxlIiwic2hhZG93Q29sb3IiLCJzaGFkb3dCbHVyIiwic2hhZG93T2Zmc2V0WCIsInNoYWRvd09mZnNldFkiLCJkcmF3SW1hZ2UiLCJmaWxsUmVjdCIsInN0YXJ0WCIsInN0YXJ0WSIsImFyYyIsIk1hdGgiLCJQSSIsImZpbGwiLCJlbmRYIiwiZW5kWSIsImN1cnJlbnRHcmlkIiwidGFyZ2V0R3JpZCIsImNsb3NlUGF0aCIsInRvT2Zmc2V0IiwicmVuZGVyU3RhcnRQb2ludCIsInJlbmRlclRyYW5zaXRpb25MaW5lIiwicmVuZGVyRW5kQXJyb3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QU0sS0FBS3FELFVBQUwsQ0FBZ0JyRCxJQUFoQixJQUF3QjtBQUFDOUMsYUFBRyxDQUFKO0FBQU9DLGFBQUc7QUFBVixTQUhoQjtBQUlkaUgsZ0JBQVEsS0FBS3JDLElBQUwsQ0FBVTdFLENBQVYsR0FBYzRDLEtBQUs1QyxDQUpiO0FBS2RtSCxnQkFBUSxLQUFLdEMsSUFBTCxDQUFVNUUsQ0FBVixHQUFjMkMsS0FBSzNDLENBTGI7QUFNZHVILGNBQU0sS0FBS3BCLFVBQUwsQ0FBZ0JwRyxDQUFoQixHQUFvQjZILFNBQVM3SCxDQU5yQjtBQU9keUgsY0FBTSxLQUFLckIsVUFBTCxDQUFnQm5HLENBQWhCLEdBQW9CNEgsU0FBUzVIO0FBUHJCLE9BQWhCO0FBVUEsV0FBS21FLE9BQUwsQ0FBYXdCLFdBQWIsR0FBMkJ6QixRQUFRMUIsS0FBbkM7QUFDQSxXQUFLMkIsT0FBTCxDQUFhdUMsU0FBYixHQUF5QnhDLFFBQVExQixLQUFqQztBQUVBLFdBQUtxRixnQkFBTCxDQUFzQjNELE9BQXRCO0FBQ0EsV0FBSzRELG9CQUFMLENBQTBCNUQsT0FBMUI7QUFDQSxXQUFLNkQsY0FBTCxDQUFvQjdELE9BQXBCO0FBQ0QiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEJvYXJkQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGJvYXJkKSB7XG4gICAgdGhpcy50cmFucyA9IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfTtcbiAgICB0aGlzLnNjYWxlID0gMTtcblxuICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcblxuICAgIHRoaXMuc2V0RXZlbnRMaXN0ZW5lcigpO1xuICB9XG5cbiAgem9vbShzY2FsZSkge1xuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLmJvYXJkLnpvb20odGhpcy5zY2FsZSk7XG4gIH1cblxuICB0cmFuc2xhdGUoeCwgeSkge1xuICAgIHRoaXMuYm9hcmQudHJhbnNsYXRlKHgsIHkpO1xuICB9XG5cbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5ib2FyZC5zaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG1pblNjYWxlID0gMC4wNTtcbiAgICAgIGNvbnN0IG1heFNjYWxlID0gMTA7XG5cbiAgICAgIGlmKGV2ZW50LmRlbHRhWSA+IDApIHtcbiAgICAgICAgdGhpcy5zY2FsZSAqPSAwLjk1O1xuICAgICAgfWVsc2Uge1xuICAgICAgICB0aGlzLnNjYWxlICo9IDEuMDU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zY2FsZSA8IG1pblNjYWxlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBtaW5TY2FsZTtcbiAgICAgIH0gZWxzZSBpZiAobWF4U2NhbGUgPCB0aGlzLnNjYWxlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBtYXhTY2FsZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYm9hcmQuem9vbSh0aGlzLnNjYWxlKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMudHJhbnMuZW5hYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLnRyYW5zLnggPSBldmVudC5jbGllbnRYO1xuICAgICAgdGhpcy50cmFucy55ID0gZXZlbnQuY2xpZW50WTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy50cmFucy5lbmFibGVkKSB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSB7XG4gICAgICAgICAgeDogZXZlbnQuY2xpZW50WCAtIHRoaXMudHJhbnMueCxcbiAgICAgICAgICB5OiBldmVudC5jbGllbnRZIC0gdGhpcy50cmFucy55LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZShkaWZmLngsIGRpZmYueSk7XG4gICAgICAgIHRoaXMudHJhbnMueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIHRoaXMudHJhbnMueSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc3RhcnRTdG9yeSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgQm9hcmQgfSBmcm9tICcuL3ZpZXdzL2JvYXJkJztcbi8vaW1wb3J0IHsgc3RvcnkgfSBmcm9tICcuL3NhbXBsZS1zdG9yeSc7XG5pbXBvcnQgeyBzdG9yeSB9IGZyb20gJy4vdHdpdHRlci1zdG9yeSc7XG5pbXBvcnQgeyBCb2FyZENvbnRyb2xsZXIgfSBmcm9tICcuL2JvYXJkLWNvbnRyb2xsZXInO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coYFN0YXJ0IGFwcCBhdCAkeyhuZXcgRGF0ZSgpKS50b1N0cmluZygpfS5gKTtcblxuICBzdGFydFN0b3J5KHN0b3J5KS50aGVuKChnZW5lcmF0ZWRTdG9yeSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3J5dGVsbGVyJyk7XG5cbiAgICBjb25zdCBib2FyZCA9IG5ldyBCb2FyZChjYW52YXNFbGVtZW50LCBnZW5lcmF0ZWRTdG9yeSwge1xuICAgICAgcGFkZGluZzoge1xuICAgICAgICB4OiAzMjAsXG4gICAgICAgIHk6IDIwMCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEJvYXJkQ29udHJvbGxlcihib2FyZCk7XG4gICAgY29udHJvbGxlci5zaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGNvbnRyb2xsZXIuem9vbSgwLjIpO1xuICAgIGNvbnRyb2xsZXIudHJhbnNsYXRlKDgwLCAxMDApO1xuICB9KTtcbn0pO1xuIiwiY29uc3QgdHJhbnNpdGlvbkNvbG9yID0gJyMxZGExZjInO1xuXG5jb25zdCBob21lID0ge1xuICBpZDogJy9ob21lJyxcbiAgZ3JpZDogeyB4OiAwLCB5OiAwIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnL2ltYWdlcy90d2l0dGVyL2hvbWUucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcG9zdHMvc2hvdycsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDI0NCwgeTogMjQ3LCByYWRpdXM6IDgsIH0sXG4gIH0sIHtcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHJvb206IHsgeDogNjAsIHk6IDYwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9wb3N0cy9uZXcnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDYwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyNzEsIHk6IDUxNywgcmFkaXVzOiA4LCB9LFxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDMwLCB5OiAtMzAsIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL3NlYXJjaCcsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDEyOCwgeTogNjMsIHJhZGl1czogOCwgfSxcbiAgfSwge1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL25vdGlmaWNhdGlvbnMvaW5kZXgnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyMDQsIHk6IDYzLCByYWRpdXM6IDgsIH0sXG4gIH0sIHtcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHJvb206IHsgeDogLTMwLCB5OiA5MCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvbWVudScsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDIxLCB5OiAzMSwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHBvc3RzU2hvdyA9IHtcbiAgaWQ6ICcvcG9zdHMvc2hvdycsXG4gIGdyaWQ6IHsgeDogMSwgeTogMCB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy9pbWFnZXMvdHdpdHRlci9wb3N0c19zaG93LnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbe1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgcm9vbTogeyB4OiAxMjAsIHk6IDAsIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL3Bvc3RzL25ldycsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDI3MSwgeTogNTE3LCByYWRpdXM6IDgsIH0sXG4gIH1dLFxufTtcblxuY29uc3QgcG9zdHNOZXcgPSB7XG4gIGlkOiAnL3Bvc3RzL25ldycsXG4gIGdyaWQ6IHsgeDogMSwgeTogMSB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy9pbWFnZXMvdHdpdHRlci9wb3N0c19uZXcucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9ob21lJyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiAyMCwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHNlYXJjaCA9IHtcbiAgaWQ6ICcvc2VhcmNoJyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAyIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnL2ltYWdlcy90d2l0dGVyL3NlYXJjaC5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW10sXG59O1xuXG5jb25zdCBub3RpZmljYXRpb25zSW5kZXggPSB7XG4gIGlkOiAnL25vdGlmaWNhdGlvbnMvaW5kZXgnLFxuICBncmlkOiB7IHg6IDEsIHk6IDMgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcvaW1hZ2VzL3R3aXR0ZXIvbm90aWZpY2F0aW9uc19pbmRleC5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW10sXG59O1xuXG5jb25zdCBtZW51ID0ge1xuICBpZDogJy9tZW51JyxcbiAgZ3JpZDogeyB4OiAxLCB5OiA0IH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnL2ltYWdlcy90d2l0dGVyL21lbnUucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcHJvZmlsZScsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDIxLCB5OiAzMSwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHByb2ZpbGUgPSB7XG4gIGlkOiAnL3Byb2ZpbGUnLFxuICBncmlkOiB7IHg6IDIsIHk6IDAgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcvaW1hZ2VzL3R3aXR0ZXIvcHJvZmlsZS5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW10sXG59O1xuXG5leHBvcnQgY29uc3Qgc3RvcnkgPSBbXG4gIGhvbWUsXG4gIHBvc3RzU2hvdyxcbiAgcG9zdHNOZXcsXG4gIHNlYXJjaCxcbiAgbm90aWZpY2F0aW9uc0luZGV4LFxuICBtZW51LFxuICBwcm9maWxlLFxuXTtcbiIsImV4cG9ydCBmdW5jdGlvbiBzdGFydFN0b3J5KHN0b3J5KSB7XG4gIGNvbnN0IF9zdG9yeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3RvcnkpKTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoX3N0b3J5Lm1hcCgoc2NlbmUpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAoc2NlbmUuc2NyZWVuLmltYWdlUGF0aCkge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHNjZW5lLnNjcmVlbi5pbWFnZVBhdGg7XG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgc2NlbmUuc2NyZWVuLmltZyA9IGltZztcbiAgICAgICAgICBpZiAoc2NlbmUuc2NyZWVuLndpZHRoICYmICFzY2VuZS5zY3JlZW4uaGVpZ2h0KSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZSA9IGltZy53aWR0aCAvIHNjZW5lLnNjcmVlbi53aWR0aDtcbiAgICAgICAgICAgIHNjZW5lLnNjcmVlbi5oZWlnaHQgPSBpbWcuaGVpZ2h0IC8gc2NhbGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghc2NlbmUuc2NyZWVuLndpZHRoICYmIHNjZW5lLnNjcmVlbi5oZWlnaHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gaW1nLmhlaWdodCAvIHNjZW5lLnNjcmVlbi5oZWlnaHQ7XG4gICAgICAgICAgICBzY2VuZS5zY3JlZW4ud2lkdGggPSBpbWcud2lkdGggLyBzY2FsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkpLnRoZW4oKCkgPT4ge1xuICAgIHJldHVybiBfc3Rvcnk7XG4gIH0pO1xufVxuXG4iLCJpbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICcuL3RyYW5zaXRpb24nO1xuXG4vKlxuICogQm9hcmRcbiAqIC0gY29uc3RydWN0b3JcbiAqICAgLSBvcHRpb25zXG4gKiAgICAgLSBydWxlckNvbG9yXG4gKiAgICAgLSBwYWRkaW5nXG4gKiAgICAgICAtIHhcbiAqICAgICAgIC0geVxuICogLSBzaXplXG4gKiAtIHpvb21cbiAqIC0gdHJhbnNsYXRlXG4gKiAtIF9maW5kUGFnZVxuICogLSBfZ2VuZXJhdGVSdWxlcnNcbiAqIC0gX2NsZWFyXG4gKiAtIF9yZW5kZXJSdWxlcnNcbiAqIC0gX3JlbmRlclBhZ2VzXG4gKiAtIF9yZW5kZXJUcmFuc2l0aW9uc1xuICovXG5cbmV4cG9ydCBjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKGVsLCBzdG9yeSwgb3B0aW9ucykge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5zdG9yeSA9IHN0b3J5O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5ydWxlcnMgPSB0aGlzLl9nZW5lcmF0ZVJ1bGVycyh0aGlzLnN0b3J5KTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnBhZ2VzID0gW107XG5cbiAgICB0aGlzLl9jbGVhcigpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5fY2xlYXIoKTtcblxuICAgIHRoaXMuZWwud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgem9vbShzY2FsZSkge1xuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuXG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICB0cmFuc2xhdGUoeCwgeSkge1xuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHgsIHkpO1xuICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgX2ZpbmRQYWdlKHBhZ2VJZCkge1xuICAgIHJldHVybiB0aGlzLnBhZ2VzLmZpbHRlcihwYWdlID0+IHtcbiAgICAgIHJldHVybiBwYWdlLmlkID09PSBwYWdlSWQ7XG4gICAgfSlbMF0gfHwgbnVsbDtcbiAgfVxuXG4gIF9nZW5lcmF0ZVJ1bGVycyhzdG9yeSkge1xuICAgIGNvbnN0IHJ1bGVycyA9IHtcbiAgICAgIHg6IFtdLFxuICAgICAgeTogW10sXG4gICAgfTtcbiAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5vcHRpb25zLnBhZGRpbmc7XG5cbiAgICAvLyBHZW5lcmF0ZSB4IHJ1bGVyc1xuICAgIHN0b3J5LnNvcnQoKHNjZW5lMSwgc2NlbmUyKSA9PiB7XG4gICAgICByZXR1cm4gKHNjZW5lMS5ncmlkLnggLSBzY2VuZTIuZ3JpZC54KTtcbiAgICB9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzY2VuZSA9IHN0b3J5W2ldO1xuICAgICAgY29uc3QgeCA9IHNjZW5lLmdyaWQueDtcbiAgICAgIGNvbnN0IGN1cnJlbnRSdWxlclggPSBydWxlcnMueFt4XSB8fCBudWxsO1xuICAgICAgY29uc3QgbmV4dFJ1bGVyWCA9IHJ1bGVycy54W3ggKyAxXSB8fCBudWxsO1xuXG4gICAgICBpZiAoY3VycmVudFJ1bGVyWCA9PT0gbnVsbCkge1xuICAgICAgICBydWxlcnMueFt4XSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5leHROZXdSdWxlclggPSBydWxlcnMueFt4XSArIHNjZW5lLnNjcmVlbi53aWR0aCArIHBhZGRpbmcueDtcbiAgICAgIGlmIChuZXh0UnVsZXJYID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy54W3ggKyAxXSA9IG5leHROZXdSdWxlclg7XG4gICAgICB9IGVsc2UgaWYgKG5leHRSdWxlclggPCBuZXh0TmV3UnVsZXJYKSB7XG4gICAgICAgIHJ1bGVycy54W3ggKyAxXSA9IG5leHROZXdSdWxlclg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgeSBydWxlcnNcbiAgICBzdG9yeS5zb3J0KChzY2VuZTEsIHNjZW5lMikgPT4ge1xuICAgICAgcmV0dXJuIChzY2VuZTEuZ3JpZC55IC0gc2NlbmUyLmdyaWQueSk7XG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2NlbmUgPSBzdG9yeVtpXTtcbiAgICAgIGNvbnN0IHkgPSBzY2VuZS5ncmlkLnk7XG4gICAgICBjb25zdCBjdXJyZW50UnVsZXJZID0gcnVsZXJzLnlbeV0gfHwgbnVsbDtcbiAgICAgIGNvbnN0IG5leHRSdWxlclkgPSBydWxlcnMueVt5ICsgMV0gfHwgbnVsbDtcblxuICAgICAgaWYgKGN1cnJlbnRSdWxlclkgPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnlbeV0gPSAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0TmV3UnVsZXJZID0gcnVsZXJzLnlbeV0gKyBzY2VuZS5zY3JlZW4uaGVpZ2h0ICsgcGFkZGluZy55O1xuICAgICAgaWYgKG5leHRSdWxlclkgPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnlbeSArIDFdID0gbmV4dE5ld1J1bGVyWTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dFJ1bGVyWSA8IG5leHROZXdSdWxlclkpIHtcbiAgICAgICAgcnVsZXJzLnlbeSArIDFdID0gbmV4dE5ld1J1bGVyWTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZXJzO1xuICB9XG5cbiAgX2NsZWFyKCkge1xuICAgIC8vIFRPRE86IE9wdGltaXplIGNsZWFyUmVjdCBzaXplXG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKDEgLyB0aGlzLnNjYWxlLCAxIC8gdGhpcy5zY2FsZSk7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgtMTAwMDAsIC0xMDAwMCwgMTAwMDAwLCAxMDAwMDApO1xuICB9XG5cbiAgX3JlbmRlclJ1bGVycygpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMub3B0aW9ucy5ydWxlckNvbG9yIHx8ICdyZ2JhKDIxNiwgNTMsIDUzLCAwLjcyKSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucnVsZXJzLngubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSB0aGlzLnJ1bGVycy54W2ldO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgsIC0xMDAwMDApO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh4LCAxMDAwMDApO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ydWxlcnMueS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeSA9IHRoaXMucnVsZXJzLnlbaV07XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oLTEwMDAwMCwgeSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKDEwMDAwMCwgeSk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuICB9XG5cbiAgX3JlbmRlclBhZ2VzKCkge1xuICAgIHRoaXMuc3RvcnkuZm9yRWFjaChzY2VuZSA9PiB7XG4gICAgICBjb25zdCB4ID0gc2NlbmUuZ3JpZC54O1xuICAgICAgY29uc3QgeSA9IHNjZW5lLmdyaWQueTtcbiAgICAgIGNvbnN0IHBhZ2UgPSBuZXcgUGFnZSh0aGlzLmNvbnRleHQsIHNjZW5lLCB0aGlzLnJ1bGVycyk7XG4gICAgICB0aGlzLnBhZ2VzLnB1c2gocGFnZSk7XG4gICAgfSk7XG4gIH1cblxuICBfcmVuZGVyVHJhbnNpdGlvbnMoKSB7XG4gICAgdGhpcy5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgcGFnZS5zY2VuZS50cmFuc2l0aW9ucy5mb3JFYWNoKCh0cmFuc2l0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldFBhZ2UgPSB0aGlzLl9maW5kUGFnZSh0cmFuc2l0aW9uLnRvLmlkKTtcbiAgICAgICAgbmV3IFRyYW5zaXRpb24odGhpcy5jb250ZXh0LCB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICB0YXJnZXRQYWdlLFxuICAgICAgICAgIHRyYW5zaXRpb24sXG4gICAgICAgICAgcnVsZXJzOiB0aGlzLnJ1bGVycyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9yZW5kZXIoKSB7XG4gICAgdGhpcy5fcmVuZGVyUGFnZXMoKTtcbiAgICB0aGlzLl9yZW5kZXJUcmFuc2l0aW9ucygpO1xuICAgIHRoaXMuX3JlbmRlclJ1bGVycygpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQsIHNjZW5lLCBydWxlcnMpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnJ1bGVycyA9IHJ1bGVycztcbiAgICB0aGlzLmlkID0gdGhpcy5zY2VuZS5pZDtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLnNjZW5lLmdyaWQ7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMuc2NlbmUuc2NyZWVuLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zY2VuZS5zY3JlZW4uaGVpZ2h0O1xuICAgIHRoaXMueCA9IHRoaXMucnVsZXJzLnhbdGhpcy5ncmlkLnhdICsgKCh0aGlzLnJ1bGVycy54W3RoaXMuZ3JpZC54ICsgMV0gLSB0aGlzLnJ1bGVycy54W3RoaXMuZ3JpZC54XSAtIHRoaXMud2lkdGgpIC8gMik7XG4gICAgdGhpcy55ID0gdGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueV0gKyAoKHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnkgKyAxXSAtIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldIC0gdGhpcy5oZWlnaHQpIC8gMik7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5zY2VuZS5jb2xvciB8fCAncmdiYSgwLCAwLCAwLCAwLjMyKSc7XG5cbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4yNCknO1xuICAgIHRoaXMuY29udGV4dC5zaGFkb3dCbHVyID0gMztcbiAgICB0aGlzLmNvbnRleHQuc2hhZG93T2Zmc2V0WCA9IDA7XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd09mZnNldFkgPSAwO1xuICAgIGlmICh0aGlzLnNjZW5lLnNjcmVlbi5pbWcpIHtcbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5zY2VuZS5zY3JlZW4uaW1nLCB0aGlzLngsIHRoaXMueSwgdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGgsIHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGgsIHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodCk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5zaGFkb3dCbHVyID0gMDtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRyYW5zaXRpb24ge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0LCB7cGFnZSwgdGFyZ2V0UGFnZSwgdHJhbnNpdGlvbiwgcnVsZXJzfSkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB0aGlzLnRhcmdldFBhZ2UgPSB0YXJnZXRQYWdlO1xuICAgIHRoaXMudHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG4gICAgdGhpcy5ydWxlcnMgPSBydWxlcnM7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyU3RhcnRQb2ludCh7c3RhcnRYLCBzdGFydFksIHJhZGl1c30pIHtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmFyYyhzdGFydFgsIHN0YXJ0WSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICByZW5kZXJUcmFuc2l0aW9uTGluZSh7c3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIHJvb219KSB7XG4gICAgY29uc3QgY3VycmVudEdyaWQgPSB0aGlzLnBhZ2UuZ3JpZDtcbiAgICBjb25zdCB0YXJnZXRHcmlkID0gdGhpcy50YXJnZXRQYWdlLmdyaWQ7XG5cbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgaWYgKGN1cnJlbnRHcmlkLnkgPiB0YXJnZXRHcmlkLnkpIHtcbiAgICAgIC8vIGxpbmVUbyB0b3AuXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHN0YXJ0WCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50R3JpZC55IDwgdGFyZ2V0R3JpZC55KSB7XG4gICAgICAvLyBsaW5lVG8gYm90dG9tLlxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzdGFydFgsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueSArIDFdICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnkgKyAxXSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50R3JpZC55ID09PSB0YXJnZXRHcmlkLnkgJiYgY3VycmVudEdyaWQueCA+IHRhcmdldEdyaWQueCkge1xuICAgICAgLy8gbGluZVRvIGxlZnRcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W3RhcmdldEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA9PT0gdGFyZ2V0R3JpZC55ICYmIGN1cnJlbnRHcmlkLnggPCB0YXJnZXRHcmlkLngpIHtcbiAgICAgIC8vIGxpbmVUbyByaWdodFxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgIGlmICh0YXJnZXRHcmlkLnggLSBjdXJyZW50R3JpZC54ID4gMSkge1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueCArIDFdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W3RhcmdldEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgZW5kWSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS55LCBlbmRZKTtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYLCBlbmRZKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICByZW5kZXJFbmRBcnJvdyh7ZW5kWCwgZW5kWX0pIHtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhlbmRYLCBlbmRZKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZFggLSAxNCwgZW5kWSArIDEwKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZFggLSAxNCwgZW5kWSAtIDEwKTtcbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZnJvbSA9IHRoaXMudHJhbnNpdGlvbi5mcm9tIHx8IHtcbiAgICAgIHg6IHRoaXMucGFnZS53aWR0aCxcbiAgICAgIHk6IDAsXG4gICAgICByYWRpdXM6IDEyLFxuICAgIH07XG4gICAgY29uc3QgdG9PZmZzZXQgPSB0aGlzLnRyYW5zaXRpb24udG8ub2Zmc2V0IHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGNvbG9yOiB0aGlzLnRyYW5zaXRpb24uY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC40OCknLFxuICAgICAgcmFkaXVzOiBmcm9tLnJhZGl1cyxcbiAgICAgIHJvb206IHRoaXMudHJhbnNpdGlvbi5yb29tIHx8IHt4OiAwLCB5OiAwfSxcbiAgICAgIHN0YXJ0WDogdGhpcy5wYWdlLnggKyBmcm9tLngsXG4gICAgICBzdGFydFk6IHRoaXMucGFnZS55ICsgZnJvbS55LFxuICAgICAgZW5kWDogdGhpcy50YXJnZXRQYWdlLnggKyB0b09mZnNldC54LFxuICAgICAgZW5kWTogdGhpcy50YXJnZXRQYWdlLnkgKyB0b09mZnNldC55LFxuICAgIH07XG5cbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBvcHRpb25zLmNvbG9yO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBvcHRpb25zLmNvbG9yO1xuXG4gICAgdGhpcy5yZW5kZXJTdGFydFBvaW50KG9wdGlvbnMpO1xuICAgIHRoaXMucmVuZGVyVHJhbnNpdGlvbkxpbmUob3B0aW9ucyk7XG4gICAgdGhpcy5yZW5kZXJFbmRBcnJvdyhvcHRpb25zKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==