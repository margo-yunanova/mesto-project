export default class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.buttonClose = this.popup.querySelector('.popup__icon-close');
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#handleEscClose);
  }

  #handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this.buttonClose.addEventListener('click', () => {
      this.close();
    });

    this.popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    });
  }
}
