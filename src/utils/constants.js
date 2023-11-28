import Api from "../components/Api";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";
import {
  handleProfileFormSubmit,
  handlePlaceFormSubmit,
  handleUserPicSubmit,
} from "../pages/index";

export const page = document.querySelector(".page");
export const buttonEditProfile = page.querySelector(".profile__edit-button");
export const buttonAddPlace = page.querySelector(".profile__add-button");
export const profileEditUserPic = page.querySelector(".profile__edit-userpic");
export const formValidators = {};

export const api = new Api({
  baseUrl: "https://api.mesto.margo.nomoredomainsmonster.ru",
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY2NWRkM2FmMzc1YzlhYTE2YWU0MjYiLCJpYXQiOjE3MDEyMDgwMzgsImV4cCI6MTcwMTgxMjgzOH0.fgk_Xw0VRwXiHeC2xbYPGnzREY3EsaF67OovGl7Gxq4",
    "Content-Type": "application/json",
  },
});

export const validationOptions = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
};

export const cardApi = {
  toggleLikeApi: (cardId, toggle) => {
    return toggle ? api.likeCard(cardId) : api.deleteLikeCard(cardId);
  },
  deleteCardApi: (cardId) => {
    return api.deletePlaceCard(cardId);
  },
};

export const sectionPlaces = new Section((item) => {
  const cardItem = new Card(
    item,
    "#place-template",
    () => {
      popupExpandImage.open(item.link, item.name);
    },
    cardApi
  );
  return cardItem.create();
}, ".places");

export const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__bio",
  avatar: ".profile__userpic",
});

export const popupProfile = new PopupWithForm(
  ".popup_el_profile",
  handleProfileFormSubmit
);
export const popupPlace = new PopupWithForm(
  ".popup_el_place",
  handlePlaceFormSubmit
);
export const popupProfileEditUserPic = new PopupWithForm(
  ".popup_el_user-pic",
  handleUserPicSubmit
);
export const popupExpandImage = new PopupWithImage(".popup_el_image");
