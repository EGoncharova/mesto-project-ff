import '../pages/index.css';
import {
    initialCards
} from './cards.js';
import {
    deleteCard,
    like,
    createCard
} from './card.js';
import {
    closeModal,
    closeOverlay,
    openModal
} from './modals.js';


const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popups =  document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage =  document.querySelector('.popup_type_image');
const popupImagePicture = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

// Находим форму в DOM
const formEditProfile = document.forms['edit-profile'];
// Находим поля формы в DOM
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Находим форму в DOM
const formPlace = document.forms['new-place'];
// Находим поля формы в DOM
const linkInput = formPlace.link;
const placeNameInput = formPlace['place-name'];

const showImage = function(event) {
    popupImagePicture.src = event.target.src;
    popupImagePicture.alt =  event.target.closest('.card').querySelector('.card__title').textContent ;
    popupImageCaption.textContent  = event.target.closest('.card').querySelector('.card__title').textContent ;
    
    openModal(popupImage);
}
initialCards.forEach(function(item) {
    placesList.append(createCard(item.link, item.name, deleteCard, like, showImage));
});


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleformEditProfileSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent  = nameInput.value;
    profileDescription.textContent  = jobInput.value;
    closeModal(popupEdit);
}


function handlePlaceSubmit(evt) {
    evt.preventDefault(); 
    console.log(linkInput.value, placeNameInput.value);
    placesList.prepend(createCard(linkInput.value, placeNameInput.value, deleteCard, like, showImage));
    formPlace.reset();
    
    closeModal(popupAdd);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleformEditProfileSubmit);

profileEditButton.addEventListener('click', function() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
});


profileAddButton.addEventListener('click', function() {
    openModal(popupAdd);
});
formPlace.addEventListener('submit', handlePlaceSubmit);


popups.forEach(function(item) {
    item.querySelector('.popup__close').addEventListener('click', function(event) {
        closeModal(item);
    });
    item.addEventListener('click', function(event) {
        closeOverlay(event,item)
    });
});


