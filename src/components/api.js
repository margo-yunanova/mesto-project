const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-16',
  headers: {
    'authorization': '3b45e7df-7420-41ed-89ad-84bab9964bf8',
    'Content-Type': 'application/json'
  }
}

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      //console.log(res.json())
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const pushProfileUpdate = (profileName, profileBio) => {
 return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      'name': profileName,
      'about': profileBio,
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).then(profileUpdate => console.log(profileUpdate));
}

export const pushNewPlaceCard = (placeName, placeLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'name': placeName,
      'link': placeLink,
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }).then(newPlaceCard => console.log(newPlaceCard));
}

export const deletePlaceCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(res => {
    if (res.ok) {
      //console.log(res.json())
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(res => {
    if (res.ok) {
      //console.log(res.json())
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(res => {
    if (res.ok) {
      //console.log(res.json())
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const updateUserPic = (userPickLink) => {
  return fetch('https://nomoreparties.co/v1/cohortId/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      'avatar': userPickLink
    })
  }).then(res => {
    if (res.ok) {
      //console.log(res.json())
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}
