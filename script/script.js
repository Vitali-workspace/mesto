let container = document.querySelector('.root');
let profile = container.querySelector('.profile');
let popup = container.querySelector('.popup');
let btnClose = container.querySelector('.popup__btn-close');
let formEdit = container.querySelector('#formEdit');

let btnProfileEdit = container.querySelector('.profile__btn-edit');
// обращение к тексту в профиле
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
// обращение к инпутам
let inputName = container.querySelector('#inputEditName');
let inputDescription = container.querySelector('#inputEditText');

function openPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popupClose()
}

function popupClose() {
  popup.classList.toggle('popup_opened');
}

function submitForm(evt) {
  evt.preventDefault();
  // вставка значения из инпута в профиль
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popupClose()
}

btnProfileEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', popupClose);
formEdit.addEventListener('submit', submitForm);

