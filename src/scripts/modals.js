const closeModal = function(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escClose);
}
const escClose = function(event) {
    if (event.key == 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}
const openModal = function(element) {
    element.classList.add('popup_is-opened', 'popup_is-animated');
    element.querySelector('.popup__close').addEventListener('click', function(event) {
        closeModal(event.target.closest('.popup'));
    });
    element.addEventListener('click', function(event) {
        event.stopPropagation();
        if (event.target.classList.contains('popup')) {
            closeModal(element);
        }
    });
    document.addEventListener('keydown',escClose);
}

export {
    closeModal,
    openModal
};