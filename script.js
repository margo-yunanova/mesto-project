const page = document.querySelector('.page');

const popupElProfile = page.querySelector('.popup_el_profile');
const profileName = page.querySelector('.profile__name');
const profileBio = page.querySelector('.profile__bio');

const formElement = page.querySelectorAll('.form');
const formItemName = page.querySelector('.form__item_el_name');
const formItemBio = page.querySelector('.form__item_el_bio');

const popupElImage = page.querySelector('.popup_el_image');
const popupImage = page.querySelector('.popup__image');
const popupSubtitle = page.querySelector('.popup__subtitle');


function toggleLike(evt) {
  evt.target.classList.toggle('place__icon-like_active');
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function openPopup() {
  formItemName.value = profileName.textContent;
  formItemBio.value = profileBio.textContent;
  popupElProfile.classList.add('popup_opened');
}

function expandImage(evt) {
  popupImage.src = evt.target.src;
  popupSubtitle.textContent = evt.target.textContent;
  popupElImage.classList.add('popup_opened');
}

const places = page.querySelector('.places');
const placeTemplate = page.querySelector('#place-template').content;
const placeElement = placeTemplate.querySelector('.place');

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

function createNewCard(name, link) {
  const place = placeElement.cloneNode(true);
  place.querySelector('.place__title').textContent = name;
  place.querySelector('.place__image').src = link;
  place.querySelector('.place__icon-like').addEventListener('click', toggleLike);
  places.prepend(place);
}

function addInitialCards(cards) {
  for (let i = cards.length - 1; i >= 0; i--) {
    createNewCard(cards[i].name, cards[i].link);
  }
}

addInitialCards(initialCards);

const editProfileButton = page.querySelector('.profile__edit-button');
const popupCloseButtons = page.querySelectorAll('.popup__icon-close');
const addPlaceButton = page.querySelector('.profile__add-button');
const placeImages = page.querySelectorAll('.place__image');

for (let i = 0; i < popupCloseButtons.length; i++) {
  popupCloseButtons[i].addEventListener('click', closePopup);
}

for (let i = 0; i < placeImages.length; i++) {
  placeImages[i].addEventListener('click', expandImage);
}

const popupElPlace = page.querySelector('.popup_el_place');
const formElPlaceTitle = page.querySelector('.form__item_el_place-title');
const formElPlaceLink = page.querySelector('.form__item_el_place-link');


function openPopupPlace(evt) {
  popupElPlace.classList.add('popup_opened');
}

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formItemName.value;
  profileBio.textContent = formItemBio.value;
  popupElProfile.classList.remove('popup_opened');
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();

  createNewCard(formElPlaceTitle.value, formElPlaceLink.value);
  popupElPlace.classList.remove('popup_opened');
}

popupElProfile.querySelector('.form').addEventListener('submit', formProfileSubmitHandler);
popupElPlace.querySelector('.form').addEventListener('submit', formPlaceSubmitHandler);

// document.querySelector('.popup_el_profile .form').addEventListener('submit', formProfileSubmitHandler);
// document.querySelector('.popup_el_place .form').addEventListener('submit', formPlaceSubmitHandler);

editProfileButton.addEventListener('click', openPopup);
addPlaceButton.addEventListener('click', openPopupPlace);

function deleteCard(evt) {
  evt.target.closest('.place').remove();
}

for (let i = 0; i < placeTrashButtons.length; i++) {
  placeTrashButtons[i].addEventListener('click', deleteCard);
}

const placeTrashButtons = page.querySelectorAll('.place__icon-trash');
