export class Section {

  constructor ({items, renderer}, selector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(selector);
  }
  renderItems () {
    this.renderer(this.items);
  }
  addItem (item) {
      this.container.prepend(item);
  };

};
