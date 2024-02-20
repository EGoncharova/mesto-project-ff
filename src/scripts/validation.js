
const showInputError = function(formElement, inputElement, inputErrorClass, errorClass, message) {
    const errorElement = formElement.querySelector(`#popup__error_${inputElement.id}`)
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(errorClass);

}

const hideInputError = function(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#popup__error_${inputElement.id}`)
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);

}

const checkValidity = function(formElement, inputElement, inputErrorClass, errorClass) {
    console.log(inputElement.validity);
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity (inputElement.dataset.errorMessage);
    }else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}
const buttonState = (buttonElement, inactiveButtonClass, inputList) => {
    
    if (inputList.some((inputElement) => { return !inputElement.validity.valid })) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

const setEventListeners = function(formElement, inputSelector, inputErrorClass, errorClass, buttonElement, inactiveButtonClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, inputErrorClass, errorClass);
            buttonState(buttonElement, inactiveButtonClass, inputList);
        })
    })
}

const enableValidation = function({

    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    
    formList.forEach((formElement) => {
        const buttonElement = formElement.querySelector(submitButtonSelector);
        setEventListeners(formElement, inputSelector, inputErrorClass, errorClass, buttonElement, inactiveButtonClass);
    })
  }; 

    
const clearValidation = (formElement, {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
    }) => {
        formElement.querySelector(submitButtonSelector).disabled = true;   
        formElement.querySelector(submitButtonSelector).classList.add(inactiveButtonClass);
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, inputErrorClass, errorClass);
        })
    }

  export {
    enableValidation,
    clearValidation
  }