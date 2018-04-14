import { Page } from './page';
import { Transition } from './transition';

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

export class Board {
  constructor(el, story, options) {
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

  size(width, height) {
    this._clear();

    this.el.width = width;
    this.el.height = height;

    this._render();
  }

  zoom(scale) {
    this._clear();

    this.scale = scale;
    this.context.scale(this.scale, this.scale);

    this._render();
  }

  translate(x, y) {
    this._clear();

    this.context.translate(x, y);
    this.context.scale(this.scale, this.scale);

    this._render();
  }

  _findPage(pageId) {
    return this.pages.filter(page => {
      return page.id === pageId;
    })[0] || null;
  }

  _generateRulers(story) {
    const rulers = {
      x: [],
      y: [],
    };
    const padding = this.options.padding;

    // Generate x rulers
    story.sort((scene1, scene2) => {
      return (scene1.grid.x - scene2.grid.x);
    });
    for (let i = 0; i < story.length; i++) {
      const scene = story[i];
      const x = scene.grid.x;
      const currentRulerX = rulers.x[x] || null;
      const nextRulerX = rulers.x[x + 1] || null;

      if (currentRulerX === null) {
        rulers.x[x] = 0;
      }

      const nextNewRulerX = rulers.x[x] + scene.screen.width + padding.x;
      if (nextRulerX === null) {
        rulers.x[x + 1] = nextNewRulerX;
      } else if (nextRulerX < nextNewRulerX) {
        rulers.x[x + 1] = nextNewRulerX;
      }
    }

    // Generate y rulers
    story.sort((scene1, scene2) => {
      return (scene1.grid.y - scene2.grid.y);
    });
    for (let i = 0; i < story.length; i++) {
      const scene = story[i];
      const y = scene.grid.y;
      const currentRulerY = rulers.y[y] || null;
      const nextRulerY = rulers.y[y + 1] || null;

      if (currentRulerY === null) {
        rulers.y[y] = 0;
      }

      const nextNewRulerY = rulers.y[y] + scene.screen.height + padding.y;
      if (nextRulerY === null) {
        rulers.y[y + 1] = nextNewRulerY;
      } else if (nextRulerY < nextNewRulerY) {
        rulers.y[y + 1] = nextNewRulerY;
      }
    }

    return rulers;
  }

  _clear() {
    // TODO: Optimize clearRect size
    this.context.scale(1 / this.scale, 1 / this.scale);
    this.context.clearRect(-10000, -10000, 100000, 100000);
  }

  _renderRulers() {
    const color = this.options.rulerColor || 'rgba(216, 53, 53, 0.72)';

    for (let i = 0; i < this.rulers.x.length; i++) {
      const x = this.rulers.x[i];
      this.context.beginPath();
      this.context.strokeStyle = color;
      this.context.moveTo(x, -100000);
      this.context.lineTo(x, 100000);
      this.context.stroke();
    }

    for (let i = 0; i < this.rulers.y.length; i++) {
      const y = this.rulers.y[i];
      this.context.beginPath();
      this.context.strokeStyle = color;
      this.context.moveTo(-100000, y);
      this.context.lineTo(100000, y);
      this.context.stroke();
    }
  }

  _renderPages() {
    this.story.forEach(scene => {
      const x = scene.grid.x;
      const y = scene.grid.y;
      const page = new Page(this.context, scene, this.rulers);
      this.pages.push(page);
    });
  }

  _renderTransitions() {
    this.pages.forEach(page => {
      page.scene.transitions.forEach((transition) => {
        const targetPage = this._findPage(transition.to.id);
        new Transition(this.context, {
          page,
          targetPage,
          transition,
          rulers: this.rulers,
        });
      });
    });
  }

  _render() {
    this._renderPages();
    this._renderTransitions();
    this._renderRulers();
  }
}
