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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy90d2l0dGVyLXN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3RyYW5zaXRpb24uanMiXSwibmFtZXMiOlsiQm9hcmRDb250cm9sbGVyIiwiYm9hcmQiLCJ0cmFucyIsImVuYWJsZWQiLCJ4IiwieSIsInBvcyIsInNjYWxlIiwic2V0RXZlbnRMaXN0ZW5lciIsInpvb20iLCJ0cmFuc2xhdGUiLCJ3aWR0aCIsImhlaWdodCIsInNpemUiLCJydWxlcnMiLCJjZW50ZXIiLCJsZW5ndGgiLCJwYWRkaW5nWCIsInBhZGRpbmdZIiwiZ2V0U2l6ZSIsImVsIiwicG9zaXRpb24iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1pblNjYWxlIiwibWF4U2NhbGUiLCJkZWx0YVkiLCJjbGllbnRYIiwiY2xpZW50WSIsImRpZmYiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInRvU3RyaW5nIiwic3RvcnkiLCJ0aGVuIiwiZ2VuZXJhdGVkU3RvcnkiLCJjYW52YXNFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiQm9hcmQiLCJwYWRkaW5nIiwiY29udHJvbGxlciIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImZpdCIsInRyYW5zaXRpb25Db2xvciIsImhvbWUiLCJpZCIsInRpdGxlIiwidGV4dCIsImRlc2NyaXB0aW9uIiwiZm9udFNpemUiLCJncmlkIiwic2NyZWVuIiwiaW1hZ2VQYXRoIiwidHJhbnNpdGlvbnMiLCJjb2xvciIsInRvIiwib2Zmc2V0IiwiZnJvbSIsInJhZGl1cyIsInJvb20iLCJwb3N0c1Nob3ciLCJwb3N0c05ldyIsInNlYXJjaCIsIm5vdGlmaWNhdGlvbnNJbmRleCIsIm1lbnUiLCJwcm9maWxlIiwic3RhcnRTdG9yeSIsIl9zdG9yeSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJzY2VuZSIsImltZyIsIkltYWdlIiwic3JjIiwicmVzb2x2ZSIsIm9wdGlvbnMiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIl9nZW5lcmF0ZVJ1bGVycyIsInBhZ2VzIiwiX2NsZWFyIiwiX3JlbmRlciIsInBhZ2VJZCIsImZpbHRlciIsInBhZ2UiLCJzb3J0Iiwic2NlbmUxIiwic2NlbmUyIiwiaSIsImN1cnJlbnRSdWxlclgiLCJuZXh0UnVsZXJYIiwibmV4dE5ld1J1bGVyWCIsImN1cnJlbnRSdWxlclkiLCJuZXh0UnVsZXJZIiwibmV4dE5ld1J1bGVyWSIsImNsZWFyUmVjdCIsInJ1bGVyQ29sb3IiLCJiZWdpblBhdGgiLCJzdHJva2VTdHlsZSIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImZvckVhY2giLCJQYWdlIiwicHVzaCIsInRyYW5zaXRpb24iLCJ0YXJnZXRQYWdlIiwiX2ZpbmRQYWdlIiwiVHJhbnNpdGlvbiIsIl9yZW5kZXJQYWdlcyIsIl9yZW5kZXJUcmFuc2l0aW9ucyIsIl9yZW5kZXJSdWxlcnMiLCJyZW5kZXIiLCJ0aXRsZUZvbnRTaXplIiwiZmlsbFN0eWxlIiwidGV4dEFsaWduIiwiZm9udCIsImZpbGxUZXh0IiwiZGVzY3JpcHRpb25Gb250U2l6ZSIsInRleHRzIiwic3BsaXQiLCJzaGFkb3dDb2xvciIsInNoYWRvd0JsdXIiLCJzaGFkb3dPZmZzZXRYIiwic2hhZG93T2Zmc2V0WSIsImRyYXdJbWFnZSIsImZpbGxSZWN0Iiwic3RhcnRYIiwic3RhcnRZIiwiYXJjIiwiTWF0aCIsIlBJIiwiZmlsbCIsImVuZFgiLCJlbmRZIiwiY3VycmVudEdyaWQiLCJ0YXJnZXRHcmlkIiwiY2xvc2VQYXRoIiwidG9PZmZzZXQiLCJyZW5kZXJGcm9tRGVzY3JpcHRpb24iLCJyZW5kZXJTdGFydFBvaW50IiwicmVuZGVyVHJhbnNpdGlvbkxpbmUiLCJyZW5kZXJFbmRBcnJvdyIsInJlbmRlclRvRGVzY3JpcHRpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ25FYUEsZTs7O0FBQ1gsMkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsU0FBS0MsS0FBTCxHQUFhO0FBQ1hDLGVBQVMsS0FERTtBQUVYQyxTQUFHLENBRlE7QUFHWEMsU0FBRztBQUhRLEtBQWI7QUFLQSxTQUFLQyxHQUFMLEdBQVc7QUFDVEYsU0FBRyxDQURNO0FBRVRDLFNBQUc7QUFGTSxLQUFYO0FBSUEsU0FBS0UsS0FBTCxHQUFhLENBQWI7QUFFQSxTQUFLTixLQUFMLEdBQWFBLEtBQWI7QUFFQSxTQUFLTyxnQkFBTDtBQUNEOzs7O3lCQUVJRCxLLEVBQU87QUFDVixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxXQUFLTixLQUFMLENBQVdRLElBQVgsQ0FBZ0IsS0FBS0YsS0FBckI7QUFDRDs7OzhCQUVTSCxDLEVBQUdD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T0FBcEI7QUFFQSxXQUFLb0UsbUJBQUwsQ0FBeUJwRSxPQUF6QjtBQUNEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBCb2FyZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihib2FyZCkge1xuICAgIHRoaXMudHJhbnMgPSB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgIH07XG4gICAgdGhpcy5wb3MgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICB9O1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuXG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuXG4gICAgdGhpcy5zZXRFdmVudExpc3RlbmVyKCk7XG4gIH1cblxuICB6b29tKHNjYWxlKSB7XG4gICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgIHRoaXMuYm9hcmQuem9vbSh0aGlzLnNjYWxlKTtcbiAgfVxuXG4gIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgdGhpcy5wb3MueCArPSB4O1xuICAgIHRoaXMucG9zLnkgKz0geTtcbiAgICB0aGlzLmJvYXJkLnRyYW5zbGF0ZSh4LCB5KTtcbiAgfVxuXG4gIHBvc2l0aW9uKHgsIHkpIHtcbiAgICB0aGlzLnRyYW5zbGF0ZSgtMSAqIHRoaXMucG9zLngsIC0xICogdGhpcy5wb3MueSk7XG4gICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XG4gIH1cblxuICBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLmJvYXJkLnNpemUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBnZXRDZW50ZXIoKSB7XG4gICAgY29uc3QgcnVsZXJzID0gdGhpcy5ib2FyZC5ydWxlcnM7XG4gICAgY29uc3QgY2VudGVyID0ge1xuICAgICAgeDogKHJ1bGVycy54WzBdICsgcnVsZXJzLnhbcnVsZXJzLngubGVuZ3RoIC0gMV0pIC8gMixcbiAgICAgIHk6IChydWxlcnMueVswXSArIHJ1bGVycy55W3J1bGVycy55Lmxlbmd0aCAtIDFdKSAvIDIsXG4gICAgfTtcbiAgICByZXR1cm4gY2VudGVyO1xuICB9XG5cbiAgZ2V0U2l6ZSgpIHtcbiAgICBjb25zdCBydWxlcnMgPSB0aGlzLmJvYXJkLnJ1bGVycztcbiAgICBjb25zdCBzaXplID0ge1xuICAgICAgd2lkdGg6IHJ1bGVycy54W3J1bGVycy54Lmxlbmd0aCAtIDFdLFxuICAgICAgaGVpZ2h0OiBydWxlcnMueVtydWxlcnMueS5sZW5ndGggLSAxXSxcbiAgICB9O1xuICAgIHJldHVybiBzaXplO1xuICB9XG5cbiAgZml0KHBhZGRpbmdYLCBwYWRkaW5nWSkge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldFNpemUoKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuYm9hcmQuZWwud2lkdGggLSBwYWRkaW5nWCAqIDI7XG4gICAgY29uc3Qgc2NhbGUgPSB3aWR0aCAvIHNpemUud2lkdGg7XG4gICAgdGhpcy5wb3NpdGlvbihwYWRkaW5nWCwgcGFkZGluZ1kpXG4gICAgdGhpcy56b29tKHNjYWxlKTtcbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBtaW5TY2FsZSA9IDAuMDU7XG4gICAgICBjb25zdCBtYXhTY2FsZSA9IDEwO1xuXG4gICAgICBpZihldmVudC5kZWx0YVkgPiAwKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgKj0gMC45NTtcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgdGhpcy5zY2FsZSAqPSAxLjA1O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2NhbGUgPCBtaW5TY2FsZSkge1xuICAgICAgICB0aGlzLnNjYWxlID0gbWluU2NhbGU7XG4gICAgICB9IGVsc2UgaWYgKG1heFNjYWxlIDwgdGhpcy5zY2FsZSkge1xuICAgICAgICB0aGlzLnNjYWxlID0gbWF4U2NhbGU7XG4gICAgICB9XG4gICAgICB0aGlzLmJvYXJkLnpvb20odGhpcy5zY2FsZSk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnRyYW5zLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy50cmFucy54ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgIHRoaXMudHJhbnMueSA9IGV2ZW50LmNsaWVudFk7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xuICAgICAgaWYgKHRoaXMudHJhbnMuZW5hYmxlZCkge1xuICAgICAgICBjb25zdCBkaWZmID0ge1xuICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFggLSB0aGlzLnRyYW5zLngsXG4gICAgICAgICAgeTogZXZlbnQuY2xpZW50WSAtIHRoaXMudHJhbnMueSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUoZGlmZi54LCBkaWZmLnkpO1xuICAgICAgICB0aGlzLnRyYW5zLnggPSBldmVudC5jbGllbnRYO1xuICAgICAgICB0aGlzLnRyYW5zLnkgPSBldmVudC5jbGllbnRZO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgdGhpcy50cmFucy5lbmFibGVkID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHN0YXJ0U3RvcnkgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSAnLi92aWV3cy9ib2FyZCc7XG4vL2ltcG9ydCB7IHN0b3J5IH0gZnJvbSAnLi9zYW1wbGUtc3RvcnknO1xuaW1wb3J0IHsgc3RvcnkgfSBmcm9tICcuL3R3aXR0ZXItc3RvcnknO1xuaW1wb3J0IHsgQm9hcmRDb250cm9sbGVyIH0gZnJvbSAnLi9ib2FyZC1jb250cm9sbGVyJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBTdGFydCBhcHAgYXQgJHsobmV3IERhdGUoKSkudG9TdHJpbmcoKX0uYCk7XG5cbiAgc3RhcnRTdG9yeShzdG9yeSkudGhlbigoZ2VuZXJhdGVkU3RvcnkpID0+IHtcbiAgICBjb25zdCBjYW52YXNFbGVtZW50ID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdG9yeXRlbGxlcicpO1xuXG4gICAgY29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoY2FudmFzRWxlbWVudCwgZ2VuZXJhdGVkU3RvcnksIHtcbiAgICAgIHBhZGRpbmc6IHtcbiAgICAgICAgeDogMzIwLFxuICAgICAgICB5OiAyMDAsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBCb2FyZENvbnRyb2xsZXIoYm9hcmQpO1xuICAgIGNvbnRyb2xsZXIuc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICBjb250cm9sbGVyLmZpdCgxMDAsIDEwMCk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIucG9zaXRpb24oMCwgMCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJjb25zdCB0cmFuc2l0aW9uQ29sb3IgPSAnIzFkYTFmMic7XG5cbmNvbnN0IGhvbWUgPSB7XG4gIGlkOiAnL2hvbWUnLFxuICB0aXRsZToge1xuICAgIHRleHQ6ICdIb21lIFNjcmVlbicsXG4gIH0sXG4gIGRlc2NyaXB0aW9uOiB7XG4gICAgZm9udFNpemU6IDE0LFxuICAgIHRleHQ6IGB1cmw6IC9cXG5EaXNwbGF5IHRpbWVsaW5lYCxcbiAgfSxcbiAgZ3JpZDogeyB4OiAwLCB5OiAwIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9ob21lLnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbe1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgdG86IHtcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHRleHQ6ICd0cmFuc2l0aW9uIHJhdGU6IDUlKEV4YW1wbGUpJyxcbiAgICAgIH0sXG4gICAgICBpZDogJy9wb3N0cy9zaG93JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHtcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHRleHQ6ICd0cmFuc2l0aW9uIHJhdGU6IDUlKEV4YW1wbGUpJyxcbiAgICAgIH0sXG4gICAgICB4OiAyNDQsXG4gICAgICB5OiAyNDcsXG4gICAgICByYWRpdXM6IDgsXG4gICAgfSxcbiAgfSwge1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgcm9vbTogeyB4OiA2MCwgeTogNjAsIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL3Bvc3RzL25ldycsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogNjAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDI3MSwgeTogNTE3LCByYWRpdXM6IDgsIH0sXG4gIH0sIHtcbiAgICBjb2xvcjogdHJhbnNpdGlvbkNvbG9yLFxuICAgIHJvb206IHsgeDogMzAsIHk6IC0zMCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvc2VhcmNoJyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMTI4LCB5OiA2MywgcmFkaXVzOiA4LCB9LFxuICB9LCB7XG4gICAgY29sb3I6IHRyYW5zaXRpb25Db2xvcixcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvbm90aWZpY2F0aW9ucy9pbmRleCcsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDIwNCwgeTogNjMsIHJhZGl1czogOCwgfSxcbiAgfSwge1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgcm9vbTogeyB4OiAtMzAsIHk6IDkwLCB9LFxuICAgIHRvOiB7XG4gICAgICBpZDogJy9tZW51JyxcbiAgICAgIG9mZnNldDogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB9LFxuICAgIGZyb206IHsgeDogMjEsIHk6IDMxLCByYWRpdXM6IDgsIH0sXG4gIH1dLFxufTtcblxuY29uc3QgcG9zdHNTaG93ID0ge1xuICBpZDogJy9wb3N0cy9zaG93JyxcbiAgZ3JpZDogeyB4OiAxLCB5OiAwIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9wb3N0c19zaG93LnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbe1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgcm9vbTogeyB4OiAxMjAsIHk6IDAsIH0sXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL3Bvc3RzL25ldycsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDI3MSwgeTogNTE3LCByYWRpdXM6IDgsIH0sXG4gIH1dLFxufTtcblxuY29uc3QgcG9zdHNOZXcgPSB7XG4gIGlkOiAnL3Bvc3RzL25ldycsXG4gIGdyaWQ6IHsgeDogMSwgeTogMSB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3R3aXR0ZXIvcG9zdHNfbmV3LnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbe1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgcm9vbTogeyB4OiAwLCB5OiAzMCwgfSxcbiAgICB0bzoge1xuICAgICAgaWQ6ICcvaG9tZScsXG4gICAgICBvZmZzZXQ6IHsgeDogMCwgeTogMzAsIH0sXG4gICAgfSxcbiAgICBmcm9tOiB7IHg6IDI3MSwgeTogMjAsIHJhZGl1czogOCwgfSxcbiAgfV0sXG59O1xuXG5jb25zdCBzZWFyY2ggPSB7XG4gIGlkOiAnL3NlYXJjaCcsXG4gIGdyaWQ6IHsgeDogMSwgeTogMiB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3R3aXR0ZXIvc2VhcmNoLnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbXSxcbn07XG5cbmNvbnN0IG5vdGlmaWNhdGlvbnNJbmRleCA9IHtcbiAgaWQ6ICcvbm90aWZpY2F0aW9ucy9pbmRleCcsXG4gIGdyaWQ6IHsgeDogMSwgeTogMyB9LFxuICBzY3JlZW46IHtcbiAgICB3aWR0aDogMzAwLFxuICAgIGltYWdlUGF0aDogJy4vaW1hZ2VzL3R3aXR0ZXIvbm90aWZpY2F0aW9uc19pbmRleC5wbmcnLFxuICB9LFxuICB0cmFuc2l0aW9uczogW10sXG59O1xuXG5jb25zdCBtZW51ID0ge1xuICBpZDogJy9tZW51JyxcbiAgZ3JpZDogeyB4OiAxLCB5OiA0IH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9tZW51LnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbe1xuICAgIGNvbG9yOiB0cmFuc2l0aW9uQ29sb3IsXG4gICAgdG86IHtcbiAgICAgIGlkOiAnL3Byb2ZpbGUnLFxuICAgICAgb2Zmc2V0OiB7IHg6IDAsIHk6IDMwLCB9LFxuICAgIH0sXG4gICAgZnJvbTogeyB4OiAyMSwgeTogMzEsIHJhZGl1czogOCwgfSxcbiAgfV0sXG59O1xuXG5jb25zdCBwcm9maWxlID0ge1xuICBpZDogJy9wcm9maWxlJyxcbiAgZ3JpZDogeyB4OiAyLCB5OiAwIH0sXG4gIHNjcmVlbjoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgaW1hZ2VQYXRoOiAnLi9pbWFnZXMvdHdpdHRlci9wcm9maWxlLnBuZycsXG4gIH0sXG4gIHRyYW5zaXRpb25zOiBbXSxcbn07XG5cbmV4cG9ydCBjb25zdCBzdG9yeSA9IFtcbiAgaG9tZSxcbiAgcG9zdHNTaG93LFxuICBwb3N0c05ldyxcbiAgc2VhcmNoLFxuICBub3RpZmljYXRpb25zSW5kZXgsXG4gIG1lbnUsXG4gIHByb2ZpbGUsXG5dO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0U3Rvcnkoc3RvcnkpIHtcbiAgY29uc3QgX3N0b3J5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdG9yeSkpO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChfc3RvcnkubWFwKChzY2VuZSkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmIChzY2VuZS5zY3JlZW4uaW1hZ2VQYXRoKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gc2NlbmUuc2NyZWVuLmltYWdlUGF0aDtcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBzY2VuZS5zY3JlZW4uaW1nID0gaW1nO1xuICAgICAgICAgIGlmIChzY2VuZS5zY3JlZW4ud2lkdGggJiYgIXNjZW5lLnNjcmVlbi5oZWlnaHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gaW1nLndpZHRoIC8gc2NlbmUuc2NyZWVuLndpZHRoO1xuICAgICAgICAgICAgc2NlbmUuc2NyZWVuLmhlaWdodCA9IGltZy5oZWlnaHQgLyBzY2FsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFzY2VuZS5zY3JlZW4ud2lkdGggJiYgc2NlbmUuc2NyZWVuLmhlaWdodCkge1xuICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBpbWcuaGVpZ2h0IC8gc2NlbmUuc2NyZWVuLmhlaWdodDtcbiAgICAgICAgICAgIHNjZW5lLnNjcmVlbi53aWR0aCA9IGltZy53aWR0aCAvIHNjYWxlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSkudGhlbigoKSA9PiB7XG4gICAgcmV0dXJuIF9zdG9yeTtcbiAgfSk7XG59XG5cbiIsImltcG9ydCB7IFBhZ2UgfSBmcm9tICcuL3BhZ2UnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJy4vdHJhbnNpdGlvbic7XG5cbi8qXG4gKiBCb2FyZFxuICogLSBjb25zdHJ1Y3RvclxuICogICAtIG9wdGlvbnNcbiAqICAgICAtIHJ1bGVyQ29sb3JcbiAqICAgICAtIHBhZGRpbmdcbiAqICAgICAgIC0geFxuICogICAgICAgLSB5XG4gKiAtIHNpemVcbiAqIC0gem9vbVxuICogLSB0cmFuc2xhdGVcbiAqIC0gX2ZpbmRQYWdlXG4gKiAtIF9nZW5lcmF0ZVJ1bGVyc1xuICogLSBfY2xlYXJcbiAqIC0gX3JlbmRlclJ1bGVyc1xuICogLSBfcmVuZGVyUGFnZXNcbiAqIC0gX3JlbmRlclRyYW5zaXRpb25zXG4gKi9cblxuZXhwb3J0IGNsYXNzIEJvYXJkIHtcbiAgY29uc3RydWN0b3IoZWwsIHN0b3J5LCBvcHRpb25zKSB7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLnN0b3J5ID0gc3Rvcnk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnJ1bGVycyA9IHRoaXMuX2dlbmVyYXRlUnVsZXJzKHRoaXMuc3RvcnkpO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMucGFnZXMgPSBbXTtcblxuICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBzaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgdGhpcy5lbC53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuZWwuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICB6b29tKHNjYWxlKSB7XG4gICAgdGhpcy5fY2xlYXIoKTtcblxuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLmNvbnRleHQuc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG5cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgdGhpcy5fY2xlYXIoKTtcblxuICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoeCwgeSk7XG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuXG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBfZmluZFBhZ2UocGFnZUlkKSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZXMuZmlsdGVyKHBhZ2UgPT4ge1xuICAgICAgcmV0dXJuIHBhZ2UuaWQgPT09IHBhZ2VJZDtcbiAgICB9KVswXSB8fCBudWxsO1xuICB9XG5cbiAgX2dlbmVyYXRlUnVsZXJzKHN0b3J5KSB7XG4gICAgY29uc3QgcnVsZXJzID0ge1xuICAgICAgeDogW10sXG4gICAgICB5OiBbXSxcbiAgICB9O1xuICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLm9wdGlvbnMucGFkZGluZztcblxuICAgIC8vIEdlbmVyYXRlIHggcnVsZXJzXG4gICAgc3Rvcnkuc29ydCgoc2NlbmUxLCBzY2VuZTIpID0+IHtcbiAgICAgIHJldHVybiAoc2NlbmUxLmdyaWQueCAtIHNjZW5lMi5ncmlkLngpO1xuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNjZW5lID0gc3RvcnlbaV07XG4gICAgICBjb25zdCB4ID0gc2NlbmUuZ3JpZC54O1xuICAgICAgY29uc3QgY3VycmVudFJ1bGVyWCA9IHJ1bGVycy54W3hdIHx8IG51bGw7XG4gICAgICBjb25zdCBuZXh0UnVsZXJYID0gcnVsZXJzLnhbeCArIDFdIHx8IG51bGw7XG5cbiAgICAgIGlmIChjdXJyZW50UnVsZXJYID09PSBudWxsKSB7XG4gICAgICAgIHJ1bGVycy54W3hdID0gMDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV4dE5ld1J1bGVyWCA9IHJ1bGVycy54W3hdICsgc2NlbmUuc2NyZWVuLndpZHRoICsgcGFkZGluZy54O1xuICAgICAgaWYgKG5leHRSdWxlclggPT09IG51bGwpIHtcbiAgICAgICAgcnVsZXJzLnhbeCArIDFdID0gbmV4dE5ld1J1bGVyWDtcbiAgICAgIH0gZWxzZSBpZiAobmV4dFJ1bGVyWCA8IG5leHROZXdSdWxlclgpIHtcbiAgICAgICAgcnVsZXJzLnhbeCArIDFdID0gbmV4dE5ld1J1bGVyWDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSB5IHJ1bGVyc1xuICAgIHN0b3J5LnNvcnQoKHNjZW5lMSwgc2NlbmUyKSA9PiB7XG4gICAgICByZXR1cm4gKHNjZW5lMS5ncmlkLnkgLSBzY2VuZTIuZ3JpZC55KTtcbiAgICB9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzY2VuZSA9IHN0b3J5W2ldO1xuICAgICAgY29uc3QgeSA9IHNjZW5lLmdyaWQueTtcbiAgICAgIGNvbnN0IGN1cnJlbnRSdWxlclkgPSBydWxlcnMueVt5XSB8fCBudWxsO1xuICAgICAgY29uc3QgbmV4dFJ1bGVyWSA9IHJ1bGVycy55W3kgKyAxXSB8fCBudWxsO1xuXG4gICAgICBpZiAoY3VycmVudFJ1bGVyWSA9PT0gbnVsbCkge1xuICAgICAgICBydWxlcnMueVt5XSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5leHROZXdSdWxlclkgPSBydWxlcnMueVt5XSArIHNjZW5lLnNjcmVlbi5oZWlnaHQgKyBwYWRkaW5nLnk7XG4gICAgICBpZiAobmV4dFJ1bGVyWSA9PT0gbnVsbCkge1xuICAgICAgICBydWxlcnMueVt5ICsgMV0gPSBuZXh0TmV3UnVsZXJZO1xuICAgICAgfSBlbHNlIGlmIChuZXh0UnVsZXJZIDwgbmV4dE5ld1J1bGVyWSkge1xuICAgICAgICBydWxlcnMueVt5ICsgMV0gPSBuZXh0TmV3UnVsZXJZO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBydWxlcnM7XG4gIH1cblxuICBfY2xlYXIoKSB7XG4gICAgLy8gVE9ETzogT3B0aW1pemUgY2xlYXJSZWN0IHNpemVcbiAgICB0aGlzLmNvbnRleHQuc2NhbGUoMSAvIHRoaXMuc2NhbGUsIDEgLyB0aGlzLnNjYWxlKTtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KC0xMDAwMCwgLTEwMDAwLCAxMDAwMDAsIDEwMDAwMCk7XG4gIH1cblxuICBfcmVuZGVyUnVsZXJzKCkge1xuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5vcHRpb25zLnJ1bGVyQ29sb3IgfHwgJ3JnYmEoMjE2LCA1MywgNTMsIDAuNzIpJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ydWxlcnMueC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeCA9IHRoaXMucnVsZXJzLnhbaV07XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oeCwgLTEwMDAwMCk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHgsIDEwMDAwMCk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJ1bGVycy55Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB5ID0gdGhpcy5ydWxlcnMueVtpXTtcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbygtMTAwMDAwLCB5KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oMTAwMDAwLCB5KTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG4gIH1cblxuICBfcmVuZGVyUGFnZXMoKSB7XG4gICAgdGhpcy5zdG9yeS5mb3JFYWNoKHNjZW5lID0+IHtcbiAgICAgIGNvbnN0IHggPSBzY2VuZS5ncmlkLng7XG4gICAgICBjb25zdCB5ID0gc2NlbmUuZ3JpZC55O1xuICAgICAgY29uc3QgcGFnZSA9IG5ldyBQYWdlKHRoaXMuY29udGV4dCwgc2NlbmUsIHRoaXMucnVsZXJzKTtcbiAgICAgIHRoaXMucGFnZXMucHVzaChwYWdlKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9yZW5kZXJUcmFuc2l0aW9ucygpIHtcbiAgICB0aGlzLnBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICBwYWdlLnNjZW5lLnRyYW5zaXRpb25zLmZvckVhY2goKHRyYW5zaXRpb24pID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0UGFnZSA9IHRoaXMuX2ZpbmRQYWdlKHRyYW5zaXRpb24udG8uaWQpO1xuICAgICAgICBuZXcgVHJhbnNpdGlvbih0aGlzLmNvbnRleHQsIHtcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIHRhcmdldFBhZ2UsXG4gICAgICAgICAgdHJhbnNpdGlvbixcbiAgICAgICAgICBydWxlcnM6IHRoaXMucnVsZXJzLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgX3JlbmRlcigpIHtcbiAgICB0aGlzLl9yZW5kZXJQYWdlcygpO1xuICAgIHRoaXMuX3JlbmRlclRyYW5zaXRpb25zKCk7XG4gICAgdGhpcy5fcmVuZGVyUnVsZXJzKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBQYWdlIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwgc2NlbmUsIHJ1bGVycykge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMucnVsZXJzID0gcnVsZXJzO1xuICAgIHRoaXMuaWQgPSB0aGlzLnNjZW5lLmlkO1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLnNjZW5lLnRpdGxlO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0aGlzLnNjZW5lLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMuc2NlbmUuZ3JpZDtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLnNjZW5lLnNjcmVlbi5oZWlnaHQ7XG4gICAgdGhpcy54ID0gdGhpcy5ydWxlcnMueFt0aGlzLmdyaWQueF0gKyAoKHRoaXMucnVsZXJzLnhbdGhpcy5ncmlkLnggKyAxXSAtIHRoaXMucnVsZXJzLnhbdGhpcy5ncmlkLnhdIC0gdGhpcy53aWR0aCkgLyAyKTtcbiAgICB0aGlzLnkgPSB0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55XSArICgodGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueSArIDFdIC0gdGhpcy5ydWxlcnMueVt0aGlzLmdyaWQueV0gLSB0aGlzLmhlaWdodCkgLyAyKTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29sb3IgPSB0aGlzLnNjZW5lLmNvbG9yIHx8ICdyZ2JhKDAsIDAsIDAsIDAuMzIpJztcbiAgICBjb25zdCB0aXRsZUZvbnRTaXplID0gKHRoaXMudGl0bGUgfHwge30pLmZvbnRTaXplIHx8IDE0O1xuICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyM2NjYnO1xuICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgIHRoaXMuY29udGV4dC5mb250ID0gYCR7dGl0bGVGb250U2l6ZX1weCBzYW4tc2VyaWZgO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGl0bGUudGV4dCwgdGhpcy54LCB0aGlzLnJ1bGVycy55W3RoaXMuZ3JpZC55XSArIHRpdGxlRm9udFNpemUsIHRoaXMud2lkdGgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZXNjcmlwdGlvbikge1xuICAgICAgY29uc3QgZGVzY3JpcHRpb25Gb250U2l6ZSA9IHRoaXMuZGVzY3JpcHRpb24uZm9udFNpemU7XG4gICAgICBjb25zdCB0ZXh0cyA9IHRoaXMuZGVzY3JpcHRpb24udGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJyM2NjYnO1xuICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgIHRoaXMuY29udGV4dC5mb250ID0gYCR7ZGVzY3JpcHRpb25Gb250U2l6ZX1weCBzYW4tc2VyaWZgO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0ZXh0ID0gdGV4dHNbaV07XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0LCB0aGlzLngsIHRoaXMucnVsZXJzLnlbdGhpcy5ncmlkLnldICsgdGl0bGVGb250U2l6ZSArIChkZXNjcmlwdGlvbkZvbnRTaXplICogKGkgKyAyKSksIHRoaXMud2lkdGgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4yNCknO1xuICAgIHRoaXMuY29udGV4dC5zaGFkb3dCbHVyID0gMztcbiAgICB0aGlzLmNvbnRleHQuc2hhZG93T2Zmc2V0WCA9IDA7XG4gICAgdGhpcy5jb250ZXh0LnNoYWRvd09mZnNldFkgPSAwO1xuICAgIGlmICh0aGlzLnNjZW5lLnNjcmVlbi5pbWcpIHtcbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5zY2VuZS5zY3JlZW4uaW1nLCB0aGlzLngsIHRoaXMueSwgdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGgsIHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5zY2VuZS5zY3JlZW4ud2lkdGgsIHRoaXMuc2NlbmUuc2NyZWVuLmhlaWdodCk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5zaGFkb3dCbHVyID0gMDtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRyYW5zaXRpb24ge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0LCB7cGFnZSwgdGFyZ2V0UGFnZSwgdHJhbnNpdGlvbiwgcnVsZXJzfSkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB0aGlzLnRhcmdldFBhZ2UgPSB0YXJnZXRQYWdlO1xuICAgIHRoaXMudHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG4gICAgdGhpcy5ydWxlcnMgPSBydWxlcnM7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyU3RhcnRQb2ludCh7c3RhcnRYLCBzdGFydFksIHJhZGl1c30pIHtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmFyYyhzdGFydFgsIHN0YXJ0WSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICByZW5kZXJUcmFuc2l0aW9uTGluZSh7c3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIHJvb219KSB7XG4gICAgY29uc3QgY3VycmVudEdyaWQgPSB0aGlzLnBhZ2UuZ3JpZDtcbiAgICBjb25zdCB0YXJnZXRHcmlkID0gdGhpcy50YXJnZXRQYWdlLmdyaWQ7XG5cbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgaWYgKGN1cnJlbnRHcmlkLnkgPiB0YXJnZXRHcmlkLnkpIHtcbiAgICAgIC8vIGxpbmVUbyB0b3AuXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHN0YXJ0WCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVtjdXJyZW50R3JpZC55XSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50R3JpZC55IDwgdGFyZ2V0R3JpZC55KSB7XG4gICAgICAvLyBsaW5lVG8gYm90dG9tLlxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhzdGFydFgsIHRoaXMucnVsZXJzLnlbY3VycmVudEdyaWQueSArIDFdICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W2N1cnJlbnRHcmlkLnkgKyAxXSArIHJvb20ueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgZW5kWSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50R3JpZC55ID09PSB0YXJnZXRHcmlkLnkgJiYgY3VycmVudEdyaWQueCA+IHRhcmdldEdyaWQueCkge1xuICAgICAgLy8gbGluZVRvIGxlZnRcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W3RhcmdldEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEdyaWQueSA9PT0gdGFyZ2V0R3JpZC55ICYmIGN1cnJlbnRHcmlkLnggPCB0YXJnZXRHcmlkLngpIHtcbiAgICAgIC8vIGxpbmVUbyByaWdodFxuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgIGlmICh0YXJnZXRHcmlkLnggLSBjdXJyZW50R3JpZC54ID4gMSkge1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbY3VycmVudEdyaWQueCArIDFdICsgcm9vbS54LCB0aGlzLnJ1bGVycy55W3RhcmdldEdyaWQueV0gKyByb29tLnkpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMucnVsZXJzLnhbdGFyZ2V0R3JpZC54XSArIHJvb20ueCwgdGhpcy5ydWxlcnMueVt0YXJnZXRHcmlkLnldICsgcm9vbS55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W3RhcmdldEdyaWQueF0gKyByb29tLngsIGVuZFkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh0aGlzLnJ1bGVycy54W2N1cnJlbnRHcmlkLnggKyAxXSArIHJvb20ueCwgZW5kWSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFtjdXJyZW50R3JpZC54XSArIHJvb20ueCwgc3RhcnRZKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8odGhpcy5ydWxlcnMueFt0YXJnZXRHcmlkLnhdICsgcm9vbS55LCBlbmRZKTtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmRYLCBlbmRZKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICByZW5kZXJFbmRBcnJvdyh7ZW5kWCwgZW5kWX0pIHtcbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhlbmRYLCBlbmRZKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZFggLSAxNCwgZW5kWSArIDEwKTtcbiAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZFggLSAxNCwgZW5kWSAtIDEwKTtcbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cblxuICByZW5kZXJGcm9tRGVzY3JpcHRpb24oe3N0YXJ0WCwgc3RhcnRZfSkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb24uZnJvbS5kZXNjcmlwdGlvbikge1xuICAgICAgY29uc3QgZGVzY3JpcHRpb25Gb250U2l6ZSA9IHRoaXMudHJhbnNpdGlvbi5mcm9tLmRlc2NyaXB0aW9uLmZvbnRTaXplIHx8IDEyO1xuICAgICAgY29uc3QgdGV4dHMgPSB0aGlzLnRyYW5zaXRpb24uZnJvbS5kZXNjcmlwdGlvbi50ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnIzY2Nic7XG4gICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHtkZXNjcmlwdGlvbkZvbnRTaXplfXB4IHNhbi1zZXJpZmA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSB0ZXh0c1tpXTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRleHQsIHN0YXJ0WCArIGRlc2NyaXB0aW9uRm9udFNpemUsIHN0YXJ0WSAtICh0ZXh0cy5sZW5ndGggKiBkZXNjcmlwdGlvbkZvbnRTaXplKSArIChkZXNjcmlwdGlvbkZvbnRTaXplICogaSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlclRvRGVzY3JpcHRpb24oe2VuZFgsIGVuZFl9KSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbi50by5kZXNjcmlwdGlvbikge1xuICAgICAgY29uc3QgZGVzY3JpcHRpb25Gb250U2l6ZSA9IHRoaXMudHJhbnNpdGlvbi50by5kZXNjcmlwdGlvbi5mb250U2l6ZSB8fCAxMjtcbiAgICAgIGNvbnN0IHRleHRzID0gdGhpcy50cmFuc2l0aW9uLnRvLmRlc2NyaXB0aW9uLnRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICcjNjY2JztcbiAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSAncmlnaHQnO1xuICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHtkZXNjcmlwdGlvbkZvbnRTaXplfXB4IHNhbi1zZXJpZmA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSB0ZXh0c1tpXTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRleHQsIGVuZFggLSBkZXNjcmlwdGlvbkZvbnRTaXplICogMiwgZW5kWSAtICh0ZXh0cy5sZW5ndGggKiBkZXNjcmlwdGlvbkZvbnRTaXplKSArIChkZXNjcmlwdGlvbkZvbnRTaXplICogaSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBmcm9tID0gdGhpcy50cmFuc2l0aW9uLmZyb20gfHwge1xuICAgICAgeDogdGhpcy5wYWdlLndpZHRoLFxuICAgICAgeTogMCxcbiAgICAgIHJhZGl1czogMTIsXG4gICAgfTtcbiAgICBjb25zdCB0b09mZnNldCA9IHRoaXMudHJhbnNpdGlvbi50by5vZmZzZXQgfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgY29sb3I6IHRoaXMudHJhbnNpdGlvbi5jb2xvciB8fCAncmdiYSgwLCAwLCAwLCAwLjQ4KScsXG4gICAgICByYWRpdXM6IGZyb20ucmFkaXVzLFxuICAgICAgcm9vbTogdGhpcy50cmFuc2l0aW9uLnJvb20gfHwge3g6IDAsIHk6IDB9LFxuICAgICAgc3RhcnRYOiB0aGlzLnBhZ2UueCArIGZyb20ueCxcbiAgICAgIHN0YXJ0WTogdGhpcy5wYWdlLnkgKyBmcm9tLnksXG4gICAgICBlbmRYOiB0aGlzLnRhcmdldFBhZ2UueCArIHRvT2Zmc2V0LngsXG4gICAgICBlbmRZOiB0aGlzLnRhcmdldFBhZ2UueSArIHRvT2Zmc2V0LnksXG4gICAgfTtcblxuICAgIHRoaXMucmVuZGVyRnJvbURlc2NyaXB0aW9uKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gb3B0aW9ucy5jb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gb3B0aW9ucy5jb2xvcjtcbiAgICB0aGlzLnJlbmRlclN0YXJ0UG9pbnQob3B0aW9ucyk7XG4gICAgdGhpcy5yZW5kZXJUcmFuc2l0aW9uTGluZShvcHRpb25zKTtcbiAgICB0aGlzLnJlbmRlckVuZEFycm93KG9wdGlvbnMpO1xuXG4gICAgdGhpcy5yZW5kZXJUb0Rlc2NyaXB0aW9uKG9wdGlvbnMpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9