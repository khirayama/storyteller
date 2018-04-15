export class Transition {
  constructor(context, {page, targetPage, transition, rulers}) {
    this.context = context;
    this.page = page;
    this.targetPage = targetPage;
    this.transition = transition;
    this.rulers = rulers;

    this.render();
  }

  renderStartPoint({startX, startY, radius}) {
    this.context.beginPath();
    this.context.arc(startX, startY, radius, 0, Math.PI * 2);
    this.context.fill();
    this.context.stroke();
  }

  renderTransitionLine({startX, startY, endX, endY, room}) {
    const currentGrid = this.page.grid;
    const targetGrid = this.targetPage.grid;

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

  renderEndArrow({endX, endY}) {
    this.context.beginPath();
    this.context.moveTo(endX, endY);
    this.context.lineTo(endX - 14, endY + 10);
    this.context.lineTo(endX - 14, endY - 10);
    this.context.closePath();
    this.context.fill();
    this.context.stroke();
  }

  renderFromDescription({startX, startY}) {
    if (this.transition.from.description) {
      const descriptionFontSize = this.transition.from.description.fontSize || 12;
      const texts = this.transition.from.description.text.split('\n');
      this.context.fillStyle = '#666';
      this.context.textAlign = 'left';
      this.context.font = `${descriptionFontSize}px san-serif`;
      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        this.context.fillText(text, startX + descriptionFontSize, startY - (texts.length * descriptionFontSize) + (descriptionFontSize * i));
      }
    }
  }

  renderToDescription({endX, endY}) {
    if (this.transition.to.description) {
      const descriptionFontSize = this.transition.to.description.fontSize || 12;
      const texts = this.transition.to.description.text.split('\n');
      this.context.fillStyle = '#666';
      this.context.textAlign = 'right';
      this.context.font = `${descriptionFontSize}px san-serif`;
      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        this.context.fillText(text, endX - descriptionFontSize * 2, endY - (texts.length * descriptionFontSize) + (descriptionFontSize * i));
      }
    }
  }

  render() {
    const from = this.transition.from || {
      x: this.page.width,
      y: 0,
      radius: 12,
    };
    const toOffset = this.transition.to.offset || {
      x: 0,
      y: 0,
    };
    const options = {
      color: this.transition.color || 'rgba(0, 0, 0, 0.48)',
      radius: from.radius,
      room: this.transition.room || {x: 0, y: 0},
      startX: this.page.x + from.x,
      startY: this.page.y + from.y,
      endX: this.targetPage.x + toOffset.x,
      endY: this.targetPage.y + toOffset.y,
    };

    this.renderFromDescription(options);

    this.context.strokeStyle = options.color;
    this.context.fillStyle = options.color;
    this.renderStartPoint(options);
    this.renderTransitionLine(options);
    this.renderEndArrow(options);

    this.renderToDescription(options);
  }
}
