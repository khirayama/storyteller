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