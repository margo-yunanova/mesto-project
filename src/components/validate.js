import { page } from './utils';

const showInputError = (formItem, inputItem, errorMessage) => {
  const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.add('form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__item-error_active');
};

const hideInputError = (formItem, inputItem) => {
  const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
  inputItem.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__item-error_active');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonItem) => {
  if (hasInvalidInput(inputList)) {
    buttonItem.disable = true;
    buttonItem.classList.add('form__submit-button_inactive');
  } else {
    buttonItem.disable = false;
    buttonItem.classList.remove('form__submit-button_inactive');
  }
}

export const checkInputValidity = (formItem, inputItem) => {
  if (inputItem.validity.patternMismatch) {
    inputItem.setCustomValidity(inputItem.dataset.errorMessage);
  } else if (inputItem.value === '') {
    inputItem.setCustomValidity('Вы пропустили это поле.')
  } else {
    inputItem.setCustomValidity('');
  }

  if (!inputItem.validity.valid) {
    showInputError(formItem, inputItem, inputItem.validationMessage);
  } else {
    hideInputError(formItem, inputItem);
  }
};

const setEventListeners = (formItem) => {
  const inputList = Array.from(formItem.querySelectorAll('.form__item'));
  const buttonItem = formItem.querySelector('.form__submit-button');
  toggleButtonState(inputList, buttonItem);
  for (const inputItem of inputList) {
    inputItem.addEventListener('input', () => {
      checkInputValidity(formItem, inputItem);
      toggleButtonState(inputList, buttonItem);
    });
  };
};

export const enableValidation = () => {
  const formList = Array.from(page.querySelectorAll('.form'));
  formList.forEach((formItem) => {
    setEventListeners(formItem);
  })
}


