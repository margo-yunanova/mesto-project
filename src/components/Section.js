export default class Section {

  constructor (renderer, selector) {
    this.renderer = renderer;
    this.container = document.querySelector(selector);
  }

  addItem (item) {
    this.container.prepend(this.renderer(item));
  };

};
