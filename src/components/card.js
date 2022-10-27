import { page } from './utils'
import { expandImage } from './modal'

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
  place.querySelector('.place__title').textContent = name;
  place.querySelector('.place__image').src = link;
  place.querySelector('.place__image').alt = `фотография ${name}`;
  place.querySelector('.place__icon-like').addEventListener('click', toggleLike);
  place.querySelector('.place__icon-trash').addEventListener('click', deleteCard);
  place.querySelector('.place__image').addEventListener('click', expandImage);
  return place;
}

export function renderCard(card) {
  placeContainer.prepend(card);
}

export function addInitialCards(cards) {
  for (let i = cards.length - 1; i >= 0; i--) {
    renderCard(createNewCard(cards[i].name, cards[i].link));
  }
}
