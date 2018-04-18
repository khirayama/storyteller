import { startStory, Board, BoardController } from '../../lib';
import { story } from './story';

window.addEventListener('DOMContentLoaded', () => {
  console.log(`Start app at ${(new Date()).toString()}.`);

  startStory(story).then((generatedStory) => {
    const canvasElement = window.document.querySelector('.storyteller');

    const board = new Board(canvasElement, generatedStory, {
      padding: {
        x: 320,
        y: 200,
      },
    });

    const controller = new BoardController(board);
    controller.size(window.innerWidth, window.innerHeight);
    controller.fit(100, 100);

    document.querySelector('.reset').addEventListener('click', () => {
      controller.position(0, 0);
    });
  });
});
