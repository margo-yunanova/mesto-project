import '../pages/index.css'
import { getProfile, getInitialCards, pushProfileUpdate, pushNewPlaceCard } from './api'
import { buttonEditProfile, buttonAddPlace, page } from './utils'
import { renderCard, createNewCard } from './card'
import { closePopup, popupElProfile, popupElPlace, openPopup, formItemName, formItemBio } from './modal'
import { enableValidation, clearError } from './validate'

const profileName = page.querySelector('.profile__name');
const profileBio = page.querySelector('.profile__bio');
const profileUserPic = page.querySelector('.profile__userpic');

const popupImage = page.querySelector('.popup__image');
const popupSubtitle = page.querySelector('.popup__subtitle');

const popupElImage = page.querySelector('.popup_el_image');

const formElPlaceTitle = page.querySelector('.form__item_el_place-title');
const formElPlaceLink = page.querySelector('.form__item_el_place-link');

const formProfile = page.querySelector('.popup_el_profile .form');
const formPlace = page.querySelector('.popup_el_place .form');

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
  profileName.textContent = formItemName.value;
  profileBio.textContent = formItemBio.value;
  pushProfileUpdate(profileName.textContent, profileBio.textContent);
  closePopup(popupElProfile);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  pushNewPlaceCard(formElPlaceTitle.value, formElPlaceLink.value).then(card => {
    renderCard(createNewCard(card, true));
  })
  formPlace.reset();
  closePopup(popupElPlace);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);
formPlace.addEventListener('submit', handlePlaceFormSubmit);

buttonEditProfile.addEventListener('click', openPopupProfile);
buttonAddPlace.addEventListener('click', openPopupPlace);

enableValidation(validationOptions);

getProfile().then(profileDatа => {
  createInitialProfile(profileDatа.name, profileDatа.about, profileDatа.avatar);
  getInitialCards().then(cards => {
    for (const card of cards) {
      renderCard(createNewCard(card, card.owner._id === profileDatа._id ));
    }
  })})
