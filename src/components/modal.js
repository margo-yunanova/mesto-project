import { page } from './utils';
import { renderCard, createNewCard } from './card';

const profileName = page.querySelector('.profile__name');
const profileBio = page.querySelector('.profile__bio');

export const formItemName = page.querySelector('.form__item_el_name');
export const formItemBio = page.querySelector('.form__item_el_bio');

const popupImage = page.querySelector('.popup__image');
const popupSubtitle = page.querySelector('.popup__subtitle');

export const popupElPlace = page.querySelector('.popup_el_place');
export const popupElProfile = page.querySelector('.popup_el_profile');
const popupElImage = page.querySelector('.popup_el_image');

const formElPlaceTitle = page.querySelector('.form__item_el_place-title');
const formElPlaceLink = page.querySelector('.form__item_el_place-link');

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function openPopupProfile() {
  formItemName.value = profileName.textContent;
  formItemBio.value = profileBio.textContent;
  openPopup(popupElProfile);
}

export function expandImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupSubtitle.textContent = evt.target.closest('.place').querySelector('.place__title').textContent;
  openPopup(popupElImage);
}

export function openPopupPlace() {
  openPopup(popupElPlace);
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formItemName.value;
  profileBio.textContent = formItemBio.value;
  closePopup(popupElProfile);
}

export function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  renderCard(createNewCard(formElPlaceTitle.value, formElPlaceLink.value));
  popupElPlace.querySelector('.form').reset();
  closePopup(popupElPlace);
}
