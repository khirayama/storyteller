const screen = {
  width: 375,
  height: 667,
  imagePath: null,
};

function createScene(id, gridX, gridY) {
  const scene = {
    id,
    screen,
    grid: {
      x: gridX,
      y: gridY,
    },
    transitions: [],
  };
  if (gridX === 2 && gridY === 2) {
    const transitions = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const id = `scene-${i}-${j}`;
        const transition= {
          from: {
            x: screen.width / 2 + (i - 2) * 60 - ((j % 2 === 0) ? 30 : 0),
            y: screen.height / 2 + (j - 2) * 60 - ((i % 2 === 0) ? 30 : 0),
          },
          to: {
            id,
            offset: {
              x: 0,
              y: 30,
            },
          },
        };
        if (i === 0 || i === 4) {
          if (j === 0) {
            transition.color = 'red';
            transition.room = {x: -50, y: -50};
          } else if (j === 1) {
            transition.color = 'green';
            transition.room = {x: -30, y: -30};
          } else if (j === 2) {
            transition.color = 'blue';
            transition.room = {x: -10, y: -10};
          } else if (j === 3) {
            transition.color = 'yellow';
            transition.room = {x: 10, y: 10};
          } else if (j === 4) {
            transition.color = 'purple';
            transition.room = {x: 30, y: 30};
          }
        }
        if (i === 1 || i === 3) {
          if (j === 0) {
            transition.color = 'red';
            transition.room = {x: -50, y: 50};
          } else if (j === 1) {
            transition.color = 'green';
            transition.room = {x: -30, y: 30};
          } else if (j === 2) {
            transition.color = 'blue';
            transition.room = {x: -10, y: 10};
          } else if (j === 3) {
            transition.color = 'yellow';
            transition.room = {x: 10, y: -10};
          } else if (j === 4) {
            transition.color = 'purple';
            transition.room = {x: 30, y: -30};
          }
        }
        if (i === 2) {
          if (j === 0) {
            transition.color = 'red';
            transition.room = {x: 40, y: 40};
          } else if (j === 1) {
            transition.color = 'green';
            transition.room = {x: 20, y: 20};
          } else if (j === 2) {
            transition.color = 'black';
            transition.room = {x: 0, y: 0};
          } else if (j === 3) {
            transition.color = 'yellow';
            transition.room = {x: -20, y: -20};
          } else if (j === 4) {
            transition.color = 'purple';
            transition.room = {x: -40, y: -40};
          }
        }
        transitions.push(transition);
      }
    }
    scene.transitions = transitions;
  }
  return scene;
}

const story = [];

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    const id = `scene-${i}-${j}`;
    const scene = createScene(id, i, j);
    story.push(scene);
  }
}

export {story};
