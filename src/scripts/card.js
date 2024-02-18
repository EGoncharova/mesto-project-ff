
 import {changeCardLikes} from './api.js';

 const cardTemplate = document.querySelector('#card-template').content;

const deleteCard = function(card) {
  console.log(11111, card);
  card.remove();
}

// const like = function(event) {
//   event.target.classList.toggle('card__like-button_is-active');
// }
const like = (cardId, likeButton, likesCounter) => {
  changeCardLikes(cardId, likeButton.classList.contains('card__like-button_is-active'))
    .then((cardData) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCounter.textContent= cardData.likes.length;
    })
    .catch((err)=>{
      console.log('error!!!!', err);
    })
}

function createCard(item, deleteButtonCallback, likeCallBack, showCallBack, userId) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = card.querySelector('.card__like-button');
  const likesCounter = card.querySelector('.card__likes-number');
  card.querySelector('.card__title').textContent  = item.name;
  card.querySelector('.card__image').src= item.link;
  
  likesCounter.textContent= item.likes.length;

  
  card.querySelector('.card__image').alt = item.name;
  if (item.owner._id ==userId) {
    card.querySelector('.card__delete-button').addEventListener('click', () => {deleteButtonCallback(item._id, card)});
  }
  else {
    card.querySelector('.card__delete-button').classList.add('card__delete-button_hidden');
  }
  
  likeButton.addEventListener('click', () => {likeCallBack(item._id, likeButton, likesCounter)});
  if (item.likes.some(like => {return like._id == userId})) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  card.querySelector('.card__image').addEventListener('click', showCallBack);
  return card;
}
export {
  deleteCard,
  like,
  createCard
}