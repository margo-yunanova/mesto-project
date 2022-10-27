import '../../pages/index.css'
import { editProfileButton, popupCloseButtons, addPlaceButton } from './utils'
import { addInitialCards } from './card'
import { closePopup, popupElProfile, popupElPlace, handleProfileFormSubmit, handlePlaceFormSubmit, openPopupProfile, openPopupPlace} from './modal'
import { initialCards } from './initialCards'

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

