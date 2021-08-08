let container = document.querySelector('.root');
let popupBackground = container.querySelector('.popup');
let messageEdit = container.querySelector('.popup__container');
let buttonEdit = container.querySelector('.profile__btn-edit');
let buttonClose = container.querySelector('.popup__edit-btn_action_close');
let buttonSave = container.querySelector('.popup__edit-btn_action_save');

function showClick() {
messageEdit.classList.add('popup__opened');
messageEdit.classList.remove('popup__hidden');
popupBackground.classList.add('popup__opened');
}

function сloseClick() {
    popupBackground.classList.remove('popup__opened');
    messageEdit.classList.add('popup__hidden');
    formElement.reset();
}

buttonClose.addEventListener('click', сloseClick);
buttonEdit.addEventListener('click', showClick);
let formElement = container.querySelector('.popup__form-edit');
let nameInput = document.getElementById('profileHeader');
let jobInput = document.getElementById('profileText');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let name = formElement.querySelector('.popup__edit-name').value;
    let jobs = formElement.querySelector('.popup__edit-description').value;
    const nameNew = nameInput.textContent;
    nameInput.textContent = `${name}`;
    const jobsNew = nameInput.textContent;
    jobInput.textContent = `${jobs}`;
    popupBackground.classList.remove('popup__opened');
    messageEdit.classList.add('popup__hidden');
}

formElement.addEventListener('submit', formSubmitHandler);