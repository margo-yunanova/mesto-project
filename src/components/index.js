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
  about: '.profile__bio',
  avatar: '.profile__userpic'
});

const popupProfile = new PopupWithForm('.popup_el_profile', handleProfileFormSubmit);
const popupPlace = new PopupWithForm('.popup_el_place', handlePlaceFormSubmit);
const popupProfileEditUserPic = new PopupWithForm('.popup_el_user-pic', handleUserPicSubmit);
export const popupExpandImage = new PopupWithImage('.popup_el_image');

const profileEditUserPic = page.querySelector('.profile__edit-userpic');

const formValidators = {};

const enableValidation = (validationOptions) => {
  const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));
  for (const form of formList) {
    const validator = new FormValidator(validationOptions, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  }
}

function handleProfileFormSubmit({ name, about }) {
  return api.pushProfileUpdate(name, about).then(profile => {
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
  formValidators['avtarform'].resetValidation();
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
