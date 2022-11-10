import '../pages/index.css';
import { getProfile, getInitialCards, pushProfileUpdate, pushNewPlaceCard, updateUserPic } from './api';
import { buttonEditProfile, buttonAddPlace, page } from './utils';
import { renderCard, createNewCard } from './card';
import { closePopup, popupElProfile, popupElPlace, popupEditUserPic, openPopup, formItemName, formItemBio } from './modal';
import { enableValidation, clearError } from './validate';

const profileName = page.querySelector('.profile__name');
const profileBio = page.querySelector('.profile__bio');
const profileUserPic = page.querySelector('.profile__userpic');
const profileEditUserPic = page.querySelector('.profile__edit-userpic');

const popupImage = page.querySelector('.popup__image');
const popupSubtitle = page.querySelector('.popup__subtitle');

const popupElImage = page.querySelector('.popup_el_image');

const formElPlaceTitle = page.querySelector('.form__item_el_place-title');
const formElPlaceLink = page.querySelector('.form__item_el_place-link');
const formElUserPicLink = page.querySelector('.form__item_el_user-pic-link');

const formProfile = page.querySelector('.popup_el_profile .form');
const formPlace = page.querySelector('.popup_el_place .form');
const formChangeAvatar = page.querySelector('.popup_el_user-pic .form');

const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

function createInitialProfile(name, bio, userPic) {
  profileName.textContent = name;
  profileBio.textContent = bio;
  profileUserPic.src = userPic;
}

function openPopupProfile() {
  formItemName.value = profileName.textContent;
  formItemBio.value = profileBio.textContent;
  clearError(popupElProfile, validationOptions);
  openPopup(popupElProfile);
}

function openEditUserPic() {
  openPopup(popupEditUserPic);
}

export function expandImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupSubtitle.textContent = evt.target.closest('.place').querySelector('.place__title').textContent;
  openPopup(popupElImage);
}

function openPopupPlace() {
  clearError(popupElPlace, validationOptions);
  openPopup(popupElPlace);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const buttonSubmit = evt.submitter;
  buttonSubmit.textContent = 'Сохранение...';
  pushProfileUpdate(formItemName.value, formItemBio.value).then(profile => {
    profileName.textContent = profile.name;
    profileBio.textContent = profile.about;
    closePopup(popupElProfile);
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    buttonSubmit.textContent = 'Сохранение';
  });
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const buttonSubmit = evt.submitter;
  buttonSubmit.textContent = 'Сохранение...';
  pushNewPlaceCard(formElPlaceTitle.value, formElPlaceLink.value).then(card => {
    renderCard(createNewCard(card, true));
    closePopup(popupElPlace);
    formPlace.reset();
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    buttonSubmit.textContent = 'Сохранение';
  });
}

function handleUserPicSubmit(evt) {
  evt.preventDefault();
  const buttonSubmit = evt.target.querySelector('.form__submit-button');
  buttonSubmit.textContent = 'Сохранение...';
  updateUserPic(formElUserPicLink.value).then(profile => {
    profileUserPic.src = profile.avatar;
    closePopup(popupEditUserPic);
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    buttonSubmit.textContent = 'Сохранение';
  });
}

formProfile.addEventListener('submit', handleProfileFormSubmit);
formPlace.addEventListener('submit', handlePlaceFormSubmit);
formChangeAvatar.addEventListener('submit', handleUserPicSubmit);

buttonEditProfile.addEventListener('click', openPopupProfile);
buttonAddPlace.addEventListener('click', openPopupPlace);

profileEditUserPic.addEventListener('click', openEditUserPic);

enableValidation(validationOptions);

// getProfile().then(profileDatа => {
//   //console.log(profileDatа)
//   createInitialProfile(profileDatа.name, profileDatа.about, profileDatа.avatar);
//   getInitialCards().then(cards => {
//     for (const card of cards) {
//       renderCard(createNewCard(card, card.owner._id === profileDatа._id));
//     }
//   }).catch((err) => {
//     console.log(err);
//   });
// }).catch((err) => {
//   console.log(err);
// });


Promise.all([getProfile(), getInitialCards()])
  .then(([profileDatа, cards]) => {
    createInitialProfile(profileDatа.name, profileDatа.about, profileDatа.avatar);
    for (const card of cards) {
      renderCard(createNewCard(card, card.owner._id === profileDatа._id));
    }
  }).catch((err) => {
    console.log(err);
  });
