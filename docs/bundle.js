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
  title: 'Home Screen',
  description: "url: /\nDisplay timeline",
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
      var titleFontSize = 20;
      var descriptionFontSize = 14;

      if (this.title) {
        this.context.fillStyle = '#666';
        this.context.font = "".concat(titleFontSize, "px san-serif");
        this.context.fillText(this.title, this.x, this.rulers.y[this.grid.y] + titleFontSize, this.width);
      }

      if (this.description) {
        var texts = this.description.split('\n');
        this.context.fillStyle = '#666';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90d2l0dGVyLXN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3RyYW5zaXRpb24uanMiXSwibmFtZXMiOlsiQm9hcmRDb250cm9sbGVyIiwiYm9hcmQiLCJ0cmFucyIsImVuYWJsZWQiLCJ4IiwieSIsInNjYWxlIiwic2V0RXZlbnRMaXN0ZW5lciIsInpvb20iLCJ0cmFuc2xhdGUiLCJ3aWR0aCIsImhlaWdodCIsInNpemUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1pblNjYWxlIiwibWF4U2NhbGUiLCJkZWx0YVkiLCJjbGllbnRYIiwiY2xpZW50WSIsImRpZmYiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInRvU3RyaW5nIiwic3RvcnkiLCJ0aGVuIiwiZ2VuZXJhdGVkU3RvcnkiLCJjYW52YXNFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiQm9hcmQiLCJwYWRkaW5nIiwiY29udHJvbGxlciIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInRyYW5zaXRpb25Db2xvciIsImhvbWUiLCJpZCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJncmlkIiwic2NyZWVuIiwiaW1hZ2VQYXRoIiwidHJhbnNpdGlvbnMiLCJjb2xvciIsInRvIiwib2Zmc2V0IiwiZnJvbSIsInJhZGl1cyIsInJvb20iLCJwb3N0c1Nob3ciLCJwb3N0c05ldyIsInNlYXJjaCIsIm5vdGlmaWNhdGlvbnNJbmRleCIsIm1lbnUiLCJwcm9maWxlIiwic3RhcnRTdG9yeSIsIl9zdG9yeSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJzY2VuZSIsImltZyIsIkltYWdlIiwic3JjIiwicmVzb2x2ZSIsImVsIiwib3B0aW9ucyIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwicnVsZXJzIiwiX2dlbmVyYXRlUnVsZXJzIiwicGFnZXMiLCJfY2xlYXIiLCJfcmVuZGVyIiwicGFnZUlkIiwiZmlsdGVyIiwicGFnZSIsInNvcnQiLCJzY2VuZTEiLCJzY2VuZTIiLCJpIiwibGVuZ3RoIiwiY3VycmVudFJ1bGVyWCIsIm5leHRSdWxlclgiLCJuZXh0TmV3UnVsZXJYIiwiY3VycmVudFJ1bGVyWSIsIm5leHRSdWxlclkiLCJuZXh0TmV3UnVsZXJZIiwiY2xlYXJSZWN0IiwicnVsZXJDb2xvciIsImJlZ2luUGF0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiZm9yRWFjaCIsIlBhZ2UiLCJwdXNoIiwidHJhbnNpdGlvbiIsInRhcmdldFBhZ2UiLCJfZmluZFBhZ2UiLCJUcmFuc2l0aW9uIiwiX3JlbmRlclBhZ2VzIiwiX3JlbmRlclRyYW5zaXRpb25zIiwiX3JlbmRlclJ1bGVycyIsInJlbmRlciIsInRpdGxlRm9udFNpemUiLCJkZXNjcmlwdGlvbkZvbnRTaXplIiwiZmlsbFN0eWxlIiwiZm9udCIsImZpbGxUZXh0IiwidGV4dHMiLCJzcGxpdCIsInRleHQiLCJzaGFkb3dDb2xvciIsInNoYWRvd0JsdXIiLCJzaGFkb3dPZmZzZXRYIiwic2hhZG93T2Zmc2V0WSIsImRyYXdJbWFnZSIsImZpbGxSZWN0Iiwic3RhcnRYIiwic3RhcnRZIiwiYXJjIiwiTWF0aCIsIlBJIiwiZmlsbCIsImVuZFgiLCJlbmRZIiwiY3VycmVudEdyaWQiLCJ0YXJnZXRHcmlkIiwiY2xvc2VQYXRoIiwidG9PZmZzZXQiLCJyZW5kZXJTdGFydFBvaW50IiwicmVuZGVyVHJhbnNpdGlv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LENBRHlDO0FBRTVDQyxXQUFHO0FBRnlDLE9BQTlDO0FBSUEsVUFBTW9FLFVBQVU7QUFDZDFCLGVBQU8sS0FBSzBELFVBQUwsQ0FBZ0IxRCxLQUFoQixJQUF5QixxQkFEbEI7QUFFZEksZ0JBQVFELEtBQUtDLE1BRkM7QUFHZEMsY0FBTSxLQUFLcUQsVUFBTCxDQUFnQnJELElBQWhCLElBQXdCO0FBQUNoRCxhQUFHLENBQUo7QUFBT0MsYUFBRztBQUFWLFNBSGhCO0FBSWQwSCxnQkFBUSxLQUFLNUMsSUFBTCxDQUFVL0UsQ0FBVixHQUFjOEMsS0FBSzlDLENBSmI7QUFLZDRILGdCQUFRLEtBQUs3QyxJQUFMLENBQVU5RSxDQUFWLEdBQWM2QyxLQUFLN0MsQ0FMYjtBQU1kZ0ksY0FBTSxLQUFLM0IsVUFBTCxDQUFnQnRHLENBQWhCLEdBQW9Cc0ksU0FBU3RJLENBTnJCO0FBT2RrSSxjQUFNLEtBQUs1QixVQUFMLENBQWdCckcsQ0FBaEIsR0FBb0JxSSxTQUFTckk7QUFQckIsT0FBaEI7QUFVQSxXQUFLcUUsT0FBTCxDQUFhd0IsV0FBYixHQUEyQnpCLFFBQVExQixLQUFuQztBQUNBLFdBQUsyQixPQUFMLENBQWF5QyxTQUFiLEdBQXlCMUMsUUFBUTFCLEtBQWpDO0FBRUEsV0FBSzRGLGdCQUFMLENBQXNCbEUsT0FBdEI7QUFDQSxXQUFLbUUsb0JBQUwsQ0FBMEJuRSxPQUExQjtBQUNBLFdBQUtvRSxjQUFMLENBQW9CcEUsT0FBcEI7QUFDRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgY2xhc3MgQm9hcmRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoYm9hcmQpIHtcbiAgICB0aGlzLnRyYW5zID0ge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9O1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuXG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuXG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVyKCk7XG4gIH1cblxuICB6b29tKHNjYWxlKSB7XG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMuYm9hcmQuem9vbSh0aGlzLnNjYWxlKTtcbiAgfVxuXG4gIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgdGhpcy5ib2FyZC50cmFuc2xhdGUoeCwgeSk7XG4gIH1cblxuICBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmJvYXJkLnNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVyKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgbWluU2NhbGUgPSAwLjA1O1xuICAgICAgY29uc3QgbWF4U2NhbGUgPSAxMDtcblxuICAgICAgaWYoZXZlbnQuZGVsdGFZID4gMCkge1xuICAgICAgICB0aGlzLnNjYWxlICo9IDAuOTU7XG4gICAgICB9ZWxzZSB7XG4gICAgICAgIHRoaXMuc2NhbGUgKj0gMS4wNTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgbWluU2NhbGUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IG1pblNjYWxlO1xuICAgICAgfSBlbHNlIGlmIChtYXhTY2FsZSA8IHRoaXMuc2NhbGUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IG1heFNjYWxlO1xuICAgICAgfVxuICAgICAgdGhpcy5ib2FyZC56b29tKHRoaXMuc2NhbGUpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy50cmFucy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJhbnMueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICB0aGlzLnRyYW5zLnkgPSBldmVudC5jbGllbnRZO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLnRyYW5zLmVuYWJsZWQpIHtcbiAgICAgICAgY29uc3QgZGlmZiA9IHtcbiAgICAgICAgICB4OiBldmVudC5jbGllbnRYIC0gdGhpcy50cmFucy54LFxuICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgLSB0aGlzLnRyYW5zLnksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKGRpZmYueCwgZGlmZi55KTtcbiAgICAgICAgdGhpcy50cmFucy54ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgdGhpcy50cmFucy55ID0gZXZlbnQuY2xpZW50WTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIHRoaXMudHJhbnMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBzdGFydFN0b3J5IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gJy4vdmlld3MvYm9hcmQnO1xuLy9pbXBvcnQgeyBzdG9yeSB9IGZyb20gJy4vc2FtcGxlLXN0b3J5JztcbmltcG9ydCB7IHN0b3J5IH0gZnJvbSAnLi90d2l0dGVyLXN0b3J5JztcbmltcG9ydCB7IEJvYXJkQ29udHJvbGxlciB9IGZyb20gJy4vYm9hcmQtY29udHJvbGxlcic7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhgU3RhcnQgYXBwIGF0ICR7KG5ldyBEYXRlKCkpLnRvU3RyaW5nKCl9LmApO1xuXG4gIHN0YXJ0U3Rvcnkoc3RvcnkpLnRoZW4oKGdlbmVyYXRlZFN0b3J5KSA9PiB7XG4gICAgY29uc3QgY2FudmFzRWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3Rvcnl0ZWxsZXInKTtcblxuICAgIGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKGNhbnZhc0VsZW1lbnQsIGdlbmVyYXRlZFN0b3J5LCB7XG4gICAgICBwYWRkaW5nOiB7XG4gICAgICAgIHg6IDMyMCxcbiAgICAgICAgeTogMjAwLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQm9hcmRDb250cm9sbGVyKGJvYXJkKTtcbiAgICBjb250cm9sbGVyLnNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgY29udHJvbGxlci56b29tKDAuMik7XG4gICAgY29udHJvbGxlci50cmFuc2xhdGUoODAsIDEwMCk7XG4gIH0pO1xufSk7XG4iLCJjb25zdCB0cmFuc2l0aW9uQ29sb3IgPSAnIzFkYTFmMic7XG5cbmNvbnN0IGhvbWUgPSB7XG4gIGlkOiAnL2hvbWUnLFxuICB0aXRsZTogJ0hvbWUgU2NyZWVuJyxcbiAgZGVzY3JpcHRpb246IGB1cmw6IC9cXG5EaXNwbGF5IHRpbWVsaW5lYCxcbiAgZ3JpZDogeyB4OiAwLCB5OiAwIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9ob21lLnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbe1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL3Bvc3RzL3Nob3cnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyNDQsIHk6IDI0NywgcmFkaXVzOiA4LCB9LFxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDYwLCB5OiA2MCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiA2MCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiA1MTcsIHJhZGl1czogOCwgfSxcbiAgfSwge1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgcm9vbTogeyB4OiAzMCwgeTogLTMwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9zZWFyY2gnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAxMjgsIHk6IDYzLCByYWRpdXM6IDgsIH0sXG4gIH0sIHtcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9ub3RpZmljYXRpb25zL2luZGV4JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjA0LCB5OiA2MywgcmFkaXVzOiA4LCB9LFxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IC0zMCwgeTogOTAsIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL21lbnUnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyMSwgeTogMzEsIHJhZGl1czogOCwgfSxcbiAgfV0sXG59O1xuXG5jb25zdCBwb3N0c1Nob3cgPSB7XG4gIGlkOiAnL3Bvc3RzL3Nob3cnLFxuICBncmlkOiB7IHg6IDEsIHk6IDAgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL3Bvc3RzX3Nob3cucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDEyMCwgeTogMCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiA1MTcsIHJhZGl1czogOCwgfSxcbiAgfV0sXG59O1xuXG5jb25zdCBwb3N0c05ldyA9IHtcbiAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAxIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9wb3N0c19uZXcucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9ob21lJyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiAyMCwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHNlYXJjaCA9IHtcbiAgaWQ6ICcvc2VhcmNoJyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAyIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9zZWFyY2gucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFtdLFxufTtcblxuY29uc3Qgbm90aWZpY2F0aW9uc0luZGV4ID0ge1xuICBpZDogJy9ub3RpZmljYXRpb25zL2luZGV4JyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAzIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9ub3RpZmljYXRpb25zX2luZGV4LnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbXSxcbn07XG5cbmNvbnN0IG1lbnUgPSB7XG4gIGlkOiAnL21lbnUnLFxuICBncmlkOiB7IHg6IDEsIHk6IDQgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL21lbnUucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcHJvZmlsZScsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDIxLCB5OiAzMSwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHByb2ZpbGUgPSB7XG4gIGlkOiAnL3Byb2ZpbGUnLFxuICBncmlkOiB7IHg6IDIsIHk6IDAgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL3Byb2ZpbGUucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFtdLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0b3J5ID0gW1xuICBob21lLFxuICBwb3N0c1Nob3csXG4gIHBvc3RzTmV3LFxuICBzZWFyY2gsXG4gIG5vdGlmaWNhdGlvbnNJbmRleCxcbiAgbWVudSxcbiAgcHJvZmlsZSxcbl07XG4iLCJleHBvcnQgZnVuY3Rpb24gc3RhcnRTdG9yeShzdG9yeSkge1xuICBjb25zdCBfc3RvcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0b3J5KSk7XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKF9zdG9yeS5tYXAoKHNjZW5lKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKHNjZW5lLnNjcmVlbi5pbWFnZVBhdGgpIHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSBzY2VuZS5zY3JlZW4uaW1hZ2VQYXRoO1xuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgIHNjZW5lLnNjcmVlbi5pbWcgPSBpbWc7XG4gICAgICAgICAgaWYgKHNjZW5lLnNjcmVlbi53aWR0aCAmJiAhc2NlbmUuc2NyZWVuLmhlaWdodCkge1xuICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBpbWcud2lkdGggLyBzY2VuZS5zY3JlZW4ud2lkdGg7XG4gICAgICAgICAgICBzY2VuZS5zY3JlZW4uaGVpZ2h0ID0gaW1nLmhlaWdodCAvIHNjYWxlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXNjZW5lLnNjcmVlbi53aWR0aCAmJiBzY2VuZS5zY3JlZW4uaGVpZ2h0KSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZSA9IGltZy5oZWlnaHQgLyBzY2VuZS5zY3JlZW4uaGVpZ2h0O1xuICAgICAgICAgICAgc2NlbmUuc2NyZWVuLndpZHRoID0gaW1nLndpZHRoIC8gc2NhbGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKS50aGVuKCgpID0+IHtcbiAgICByZXR1cm4gX3N0b3J5O1xuICB9KTtcbn1cblxuIiwiaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZSc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAnLi90cmFuc2l0aW9uJztcblxuLypcbiAqIEJvYXJkXG4gKiAtIGNvbnN0cnVjdG9yXG4gKiAgIC0gb3B0aW9uc1xuICogICAgIC0gcnVsZXJDb2xvclxuICogICAgIC0gcGFkZGluZ1xuICogICAgICAgLSB4XG4gKiAgICAgICAtIHlcbiAqIC0gc2l6ZVxuICogLSB6b29tXG4gKiAtIHRyYW5zbGF0ZVxuICogLSBfZmluZFBhZ2VcbiAqIC0gX2dlbmVyYXRlUnVsZXJzXG4gKiAtIF9jbGVhclxuICogLSBfcmVuZGVyUnVsZXJzXG4gKiAtIF9yZW5kZXJQYWdlc1xuICogLSBfcmVuZGVyVHJhbnNpdGlvbnNcbiAqL1xuXG5leHBvcnQgY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcihlbCwgc3RvcnksIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuc3RvcnkgPSBzdG9yeTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucnVsZXJzID0gdGhpcy5fZ2VuZXJhdGVSdWxlcnModGhpcy5zdG9yeSk7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5wYWdlcyA9IFtdO1xuXG4gICAgdGhpcy5fY2xlYXIoKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLmVsLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbC5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHpvb20oc2NhbGUpIHtcbiAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgdHJhbnNsYXRlKHgsIHkpIHtcbiAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSh4LCB5KTtcbiAgICB0aGlzLmNvbnRleHQuc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG5cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIF9maW5kUGFnZShwYWdlSWQpIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcy5maWx0ZXIocGFnZSA9PiB7XG4gICAgICByZXR1cm4gcGFnZS5pZCA9PT0gcGFnZUlkO1xuICAgIH0pWzBdIHx8IG51bGw7XG4gIH1cblxuICBfZ2VuZXJhdGVSdWxlcnMoc3RvcnkpIHtcbiAgICBjb25zdCBydWxlcnMgPSB7XG4gICAgICB4OiBbXSxcbiAgICAgIHk6IFtdLFxuICAgIH07XG4gICAgY29uc3QgcGFkZGluZyA9IHRoaXMub3B0aW9ucy5wYWRkaW5nO1xuXG4gICAgLy8gR2VuZXJhdGUgeCBydWxlcnNcbiAgICBzdG9yeS5zb3J0KChzY2VuZTEsIHNjZW5lMikgPT4ge1xuICAgICAgcmV0dXJuIChzY2VuZTEuZ3JpZC54IC0gc2NlbmUyLmdyaWQueCk7XG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2NlbmUgPSBzdG9yeVtpXTtcbiAgICAgIGNvbnN0IHggPSBzY2VuZS5ncmlkLng7XG4gICAgICBjb25zdCBjdXJyZW50UnVsZXJYID0gcnVsZXJzLnhbeF0gfHwgbnVsbDtcbiAgICAgIGNvbnN0IG5leHRSdWxlclggPSBydWxlcnMueFt4ICsgMV0gfHwgbnVsbDtcblxuICAgICAgaWYgKGN1cnJlbnRSdWxlclggPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnhbeF0gPSAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0TmV3UnVsZXJYID0gcnVsZXJzLnhbeF0gKyBzY2VuZS5zY3JlZW4ud2lkdGggKyBwYWRkaW5nLng7XG4gICAgICBpZiAobmV4dFJ1bGVyWCA9PT0gbnVsbCkge1xuICAgICAgICBydWxlcnMueFt4ICsgMV0gPSBuZXh0TmV3UnVsZXJYO1xuICAgICAgfSBlbHNlIGlmIChuZXh0UnVsZXJYIDwgbmV4dE5ld1J1bGVyWCkge1xuICAgICAgICBydWxlcnMueFt4ICsgMV0gPSBuZXh0TmV3UnVsZXJYO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIHkgcnVsZXJzXG4gICAgc3Rvcnkuc29ydCgoc2NlbmUxLCBzY2VuZTIpID0+IHtcbiAgICAgIHJldHVybiAoc2NlbmUxLmdyaWQueSAtIHNjZW5lMi5ncmlkLnkpO1xuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNjZW5lID0gc3RvcnlbaV07XG4gICAgICBjb25zdCB5ID0gc2NlbmUuZ3JpZC55O1xuICAgICAgY29uc3QgY3VycmVudFJ1bGVyWSA9IHJ1bGVycy55W3ldIHx8IG51bGw7XG4gICAgICBjb25zdCBuZXh0UnVsZXJZID0gcnVsZXJzLnlbeSArIDFdIHx8IG51bGw7XG5cbiAgICAgIGlmIChjdXJyZW50UnVsZXJZID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy55W3ldID0gMDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV4dE5ld1J1bGVyWSA9IHJ1bGVycy55W3ldICsgc2NlbmUuc2NyZWVuLmhlaWdodCArIHBhZGRpbmcueTtcbiAgICAgIGlmIChuZXh0UnVsZXJZID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy55W3kgKyAxXSA9IG5leHROZXdSdWxlclk7XG4gICAgICB9IGVsc2UgaWYgKG5leHRSdWxlclkgPCBuZXh0TmV3UnVsZXJZKSB7XG4gICAgICAgIHJ1bGVycy55W3kgKyAxXSA9IG5leHROZXdSdWxlclk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGVycztcbiAgfVxuXG4gIF9jbGVhcigpIHtcbiAgICAvLyBUT0RPOiBPcHRpbWl6ZSBjbGVhclJlY3Qgc2l6ZVxuICAgIHRoaXMuY29udGV4dC5zY2FsZSgxIC8gdGhpcy5zY2FsZSwgMSAvIHRoaXMuc2NhbGUpO1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoLTEwMDAwLCAtMTAwMDAsIDEwMDAwMCwgMTAwMDAwKTtcbiAgfVxuXG4gIF9yZW5kZXJSdWxlcnMoKSB7XG4gICAgY29uc3QgY29sb3IgPSB0aGlzLm9wdGlvbnMucnVsZXJDb2xvciB8fCAncmdiYSgyMTYsIDUzLCA1MywgMC43MiknO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJ1bGVycy54Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5ydWxlcnMueFtpXTtcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4LCAtMTAwMDAwKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeCwgMTAwMDAwKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucnVsZXJzLnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLnJ1bGVycy55W2ldO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKC0xMDAwMDAsIHkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbygxMDAwMDAsIHkpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cbiAgfVxuXG4gIF9yZW5kZXJQYWdlcygpIHtcbiAgICB0aGlzLnN0b3J5LmZvckVhY2goc2NlbmUgPT4ge1xuICAgICAgY29uc3QgeCA9IHNjZW5lLmdyaWQueDtcbiAgICAgIGNvbnN0IHkgPSBzY2VuZS5ncmlkLnk7XG4gICAgICBjb25zdCBwYWdlID0gbmV3IFBhZ2UodGhpcy5jb250ZXh0LCBzY2VuZSwgdGhpcy5ydWxlcnMpO1xuICAgICAgdGhpcy5wYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgX3JlbmRlclRyYW5zaXRpb25zKCkge1xuICAgIHRoaXMucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHBhZ2Uuc2NlbmUudHJhbnNpdGlvbnMuZm9yRWFjaCgodHJhbnNpdGlvbikgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRQYWdlID0gdGhpcy5fZmluZFBhZ2UodHJhbnNpdGlvbi50by5pZCk7XG4gICAgICAgIG5ldyBUcmFuc2l0aW9uKHRoaXMuY29udGV4dCwge1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgdGFyZ2V0UGFnZSxcbiAgICAgICAgICB0cmFuc2l0aW9uLFxuICAgICAgICAgIHJ1bGVyczogdGhpcy5ydWxlcnMsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBfcmVuZGVyKCkge1xuICAgIHRoaXMuX3JlbmRlclBhZ2VzKCk7XG4gICAgdGhpcy5fcmVuZGVyVHJhbnNpdGlvbnMoKTtcbiAgICB0aGlzLl9yZW5kZXJSdWxlcnMoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0LCBzY2VuZSwgcnVsZXJzKSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5ydWxlcnMgPSBydWxlcnM7XG4gICAgdGhpcy5pZCA9IHRoaXMuc2NlbmUuaWQ7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMuc2NlbmUudGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuc2NlbmUuZGVzY3JpcHRpb247XG4gICAgdGhpcy5ncmlkID0gdGhpcy5zY2VuZS5ncmlkO1xuICAgIHRoaXMud2lkdGggPSB0aGlzLnNjZW5lLnNjcmVlbi53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodDtcbiAgICB0aGlzLnggPSB0aGlzLnJ1bGVycy54W3RoaXMuZ3JpZC54XSArICgodGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueCArIDFdIC0gdGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueF0gLSB0aGlzLndpZHRoKSAvIDIpO1xuICAgIHRoaXMueSA9IHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgKCh0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55ICsgMV0gLSB0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55XSAtIHRoaXMuaGVpZ2h0KSAvIDIpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuc2NlbmUuY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC4zMiknO1xuICAgIGNvbnN0IHRpdGxlRm9udFNpemUgPSAyMDtcbiAgICBjb25zdCBkZXNjcmlwdGlvbkZvbnRTaXplID0gMTQ7XG4gICAgaWYgKHRoaXMudGl0bGUpIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzY2Nic7XG4gICAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke3RpdGxlRm9udFNpemV9cHggc2FuLXNlcmlmYDtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRpdGxlLCB0aGlzLngsIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgdGl0bGVGb250U2l6ZSwgdGhpcy53aWR0aCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRlc2NyaXB0aW9uKSB7XG4gICAgICBjb25zdCB0ZXh0cyA9IHRoaXMuZGVzY3JpcHRpb24uc3BsaXQoJ1xcbicpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjNjY2JztcbiAgICAgIHRoaXMuY29udGV4dC5mb250ID0gYCR7ZGVzY3JpcHRpb25Gb250U2l6ZX1weCBzYW4tc2VyaWZgO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0ZXh0ID0gdGV4dHNbaV07XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0LCB0aGlzLngsIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgdGl0bGVGb250U2l6ZSArIChkZXNjcmlwdGlvbkZvbnRTaXplICogKGkgKyAyKSksIHRoaXMud2lkdGgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4yNCknO1xuICAgIHRoaXMuY29udGV4dC5zaGFkb3dCbHVyID0gMztcbiAgICB0aGlzLmNvbnRleHQuc2hhZG93T2Zmc2V0WCA9IDA7XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd09mZnNldFkgPSAwO1xuICAgIGlmICh0aGlzLnNjZW5lLnNjcmVlbi5pbWcpIHtcbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5zY2VuZS5zY3JlZW4uaW1nLCB0aGlzLngsIHRoaXMueSwgdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGgsIHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGgsIHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodCk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5zaGFkb3dCbHVyID0gMDtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRyYW5zaXRpb24ge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0LCB7cGFnZSwgdGFyZ2V0UGFnZSwgdHJhbnNpdGlvbiwgcnVsZXJzfSkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB0aGlzLnRhcmdldFBhZ2UgPSB0YXJnZXRQYWdlO1xuICAgIHRoaXMudHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG4gICAgdGhpcy5ydWxlcnMgPSBydWxlcnM7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyU3RhcnRQb2ludCh7c3RhcnRYLCBzdGFydFksIHJhZGl1c30pIHtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmFyYyhzdGFydFgsIHN0YXJ0WSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICByZW5kZXJUcmFuc2l0aW9uTGluZSh7c3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIHJvb219KSB7XG4gICAgY29uc3QgY3VycmVudEdyaWQgPSB0aGlzLnBhZ2UuZ3JpZDtcbiAgICBjb25zdCB0YXJnZXRHcmlkID0gdGhpcy50YXJnZXRQYWdlLmdyaWQ7XG5cbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgaWYgKGN1cnJlbnRHcmlkLnkgPiB0YXJnZXRHcmlkLnkpIHtcbiAgICAgIC8vIGxpbmVUbyB0b3AuXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHN0YXJ0WCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50R3JpZC55IDwgdGFyZ2V0R3JpZC55KSB7XG4gICAgICAvLyBsaW5lVG8gYm90dG9tLlxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzdGFydFgsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueSArIDFdICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnkgKyAxXSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50R3JpZC55ID09PSB0YXJnZXRHcmlkLnkgJiYgY3VycmVudEdyaWQueCA+IHRhcmdldEdyaWQueCkge1xuICAgICAgLy8gbGluZVRvIGxlZnRcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W3RhcmdldEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA9PT0gdGFyZ2V0R3JpZC55ICYmIGN1cnJlbnRHcmlkLnggPCB0YXJnZXRHcmlkLngpIHtcbiAgICAgIC8vIGxpbmVUbyByaWdodFxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgIGlmICh0YXJnZXRHcmlkLnggLSBjdXJyZW50R3JpZC54ID4gMSkge1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueCArIDFdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W3RhcmdldEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgZW5kWSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS55LCBlbmRZKTtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYLCBlbmRZKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICByZW5kZXJFbmRBcnJvdyh7ZW5kWCwgZW5kWX0pIHtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhlbmRYLCBlbmRZKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZFggLSAxNCwgZW5kWSArIDEwKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZFggLSAxNCwgZW5kWSAtIDEwKTtcbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZnJvbSA9IHRoaXMudHJhbnNpdGlvbi5mcm9tIHx8IHtcbiAgICAgIHg6IHRoaXMucGFnZS53aWR0aCxcbiAgICAgIHk6IDAsXG4gICAgICByYWRpdXM6IDEyLFxuICAgIH07XG4gICAgY29uc3QgdG9PZmZzZXQgPSB0aGlzLnRyYW5zaXRpb24udG8ub2Zmc2V0IHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGNvbG9yOiB0aGlzLnRyYW5zaXRpb24uY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC40OCknLFxuICAgICAgcmFkaXVzOiBmcm9tLnJhZGl1cyxcbiAgICAgIHJvb206IHRoaXMudHJhbnNpdGlvbi5yb29tIHx8IHt4OiAwLCB5OiAwfSxcbiAgICAgIHN0YXJ0WDogdGhpcy5wYWdlLnggKyBmcm9tLngsXG4gICAgICBzdGFydFk6IHRoaXMucGFnZS55ICsgZnJvbS55LFxuICAgICAgZW5kWDogdGhpcy50YXJnZXRQYWdlLnggKyB0b09mZnNldC54LFxuICAgICAgZW5kWTogdGhpcy50YXJnZXRQYWdlLnkgKyB0b09mZnNldC55LFxuICAgIH07XG5cbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBvcHRpb25zLmNvbG9yO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBvcHRpb25zLmNvbG9yO1xuXG4gICAgdGhpcy5yZW5kZXJTdGFydFBvaW50KG9wdGlvbnMpO1xuICAgIHRoaXMucmVuZGVyVHJhbnNpdGlvbkxpbmUob3B0aW9ucyk7XG4gICAgdGhpcy5yZW5kZXJFbmRBcnJvdyhvcHRpb25zKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==