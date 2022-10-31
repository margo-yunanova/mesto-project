import { page } from './utils';

const showInputError = (formItem, inputItem, errorMessage, options) => {
  const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (formItem, inputItem, options) => {
  const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonItem, options) => {
  if (hasInvalidInput(inputList)) {
    buttonItem.disabled = true;
    buttonItem.classList.add(options.inactiveButtonClass);
  } else {
    buttonItem.disabled = false;
    buttonItem.classList.remove(options.inactiveButtonClass);
  }
}

export const checkInputValidity = (formItem, inputItem, options) => {
  if (inputItem.validity.patternMismatch) {
    inputItem.setCustomValidity(inputItem.dataset.errorMessage);
  // Если убирать эту проверку, то в браузерах с иностранной локализацией соообщения
  // будут на разных языках. На видео в ТЗ явно указано, что для пустых полей нужна фраза
  // Вы пропустили поле, а сейчас без этой проверки браузерное сообщение другое -
  // Заполните это поле.
  // } else if (inputItem.validity.valueMissing) {
  //   inputItem.setCustomValidity('Вы пропустили это поле.')
  } else {
    inputItem.setCustomValidity('');
  }

  if (!inputItem.validity.valid) {
    showInputError(formItem, inputItem, inputItem.validationMessage, options);
  } else {
    hideInputError(formItem, inputItem, options);
  }
};

export const validateForm = (formItem, options) => {
  const inputList = Array.from(formItem.querySelectorAll(options.inputSelector));
  const buttonItem = formItem.querySelector(options.submitButtonSelector);
  for (const inputItem of inputList) {
    checkInputValidity(formItem, inputItem, options);
  }
  toggleButtonState(inputList, buttonItem, options);
}

const setEventListeners = (formItem, options) => {
  const inputList = Array.from(formItem.querySelectorAll(options.inputSelector));
  const buttonItem = formItem.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonItem, options);
  for (const inputItem of inputList) {
    inputItem.addEventListener('input', () => {
      checkInputValidity(formItem, inputItem, options);
      toggleButtonState(inputList, buttonItem, options);
    });
  };
};

export const enableValidation = (options) => {
  const formList = Array.from(page.querySelectorAll(options.formSelector));
  formList.forEach((formItem) => {
    setEventListeners(formItem, options);
  });
};


