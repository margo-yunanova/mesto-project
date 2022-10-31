import { page } from './utils';

export const formItemName = page.querySelector('.form__item_el_name');
export const formItemBio = page.querySelector('.form__item_el_bio');

export const popupElPlace = page.querySelector('.popup_el_place');
export const popupElProfile = page.querySelector('.popup_el_profile');

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('click', closeByOverlayClick);
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('click', closeByOverlayClick);
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

// document.body.addEventListener('keydown', function (evt) {
//   if (evt.key === 'Escape') {
//     const popup = document.querySelector('.popup_opened');
//     if (popup !== null) {
//       closePopup(popup);
//     }
//   }
// });


// document.body.addEventListener('click', function (evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//     closePopup(evt.target);
//   }
// });
