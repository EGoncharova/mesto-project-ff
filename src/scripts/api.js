const server = {
  url:'https://nomoreparties.co/v1/',
  coghort: 'cohort-magistr-2',
  headers: {
    authorization: '7c4ca987-ccfd-4626-b24e-d90ffe7ccafc',
    'Content-Type': 'application/json'
  }
}

const analiseResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

function getData(what) {
  return fetch(`${server.url}${server.coghort}/${what}`, {
  headers: server.headers
})
.then(analiseResponse);
}

function getPageData() {
    return Promise.all([getData('users/me'), getData('cards')])
}

function editUser (title, descr) {
  return fetch(`${server.url}${server.coghort}/users/me`, {
  method: 'PATCH',
  headers: server.headers,
  body: JSON.stringify({
    name: title,
    about: descr
  })
})
.then(analiseResponse); 
}

function editAvatar(avatar) {

  return fetch(`${server.url}${server.coghort}/users/me/avatar`, {
    method: 'PATCH',
    headers: server.headers,
    body: JSON.stringify(avatar)
  })
  .then(analiseResponse); 
}

function addCard(card) {
 return fetch(`${server.url}${server.coghort}/cards`, {
    method: 'POST',
    headers:  server.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  }).then(analiseResponse); 
}

function deleteImageCard(cardId) {
  return fetch(`${server.url}${server.coghort}/cards/${cardId}`, {
    method: 'DELETE',
    headers: server.headers
  }).then(analiseResponse); 
}

function changeCardLikes(cardId, like) {
  return fetch(`${server.url}${server.coghort}/cards/likes/${cardId}`, {
    method: like ? 'DELETE' : 'PUT',
    headers: server.headers
  }).then(analiseResponse); 
}

export {
    getPageData,
    editUser,
    addCard,
    deleteImageCard,
    changeCardLikes,
    editAvatar
}
