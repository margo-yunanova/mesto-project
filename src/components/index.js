import '../pages/index.css';
import { api } from './api';
import { buttonEditProfile, buttonAddPlace, page } from './utils';
import { renderCard, createNewCard } from './card';
import { Section } from './section';
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

function handleProfileFormSubmit({ username, userbio }) {
  return api.pushProfileUpdate(username, userbio).then(profile => {
    profileName.textContent = profile.name;
    profileBio.textContent = profile.about;
  });
}

function handlePlaceFormSubmit({ placetitle, placelink }) {
  return api.pushNewPlaceCard(placetitle, placelink).then(card => {
    renderCard(createNewCard(card, true));
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



api.getProfile().then(profileDatа => {
  //console.log(profileDatа)
  createInitialProfile(profileDatа.name, profileDatа.about, profileDatа.avatar);
  api.getInitialCards().then(cards => {
    /*
    for (const card of cards) {
      renderCard(createNewCard(card, card.owner._id === profileDatа._id));
    }
    */
    const cardSection = new Section({
      data: cards,
      renderer: (item) => {
        if (item) {
          return createNewCard(item);
        };
      }
    },
      '.places'
    );
    const data = cardSection.renderItems();
    data.forEach(item => {
      cardSection.addItem(item);
    });
  }).catch((err) => {
    console.log(err);
  });
}).catch((err) => {
  console.log(err);
});
