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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
    controller.fit(100, 100);
    document.querySelector('.reset').addEventListener('click', function () {
      controller.position(0, 0);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90d2l0dGVyLXN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3RyYW5zaXRpb24uanMiXSwibmFtZXMiOlsiQm9hcmRDb250cm9sbGVyIiwiYm9hcmQiLCJ0cmFucyIsImVuYWJsZWQiLCJ4IiwieSIsInBvcyIsInNjYWxlIiwic2V0RXZlbnRMaXN0ZW5lciIsInpvb20iLCJ0cmFuc2xhdGUiLCJ3aWR0aCIsImhlaWdodCIsInNpemUiLCJydWxlcnMiLCJjZW50ZXIiLCJsZW5ndGgiLCJwYWRkaW5nWCIsInBhZGRpbmdZIiwiZ2V0U2l6ZSIsImVsIiwicG9zaXRpb24iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1pblNjYWxlIiwibWF4U2NhbGUiLCJkZWx0YVkiLCJjbGllbnRYIiwiY2xpZW50WSIsImRpZmYiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInRvU3RyaW5nIiwic3RvcnkiLCJ0aGVuIiwiZ2VuZXJhdGVkU3RvcnkiLCJjYW52YXNFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiQm9hcmQiLCJwYWRkaW5nIiwiY29udHJvbGxlciIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImZpdCIsInRyYW5zaXRpb25Db2xvciIsImhvbWUiLCJpZCIsInRpdGxlIiwidGV4dCIsImRlc2NyaXB0aW9uIiwiZm9udFNpemUiLCJncmlkIiwic2NyZWVuIiwiaW1hZ2VQYXRoIiwidHJhbnNpdGlvbnMiLCJjb2xvciIsInRvIiwib2Zmc2V0IiwiZnJvbSIsInJhZGl1cyIsInJvb20iLCJwb3N0c1Nob3ciLCJwb3N0c05ldyIsInNlYXJjaCIsIm5vdGlmaWNhdGlvbnNJbmRleCIsIm1lbnUiLCJwcm9maWxlIiwic3RhcnRTdG9yeSIsIl9zdG9yeSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJzY2VuZSIsImltZyIsIkltYWdlIiwic3JjIiwicmVzb2x2ZSIsIm9wdGlvbnMiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIl9nZW5lcmF0ZVJ1bGVycyIsInBhZ2VzIiwiX2NsZWFyIiwiX3JlbmRlciIsInBhZ2VJZCIsImZpbHRlciIsInBhZ2UiLCJzb3J0Iiwic2NlbmUxIiwic2NlbmUyIiwiaSIsImN1cnJlbnRSdWxlclgiLCJuZXh0UnVsZXJYIiwibmV4dE5ld1J1bGVyWCIsImN1cnJlbnRSdWxlclkiLCJuZXh0UnVsZXJZIiwibmV4dE5ld1J1bGVyWSIsImNsZWFyUmVjdCIsInJ1bGVyQ29sb3IiLCJiZWdpblBhdGgiLCJzdHJva2VTdHlsZSIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImZvckVhY2giLCJQYWdlIiwicHVzaCIsInRyYW5zaXRpb24iLCJ0YXJnZXRQYWdlIiwiX2ZpbmRQYWdlIiwiVHJhbnNpdGlvbiIsIl9yZW5kZXJQYWdlcyIsIl9yZW5kZXJUcmFuc2l0aW9ucyIsIl9yZW5kZXJSdWxlcnMiLCJyZW5kZXIiLCJ0aXRsZUZvbnRTaXplIiwiZmlsbFN0eWxlIiwidGV4dEFsaWduIiwiZm9udCIsImZpbGxUZXh0IiwiZGVzY3JpcHRpb25Gb250U2l6ZSIsInRleHRzIiwic3BsaXQiLCJzaGFkb3dDb2xvciIsInNoYWRvd0JsdXIiLCJzaGFkb3dPZmZzZXRYIiwic2hhZG93T2Zmc2V0WSIsImRyYXdJbWFnZSIsImZpbGxSZWN0Iiwic3RhcnRYIiwic3RhcnRZIiwiYXJjIiwiTWF0aCIsIlBJIiwiZmlsbCIsImVuZFgiLCJlbmRZIiwiY3VycmVudEdyaWQiLCJ0YXJnZXRHcmlkIiwiY2xvc2VQYXRoIiwidG9PZmZzZXQiLCJyZW5kZXJGcm9tRGVzY3JpcHRpb24iLCJyZW5kZXJTdGFydFBvaW50IiwicmVuZGVyVHJhbnNpdGlvbkxpbmUiLCJyZW5kZXJFbmRBcnJvdyIsInJlbmRlclRvRGVzY3JpcHRpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ25FYUEsZTs7O0FBQ1gsMkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBS0MsS0FBTCxHQUFhO0FBQ1hDLGVBQVMsS0FERTtBQUVYQyxTQUFHLENBRlE7QUFHWEMsU0FBRztBQUhRLEtBQWI7QUFLQSxTQUFLQyxHQUFMLEdBQVc7QUFDVEYsU0FBRyxDQURNO0FBRVRDLFNBQUc7QUFGTSxLQUFYO0FBSUEsU0FBS0UsS0FBTCxHQUFhLENBQWI7QUFFQSxTQUFLTixLQUFMLEdBQWFBLEtBQWI7QUFFQSxTQUFLTyxnQkFBTDtBQUNEOzs7O3lCQUVJRCxLLEVBQU87QUFDVixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxXQUFLTixLQUFMLENBQVdRLElBQVgsQ0FBZ0IsS0FBS0YsS0FBckI7QUFDRDs7OzhCQUVTSCxDLEVBQUdD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QSxXQUFLbUUsY0FBTCxDQUFvQm5FLE9BQXBCO0FBRUEsV0FBS29FLG1CQUFMLENBQXlCcEUsT0FBekI7QUFDRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgY2xhc3MgQm9hcmRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoYm9hcmQpIHtcbiAgICB0aGlzLnRyYW5zID0ge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9O1xuICAgIHRoaXMucG9zID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfTtcbiAgICB0aGlzLnNjYWxlID0gMTtcblxuICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcblxuICAgIHRoaXMuc2V0RXZlbnRMaXN0ZW5lcigpO1xuICB9XG5cbiAgem9vbShzY2FsZSkge1xuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLmJvYXJkLnpvb20odGhpcy5zY2FsZSk7XG4gIH1cblxuICB0cmFuc2xhdGUoeCwgeSkge1xuICAgIHRoaXMucG9zLnggKz0geDtcbiAgICB0aGlzLnBvcy55ICs9IHk7XG4gICAgdGhpcy5ib2FyZC50cmFuc2xhdGUoeCwgeSk7XG4gIH1cblxuICBwb3NpdGlvbih4LCB5KSB7XG4gICAgdGhpcy50cmFuc2xhdGUoLTEgKiB0aGlzLnBvcy54LCAtMSAqIHRoaXMucG9zLnkpO1xuICAgIHRoaXMudHJhbnNsYXRlKHgsIHkpO1xuICB9XG5cbiAgc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5ib2FyZC5zaXplKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgZ2V0Q2VudGVyKCkge1xuICAgIGNvbnN0IHJ1bGVycyA9IHRoaXMuYm9hcmQucnVsZXJzO1xuICAgIGNvbnN0IGNlbnRlciA9IHtcbiAgICAgIHg6IChydWxlcnMueFswXSArIHJ1bGVycy54W3J1bGVycy54Lmxlbmd0aCAtIDFdKSAvIDIsXG4gICAgICB5OiAocnVsZXJzLnlbMF0gKyBydWxlcnMueVtydWxlcnMueS5sZW5ndGggLSAxXSkgLyAyLFxuICAgIH07XG4gICAgcmV0dXJuIGNlbnRlcjtcbiAgfVxuXG4gIGdldFNpemUoKSB7XG4gICAgY29uc3QgcnVsZXJzID0gdGhpcy5ib2FyZC5ydWxlcnM7XG4gICAgY29uc3Qgc2l6ZSA9IHtcbiAgICAgIHdpZHRoOiBydWxlcnMueFtydWxlcnMueC5sZW5ndGggLSAxXSxcbiAgICAgIGhlaWdodDogcnVsZXJzLnlbcnVsZXJzLnkubGVuZ3RoIC0gMV0sXG4gICAgfTtcbiAgICByZXR1cm4gc2l6ZTtcbiAgfVxuXG4gIGZpdChwYWRkaW5nWCwgcGFkZGluZ1kpIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRTaXplKCk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmJvYXJkLmVsLndpZHRoIC0gcGFkZGluZ1ggKiAyO1xuICAgIGNvbnN0IHNjYWxlID0gd2lkdGggLyBzaXplLndpZHRoO1xuICAgIHRoaXMucG9zaXRpb24ocGFkZGluZ1gsIHBhZGRpbmdZKVxuICAgIHRoaXMuem9vbShzY2FsZSk7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVyKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgbWluU2NhbGUgPSAwLjA1O1xuICAgICAgY29uc3QgbWF4U2NhbGUgPSAxMDtcblxuICAgICAgaWYoZXZlbnQuZGVsdGFZID4gMCkge1xuICAgICAgICB0aGlzLnNjYWxlICo9IDAuOTU7XG4gICAgICB9ZWxzZSB7XG4gICAgICAgIHRoaXMuc2NhbGUgKj0gMS4wNTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgbWluU2NhbGUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IG1pblNjYWxlO1xuICAgICAgfSBlbHNlIGlmIChtYXhTY2FsZSA8IHRoaXMuc2NhbGUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IG1heFNjYWxlO1xuICAgICAgfVxuICAgICAgdGhpcy5ib2FyZC56b29tKHRoaXMuc2NhbGUpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy50cmFucy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudHJhbnMueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICB0aGlzLnRyYW5zLnkgPSBldmVudC5jbGllbnRZO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLnRyYW5zLmVuYWJsZWQpIHtcbiAgICAgICAgY29uc3QgZGlmZiA9IHtcbiAgICAgICAgICB4OiBldmVudC5jbGllbnRYIC0gdGhpcy50cmFucy54LFxuICAgICAgICAgIHk6IGV2ZW50LmNsaWVudFkgLSB0aGlzLnRyYW5zLnksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJhbnNsYXRlKGRpZmYueCwgZGlmZi55KTtcbiAgICAgICAgdGhpcy50cmFucy54ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgdGhpcy50cmFucy55ID0gZXZlbnQuY2xpZW50WTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIHRoaXMudHJhbnMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBzdGFydFN0b3J5IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gJy4vdmlld3MvYm9hcmQnO1xuLy9pbXBvcnQgeyBzdG9yeSB9IGZyb20gJy4vc2FtcGxlLXN0b3J5JztcbmltcG9ydCB7IHN0b3J5IH0gZnJvbSAnLi90d2l0dGVyLXN0b3J5JztcbmltcG9ydCB7IEJvYXJkQ29udHJvbGxlciB9IGZyb20gJy4vYm9hcmQtY29udHJvbGxlcic7XG5cbmV4cG9ydCB7XG4gIHN0YXJ0U3RvcnksXG4gIEJvYXJkLFxuICBCb2FyZENvbnRyb2xsZXIsXG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coYFN0YXJ0IGFwcCBhdCAkeyhuZXcgRGF0ZSgpKS50b1N0cmluZygpfS5gKTtcblxuICBzdGFydFN0b3J5KHN0b3J5KS50aGVuKChnZW5lcmF0ZWRTdG9yeSkgPT4ge1xuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3J5dGVsbGVyJyk7XG5cbiAgICBjb25zdCBib2FyZCA9IG5ldyBCb2FyZChjYW52YXNFbGVtZW50LCBnZW5lcmF0ZWRTdG9yeSwge1xuICAgICAgcGFkZGluZzoge1xuICAgICAgICB4OiAzMjAsXG4gICAgICAgIHk6IDIwMCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEJvYXJkQ29udHJvbGxlcihib2FyZCk7XG4gICAgY29udHJvbGxlci5zaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIGNvbnRyb2xsZXIuZml0KDEwMCwgMTAwKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNldCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29udHJvbGxlci5wb3NpdGlvbigwLCAwKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiIsImNvbnN0IHRyYW5zaXRpb25Db2xvciA9ICcjMWRhMWYyJztcblxuY29uc3QgaG9tZSA9IHtcbiAgaWQ6ICcvaG9tZScsXG4gIHRpdGxlOiB7XG4gICAgdGV4dDogJ0hvbWUgU2NyZWVuJyxcbiAgfSxcbiAgZGVzY3JpcHRpb246IHtcbiAgICBmb250U2l6ZTogMTQsXG4gICAgdGV4dDogYHVybDogL1xcbkRpc3BsYXkgdGltZWxpbmVgLFxuICB9LFxuICBncmlkOiB7IHg6IDAsIHk6IDAgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL2hvbWUucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICB0bzoge1xuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdGV4dDogJ3RyYW5zaXRpb24gcmF0ZTogNSUoRXhhbXBsZSknLFxuICAgICAgfSxcbiAgICAgIGlkOiAnL3Bvc3RzL3Nob3cnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbToge1xuICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgdGV4dDogJ3RyYW5zaXRpb24gcmF0ZTogNSUoRXhhbXBsZSknLFxuICAgICAgfSxcbiAgICAgIHg6IDI0NCxcbiAgICAgIHk6IDI0NyxcbiAgICAgIHJhZGl1czogOCxcbiAgICB9LFxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDYwLCB5OiA2MCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiA2MCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiA1MTcsIHJhZGl1czogOCwgfSxcbiAgfSwge1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgcm9vbTogeyB4OiAzMCwgeTogLTMwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9zZWFyY2gnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAxMjgsIHk6IDYzLCByYWRpdXM6IDgsIH0sXG4gIH0sIHtcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9ub3RpZmljYXRpb25zL2luZGV4JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjA0LCB5OiA2MywgcmFkaXVzOiA4LCB9LFxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IC0zMCwgeTogOTAsIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL21lbnUnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyMSwgeTogMzEsIHJhZGl1czogOCwgfSxcbiAgfV0sXG59O1xuXG5jb25zdCBwb3N0c1Nob3cgPSB7XG4gIGlkOiAnL3Bvc3RzL3Nob3cnLFxuICBncmlkOiB7IHg6IDEsIHk6IDAgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL3Bvc3RzX3Nob3cucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDEyMCwgeTogMCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiA1MTcsIHJhZGl1czogOCwgfSxcbiAgfV0sXG59O1xuXG5jb25zdCBwb3N0c05ldyA9IHtcbiAgaWQ6ICcvcG9zdHMvbmV3JyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAxIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9wb3N0c19uZXcucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICByb29tOiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9ob21lJyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjcxLCB5OiAyMCwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHNlYXJjaCA9IHtcbiAgaWQ6ICcvc2VhcmNoJyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAyIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9zZWFyY2gucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFtdLFxufTtcblxuY29uc3Qgbm90aWZpY2F0aW9uc0luZGV4ID0ge1xuICBpZDogJy9ub3RpZmljYXRpb25zL2luZGV4JyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAzIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9ub3RpZmljYXRpb25zX2luZGV4LnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbXSxcbn07XG5cbmNvbnN0IG1lbnUgPSB7XG4gIGlkOiAnL21lbnUnLFxuICBncmlkOiB7IHg6IDEsIHk6IDQgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL21lbnUucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFt7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvcHJvZmlsZScsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDIxLCB5OiAzMSwgcmFkaXVzOiA4LCB9LFxuICB9XSxcbn07XG5cbmNvbnN0IHByb2ZpbGUgPSB7XG4gIGlkOiAnL3Byb2ZpbGUnLFxuICBncmlkOiB7IHg6IDIsIHk6IDAgfSxcbiAgc2NyZWVuOiB7XG4gICAgd2lkdGg6IDMwMCxcbiAgICBpbWFnZVBhdGg6ICcuL2ltYWdlcy90d2l0dGVyL3Byb2ZpbGUucG5nJyxcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IFtdLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0b3J5ID0gW1xuICBob21lLFxuICBwb3N0c1Nob3csXG4gIHBvc3RzTmV3LFxuICBzZWFyY2gsXG4gIG5vdGlmaWNhdGlvbnNJbmRleCxcbiAgbWVudSxcbiAgcHJvZmlsZSxcbl07XG4iLCJleHBvcnQgZnVuY3Rpb24gc3RhcnRTdG9yeShzdG9yeSkge1xuICBjb25zdCBfc3RvcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0b3J5KSk7XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKF9zdG9yeS5tYXAoKHNjZW5lKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKHNjZW5lLnNjcmVlbi5pbWFnZVBhdGgpIHtcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSBzY2VuZS5zY3JlZW4uaW1hZ2VQYXRoO1xuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgIHNjZW5lLnNjcmVlbi5pbWcgPSBpbWc7XG4gICAgICAgICAgaWYgKHNjZW5lLnNjcmVlbi53aWR0aCAmJiAhc2NlbmUuc2NyZWVuLmhlaWdodCkge1xuICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBpbWcud2lkdGggLyBzY2VuZS5zY3JlZW4ud2lkdGg7XG4gICAgICAgICAgICBzY2VuZS5zY3JlZW4uaGVpZ2h0ID0gaW1nLmhlaWdodCAvIHNjYWxlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXNjZW5lLnNjcmVlbi53aWR0aCAmJiBzY2VuZS5zY3JlZW4uaGVpZ2h0KSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZSA9IGltZy5oZWlnaHQgLyBzY2VuZS5zY3JlZW4uaGVpZ2h0O1xuICAgICAgICAgICAgc2NlbmUuc2NyZWVuLndpZHRoID0gaW1nLndpZHRoIC8gc2NhbGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKS50aGVuKCgpID0+IHtcbiAgICByZXR1cm4gX3N0b3J5O1xuICB9KTtcbn1cblxuIiwiaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZSc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uIH0gZnJvbSAnLi90cmFuc2l0aW9uJztcblxuLypcbiAqIEJvYXJkXG4gKiAtIGNvbnN0cnVjdG9yXG4gKiAgIC0gb3B0aW9uc1xuICogICAgIC0gcnVsZXJDb2xvclxuICogICAgIC0gcGFkZGluZ1xuICogICAgICAgLSB4XG4gKiAgICAgICAtIHlcbiAqIC0gc2l6ZVxuICogLSB6b29tXG4gKiAtIHRyYW5zbGF0ZVxuICogLSBfZmluZFBhZ2VcbiAqIC0gX2dlbmVyYXRlUnVsZXJzXG4gKiAtIF9jbGVhclxuICogLSBfcmVuZGVyUnVsZXJzXG4gKiAtIF9yZW5kZXJQYWdlc1xuICogLSBfcmVuZGVyVHJhbnNpdGlvbnNcbiAqL1xuXG5leHBvcnQgY2xhc3MgQm9hcmQge1xuICBjb25zdHJ1Y3RvcihlbCwgc3RvcnksIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuc3RvcnkgPSBzdG9yeTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucnVsZXJzID0gdGhpcy5fZ2VuZXJhdGVSdWxlcnModGhpcy5zdG9yeSk7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5wYWdlcyA9IFtdO1xuXG4gICAgdGhpcy5fY2xlYXIoKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuX2NsZWFyKCk7XG5cbiAgICB0aGlzLmVsLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5lbC5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHpvb20oc2NhbGUpIHtcbiAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMuY29udGV4dC5zY2FsZSh0aGlzLnNjYWxlLCB0aGlzLnNjYWxlKTtcblxuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgdHJhbnNsYXRlKHgsIHkpIHtcbiAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSh4LCB5KTtcbiAgICB0aGlzLmNvbnRleHQuc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG5cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIF9maW5kUGFnZShwYWdlSWQpIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlcy5maWx0ZXIocGFnZSA9PiB7XG4gICAgICByZXR1cm4gcGFnZS5pZCA9PT0gcGFnZUlkO1xuICAgIH0pWzBdIHx8IG51bGw7XG4gIH1cblxuICBfZ2VuZXJhdGVSdWxlcnMoc3RvcnkpIHtcbiAgICBjb25zdCBydWxlcnMgPSB7XG4gICAgICB4OiBbXSxcbiAgICAgIHk6IFtdLFxuICAgIH07XG4gICAgY29uc3QgcGFkZGluZyA9IHRoaXMub3B0aW9ucy5wYWRkaW5nO1xuXG4gICAgLy8gR2VuZXJhdGUgeCBydWxlcnNcbiAgICBzdG9yeS5zb3J0KChzY2VuZTEsIHNjZW5lMikgPT4ge1xuICAgICAgcmV0dXJuIChzY2VuZTEuZ3JpZC54IC0gc2NlbmUyLmdyaWQueCk7XG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2NlbmUgPSBzdG9yeVtpXTtcbiAgICAgIGNvbnN0IHggPSBzY2VuZS5ncmlkLng7XG4gICAgICBjb25zdCBjdXJyZW50UnVsZXJYID0gcnVsZXJzLnhbeF0gfHwgbnVsbDtcbiAgICAgIGNvbnN0IG5leHRSdWxlclggPSBydWxlcnMueFt4ICsgMV0gfHwgbnVsbDtcblxuICAgICAgaWYgKGN1cnJlbnRSdWxlclggPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnhbeF0gPSAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0TmV3UnVsZXJYID0gcnVsZXJzLnhbeF0gKyBzY2VuZS5zY3JlZW4ud2lkdGggKyBwYWRkaW5nLng7XG4gICAgICBpZiAobmV4dFJ1bGVyWCA9PT0gbnVsbCkge1xuICAgICAgICBydWxlcnMueFt4ICsgMV0gPSBuZXh0TmV3UnVsZXJYO1xuICAgICAgfSBlbHNlIGlmIChuZXh0UnVsZXJYIDwgbmV4dE5ld1J1bGVyWCkge1xuICAgICAgICBydWxlcnMueFt4ICsgMV0gPSBuZXh0TmV3UnVsZXJYO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIHkgcnVsZXJzXG4gICAgc3Rvcnkuc29ydCgoc2NlbmUxLCBzY2VuZTIpID0+IHtcbiAgICAgIHJldHVybiAoc2NlbmUxLmdyaWQueSAtIHNjZW5lMi5ncmlkLnkpO1xuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNjZW5lID0gc3RvcnlbaV07XG4gICAgICBjb25zdCB5ID0gc2NlbmUuZ3JpZC55O1xuICAgICAgY29uc3QgY3VycmVudFJ1bGVyWSA9IHJ1bGVycy55W3ldIHx8IG51bGw7XG4gICAgICBjb25zdCBuZXh0UnVsZXJZID0gcnVsZXJzLnlbeSArIDFdIHx8IG51bGw7XG5cbiAgICAgIGlmIChjdXJyZW50UnVsZXJZID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy55W3ldID0gMDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV4dE5ld1J1bGVyWSA9IHJ1bGVycy55W3ldICsgc2NlbmUuc2NyZWVuLmhlaWdodCArIHBhZGRpbmcueTtcbiAgICAgIGlmIChuZXh0UnVsZXJZID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy55W3kgKyAxXSA9IG5leHROZXdSdWxlclk7XG4gICAgICB9IGVsc2UgaWYgKG5leHRSdWxlclkgPCBuZXh0TmV3UnVsZXJZKSB7XG4gICAgICAgIHJ1bGVycy55W3kgKyAxXSA9IG5leHROZXdSdWxlclk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGVycztcbiAgfVxuXG4gIF9jbGVhcigpIHtcbiAgICAvLyBUT0RPOiBPcHRpbWl6ZSBjbGVhclJlY3Qgc2l6ZVxuICAgIHRoaXMuY29udGV4dC5zY2FsZSgxIC8gdGhpcy5zY2FsZSwgMSAvIHRoaXMuc2NhbGUpO1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoLTEwMDAwLCAtMTAwMDAsIDEwMDAwMCwgMTAwMDAwKTtcbiAgfVxuXG4gIF9yZW5kZXJSdWxlcnMoKSB7XG4gICAgY29uc3QgY29sb3IgPSB0aGlzLm9wdGlvbnMucnVsZXJDb2xvciB8fCAncmdiYSgyMTYsIDUzLCA1MywgMC43MiknO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJ1bGVycy54Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5ydWxlcnMueFtpXTtcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4LCAtMTAwMDAwKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeCwgMTAwMDAwKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucnVsZXJzLnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLnJ1bGVycy55W2ldO1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKC0xMDAwMDAsIHkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbygxMDAwMDAsIHkpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cbiAgfVxuXG4gIF9yZW5kZXJQYWdlcygpIHtcbiAgICB0aGlzLnN0b3J5LmZvckVhY2goc2NlbmUgPT4ge1xuICAgICAgY29uc3QgeCA9IHNjZW5lLmdyaWQueDtcbiAgICAgIGNvbnN0IHkgPSBzY2VuZS5ncmlkLnk7XG4gICAgICBjb25zdCBwYWdlID0gbmV3IFBhZ2UodGhpcy5jb250ZXh0LCBzY2VuZSwgdGhpcy5ydWxlcnMpO1xuICAgICAgdGhpcy5wYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgX3JlbmRlclRyYW5zaXRpb25zKCkge1xuICAgIHRoaXMucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHBhZ2Uuc2NlbmUudHJhbnNpdGlvbnMuZm9yRWFjaCgodHJhbnNpdGlvbikgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRQYWdlID0gdGhpcy5fZmluZFBhZ2UodHJhbnNpdGlvbi50by5pZCk7XG4gICAgICAgIG5ldyBUcmFuc2l0aW9uKHRoaXMuY29udGV4dCwge1xuICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgdGFyZ2V0UGFnZSxcbiAgICAgICAgICB0cmFuc2l0aW9uLFxuICAgICAgICAgIHJ1bGVyczogdGhpcy5ydWxlcnMsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBfcmVuZGVyKCkge1xuICAgIHRoaXMuX3JlbmRlclBhZ2VzKCk7XG4gICAgdGhpcy5fcmVuZGVyVHJhbnNpdGlvbnMoKTtcbiAgICB0aGlzLl9yZW5kZXJSdWxlcnMoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0LCBzY2VuZSwgcnVsZXJzKSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy5ydWxlcnMgPSBydWxlcnM7XG4gICAgdGhpcy5pZCA9IHRoaXMuc2NlbmUuaWQ7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMuc2NlbmUudGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuc2NlbmUuZGVzY3JpcHRpb247XG4gICAgdGhpcy5ncmlkID0gdGhpcy5zY2VuZS5ncmlkO1xuICAgIHRoaXMud2lkdGggPSB0aGlzLnNjZW5lLnNjcmVlbi53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodDtcbiAgICB0aGlzLnggPSB0aGlzLnJ1bGVycy54W3RoaXMuZ3JpZC54XSArICgodGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueCArIDFdIC0gdGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueF0gLSB0aGlzLndpZHRoKSAvIDIpO1xuICAgIHRoaXMueSA9IHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgKCh0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55ICsgMV0gLSB0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55XSAtIHRoaXMuaGVpZ2h0KSAvIDIpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuc2NlbmUuY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC4zMiknO1xuICAgIGNvbnN0IHRpdGxlRm9udFNpemUgPSAodGhpcy50aXRsZSB8fCB7fSkuZm9udFNpemUgfHwgMTQ7XG4gICAgaWYgKHRoaXMudGl0bGUpIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzY2Nic7XG4gICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHt0aXRsZUZvbnRTaXplfXB4IHNhbi1zZXJpZmA7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGhpcy50aXRsZS50ZXh0LCB0aGlzLngsIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgdGl0bGVGb250U2l6ZSwgdGhpcy53aWR0aCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRlc2NyaXB0aW9uKSB7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbkZvbnRTaXplID0gdGhpcy5kZXNjcmlwdGlvbi5mb250U2l6ZTtcbiAgICAgIGNvbnN0IHRleHRzID0gdGhpcy5kZXNjcmlwdGlvbi50ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzY2Nic7XG4gICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHtkZXNjcmlwdGlvbkZvbnRTaXplfXB4IHNhbi1zZXJpZmA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSB0ZXh0c1tpXTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRleHQsIHRoaXMueCwgdGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueV0gKyB0aXRsZUZvbnRTaXplICsgKGRlc2NyaXB0aW9uRm9udFNpemUgKiAoaSArIDIpKSwgdGhpcy53aWR0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuc2hhZG93Q29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjI0KSc7XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd0JsdXIgPSAzO1xuICAgIHRoaXMuY29udGV4dC5zaGFkb3dPZmZzZXRYID0gMDtcbiAgICB0aGlzLmNvbnRleHQuc2hhZG93T2Zmc2V0WSA9IDA7XG4gICAgaWYgKHRoaXMuc2NlbmUuc2NyZWVuLmltZykge1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLnNjZW5lLnNjcmVlbi5pbWcsIHRoaXMueCwgdGhpcy55LCB0aGlzLnNjZW5lLnNjcmVlbi53aWR0aCwgdGhpcy5zY2VuZS5zY3JlZW4uaGVpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLnNjZW5lLnNjcmVlbi53aWR0aCwgdGhpcy5zY2VuZS5zY3JlZW4uaGVpZ2h0KTtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd0JsdXIgPSAwO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVHJhbnNpdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQsIHtwYWdlLCB0YXJnZXRQYWdlLCB0cmFuc2l0aW9uLCBydWxlcnN9KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIHRoaXMudGFyZ2V0UGFnZSA9IHRhcmdldFBhZ2U7XG4gICAgdGhpcy50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcbiAgICB0aGlzLnJ1bGVycyA9IHJ1bGVycztcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZW5kZXJTdGFydFBvaW50KHtzdGFydFgsIHN0YXJ0WSwgcmFkaXVzfSkge1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuYXJjKHN0YXJ0WCwgc3RhcnRZLCByYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIHJlbmRlclRyYW5zaXRpb25MaW5lKHtzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgcm9vbX0pIHtcbiAgICBjb25zdCBjdXJyZW50R3JpZCA9IHRoaXMucGFnZS5ncmlkO1xuICAgIGNvbnN0IHRhcmdldEdyaWQgPSB0aGlzLnRhcmdldFBhZ2UuZ3JpZDtcblxuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKHN0YXJ0WCwgc3RhcnRZKTtcbiAgICBpZiAoY3VycmVudEdyaWQueSA+IHRhcmdldEdyaWQueSkge1xuICAgICAgLy8gbGluZVRvIHRvcC5cbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oc3RhcnRYLCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRHcmlkLnkgPCB0YXJnZXRHcmlkLnkpIHtcbiAgICAgIC8vIGxpbmVUbyBib3R0b20uXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHN0YXJ0WCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55ICsgMV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueSArIDFdICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCBlbmRZKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRHcmlkLnkgPT09IHRhcmdldEdyaWQueSAmJiBjdXJyZW50R3JpZC54ID4gdGFyZ2V0R3JpZC54KSB7XG4gICAgICAvLyBsaW5lVG8gbGVmdFxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnhdICsgcm9vbS54LCBzdGFydFkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W3RhcmdldEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50R3JpZC55ID09PSB0YXJnZXRHcmlkLnkgJiYgY3VycmVudEdyaWQueCA8IHRhcmdldEdyaWQueCkge1xuICAgICAgLy8gbGluZVRvIHJpZ2h0XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueCArIDFdICsgcm9vbS54LCBzdGFydFkpO1xuICAgICAgaWYgKHRhcmdldEdyaWQueCAtIGN1cnJlbnRHcmlkLnggPiAxKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54ICsgMV0gKyByb29tLngsIHRoaXMucnVsZXJzLnlbdGFyZ2V0R3JpZC55XSArIHJvb20ueSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W3RhcmdldEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueCArIDFdICsgcm9vbS54LCBlbmRZKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnhdICsgcm9vbS54LCBzdGFydFkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLnksIGVuZFkpO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZFgsIGVuZFkpO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIHJlbmRlckVuZEFycm93KHtlbmRYLCBlbmRZfSkge1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQubW92ZVRvKGVuZFgsIGVuZFkpO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oZW5kWCAtIDE0LCBlbmRZICsgMTApO1xuICAgIHRoaXMuY29udGV4dC5saW5lVG8oZW5kWCAtIDE0LCBlbmRZIC0gMTApO1xuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIHJlbmRlckZyb21EZXNjcmlwdGlvbih7c3RhcnRYLCBzdGFydFl9KSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbi5mcm9tLmRlc2NyaXB0aW9uKSB7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbkZvbnRTaXplID0gdGhpcy50cmFuc2l0aW9uLmZyb20uZGVzY3JpcHRpb24uZm9udFNpemUgfHwgMTI7XG4gICAgICBjb25zdCB0ZXh0cyA9IHRoaXMudHJhbnNpdGlvbi5mcm9tLmRlc2NyaXB0aW9uLnRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjNjY2JztcbiAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke2Rlc2NyaXB0aW9uRm9udFNpemV9cHggc2FuLXNlcmlmYDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IHRleHRzW2ldO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgc3RhcnRYICsgZGVzY3JpcHRpb25Gb250U2l6ZSwgc3RhcnRZIC0gKHRleHRzLmxlbmd0aCAqIGRlc2NyaXB0aW9uRm9udFNpemUpICsgKGRlc2NyaXB0aW9uRm9udFNpemUgKiBpKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyVG9EZXNjcmlwdGlvbih7ZW5kWCwgZW5kWX0pIHtcbiAgICBpZiAodGhpcy50cmFuc2l0aW9uLnRvLmRlc2NyaXB0aW9uKSB7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbkZvbnRTaXplID0gdGhpcy50cmFuc2l0aW9uLnRvLmRlc2NyaXB0aW9uLmZvbnRTaXplIHx8IDEyO1xuICAgICAgY29uc3QgdGV4dHMgPSB0aGlzLnRyYW5zaXRpb24udG8uZGVzY3JpcHRpb24udGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyM2NjYnO1xuICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9ICdyaWdodCc7XG4gICAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke2Rlc2NyaXB0aW9uRm9udFNpemV9cHggc2FuLXNlcmlmYDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IHRleHRzW2ldO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgZW5kWCAtIGRlc2NyaXB0aW9uRm9udFNpemUgKiAyLCBlbmRZIC0gKHRleHRzLmxlbmd0aCAqIGRlc2NyaXB0aW9uRm9udFNpemUpICsgKGRlc2NyaXB0aW9uRm9udFNpemUgKiBpKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGZyb20gPSB0aGlzLnRyYW5zaXRpb24uZnJvbSB8fCB7XG4gICAgICB4OiB0aGlzLnBhZ2Uud2lkdGgsXG4gICAgICB5OiAwLFxuICAgICAgcmFkaXVzOiAxMixcbiAgICB9O1xuICAgIGNvbnN0IHRvT2Zmc2V0ID0gdGhpcy50cmFuc2l0aW9uLnRvLm9mZnNldCB8fCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBjb2xvcjogdGhpcy50cmFuc2l0aW9uLmNvbG9yIHx8ICdyZ2JhKDAsIDAsIDAsIDAuNDgpJyxcbiAgICAgIHJhZGl1czogZnJvbS5yYWRpdXMsXG4gICAgICByb29tOiB0aGlzLnRyYW5zaXRpb24ucm9vbSB8fCB7eDogMCwgeTogMH0sXG4gICAgICBzdGFydFg6IHRoaXMucGFnZS54ICsgZnJvbS54LFxuICAgICAgc3RhcnRZOiB0aGlzLnBhZ2UueSArIGZyb20ueSxcbiAgICAgIGVuZFg6IHRoaXMudGFyZ2V0UGFnZS54ICsgdG9PZmZzZXQueCxcbiAgICAgIGVuZFk6IHRoaXMudGFyZ2V0UGFnZS55ICsgdG9PZmZzZXQueSxcbiAgICB9O1xuXG4gICAgdGhpcy5yZW5kZXJGcm9tRGVzY3JpcHRpb24ob3B0aW9ucyk7XG5cbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBvcHRpb25zLmNvbG9yO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBvcHRpb25zLmNvbG9yO1xuICAgIHRoaXMucmVuZGVyU3RhcnRQb2ludChvcHRpb25zKTtcbiAgICB0aGlzLnJlbmRlclRyYW5zaXRpb25MaW5lKG9wdGlvbnMpO1xuICAgIHRoaXMucmVuZGVyRW5kQXJyb3cob3B0aW9ucyk7XG5cbiAgICB0aGlzLnJlbmRlclRvRGVzY3JpcHRpb24ob3B0aW9ucyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=