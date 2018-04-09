const ColorModule = require('./ColorModule');

module.exports = class RainbowColor extends ColorModule {
  constructor() {
    super('Rainbow');
  }

  draw(ctx) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let y = 0; y < canvas.height; ++y) {
      for (let x = 0; x < canvas.width; ++x) {
        let index = ((y * canvas.width) + x) * 4;

        imageData.data[index] = 100; // red
        imageData.data[++index] = (y / x * runningtime + runningtime) % 255; // green
        imageData.data[++index] = (y * x * runningtime + runningtime) % 255; // blue
      }
    }
    // Update image
    ctx.putImageData(imageData, 0, 0, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
