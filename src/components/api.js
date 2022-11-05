const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-16',
  headers: {
    'authorization': '3b45e7df-7420-41ed-89ad-84bab9964bf8',
    'Content-Type': 'application/json'
  }
};

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(_checkResponse);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(_checkResponse);
};

export const pushProfileUpdate = (profileName, profileBio) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      'name': profileName,
      'about': profileBio,
    })
  }).then(_checkResponse);
};

export const pushNewPlaceCard = (placeName, placeLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'name': placeName,
      'link': placeLink,
    })
  }).then(_checkResponse);
};

export const deletePlaceCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(_checkResponse);
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(_checkResponse);
};

export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(_checkResponse);
};

export const updateUserPic = (userPicLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      'avatar': userPicLink
    })
  }).then(_checkResponse);
};
