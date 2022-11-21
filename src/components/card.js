import { api } from './api'

export class Card {
  static placeSelector = '.place';
  #userId;
  #card;
  #templateSelector;
  #handleCardClick;
  #place;
  #placeTitle;
  #placeImage;
  #placeLike;
  #placeLikeCounter;
  #placeTrash;

  constructor (card, templateSelector, handleCardClick) {
    this.#card = card;
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
  }

  create() {
    this.#place = document
      .querySelector(this.#templateSelector)
      .content
      .querySelector(this.constructor.placeSelector)
      .cloneNode(true);
    this.#placeTitle = this.#place.querySelector('.place__title');
    this.#placeImage = this.#place.querySelector('.place__image');
    this.#placeLike = this.#place.querySelector('.place__icon-like');
    this.#placeLikeCounter = this.#place.querySelector('.place__like-counter');
    this.#placeTrash = this.#place.querySelector('.place__icon-trash');
    this.#userId = sessionStorage.getItem('userId');

    this.#placeTitle.textContent = this.#card.name;
    this.#placeImage.src = this.#card.link;
    this.#placeImage.alt = this.#card.name;
    this.#writeLikeCount(this.#countLikes(this.#card));
    if (this.#isILikeCard(this.#card)) {
      this.#toggleLikeClass();
    }
    this.#setEventListeners();
    return this.#place;
  }

  #toggleLike() {
    if (this.#placeLike.classList.contains('place__icon-like_active')) {
      api.deleteLikeCard(this.#card._id)
        .then((card) => {
          this.#writeLikeCount(this.#countLikes(card));
          this.#toggleLikeClass();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.likeCard(this.#card._id)
        .then(card => {
          this.#writeLikeCount(this.#countLikes(card));
          this.#toggleLikeClass();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  #deleteCard() {
    api.deletePlaceCard(this.#card._id)
      .then(() => {
        this.#deleteCardFromMarkup();
      })
      .catch((err) => {
        console.log(err);
    });
  }

  #setEventListeners () {
    if (this.#card.owner._id === this.#userId) {
      this.#placeTrash.addEventListener('click', () => {this.#deleteCard();});
    } else {
      this.#placeTrash.remove();
    };
    this.#placeLike.addEventListener('click', () => {this.#toggleLike();});
    this.#placeImage.addEventListener('click', () => {this.#handleCardClick(this.#placeImage.src, this.#placeTitle.textContent);});
  }

  #countLikes (card) {
    return card.likes.length;
  }

  #writeLikeCount (likeSum) {
    this.#placeLikeCounter.textContent = likeSum;
  }

  #toggleLikeClass () {
    this.#placeLike.classList.toggle('place__icon-like_active');
  }

  #isILikeCard (card) {
    return card.likes.some(like => like._id == this.#userId);
  }

  #deleteCardFromMarkup () {
    this.#place.remove();
  }

};
