import { ColorModule } from './ColorModule';

export class CrossoverColor extends ColorModule {
  constructor() {
    super('Crossover');
  }

  draw(ctx: CanvasRenderingContext2D, runningtime: number) {
    const imageData: ImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let y: number = 0; y < ctx.canvas.height; ++y) {
      for (let x: number = 0; x < ctx.canvas.width; ++x) {
        let index: number = ((y * ctx.canvas.width) + x) * 4;

        imageData.data[index] = (y * runningtime + runningtime) % 255; // red
        imageData.data[++index] = (y / x / runningtime + runningtime) % 255; // green
        imageData.data[++index] = (y * x * runningtime) % 255; // blue
      }
    }
    // Update image
    ctx.putImageData(imageData, 0, 0, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
