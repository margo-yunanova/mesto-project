import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this.submitForm = submitForm;
    this.form = this.popup.querySelector('.form');
    this.inputList = this.form.querySelectorAll('.form__item');
    this.buttonSubmit = this.popup.querySelector('.form__submit-button');
  }

  #getInputValues() {
    const inputsValue = {};
    for (const input of this.inputList) {
      inputsValue[input.id] = input.value;
    }
    return inputsValue;
  }

  close() {
    this.form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.buttonSubmit.textContent = 'Сохранение...';
      this.submitForm(this.#getInputValues()).then(() => {
        this.close();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        this.buttonSubmit.textContent = 'Сохранение';
      });
    });
  }
}
