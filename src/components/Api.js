class Api {

  constructor (options) {
    this.options = options;
  }

  #checkPromiseResult (res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getProfile () {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers
    }).then(this.#checkPromiseResult);
  };

  getInitialCards () {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers
    }).then(this.#checkPromiseResult);
  };

  pushProfileUpdate (profileName, profileBio) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        'name': profileName,
        'about': profileBio,
      })
    }).then(this.#checkPromiseResult);
  };

  pushNewPlaceCard (placeName, placeLink) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        'name': placeName,
        'link': placeLink,
      })
    }).then(this.#checkPromiseResult);
  };

  deletePlaceCard (cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
    }).then(this.#checkPromiseResult);
  };

  likeCard (cardId) {
    return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.options.headers,
    }).then(this.#checkPromiseResult);
  };

  deleteLikeCard (cardId) {
    return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
    }).then(this.#checkPromiseResult);
  };

  updateUserPic (userPicLink) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        'avatar': userPicLink
      })
    }).then(this.#checkPromiseResult);
  };
}
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: '3b45e7df-7420-41ed-89ad-84bab9964bf8',
    'Content-Type': 'application/json'
  }
});