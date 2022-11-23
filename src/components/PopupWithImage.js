import Popup from './Popup';


export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.popupImage = this.popup.querySelector('.popup__image');
    this.popupSubtitle = this.popup.querySelector('.popup__subtitle');
  }

  open(src, alt, subtitle) {
    super.open();
    this.popupImage.src = src;
    this.popupImage.alt = alt;
    this.popupSubtitle.textContent = subtitle;
  }
}
