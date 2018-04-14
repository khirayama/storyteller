export class BoardController {
  constructor(board) {
    this.trans = {
      enabled: false,
      x: 0,
      y: 0,
    };
    this.scale = 1;

    this.board = board;

    this.setEventListener();
  }

  zoom(scale) {
    this.scale = scale;
    this.board.zoom(this.scale);
  }

  translate(x, y) {
    this.board.translate(x, y);
  }

  size(width, height) {
    this.board.size(width, height);
  }

  setEventListener() {
    window.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    window.addEventListener('wheel', (event) => {
      const minScale = 0.05;
      const maxScale = 10;

      if(event.deltaY > 0) {
        this.scale *= 0.95;
      }else {
        this.scale *= 1.05;
      }
      if (this.scale < minScale) {
        this.scale = minScale;
      } else if (maxScale < this.scale) {
        this.scale = maxScale;
      }
      this.board.zoom(this.scale);
    });

    window.addEventListener('mousedown', (event) => {
      this.trans.enabled = true;
      this.trans.x = event.clientX;
      this.trans.y = event.clientY;
    });
    window.addEventListener('mousemove', (event) => {
      if (this.trans.enabled) {
        const diff = {
          x: event.clientX - this.trans.x,
          y: event.clientY - this.trans.y,
        };
        this.translate(diff.x, diff.y);
        this.trans.x = event.clientX;
        this.trans.y = event.clientY;
      }
    });
    window.addEventListener('mouseup', () => {
      this.trans.enabled = false;
    });
  }
}
