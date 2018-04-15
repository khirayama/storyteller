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
    imagePath: './images/twitter/home.png'
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90d2l0dGVyLXN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3RyYW5zaXRpb24uanMiXSwibmFtZXMiOlsiQm9hcmRDb250cm9sbGVyIiwiYm9hcmQiLCJ0cmFucyIsImVuYWJsZWQiLCJ4IiwieSIsInNjYWxlIiwic2V0RXZlbnRMaXN0ZW5lciIsInpvb20iLCJ0cmFuc2xhdGUiLCJ3aWR0aCIsImhlaWdodCIsInNpemUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1pblNjYWxlIiwibWF4U2NhbGUiLCJkZWx0YVkiLCJjbGllbnRYIiwiY2xpZW50WSIsImRpZmYiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInRvU3RyaW5nIiwic3RvcnkiLCJ0aGVuIiwiZ2VuZXJhdGVkU3RvcnkiLCJjYW52YXNFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiQm9hcmQiLCJwYWRkaW5nIiwiY29udHJvbGxlciIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInRyYW5zaXRpb25Db2xvciIsImhvbWUiLCJpZCIsInRpdGxlIiwidGV4dCIsImRlc2NyaXB0aW9uIiwiZm9udFNpemUiLCJncmlkIiwic2NyZWVuIiwiaW1hZ2VQYXRoIiwidHJhbnNpdGlvbnMiLCJjb2xvciIsInRvIiwib2Zmc2V0IiwiZnJvbSIsInJhZGl1cyIsInJvb20iLCJwb3N0c1Nob3ciLCJwb3N0c05ldyIsInNlYXJjaCIsIm5vdGlmaWNhdGlvbnNJbmRleCIsIm1lbnUiLCJwcm9maWxlIiwic3RhcnRTdG9yeSIsIl9zdG9yeSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJzY2VuZSIsImltZyIsIkltYWdlIiwic3JjIiwicmVzb2x2ZSIsImVsIiwib3B0aW9ucyIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwicnVsZXJzIiwiX2dlbmVyYXRlUnVsZXJzIiwicGFnZXMiLCJfY2xlYXIiLCJfcmVuZGVyIiwicGFnZUlkIiwiZmlsdGVyIiwicGFnZSIsInNvcnQiLCJzY2VuZTEiLCJzY2VuZTIiLCJpIiwibGVuZ3RoIiwiY3VycmVudFJ1bGVyWCIsIm5leHRSdWxlclgiLCJuZXh0TmV3UnVsZXJYIiwiY3VycmVudFJ1bGVyWSIsIm5leHRSdWxlclkiLCJuZXh0TmV3UnVsZXJZIiwiY2xlYXJSZWN0IiwicnVsZXJDb2xvciIsImJlZ2luUGF0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiZm9yRWFjaCIsIlBhZ2UiLCJwdXNoIiwidHJhbnNpdGlvbiIsInRhcmdldFBhZ2UiLCJfZmluZFBhZ2UiLCJUcmFuc2l0aW9uIiwiX3JlbmRlclBhZ2VzIiwiX3JlbmRlclRyYW5zaXRpb25zIiwiX3JlbmRlclJ1bGVycyIsInJlbmRlciIsInRpdGxlRm9udFNpemUiLCJmaWxsU3R5bGUiLCJ0ZXh0QWxpZ24iLCJmb250IiwiZmlsbFRleHQiLCJkZXNjcmlwdGlvbkZvbnRTaXplIiwidGV4dHMiLCJzcGxpdCIsInNoYWRvd0NvbG9yIiwic2hhZG93Qmx1ciIsInNoYWRvd09mZnNldFgiLCJzaGFkb3dPZmZzZXRZIiwiZHJhd0ltYWdlIiwiZmlsbFJlY3QiLCJzdGFydFgiLCJzdGFydFkiLCJhcmMiLCJNYXRoIiwiUEkiLCJmaWxsIiwiZW5kWCIsImVuZFkiLCJjdXJyZW50R3JpZCIsInRhcmdldEdyaWQiLCJjbG9zZVBhdGgiLCJ0b09mZnNldCIsInJlbmRlckZyb21EZXNjcmlwdGlvbiIsInJlbmRlclN0YXJ0UG9pbnQiLCJyZW5kZXJUcmFuc2l0aW9uTGluZSIsInJlbmRlckVuZEFycm93IiwicmVuZGVyVG9EZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbkVhQSxlOzs7QUFDWCwyQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQixTQUFLQyxLQUFMLEdBQWE7QUFDWEMsZUFBUyxLQURFO0FBRVhDLFNBQUcsQ0FGUTtBQUdYQyxTQUFHO0FBSFEsS0FBYjtBQUtBLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBRUEsU0FBS0wsS0FBTCxHQUFhQSxLQUFiO0FBRUEsU0FBS00sZ0JBQUw7QUFDRDs7Ozt5QkFFSUQsSyxFQUFPO0FBQ1YsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsV0FBS0wsS0FBTCxDQUFXTyxJQUFYLENBQWdCLEtBQUtGLEtBQXJCO0FBQ0Q7Ozs4QkFFU0YsQyxFQUFHQyxDLEVBQUc7QUFDZCxXQUFLSixLQUFMLENBQVdRLFNBQVgsQ0FBcUJMLENBQXJCLEVBQXdCQyxDQUF4QjtBQUNEOzs7eUJBRUlLLEssRUFBT0MsTSxFQUFRO0FBQ2xCLFdBQUtWLEtBQUwsQ0FBV1csSUFBWCxDQUFn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QUFMLENBQWdCMUQsS0FBaEIsSUFBeUIscUJBRGxCO0FBRWRJLGdCQUFRRCxLQUFLQyxNQUZDO0FBR2RDLGNBQU0sS0FBS3FELFVBQUwsQ0FBZ0JyRCxJQUFoQixJQUF3QjtBQUFDbEQsYUFBRyxDQUFKO0FBQU9DLGFBQUc7QUFBVixTQUhoQjtBQUlkNEgsZ0JBQVEsS0FBSzVDLElBQUwsQ0FBVWpGLENBQVYsR0FBY2dELEtBQUtoRCxDQUpiO0FBS2Q4SCxnQkFBUSxLQUFLN0MsSUFBTCxDQUFVaEYsQ0FBVixHQUFjK0MsS0FBSy9DLENBTGI7QUFNZGtJLGNBQU0sS0FBSzNCLFVBQUwsQ0FBZ0J4RyxDQUFoQixHQUFvQndJLFNBQVN4SSxDQU5yQjtBQU9kb0ksY0FBTSxLQUFLNUIsVUFBTCxDQUFnQnZHLENBQWhCLEdBQW9CdUksU0FBU3ZJO0FBUHJCLE9BQWhCO0FBVUEsV0FBS3dJLHFCQUFMLENBQTJCbEUsT0FBM0I7QUFFQSxXQUFLQyxPQUFMLENBQWF3QixXQUFiLEdBQTJCekIsUUFBUTFCLEtBQW5DO0FBQ0EsV0FBSzJCLE9BQUwsQ0FBYXdDLFNBQWIsR0FBeUJ6QyxRQUFRMUIsS0FBakM7QUFDQSxXQUFLNkYsZ0JBQUwsQ0FBc0JuRSxPQUF0QjtBQUNBLFdBQUtvRSxvQkFBTCxDQUEwQnBFLE9BQTFCO0FBQ0EsV0FBS3FFLGNBQUwsQ0FBb0JyRSxPQUFwQjtBQUVBLFdBQUtzRSxtQkFBTCxDQUF5QnRFLE9BQXpCO0FBQ0QiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEJvYXJkQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGJvYXJkKSB7XG4gICAgdGhpcy50cmFucyA9IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfTtcbiAgICB0aGlzLnNjYWxlID0gMTtcblxuICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcblxuICAgIHRoaXMuc2V0RXZlbnRMaXN0ZW5lcigpO1xuICB9XG5cbiAgem9vbShzY2FsZSkge1xuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLmJvYXJkLnpvb20odGhpcy5zY2FsZSk7XG4gIH1cblxuICB0cmFuc2xhdGUoeCwgeSkge1xuICAgIHRoaXMuYm9hcmQudHJhbnNsYXRlKHgsIHkpO1xuICB9XG5cbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5ib2FyZC5zaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgc2V0RXZlbnRMaXN0ZW5lcigpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG1pblNjYWxlID0gMC4wNTtcbiAgICAgIGNvbnN0IG1heFNjYWxlID0gMTA7XG5cbiAgICAgIGlmKGV2ZW50LmRlbHRhWSA+IDApIHtcbiAgICAgICAgdGhpcy5zY2FsZSAqPSAwLjk1O1xuICAgICAgfWVsc2Uge1xuICAgICAgICB0aGlzLnNjYWxlICo9IDEuMDU7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zY2FsZSA8IG1pblNjYWxlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBtaW5TY2FsZTtcbiAgICAgIH0gZWxzZSBpZiAobWF4U2NhbGUgPCB0aGlzLnNjYWxlKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBtYXhTY2FsZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYm9hcmQuem9vbSh0aGlzLnNjYWxlKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMudHJhbnMuZW5hYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLnRyYW5zLnggPSBldmVudC5jbGllbnRYO1xuICAgICAgdGhpcy50cmFucy55ID0gZXZlbnQuY2xpZW50WTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy50cmFucy5lbmFibGVkKSB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSB7XG4gICAgICAgICAgeDogZXZlbnQuY2xpZW50WCAtIHRoaXMudHJhbnMueCxcbiAgICAgICAgICB5OiBldmVudC5jbGllbnRZIC0gdGhpcy50cmFucy55LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZShkaWZmLngsIGRpZmYueSk7XG4gICAgICAgIHRoaXMudHJhbnMueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIHRoaXMudHJhbnMueSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc3RhcnRTdG9yeSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgQm9hcmQgfSBmcm9tICcuL3ZpZXdzL2JvYXJkJztcbi8vaW1wb3J0IHsgc3RvcnkgfSBmcm9tICcuL3NhbXBsZS1zdG9yeSc7XG5pbXBvcnQgeyBzdG9yeSB9IGZyb20gJy4vdHdpdHRlci1zdG9yeSc7XG5pbXBvcnQgeyBCb2FyZENvbnRyb2xsZXIgfSBmcm9tICcuL2JvYXJkLWNvbnRyb2xsZXInO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coYFN0YXJ0IGFwcCBhdCAkeyhuZXcgRGF0ZSgpKS50b1N0cmluZygpfS5gKTtcblxuICBzdGFydFN0b3J5KHN0b3J5KS50aGVuKChnZW5lcmF0ZWRTdG9yeSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3J5dGVsbGVyJyk7XG5cbiAgICBjb25zdCBib2FyZCA9IG5ldyBCb2FyZChjYW52YXNFbGVtZW50LCBnZW5lcmF0ZWRTdG9yeSwge1xuICAgICAgcGFkZGluZzoge1xuICAgICAgICB4OiAzMjAsXG4gICAgICAgIHk6IDIwMCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEJvYXJkQ29udHJvbGxlcihib2FyZCk7XG4gICAgY29udHJvbGxlci5zaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGNvbnRyb2xsZXIuem9vbSgwLjIpO1xuICAgIGNvbnRyb2xsZXIudHJhbnNsYXRlKDgwLCAxMDApO1xuICB9KTtcbn0pO1xuIiwiY29uc3QgdHJhbnNpdGlvbkNvbG9yID0gJyMxZGExZjInO1xuXG5jb25zdCBob21lID0ge1xuICBpZDogJy9ob21lJyxcbiAgdGl0bGU6IHtcbiAgICB0ZXh0OiAnSG9tZSBTY3JlZW4nLFxuICB9LFxuICBkZXNjcmlwdGlvbjoge1xuICAgIGZvbnRTaXplOiAxNCxcbiAgICB0ZXh0OiBgdXJsOiAvXFxuRGlzcGxheSB0aW1lbGluZWAsXG4gIH0sXG4gIGdyaWQ6IHsgeDogMCwgeTogMCB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3R3aXR0ZXIvaG9tZS5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW3tcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHRvOiB7XG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0ZXh0OiAndHJhbnNpdGlvbiByYXRlOiA1JShFeGFtcGxlKScsXG4gICAgICB9LFxuICAgICAgaWQ6ICcvcG9zdHMvc2hvdycsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7XG4gICAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgICB0ZXh0OiAndHJhbnNpdGlvbiByYXRlOiA1JShFeGFtcGxlKScsXG4gICAgICB9LFxuICAgICAgeDogMjQ0LFxuICAgICAgeTogMjQ3LFxuICAgICAgcmFkaXVzOiA4LFxuICAgIH0sXG4gIH0sIHtcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHJvb206IHsgeDogNjAsIHk6IDYwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9wb3N0cy9uZXcnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDYwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyNzEsIHk6IDUxNywgcmFkaXVzOiA4LCB9LFxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDMwLCB5OiAtMzAsIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL3NlYXJjaCcsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDEyOCwgeTogNjMsIHJhZGl1czogOCwgfSxcbiAgfSwge1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL25vdGlmaWNhdGlvbnMvaW5kZXgnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyMDQsIHk6IDYzLCByYWRpdXM6IDgsIH0sXG4gIH0sIHtcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHJvb206IHsgeDogLTMwLCB5OiA5MCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvbWVudScsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDIxLCB5OiAzMSwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHBvc3RzU2hvdyA9IHtcbiAgaWQ6ICcvcG9zdHMvc2hvdycsXG4gIGdyaWQ6IHsgeDogMSwgeTogMCB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3R3aXR0ZXIvcG9zdHNfc2hvdy5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW3tcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHJvb206IHsgeDogMTIwLCB5OiAwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9wb3N0cy9uZXcnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyNzEsIHk6IDUxNywgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHBvc3RzTmV3ID0ge1xuICBpZDogJy9wb3N0cy9uZXcnLFxuICBncmlkOiB7IHg6IDEsIHk6IDEgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL3Bvc3RzX25ldy5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW3tcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHJvb206IHsgeDogMCwgeTogMzAsIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL2hvbWUnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyNzEsIHk6IDIwLCByYWRpdXM6IDgsIH0sXG4gIH1dLFxufTtcblxuY29uc3Qgc2VhcmNoID0ge1xuICBpZDogJy9zZWFyY2gnLFxuICBncmlkOiB7IHg6IDEsIHk6IDIgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL3NlYXJjaC5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW10sXG59O1xuXG5jb25zdCBub3RpZmljYXRpb25zSW5kZXggPSB7XG4gIGlkOiAnL25vdGlmaWNhdGlvbnMvaW5kZXgnLFxuICBncmlkOiB7IHg6IDEsIHk6IDMgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL25vdGlmaWNhdGlvbnNfaW5kZXgucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFtdLFxufTtcblxuY29uc3QgbWVudSA9IHtcbiAgaWQ6ICcvbWVudScsXG4gIGdyaWQ6IHsgeDogMSwgeTogNCB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3R3aXR0ZXIvbWVudS5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW3tcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9wcm9maWxlJyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjEsIHk6IDMxLCByYWRpdXM6IDgsIH0sXG4gIH1dLFxufTtcblxuY29uc3QgcHJvZmlsZSA9IHtcbiAgaWQ6ICcvcHJvZmlsZScsXG4gIGdyaWQ6IHsgeDogMiwgeTogMCB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3R3aXR0ZXIvcHJvZmlsZS5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW10sXG59O1xuXG5leHBvcnQgY29uc3Qgc3RvcnkgPSBbXG4gIGhvbWUsXG4gIHBvc3RzU2hvdyxcbiAgcG9zdHNOZXcsXG4gIHNlYXJjaCxcbiAgbm90aWZpY2F0aW9uc0luZGV4LFxuICBtZW51LFxuICBwcm9maWxlLFxuXTtcbiIsImV4cG9ydCBmdW5jdGlvbiBzdGFydFN0b3J5KHN0b3J5KSB7XG4gIGNvbnN0IF9zdG9yeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3RvcnkpKTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwoX3N0b3J5Lm1hcCgoc2NlbmUpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAoc2NlbmUuc2NyZWVuLmltYWdlUGF0aCkge1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHNjZW5lLnNjcmVlbi5pbWFnZVBhdGg7XG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgc2NlbmUuc2NyZWVuLmltZyA9IGltZztcbiAgICAgICAgICBpZiAoc2NlbmUuc2NyZWVuLndpZHRoICYmICFzY2VuZS5zY3JlZW4uaGVpZ2h0KSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZSA9IGltZy53aWR0aCAvIHNjZW5lLnNjcmVlbi53aWR0aDtcbiAgICAgICAgICAgIHNjZW5lLnNjcmVlbi5oZWlnaHQgPSBpbWcuaGVpZ2h0IC8gc2NhbGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghc2NlbmUuc2NyZWVuLndpZHRoICYmIHNjZW5lLnNjcmVlbi5oZWlnaHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gaW1nLmhlaWdodCAvIHNjZW5lLnNjcmVlbi5oZWlnaHQ7XG4gICAgICAgICAgICBzY2VuZS5zY3JlZW4ud2lkdGggPSBpbWcud2lkdGggLyBzY2FsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkpLnRoZW4oKCkgPT4ge1xuICAgIHJldHVybiBfc3Rvcnk7XG4gIH0pO1xufVxuXG4iLCJpbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlJztcbmltcG9ydCB7IFRyYW5zaXRpb24gfSBmcm9tICcuL3RyYW5zaXRpb24nO1xuXG4vKlxuICogQm9hcmRcbiAqIC0gY29uc3RydWN0b3JcbiAqICAgLSBvcHRpb25zXG4gKiAgICAgLSBydWxlckNvbG9yXG4gKiAgICAgLSBwYWRkaW5nXG4gKiAgICAgICAtIHhcbiAqICAgICAgIC0geVxuICogLSBzaXplXG4gKiAtIHpvb21cbiAqIC0gdHJhbnNsYXRlXG4gKiAtIF9maW5kUGFnZVxuICogLSBfZ2VuZXJhdGVSdWxlcnNcbiAqIC0gX2NsZWFyXG4gKiAtIF9yZW5kZXJSdWxlcnNcbiAqIC0gX3JlbmRlclBhZ2VzXG4gKiAtIF9yZW5kZXJUcmFuc2l0aW9uc1xuICovXG5cbmV4cG9ydCBjbGFzcyBCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKGVsLCBzdG9yeSwgb3B0aW9ucykge1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5zdG9yeSA9IHN0b3J5O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5ydWxlcnMgPSB0aGlzLl9nZW5lcmF0ZVJ1bGVycyh0aGlzLnN0b3J5KTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnBhZ2VzID0gW107XG5cbiAgICB0aGlzLl9jbGVhcigpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5fY2xlYXIoKTtcblxuICAgIHRoaXMuZWwud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmVsLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgem9vbShzY2FsZSkge1xuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuXG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICB0cmFuc2xhdGUoeCwgeSkge1xuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHgsIHkpO1xuICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgX2ZpbmRQYWdlKHBhZ2VJZCkge1xuICAgIHJldHVybiB0aGlzLnBhZ2VzLmZpbHRlcihwYWdlID0+IHtcbiAgICAgIHJldHVybiBwYWdlLmlkID09PSBwYWdlSWQ7XG4gICAgfSlbMF0gfHwgbnVsbDtcbiAgfVxuXG4gIF9nZW5lcmF0ZVJ1bGVycyhzdG9yeSkge1xuICAgIGNvbnN0IHJ1bGVycyA9IHtcbiAgICAgIHg6IFtdLFxuICAgICAgeTogW10sXG4gICAgfTtcbiAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5vcHRpb25zLnBhZGRpbmc7XG5cbiAgICAvLyBHZW5lcmF0ZSB4IHJ1bGVyc1xuICAgIHN0b3J5LnNvcnQoKHNjZW5lMSwgc2NlbmUyKSA9PiB7XG4gICAgICByZXR1cm4gKHNjZW5lMS5ncmlkLnggLSBzY2VuZTIuZ3JpZC54KTtcbiAgICB9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzY2VuZSA9IHN0b3J5W2ldO1xuICAgICAgY29uc3QgeCA9IHNjZW5lLmdyaWQueDtcbiAgICAgIGNvbnN0IGN1cnJlbnRSdWxlclggPSBydWxlcnMueFt4XSB8fCBudWxsO1xuICAgICAgY29uc3QgbmV4dFJ1bGVyWCA9IHJ1bGVycy54W3ggKyAxXSB8fCBudWxsO1xuXG4gICAgICBpZiAoY3VycmVudFJ1bGVyWCA9PT0gbnVsbCkge1xuICAgICAgICBydWxlcnMueFt4XSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5leHROZXdSdWxlclggPSBydWxlcnMueFt4XSArIHNjZW5lLnNjcmVlbi53aWR0aCArIHBhZGRpbmcueDtcbiAgICAgIGlmIChuZXh0UnVsZXJYID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy54W3ggKyAxXSA9IG5leHROZXdSdWxlclg7XG4gICAgICB9IGVsc2UgaWYgKG5leHRSdWxlclggPCBuZXh0TmV3UnVsZXJYKSB7XG4gICAgICAgIHJ1bGVycy54W3ggKyAxXSA9IG5leHROZXdSdWxlclg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgeSBydWxlcnNcbiAgICBzdG9yeS5zb3J0KChzY2VuZTEsIHNjZW5lMikgPT4ge1xuICAgICAgcmV0dXJuIChzY2VuZTEuZ3JpZC55IC0gc2NlbmUyLmdyaWQueSk7XG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2NlbmUgPSBzdG9yeVtpXTtcbiAgICAgIGNvbnN0IHkgPSBzY2VuZS5ncmlkLnk7XG4gICAgICBjb25zdCBjdXJyZW50UnVsZXJZID0gcnVsZXJzLnlbeV0gfHwgbnVsbDtcbiAgICAgIGNvbnN0IG5leHRSdWxlclkgPSBydWxlcnMueVt5ICsgMV0gfHwgbnVsbDtcblxuICAgICAgaWYgKGN1cnJlbnRSdWxlclkgPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnlbeV0gPSAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0TmV3UnVsZXJZID0gcnVsZXJzLnlbeV0gKyBzY2VuZS5zY3JlZW4uaGVpZ2h0ICsgcGFkZGluZy55O1xuICAgICAgaWYgKG5leHRSdWxlclkgPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnlbeSArIDFdID0gbmV4dE5ld1J1bGVyWTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dFJ1bGVyWSA8IG5leHROZXdSdWxlclkpIHtcbiAgICAgICAgcnVsZXJzLnlbeSArIDFdID0gbmV4dE5ld1J1bGVyWTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZXJzO1xuICB9XG5cbiAgX2NsZWFyKCkge1xuICAgIC8vIFRPRE86IE9wdGltaXplIGNsZWFyUmVjdCBzaXplXG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKDEgLyB0aGlzLnNjYWxlLCAxIC8gdGhpcy5zY2FsZSk7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgtMTAwMDAsIC0xMDAwMCwgMTAwMDAwLCAxMDAwMDApO1xuICB9XG5cbiAgX3JlbmRlclJ1bGVycygpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMub3B0aW9ucy5ydWxlckNvbG9yIHx8ICdyZ2JhKDIxNiwgNTMsIDUzLCAwLjcyKSc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucnVsZXJzLngubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSB0aGlzLnJ1bGVycy54W2ldO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgsIC0xMDAwMDApO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh4LCAxMDAwMDApO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ydWxlcnMueS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeSA9IHRoaXMucnVsZXJzLnlbaV07XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oLTEwMDAwMCwgeSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKDEwMDAwMCwgeSk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuICB9XG5cbiAgX3JlbmRlclBhZ2VzKCkge1xuICAgIHRoaXMuc3RvcnkuZm9yRWFjaChzY2VuZSA9PiB7XG4gICAgICBjb25zdCB4ID0gc2NlbmUuZ3JpZC54O1xuICAgICAgY29uc3QgeSA9IHNjZW5lLmdyaWQueTtcbiAgICAgIGNvbnN0IHBhZ2UgPSBuZXcgUGFnZSh0aGlzLmNvbnRleHQsIHNjZW5lLCB0aGlzLnJ1bGVycyk7XG4gICAgICB0aGlzLnBhZ2VzLnB1c2gocGFnZSk7XG4gICAgfSk7XG4gIH1cblxuICBfcmVuZGVyVHJhbnNpdGlvbnMoKSB7XG4gICAgdGhpcy5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgcGFnZS5zY2VuZS50cmFuc2l0aW9ucy5mb3JFYWNoKCh0cmFuc2l0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldFBhZ2UgPSB0aGlzLl9maW5kUGFnZSh0cmFuc2l0aW9uLnRvLmlkKTtcbiAgICAgICAgbmV3IFRyYW5zaXRpb24odGhpcy5jb250ZXh0LCB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICB0YXJnZXRQYWdlLFxuICAgICAgICAgIHRyYW5zaXRpb24sXG4gICAgICAgICAgcnVsZXJzOiB0aGlzLnJ1bGVycyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9yZW5kZXIoKSB7XG4gICAgdGhpcy5fcmVuZGVyUGFnZXMoKTtcbiAgICB0aGlzLl9yZW5kZXJUcmFuc2l0aW9ucygpO1xuICAgIHRoaXMuX3JlbmRlclJ1bGVycygpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQsIHNjZW5lLCBydWxlcnMpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnJ1bGVycyA9IHJ1bGVycztcbiAgICB0aGlzLmlkID0gdGhpcy5zY2VuZS5pZDtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5zY2VuZS50aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5zY2VuZS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLnNjZW5lLmdyaWQ7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMuc2NlbmUuc2NyZWVuLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zY2VuZS5zY3JlZW4uaGVpZ2h0O1xuICAgIHRoaXMueCA9IHRoaXMucnVsZXJzLnhbdGhpcy5ncmlkLnhdICsgKCh0aGlzLnJ1bGVycy54W3RoaXMuZ3JpZC54ICsgMV0gLSB0aGlzLnJ1bGVycy54W3RoaXMuZ3JpZC54XSAtIHRoaXMud2lkdGgpIC8gMik7XG4gICAgdGhpcy55ID0gdGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueV0gKyAoKHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnkgKyAxXSAtIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldIC0gdGhpcy5oZWlnaHQpIC8gMik7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5zY2VuZS5jb2xvciB8fCAncmdiYSgwLCAwLCAwLCAwLjMyKSc7XG4gICAgY29uc3QgdGl0bGVGb250U2l6ZSA9ICh0aGlzLnRpdGxlIHx8IHt9KS5mb250U2l6ZSB8fCAxNDtcbiAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjNjY2JztcbiAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke3RpdGxlRm9udFNpemV9cHggc2FuLXNlcmlmYDtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRpdGxlLnRleHQsIHRoaXMueCwgdGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueV0gKyB0aXRsZUZvbnRTaXplLCB0aGlzLndpZHRoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGVzY3JpcHRpb24pIHtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRm9udFNpemUgPSB0aGlzLmRlc2NyaXB0aW9uLmZvbnRTaXplO1xuICAgICAgY29uc3QgdGV4dHMgPSB0aGlzLmRlc2NyaXB0aW9uLnRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjNjY2JztcbiAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke2Rlc2NyaXB0aW9uRm9udFNpemV9cHggc2FuLXNlcmlmYDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IHRleHRzW2ldO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgdGhpcy54LCB0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55XSArIHRpdGxlRm9udFNpemUgKyAoZGVzY3JpcHRpb25Gb250U2l6ZSAqIChpICsgMikpLCB0aGlzLndpZHRoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY29udGV4dC5zaGFkb3dDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMjQpJztcbiAgICB0aGlzLmNvbnRleHQuc2hhZG93Qmx1ciA9IDM7XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd09mZnNldFggPSAwO1xuICAgIHRoaXMuY29udGV4dC5zaGFkb3dPZmZzZXRZID0gMDtcbiAgICBpZiAodGhpcy5zY2VuZS5zY3JlZW4uaW1nKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuc2NlbmUuc2NyZWVuLmltZywgdGhpcy54LCB0aGlzLnksIHRoaXMuc2NlbmUuc2NyZWVuLndpZHRoLCB0aGlzLnNjZW5lLnNjcmVlbi5oZWlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMuc2NlbmUuc2NyZWVuLndpZHRoLCB0aGlzLnNjZW5lLnNjcmVlbi5oZWlnaHQpO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQuc2hhZG93Qmx1ciA9IDA7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUcmFuc2l0aW9uIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwge3BhZ2UsIHRhcmdldFBhZ2UsIHRyYW5zaXRpb24sIHJ1bGVyc30pIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgdGhpcy50YXJnZXRQYWdlID0gdGFyZ2V0UGFnZTtcbiAgICB0aGlzLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uO1xuICAgIHRoaXMucnVsZXJzID0gcnVsZXJzO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlclN0YXJ0UG9pbnQoe3N0YXJ0WCwgc3RhcnRZLCByYWRpdXN9KSB7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5hcmMoc3RhcnRYLCBzdGFydFksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcmVuZGVyVHJhbnNpdGlvbkxpbmUoe3N0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCByb29tfSkge1xuICAgIGNvbnN0IGN1cnJlbnRHcmlkID0gdGhpcy5wYWdlLmdyaWQ7XG4gICAgY29uc3QgdGFyZ2V0R3JpZCA9IHRoaXMudGFyZ2V0UGFnZS5ncmlkO1xuXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oc3RhcnRYLCBzdGFydFkpO1xuICAgIGlmIChjdXJyZW50R3JpZC55ID4gdGFyZ2V0R3JpZC55KSB7XG4gICAgICAvLyBsaW5lVG8gdG9wLlxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzdGFydFgsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA8IHRhcmdldEdyaWQueSkge1xuICAgICAgLy8gbGluZVRvIGJvdHRvbS5cbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oc3RhcnRYLCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnkgKyAxXSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55ICsgMV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA9PT0gdGFyZ2V0R3JpZC55ICYmIGN1cnJlbnRHcmlkLnggPiB0YXJnZXRHcmlkLngpIHtcbiAgICAgIC8vIGxpbmVUbyBsZWZ0XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRHcmlkLnkgPT09IHRhcmdldEdyaWQueSAmJiBjdXJyZW50R3JpZC54IDwgdGFyZ2V0R3JpZC54KSB7XG4gICAgICAvLyBsaW5lVG8gcmlnaHRcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICBpZiAodGFyZ2V0R3JpZC54IC0gY3VycmVudEdyaWQueCA+IDEpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIGVuZFkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueF0gKyByb29tLngsIHN0YXJ0WSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueSwgZW5kWSk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5saW5lVG8oZW5kWCwgZW5kWSk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcmVuZGVyRW5kQXJyb3coe2VuZFgsIGVuZFl9KSB7XG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oZW5kWCwgZW5kWSk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYIC0gMTQsIGVuZFkgKyAxMCk7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYIC0gMTQsIGVuZFkgLSAxMCk7XG4gICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcmVuZGVyRnJvbURlc2NyaXB0aW9uKHtzdGFydFgsIHN0YXJ0WX0pIHtcbiAgICBpZiAodGhpcy50cmFuc2l0aW9uLmZyb20uZGVzY3JpcHRpb24pIHtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRm9udFNpemUgPSB0aGlzLnRyYW5zaXRpb24uZnJvbS5kZXNjcmlwdGlvbi5mb250U2l6ZSB8fCAxMjtcbiAgICAgIGNvbnN0IHRleHRzID0gdGhpcy50cmFuc2l0aW9uLmZyb20uZGVzY3JpcHRpb24udGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyM2NjYnO1xuICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgIHRoaXMuY29udGV4dC5mb250ID0gYCR7ZGVzY3JpcHRpb25Gb250U2l6ZX1weCBzYW4tc2VyaWZgO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0ZXh0ID0gdGV4dHNbaV07XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0LCBzdGFydFggKyBkZXNjcmlwdGlvbkZvbnRTaXplLCBzdGFydFkgLSAodGV4dHMubGVuZ3RoICogZGVzY3JpcHRpb25Gb250U2l6ZSkgKyAoZGVzY3JpcHRpb25Gb250U2l6ZSAqIGkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXJUb0Rlc2NyaXB0aW9uKHtlbmRYLCBlbmRZfSkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb24udG8uZGVzY3JpcHRpb24pIHtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRm9udFNpemUgPSB0aGlzLnRyYW5zaXRpb24udG8uZGVzY3JpcHRpb24uZm9udFNpemUgfHwgMTI7XG4gICAgICBjb25zdCB0ZXh0cyA9IHRoaXMudHJhbnNpdGlvbi50by5kZXNjcmlwdGlvbi50ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzY2Nic7XG4gICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gJ3JpZ2h0JztcbiAgICAgIHRoaXMuY29udGV4dC5mb250ID0gYCR7ZGVzY3JpcHRpb25Gb250U2l6ZX1weCBzYW4tc2VyaWZgO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0ZXh0ID0gdGV4dHNbaV07XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0LCBlbmRYIC0gZGVzY3JpcHRpb25Gb250U2l6ZSAqIDIsIGVuZFkgLSAodGV4dHMubGVuZ3RoICogZGVzY3JpcHRpb25Gb250U2l6ZSkgKyAoZGVzY3JpcHRpb25Gb250U2l6ZSAqIGkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgZnJvbSA9IHRoaXMudHJhbnNpdGlvbi5mcm9tIHx8IHtcbiAgICAgIHg6IHRoaXMucGFnZS53aWR0aCxcbiAgICAgIHk6IDAsXG4gICAgICByYWRpdXM6IDEyLFxuICAgIH07XG4gICAgY29uc3QgdG9PZmZzZXQgPSB0aGlzLnRyYW5zaXRpb24udG8ub2Zmc2V0IHx8IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGNvbG9yOiB0aGlzLnRyYW5zaXRpb24uY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC40OCknLFxuICAgICAgcmFkaXVzOiBmcm9tLnJhZGl1cyxcbiAgICAgIHJvb206IHRoaXMudHJhbnNpdGlvbi5yb29tIHx8IHt4OiAwLCB5OiAwfSxcbiAgICAgIHN0YXJ0WDogdGhpcy5wYWdlLnggKyBmcm9tLngsXG4gICAgICBzdGFydFk6IHRoaXMucGFnZS55ICsgZnJvbS55LFxuICAgICAgZW5kWDogdGhpcy50YXJnZXRQYWdlLnggKyB0b09mZnNldC54LFxuICAgICAgZW5kWTogdGhpcy50YXJnZXRQYWdlLnkgKyB0b09mZnNldC55LFxuICAgIH07XG5cbiAgICB0aGlzLnJlbmRlckZyb21EZXNjcmlwdGlvbihvcHRpb25zKTtcblxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IG9wdGlvbnMuY29sb3I7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IG9wdGlvbnMuY29sb3I7XG4gICAgdGhpcy5yZW5kZXJTdGFydFBvaW50KG9wdGlvbnMpO1xuICAgIHRoaXMucmVuZGVyVHJhbnNpdGlvbkxpbmUob3B0aW9ucyk7XG4gICAgdGhpcy5yZW5kZXJFbmRBcnJvdyhvcHRpb25zKTtcblxuICAgIHRoaXMucmVuZGVyVG9EZXNjcmlwdGlvbihvcHRpb25zKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==