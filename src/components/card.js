import { expandImage } from './index'
import { page } from './utils'

const placeContainer = page.querySelector('.places');
const placeElement = page.querySelector('#place-template').content.querySelector('.place');

function toggleLike(evt) {
  evt.target.classList.toggle('place__icon-like_active');
}

function deleteCard(evt) {
  evt.target.closest('.place').remove();
}

export function createNewCard(name, link) {
  const place = placeElement.cloneNode(true);
  const placeImage = place.querySelector('.place__image');
  place.querySelector('.place__title').textContent = name;
  placeImage.src = link;
  placeImage.alt = `фотография ${name}`;
  place.querySelector('.place__icon-like').addEventListener('click', toggleLike);
  place.querySelector('.place__icon-trash').addEventListener('click', deleteCard);
  placeImage.addEventListener('click', expandImage);
  return place;
}

export function renderCard(card) {
  placeContainer.prepend(card);
}

