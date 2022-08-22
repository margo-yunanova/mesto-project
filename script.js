const page = document.querySelector('.page');

const placeLikeButtons = page.querySelectorAll('.place__icon-like');
const editProfileButton = page.querySelector('.profile__edit-button');
const popupCloseButtons = page.querySelectorAll('.popup__icon-close');

const popupElProfile = page.querySelector('.popup');
const profileName = page.querySelector('.profile__name');
const profileBio = page.querySelector('.profile__bio');

const formElement = page.querySelector('.form');
const formItemName = page.querySelector('.form__item_el_name');
const formItemBio = page.querySelector('.form__item_el_bio');

const popupElImage = page.querySelector('.popup_el_image');
const popupImage = page.querySelector('.popup__image');
const popupSubtitle = page.querySelector('.popup__subtitle');

const placeImages = page.querySelectorAll('.place__image');

function toggleLike(evt) {
  evt.target.classList.toggle('place__icon-like_active');
}

for (let i = 0; i < placeLikeButtons.length; i++) {
  placeLikeButtons[i].addEventListener('click', toggleLike);
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

for (let i = 0; i < popupCloseButtons.length; i++) {
  popupCloseButtons[i].addEventListener('click', closePopup);
}

function openPopup() {
  formItemName.value = profileName.textContent;
  formItemBio.value = profileBio.textContent;
  popupElProfile.classList.add('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formItemName.value;
  profileBio.textContent = formItemBio.value;
  popupElProfile.classList.remove('popup_opened');
}

function expandImage(evt) {
  popupImage.src = evt.target.src;
  popupSubtitle.textContent = evt.target.textContent;
  popupElImage.classList.add('popup_opened');
}

for (let i = 0; i < placeImages.length; i++) {
  placeImages[i].addEventListener('click', expandImage)
}

editProfileButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
