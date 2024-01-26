const cardTemplate = document.querySelector('#card-template').content;
const deleteCard = function(evt) {
  evt.target.closest('.card').remove();
}

const like = function(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

function createCard(link, name, deleteButtonCallback, likeCallBack, showCallBack) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent  = name;
  card.querySelector('.card__image').src= link;
  
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__delete-button').addEventListener('click', deleteButtonCallback);
  card.querySelector('.card__like-button').addEventListener('click', likeCallBack);
  card.querySelector('.card__image').addEventListener('click', showCallBack);
  return card;
}
export {
  deleteCard,
  like,
  createCard
}