import './pages/index.css';
import {
    initialCards,
    del,
    like,
    createCard
} from './scripts/cards.js';
import {
    closeModal,
    openModal
} from './scripts/modals.js';


const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage =  document.querySelector('.popup_type_image');

const show = function(event) {
    document.querySelector('.popup__image').src = event.target.src;
    document.querySelector('.popup__caption').innerText = event.target.closest('.card').querySelector('.card__title').innerText;
    
    openModal(popupImage);
}
initialCards.forEach(function(item) {
    placesList.append(createCard(item.link, item.name, del, like, show));
});



// Находим форму в DOM
const formElement = document.forms['edit-profile'];
// Находим поля формы в DOM
const nameInput = formElement.name;
const jobInput = formElement.description;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    document.querySelector('.profile__title').innerText = nameInput.value;
    document.querySelector('.profile__description').innerText = jobInput.value;
    closeModal(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

profileEditButton.addEventListener('click', function() {
    nameInput.value = document.querySelector('.profile__title').innerText;
    jobInput.value = document.querySelector('.profile__description').innerText;
    openModal(popupEdit);
});


// Находим форму в DOM
const formPlace = document.forms['new-place'];
// Находим поля формы в DOM
const linkInput = formPlace.link;
const placeNameInput = formPlace['place-name'];

profileAddButton.addEventListener('click', function() {
    openModal(popupAdd);
});
function handlePlaceSubmit(evt) {
    evt.preventDefault(); 
    console.log(linkInput.value, placeNameInput.value);
    placesList.prepend(createCard(linkInput.value, placeNameInput.value, del, like, show));
    closeModal(popupAdd);
}
formPlace.addEventListener('submit', handlePlaceSubmit);