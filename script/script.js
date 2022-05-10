import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';

const container = document.querySelector('.root');
//const profile = container.querySelector('.profile'); // вроде не нужен
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('#inputEditName');
const inputDescription = document.querySelector('#inputEditText');

const templateCard = document.querySelector('#tempCard').content;
const gallery = container.querySelector('.gallery');

const newCardName = container.querySelector('#inputAddName');
const newCardLink = container.querySelector('#inputAddLink');

const formAddCard = container.querySelector('#formAdd');
const formEdit = document.querySelector('#formEdit');

const popupEdit = container.querySelector('#popupEdit');
const popupAddCard = container.querySelector('#popupAddCard');

const popupCardImg = container.querySelector('#popupCardImg');
const popupImage = container.querySelector('.popup__image');
const popupImageName = container.querySelector('.popup__image-name');

const objElements = {
  formSelector: '.form',
  inputSelector: '.popup__edit-input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup_btn-disable',
  inputErrorSelector: '.popup__input-error',
  errorClass: 'popup__input-error_active'
}

const validFormEdit = new FormValidator(objElements, formEdit);
const validFormAddCard = new FormValidator(objElements, formAddCard);
validFormEdit.enableValidation();
validFormAddCard.enableValidation();

// отвечает за открытие картинки в попапе
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function getReadyCard(parametersCard) {
  const newBuildCard = new Card(parametersCard, handleCardClick, templateCard);
  return newBuildCard.createTemplateCard();
}

const userProfile = new UserInfo({ name: '.profile__name', description: '.profile__description' });

const printCards = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const elementCard = getReadyCard(element);
      printCards.addItem(elementCard);
    }
  }, gallery);


function valueField() {
  // придумать красивее название
  const newCard = {
    name: newCardName.value,
    link: newCardLink.value
  }
  const elementCard = getReadyCard(newCard);
  console.log(elementCard);

  printCards.addItem(elementCard);
  validFormAddCard.disabledSubmitAddCard();
}


const popupWithFormAdd = new PopupWithForm(popupAddCard, valueField);

popupWithFormAdd.setEventListeners();

const popupWithFormProfile = new PopupWithForm(popupEdit, () => {
  userProfile.setUserInfo(inputName, inputDescription);
});
popupWithFormProfile.setEventListeners();

const popupWithImage = new PopupWithImage(popupCardImg);
popupWithImage.setEventListeners();

container.querySelector('.profile__btn-add').addEventListener('click', function () {
  popupWithFormAdd.open();
  validFormAddCard.resetInputErorr();
});

container.querySelector('.profile__btn-edit').addEventListener('click', function () {
  popupWithFormProfile.open();
  // получаем объект с данными полей из инпута
  const profileData = userProfile.getUserInfo();
  // копирования данных в поля инпута из профеля
  inputName.value = profileData.name;
  inputDescription.value = profileData.description;
  validFormEdit.resetInputErorr();
});

printCards.printElement();

export { popupImage, popupImageName };
