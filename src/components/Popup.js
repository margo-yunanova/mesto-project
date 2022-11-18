export default class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.buttonClose = this.popup.querySelector('.popup__icon-close');
  }

  openPopup() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#handleEscClose);
  }

  closePopup() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#handleEscClose);
  }

  #handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this.buttonClose.addEventListener('click', () => {
      this.closePopup();
    });

    this.popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup();
      }
    });
  }
}
