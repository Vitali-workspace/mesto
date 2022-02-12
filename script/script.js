let container = document.querySelector('.root');
let profile = container.querySelector('.profile');
let popup = container.querySelector('.popup');
let btnClose = container.querySelector('.popup__btn-close');
let btnSave = container.querySelector('.popup__btn-save');
let btnProfileEdit = container.querySelector('.profile__btn-edit');
// обращение к тексту в профиле
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
// обращение к инпута
let inputName = container.querySelector('#inputEditName');
let inputDescription = container.querySelector('#inputEditText');

btnProfileEdit.addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
  inputName.value = profileName.innerHTML;
  inputDescription.value = profileDescription.innerHTML;
});

btnClose.addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
});

btnSave.addEventListener('click', function (evt) {
  evt.preventDefault();
  // вставка значения из инпута в профиль
  profileName.textContent = `${inputName.value}`;
  profileDescription.textContent = `${inputDescription.value}`;
  popup.classList.remove('popup_opened');
});
