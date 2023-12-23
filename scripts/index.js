// @todo: Темплейт карточки


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const del = function(evt) {
    evt.target.closest('.card').remove();
}

function addCard(link, name, callback) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src= link;
    card.querySelector('.card__title').innerText = name;
    card.querySelector('.card__delete-button').addEventListener('click', callback);
    return card;
}

// цикл фор позволяет пере,рать поштучно элементы массива
// но его можэно заменить на метод массива forEach
        
// for (let index = 0; index < initialCards.length; index++) {

//     placesList.append(addCard( initialCards[index].link, initialCards[index].name, del));
   
// }

//  forEach принимает в качестве параметра фцию-колбэк, параметр которой определяет, как мы будем обращаться к каждому отдельному элементу массива
initialCards.forEach(function(item) {
    placesList.append(addCard(item.link, item.name, del));
});
