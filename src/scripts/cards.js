import img1 from '../images/card_1.jpg';
import img2 from '../images/card_2.jpg';
import img3 from '../images/card_3.jpg';
import img4 from '../images/card_4.jpg';
import img5 from '../images/card_5.jpg';
import img6 from '../images/card_6.jpg';


const initialCards = [
    {
      name: "Архыз",
      link: img1,
    },
    {
      name: "Челябинская область",
      link: img2,
    },
    {
      name: "Иваново",
      link: img3,
    },
    {
      name: "Камчатка",
      link: img4,
    },
    {
      name: "Холмогорский район",
      link: img5,
    },
    {
      name: "Байкал",
      link: img6,
    }
];

const cardTemplate = document.querySelector('#card-template').content;
const del = function(evt) {
  evt.target.closest('.card').remove();
}

const like = function(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

function createCard(link, name, deleteButtonCallback, likeCallBack, showCallBack) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').innerText = name;
  card.querySelector('.card__image').src= link;
  
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__delete-button').addEventListener('click', deleteButtonCallback);
  card.querySelector('.card__like-button').addEventListener('click', likeCallBack);
  card.querySelector('.card__image').addEventListener('click', showCallBack);
  return card;
}
export {
  initialCards,
  del,
  like,
  createCard
}