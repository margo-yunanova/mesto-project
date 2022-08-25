const page = document.querySelector('.page');

const places = page.querySelector('.places');

const profileName = page.querySelector('.profile__name');
const profileBio = page.querySelector('.profile__bio');

const formItemName = page.querySelector('.form__item_el_name');
const formItemBio = page.querySelector('.form__item_el_bio');
const formElPlaceTitle = page.querySelector('.form__item_el_place-title');
const formElPlaceLink = page.querySelector('.form__item_el_place-link');

const popupElPlace = page.querySelector('.popup_el_place');

const popupElProfile = page.querySelector('.popup_el_profile');

const popupElImage = page.querySelector('.popup_el_image');
const popupImage = page.querySelector('.popup__image');
const popupSubtitle = page.querySelector('.popup__subtitle');

const editProfileButton = page.querySelector('.profile__edit-button');
const popupCloseButtons = page.querySelectorAll('.popup__icon-close');
const addPlaceButton = page.querySelector('.profile__add-button');

const placeElement = page.querySelector('#place-template').content.querySelector('.place');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function toggleLike(evt) {
  evt.target.classList.toggle('place__icon-like_active');
}

function deleteCard(evt) {
  evt.target.closest('.place').remove();
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function openPopupProfile() {
  formItemName.value = profileName.textContent;
  formItemBio.value = profileBio.textContent;
  popupElProfile.classList.add('popup_opened');
}

function expandImage(evt) {
  popupImage.src = evt.target.src;
  popupSubtitle.textContent = evt.target.textContent;
  popupElImage.classList.add('popup_opened');
}

function createNewCard(name, link) {
  const place = placeElement.cloneNode(true);
  place.querySelector('.place__title').textContent = name;
  place.querySelector('.place__image').src = link;
  place.querySelector('.place__image').alt = `фотография ${name}`;
  place.querySelector('.place__icon-like').addEventListener('click', toggleLike);
  place.querySelector('.place__icon-trash').addEventListener('click', deleteCard);
  place.querySelector('.place__image').addEventListener('click', expandImage);
  places.prepend(place);
}

function addInitialCards(cards) {
  for (let i = cards.length - 1; i >= 0; i--) {
    createNewCard(cards[i].name, cards[i].link);
  }
}

function openPopupPlace(evt) {
  popupElPlace.classList.add('popup_opened');
}

function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formItemName.value;
  profileBio.textContent = formItemBio.value;
  popupElProfile.classList.remove('popup_opened');
}

function formSubmitHandlerPlace(evt) {
  evt.preventDefault();
  createNewCard(formElPlaceTitle.value, formElPlaceLink.value);
  popupElPlace.classList.remove('popup_opened');
}

// ____________________________________________________________________

addInitialCards(initialCards);

for (let i = 0; i < popupCloseButtons.length; i++) {
  popupCloseButtons[i].addEventListener('click', closePopup);
}

popupElProfile.querySelector('.form').addEventListener('submit', formSubmitHandlerProfile);
popupElPlace.querySelector('.form').addEventListener('submit', formSubmitHandlerPlace);

editProfileButton.addEventListener('click', openPopupProfile);
addPlaceButton.addEventListener('click', openPopupPlace);

// document.querySelector('.popup_el_profile .form').addEventListener('submit', formProfileSubmitHandler);
// document.querySelector('.popup_el_place .form').addEventListener('submit', formPlaceSubmitHandler);
