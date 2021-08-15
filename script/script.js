let container = document.querySelector('.root');
let popupBackground = container.querySelector('.popup');
let messageEdit = container.querySelector('.popup__container');
let buttonEdit = container.querySelector('.profile__btn-edit');
let buttonClose = container.querySelector('.popup__btn-close');
let buttonSave = container.querySelector('.popup__btn-save');

function showClick() {
messageEdit.classList.add('popup_opened');
messageEdit.classList.remove('root__hidden');
popupBackground.classList.remove('root__hidden');
}

function сloseClick() {
    popupBackground.classList.remove('popup_opened');
    messageEdit.classList.add('root__hidden');
    popupBackground.classList.add('root__hidden');
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
    popupBackground.classList.remove('popup_opened');
    popupBackground.classList.add('root__hidden');
}

formElement.addEventListener('submit', formSubmitHandler);