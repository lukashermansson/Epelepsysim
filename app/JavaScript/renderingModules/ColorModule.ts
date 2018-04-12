export class ColorModule {
  private name: string
  constructor(name: string) {
    this.name = name;
  }

  draw(ctx: CanvasRenderingContext2D, runningtime: number) {
  }
  public getName() {
    return this.name;
  }
};
