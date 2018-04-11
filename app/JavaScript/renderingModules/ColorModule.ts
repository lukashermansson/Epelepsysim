export class ColorModule {
  private _name: string
  constructor(name: string) {
    this._name = name;
  }

  draw(ctx: CanvasRenderingContext2D, runningtime: number) {
  }
  get name() {
    return this._name;
  }
};
