import '../pages/index.css';
import { api } from './Api';
import { buttonEditProfile, buttonAddPlace, page } from './Utils';
import Card from './Card';
import Section from './Section';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import FormValidator from './FormValidator';

const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

const popupProfile = new PopupWithForm('.popup_el_profile', handleProfileFormSubmit);
const popupPlace = new PopupWithForm('.popup_el_place', handlePlaceFormSubmit);
const popupProfileEditUserPic = new PopupWithForm('.popup_el_user-pic', handleUserPicSubmit);
export const popupExpandImage = new PopupWithImage('.popup_el_image');

const formValidatorProfile = new FormValidator(validationOptions, page.querySelector('.popup_el_profile .form'));
const formValidatorPlace = new FormValidator(validationOptions, page.querySelector('.popup_el_place .form'));
const formValidatorAvatar = new FormValidator(validationOptions, page.querySelector('.popup_el_user-pic .form'));

const profileName = page.querySelector('.profile__name');
const profileBio = page.querySelector('.profile__bio');
const profileUserPic = page.querySelector('.profile__userpic');
const profileEditUserPic = page.querySelector('.profile__edit-userpic');


function createInitialProfile(name, bio, userPic) {
  profileName.textContent = name;
  profileBio.textContent = bio;
  profileUserPic.src = userPic;
}


function expandImage(image, title) {
  popupExpandImage.open(image, title, title);
}

function handleProfileFormSubmit({ username, userbio }) {
  return api.pushProfileUpdate(username, userbio).then(profile => {
    profileName.textContent = profile.name;
    profileBio.textContent = profile.about;
  });
}

function handlePlaceFormSubmit({ placetitle, placelink }) {
  return api.pushNewPlaceCard(placetitle, placelink).then(card => {
    const newSection = new Section({
      items: card,
      renderer: (item) => {
        const cardItem = new Card(item, '#place-template', expandImage);
        newSection.addItem(cardItem.create());
    }},'.places');
    newSection.renderItems();
  });
}

function handleUserPicSubmit({ 'user-pic-link': userPicLink }) {
  return api.updateUserPic(userPicLink).then(profile => {
    profileUserPic.src = profile.avatar;
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
  username.value = profileName.textContent;
  userbio.value = profileBio.textContent;
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
  api.getInitialCards() ])
  .then(([profileDatа, cards])=>{
    sessionStorage.setItem('userId', profileDatа._id);
    createInitialProfile(profileDatа.name, profileDatа.about, profileDatа.avatar);
    const newSection = new Section({
      items: cards,
      renderer: (items) => {
        items.forEach(item => {
          const cardItem = new Card(item, '#place-template', expandImage);
          newSection.addItem(cardItem.create());
        });
    }},'.places');
    newSection.renderItems();
  })
  .catch((err)=>{
  console.log(err);
})
