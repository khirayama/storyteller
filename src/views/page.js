export class Page {
  constructor(context, scene, rulers) {
    this.context = context;
    this.scene = scene;
    this.rulers = rulers;
    this.id = this.scene.id;
    this.title = this.scene.title;
    this.description = this.scene.description;
    this.grid = this.scene.grid;
    this.width = this.scene.screen.width;
    this.height = this.scene.screen.height;
    this.x = this.rulers.x[this.grid.x] + ((this.rulers.x[this.grid.x + 1] - this.rulers.x[this.grid.x] - this.width) / 2);
    this.y = this.rulers.y[this.grid.y] + ((this.rulers.y[this.grid.y + 1] - this.rulers.y[this.grid.y] - this.height) / 2);

    this.render();
  }

  render() {
    const color = this.scene.color || 'rgba(0, 0, 0, 0.32)';
    const titleFontSize = 20;
    const descriptionFontSize = 14;
    if (this.title) {
      this.context.fillStyle = '#666';
      this.context.font = `${titleFontSize}px san-serif`;
      this.context.fillText(this.title, this.x, this.rulers.y[this.grid.y] + titleFontSize, this.width);
    }
    if (this.description) {
      const texts = this.description.split('\n');
      this.context.fillStyle = '#666';
      this.context.font = `${descriptionFontSize}px san-serif`;
      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        this.context.fillText(text, this.x, this.rulers.y[this.grid.y] + titleFontSize + (descriptionFontSize * (i + 2)), this.width);
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
}
