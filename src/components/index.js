import '../pages/index.css';
import Api from './Api';
import { buttonEditProfile, buttonAddPlace, page } from './utils';
import Card from './Card';
import Section from './Section';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import FormValidator from './FormValidator';
import UserInfo from './UserInfo';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: '3b45e7df-7420-41ed-89ad-84bab9964bf8',
    'Content-Type': 'application/json'
  }
});

const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};
const sectionPlaces = new Section(
  (item) => {
    const cardItem = new Card(item, '#place-template', () => {
      popupExpandImage.open(item.link, item.name);
    });
    sectionPlaces.addItem(cardItem.create());
  }, '.places');

const userInfo = new UserInfo({
  name: '.profile__name',
  bio: '.profile__bio',
  avatar: '.profile__userpic'
});

const popupProfile = new PopupWithForm('.popup_el_profile', handleProfileFormSubmit);
const popupPlace = new PopupWithForm('.popup_el_place', handlePlaceFormSubmit);
const popupProfileEditUserPic = new PopupWithForm('.popup_el_user-pic', handleUserPicSubmit);
export const popupExpandImage = new PopupWithImage('.popup_el_image');

const formValidatorProfile = new FormValidator(validationOptions, page.querySelector('.popup_el_profile .form'));
const formValidatorPlace = new FormValidator(validationOptions, page.querySelector('.popup_el_place .form'));
const formValidatorAvatar = new FormValidator(validationOptions, page.querySelector('.popup_el_user-pic .form'));

const profileEditUserPic = page.querySelector('.profile__edit-userpic');


function handleProfileFormSubmit({ username, about }) {
  return api.pushProfileUpdate(username, about).then(profile => {
    userInfo.setUserInfo(profile.name, profile.about);
  });
}

function handlePlaceFormSubmit({ placename, placelink }) {
  return api.pushNewPlaceCard(placename, placelink).then(card => {
    sectionPlaces.renderItem(card);
  });
}

function handleUserPicSubmit({ avatar }) {
  return api.updateUserPic(avatar).then(profile => {
    userInfo.setUserAvatar(profile.avatar);
  });
}

formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
formValidatorAvatar.enableValidation();

popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupProfileEditUserPic.setEventListeners();
popupExpandImage.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  const { inputList: [username, userbio] } = popupProfile;
  const { name, bio } = userInfo.getUserInfo();
  username.value = name;
  userbio.value = bio;
  formValidatorProfile.clearError();
  popupProfile.open();
});

buttonAddPlace.addEventListener('click', () => {
  formValidatorPlace.clearError();
  popupPlace.open();
});

profileEditUserPic.addEventListener('click', () => {
  formValidatorAvatar.clearError();
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
      sectionPlaces.renderItem(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });
