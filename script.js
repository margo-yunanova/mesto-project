const page = document.querySelector('.page');
const placeLikeIcons = page.querySelectorAll('.place__icon-like');
const editButtonProfile = page.querySelector('.profile__edit-button');
const iconClosePopup = page.querySelector('.popup__icon-close');
const popup = page.querySelector('.popup');
const profileName = page.querySelector('.profile__name');
const profileBio = page.querySelector('.profile__bio');
const formItemName = page.querySelector('.form__item_el_name');
const formItemBio = page.querySelector('.form__item_el_bio');
const formElement = page.querySelector('.form');


function openPopup() {
  popup.classList.add('popup_opened');
  formItemName.value = profileName.textContent;
  formItemBio.value = profileBio.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formItemName.value;
  profileBio.textContent = formItemBio.value;
  popup.classList.remove('popup_opened');
}

editButtonProfile.addEventListener('click', openPopup);
iconClosePopup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

function toggleLike(evt) {
  evt.target.classList.toggle('place__icon-like_active');
}

for (let i = 0; i < placeLikeIcons.length; i++) {
  placeLikeIcons[i].addEventListener('click', toggleLike);
}
