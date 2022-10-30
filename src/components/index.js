import '../pages/index.css'
import { editProfileButton, popupCloseButtons, addPlaceButton } from './utils'
import { addInitialCards } from './card'
import { closePopup, popupElProfile, popupElPlace, handleProfileFormSubmit, handlePlaceFormSubmit, openPopupProfile, openPopupPlace} from './modal'
import { initialCards } from './initialCards'
import { enableValidation } from './validate'

addInitialCards(initialCards);

for (let i = 0; i < popupCloseButtons.length; i++) {
  popupCloseButtons[i].addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
}

popupElProfile.querySelector('.form').addEventListener('submit', handleProfileFormSubmit);
popupElPlace.querySelector('.form').addEventListener('submit', handlePlaceFormSubmit);

editProfileButton.addEventListener('click', openPopupProfile);
addPlaceButton.addEventListener('click', openPopupPlace);

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
});

