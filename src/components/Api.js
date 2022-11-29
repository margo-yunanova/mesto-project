export default class Api {

  constructor (options) {
    this.options = options;
  }

  #checkPromiseResult (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  #request(url, options) {
    return fetch(url, options).then(this.#checkPromiseResult);
  }

  getProfile () {
    return this.#request(`${this.options.baseUrl}/users/me`, {headers: this.options.headers});
  };

  getInitialCards () {
    return this.#request(`${this.options.baseUrl}/cards`, {headers: this.options.headers});
  };

  pushProfileUpdate (profileName, profileBio) {
    return this.#request(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        'name': profileName,
        'about': profileBio,
      })
    });
  };

  pushNewPlaceCard (placeName, placeLink) {
    return this.#request(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        'name': placeName,
        'link': placeLink,
      })
    });
  };

  deletePlaceCard (cardId) {
    return this.#request(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
    });
  }

  likeCard (cardId) {
    return this.#request(`${this.options.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.options.headers,
    });
  }

  deleteLikeCard (cardId) {
    return this.#request(`${this.options.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
    });
  }

  updateUserPic (userPicLink) {
    return this.#request(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        'avatar': userPicLink
      })
    });
  }

};
