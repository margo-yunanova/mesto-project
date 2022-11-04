import { expandImage } from './index'
import { page } from './utils'
import { likeCard, deleteLikeCard, deletePlaceCard } from './api'


const placeContainer = page.querySelector('.places');
const placeElement = page.querySelector('#place-template').content.querySelector('.place');

function toggleLike(evt) {
  const place = evt.target.closest('.place');
  if (evt.target.classList.contains('place__icon-like_active')) {
    deleteLikeCard(place.id).then(card => {
      place.querySelector('.place__like-counter').textContent = card.likes.length
    })
    evt.target.classList.remove('place__icon-like_active');
  } else {
    likeCard(place.id).then(card => {
      place.querySelector('.place__like-counter').textContent = card.likes.length
    })
    evt.target.classList.add('place__icon-like_active');
  }
}

function deleteCard(evt) {
  deletePlaceCard(evt.target.closest('.place').id);
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

