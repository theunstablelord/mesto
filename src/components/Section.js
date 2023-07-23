export class Section {
  constructor({ data , renderer}, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._containerElement.prepend(item);
  }
}