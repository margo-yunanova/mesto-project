export default class Section {

  constructor (renderer, selector) {
    this.renderer = renderer;
    this.container = document.querySelector(selector);
  }
  renderItem (item) {
    this.renderer(item);
  }
  addItem (item) {
      this.container.prepend(item);
  };

};
