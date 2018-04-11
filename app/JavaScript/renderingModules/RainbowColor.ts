import { ColorModule } from './ColorModule';

module.exports = class RainbowColor extends ColorModule {
  constructor() {
    super('Rainbow');
  }

  draw(ctx, runningtime) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let y = 0; y < ctx.canvas.height; ++y) {
      for (let x = 0; x < ctx.canvas.width; ++x) {
        let index = ((y * ctx.canvas.width) + x) * 4;

        imageData.data[index] = 100; // red
        imageData.data[++index] = (y / x * runningtime + runningtime) % 255; // green
        imageData.data[++index] = (y * x * runningtime + runningtime) % 255; // blue
      }
    }
    // Update image
    ctx.putImageData(imageData, 0, 0, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
