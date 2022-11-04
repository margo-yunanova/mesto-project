import { expandImage } from './index'
import { page } from './utils'
import { getInitialCards, deletePlaceCard } from './api'

const placeContainer = page.querySelector('.places');
const placeElement = page.querySelector('#place-template').content.querySelector('.place');

function toggleLike(evt) {
  evt.target.classList.toggle('place__icon-like_active');
}

function deleteCard(evt) {
  getInitialCards().then(cards => {
    for (const card of cards) {
      if (card.link === evt.target.closest('.place').querySelector('.place__image').src) {
        deletePlaceCard(card._id)
      }
    }
  })
  evt.target.closest('.place').remove();
}

export function createNewCard(card, isMyCard) {
  const place = placeElement.cloneNode(true);
  const placeImage = place.querySelector('.place__image');
  const placeLikeCounter = place.querySelector('.place__like-counter');
  place.querySelector('.place__title').textContent = card.name;
  placeImage.src = card.link;
  placeImage.alt = `фотография ${card.name}`;
  place.id = `${card._id}`;
  placeLikeCounter.textContent = card.likes.length;
  if (!isMyCard) {
    place.querySelector('.place__icon-trash').classList.add('place__icon-trash_inactive');
  }
  place.querySelector('.place__icon-like').addEventListener('click', toggleLike);
  place.querySelector('.place__icon-trash').addEventListener('click', deleteCard);
  placeImage.addEventListener('click', expandImage);
  return place;
}

export function renderCard(card) {
  placeContainer.prepend(card);
}

