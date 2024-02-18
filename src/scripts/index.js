import '../pages/index.css';
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
import {
    enableValidation,
    clearValidation
} from './validation.js';
import {
    getPageData,
    editUser,
    addCard,
    deleteImageCard,
    editAvatar
} from './api.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popups =  document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage =  document.querySelector('.popup_type_image');
const popupImagePicture = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const popupDelete =  document.querySelector('.popup_type_delete-card');
const popupEditAvatar =  document.querySelector('.popup_type_avatar');

const formCardDelete = document.forms['delete-card'];

// Находим форму в DOM
const formEditProfile = document.forms['edit-profile'];
// Находим поля формы в DOM
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const saveProfileButton = formEditProfile.querySelector('.popup__button');
let userID;

const formEditAvatar = document.forms['edit-avatar'];
const linkAvatarInput = formEditAvatar.link;
const saveAvatarButton = formEditAvatar.querySelector('.popup__button');

// Находим форму в DOM
const formPlace = document.forms['new-place'];
// Находим поля формы в DOM
const linkInput = formPlace.link;
const placeNameInput = formPlace['place-name'];

const savePlaceButton = formPlace.querySelector('.popup__button');

const showImage = function(event) {
    popupImagePicture.src = event.target.src;
    popupImagePicture.alt =  event.target.closest('.card').querySelector('.card__title').textContent ;
    popupImageCaption.textContent  = event.target.closest('.card').querySelector('.card__title').textContent ;
    
    openModal(popupImage);
}


getPageData()
    .then (([userData, cardsData]) => {
        console.log(userData);
        console.log(cardsData);

        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        userID = userData._id;
        cardsData.forEach(function(item) {
            placesList.append(createCard(item, handlecardDelete, like, showImage, userID));
        });
    })
    .catch((err)=>{
            console.log('error!!!!', err);
          });

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleformEditProfileSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                            
    saveProfileButton.textContent = "Сохранение...";
    editUser(nameInput.value, jobInput.value)
    .then( (UserData) => {
        console.log(UserData);
        profileTitle.textContent  = nameInput.value;
        profileDescription.textContent  = jobInput.value;
        closeModal(popupEdit);
    })
    .catch((err)=>{
        console.log('error!!!!', err);
      })
    .finally(() => {
        saveProfileButton.textContent = "Сохранить";
    });
    
}


function handlePlaceSubmit(evt) {
    evt.preventDefault(); 
    savePlaceButton.textContent = "Сохранение...";
    addCard({name: placeNameInput.value, link: linkInput.value})
    .then ((cardsData) => {
        console.log(cardsData);
        placesList.prepend(createCard(cardsData, handlecardDelete, like, showImage, userID));
        formPlace.reset();
        closeModal(popupAdd);
    })
    .catch((err)=>{
            console.log('error!!!!', err);
          })
    .finally(() => {
        savePlaceButton.textContent = "Сохранить";
    });
}


let handleConfirm  = () => {};

function  handlecardDelete(cardId, cardObj) {
     handleConfirm = () => {
        deleteImageCard(cardId)
        .then ((cardsData) => {
            deleteCard(cardObj);
            closeModal(popupDelete);
        })
        .catch((err)=>{
                console.log('error!!!!', err);
              });
    }
    
    openModal(popupDelete);
}


function handleAvatarSubmit() {
    saveAvatarButton.textContent = "Сохранение...";
    editAvatar({avatar: linkAvatarInput.value})
    .then(userData => {
        console.log(userData);
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(popupEditAvatar);
    })
    .catch((err)=>{
        console.log('error!!!!', err);
      })
      .finally(() => {
        saveAvatarButton.textContent = "Сохранить";
    });
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleformEditProfileSubmit);

profileEditButton.addEventListener('click', function() {
    clearValidation  (formEditProfile,{
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
      });
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEdit);
});


profileAddButton.addEventListener('click', function() {
    formPlace.reset();
    clearValidation  (formPlace,{
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
      });
    openModal(popupAdd);
});

profileImage.addEventListener('click', function() {
    formEditAvatar.reset();
    openModal(popupEditAvatar);
});

formPlace.addEventListener('submit', handlePlaceSubmit);

formCardDelete.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleConfirm();
});

formEditAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleAvatarSubmit();
});


popups.forEach(function(item) {
    item.querySelector('.popup__close').addEventListener('click', function(event) {
        closeModal(item);
    });
    item.addEventListener('click', function(event) {
        closeOverlay(event,item);

    });
});


