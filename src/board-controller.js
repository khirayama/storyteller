export class BoardController {
  constructor(board) {
    this.trans = {
      enabled: false,
      x: 0,
      y: 0,
    };
    this.pos = {
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
    this.pos.x += x;
    this.pos.y += y;
    this.board.translate(x, y);
  }

  position(x, y) {
    this.translate(-1 * this.pos.x, -1 * this.pos.y);
    this.translate(x, y);
  }

  size(width, height) {
    this.board.size(width, height);
  }

  getCenter() {
    const rulers = this.board.rulers;
    const center = {
      x: (rulers.x[0] + rulers.x[rulers.x.length - 1]) / 2,
      y: (rulers.y[0] + rulers.y[rulers.y.length - 1]) / 2,
    };
    return center;
  }

  getSize() {
    const rulers = this.board.rulers;
    const size = {
      width: rulers.x[rulers.x.length - 1],
      height: rulers.y[rulers.y.length - 1],
    };
    return size;
  }

  fit(paddingX, paddingY) {
    const size = this.getSize();
    const width = this.board.el.width - paddingX * 2;
    const scale = width / size.width;
    this.position(paddingX, paddingY)
    this.zoom(scale);
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
