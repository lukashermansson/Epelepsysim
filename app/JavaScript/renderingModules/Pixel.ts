import { ColorModule } from './ColorModule';

export class Pixel extends ColorModule {
  constructor() {
    super('Pixel');
  }
  draw(ctx: CanvasRenderingContext2D) {
    const imageData: ImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i: number = 0; i < imageData.data.length; i += 4) {
      const r:number = Math.floor(Math.random() * 255);
      const g: number = Math.floor(Math.random() * 255);
      const b: number = Math.floor(Math.random() * 255);
      imageData.data[i] = r;
      imageData.data[i + 1] = g;
      imageData.data[i + 2] = b;
      imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};
