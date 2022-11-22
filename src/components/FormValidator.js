export default class FormValidator {
  constructor(validationOptions, form) {
    this.validationOptions = validationOptions;
    this.form = document.querySelector(form);
    this.inputList = Array.from(this.form.querySelectorAll(validationOptions.inputSelector));
    this.buttonSubmit = this.form.querySelector(validationOptions.submitButtonSelector);
  }

  #showInputError(input, errorMessage) {
    const errorElement = this.form.querySelector(`.${input.id}-error`);
    input.classList.add(this.validationOptions.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.validationOptions.errorClass);
  }

  #hideInputError(input) {
    const errorElement = this.form.querySelector(`.${input.id}-error`);
    input.classList.remove(this.validationOptions.inputErrorClass);
    errorElement.classList.remove(this.validationOptions.errorClass);
    errorElement.textContent = '';
  }

  #hasInvalidInput() {
    return this.inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  #checkInputValidity(input) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity('');
    }
    if (!input.validity.valid) {
      this.#showInputError(input, input.validationMessage);
    } else {
      this.#hideInputError(input);
    }
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.buttonSubmit.disabled = true;
      this.buttonSubmit.classList.add(this.validationOptions.inactiveButtonClass);
    } else {
      this.buttonSubmit.disabled = false;
      this.buttonSubmit.classList.remove(this.validationOptions.inactiveButtonClass);
    }
  }

  clearError() {
    for (const input of this.inputList) {
      this.#hideInputError(input);
    }
    this.#toggleButtonState();
  }


  #setEventListeners() {
    this.#toggleButtonState();
    for (const input of this.inputList) {
      input.addEventListener('input', () => {
        this.#checkInputValidity(input);
        this.#toggleButtonState();
      });
    }
  }

  enableValidation() {
    this.#setEventListeners();
  }
}
