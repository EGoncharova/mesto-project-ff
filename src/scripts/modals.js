const closeModal = function(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escClose);
}
const escClose = function(event) {
    if (event.key == 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

const closeOverlay = function(event, element) {
    event.stopPropagation();
    if (event.target.classList.contains('popup')) {
        closeModal(element);
    }
}
const openModal = function(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown',escClose);
}

export {
    closeModal,
    closeOverlay,
    openModal
};

