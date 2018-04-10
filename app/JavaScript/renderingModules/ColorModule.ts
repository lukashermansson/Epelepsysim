module.exports = class ColorModule {
  constructor(name) {
    this._name = name;
  }

  draw(ctx) {
  }
  get name() {
    return this._name;
  }
};
