import './index.css';
import {api, validationOptions, sectionPlaces, userInfo, popupProfile, popupPlace, popupProfileEditUserPic,
  popupExpandImage, profileEditUserPic, formValidators, buttonEditProfile, buttonAddPlace} from '../utils/constants';
import FormValidator from '../components/FormValidator';

export function handleProfileFormSubmit({ name, about }) {
  return api.pushProfileUpdate(name, about).then(profile => {
    userInfo.setUserInfo(profile.name, profile.about);
  });
}

export function handlePlaceFormSubmit({ placename, placelink }) {
  return api.pushNewPlaceCard(placename, placelink).then(card => {
    sectionPlaces.addItem(card);
  });
}

export function handleUserPicSubmit({ avatar }) {
  return api.updateUserPic(avatar).then(profile => {
    userInfo.setUserAvatar(profile.avatar);
  });
}
const enableValidation = (validationOptions) => {
  const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));
  for (const form of formList) {
    const validator = new FormValidator(validationOptions, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  }
};

enableValidation(validationOptions);

popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupProfileEditUserPic.setEventListeners();
popupExpandImage.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  popupProfile.setInputValues(userInfo.getUserInfo())
  formValidators['profileform'].resetValidation();
  popupProfile.open();
});

buttonAddPlace.addEventListener('click', () => {
  formValidators['placeform'].resetValidation();
  popupPlace.open();
});

profileEditUserPic.addEventListener('click', () => {
  formValidators['avatarform'].resetValidation();
  popupProfileEditUserPic.open();
});


Promise.all([
  api.getProfile(),
  api.getInitialCards()])
  .then(([profileDatа, cards]) => {
    sessionStorage.setItem('userId', profileDatа._id);
    userInfo.setUserInfo(profileDatа.name, profileDatа.about);
    userInfo.setUserAvatar(profileDatа.avatar);
    cards.forEach((card) => {
      sectionPlaces.addItem(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });
