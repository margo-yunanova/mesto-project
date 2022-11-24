export default class Section {

  constructor (renderer, selector) {
    this.renderer = renderer;
    this.container = document.querySelector(selector);
  }
  renderItem (items) {
    this.renderer(items);
  }
  addItem (item) {
      this.container.prepend(item);
  };

};
