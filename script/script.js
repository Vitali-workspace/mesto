let container = document.querySelector('.root');
let popupEdit = container.querySelector('.popup');
let buttonEdit = container.querySelector('.profile__btn-edit');
let buttonClose = container.querySelector('.popup__btn-close');
let formElement = container.querySelector('.popup__form-edit');
// обращение к тексту профиля
let nameProfile = container.querySelector('.profile__header');
let jobProfile = container.querySelector('.profile__text');
// обращение к input
let nameInput = document.getElementById('editName');
let jobInput = document.getElementById('editJob');

function showClick() {
    popupEdit.classList.add('popup_opened');
    // подстановка текста в форму
    nameInput.value = nameProfile.innerHTML;
    jobInput.value = jobProfile.innerHTML;
}

function сloseClick() {
    popupEdit.classList.remove('popup_opened');
}

function submitFormEdit (evt) {
    evt.preventDefault();
    // запись новых значений в профиль
    nameProfile.textContent = `${nameInput.value}`;
    jobProfile.textContent = `${jobInput.value}`;
    сloseClick()
}

buttonClose.addEventListener('click', сloseClick);
buttonEdit.addEventListener('click', showClick);
formElement.addEventListener('submit', submitFormEdit);
