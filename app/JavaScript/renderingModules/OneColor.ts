import { ColorModule } from './ColorModule';

module.exports = class OneColor extends ColorModule {
  constructor() {
    super('OneColor');
  }

  draw(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = r;
      imageData.data[i + 1] = g;
      imageData.data[i + 2] = b;
      imageData.data[i + 3] = 255;
    }
    // Update image
    ctx.putImageData(imageData, 0, 0, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
