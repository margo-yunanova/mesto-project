import './index.css';
import {api, validationOptions, sectionPlaces, userInfo, popupProfile, popupPlace, popupProfileEditUserPic,
  popupExpandImage, profileEditUserPic, formValidators, enableValidation, buttonEditProfile, buttonAddPlace} from '../utils/constants';

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
