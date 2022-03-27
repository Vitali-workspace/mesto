const container = document.querySelector('.root');
const profile = container.querySelector('.profile');
// обращение к тексту в профиле
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
// обращение к инпутам из формы Edit
const inputName = container.querySelector('#inputEditName');
const inputDescription = container.querySelector('#inputEditText');

const templateCard = document.querySelector('#tempCard').content;
const gallery = container.querySelector('.gallery'); // место вставки карточек

const newCardName = container.querySelector('#inputAddName');
const newCardLink = container.querySelector('#inputAddLink');

const popupEdit = container.querySelector('#popupEdit');
const popupAddCard = container.querySelector('#popupAddCard');
const popupCardImg = container.querySelector('#popupCardImg');

const popupImage = container.querySelector('.popup__image');
const popupImageName = container.querySelector('.popup__image-name');

// функция вставки шаблона карточки из темплейта
function renderCard(name, link) {
  const templateCardContent = templateCard.querySelector('.gallery__card').cloneNode(true);
  templateCardContent.querySelector('.gallery__card-name').textContent = `${name}`;
  templateCardContent.querySelector('.gallery__card-img').src = `${link}`;
  templateCardContent.querySelector('.gallery__card-img').alt = `${name}`;
  templateCardContent.querySelector('.gallery__btn-favorites').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__btn-favorites_active');
  });
  templateCardContent.querySelector('.gallery__btn-trash').addEventListener('click', function (evt) {
    evt.target.closest('.gallery__card').remove();
  });
  // открытие попапа картинки
  templateCardContent.querySelector('.gallery__card-img').addEventListener('click', function () {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
    showPopup(popupCardImg);
  });
  return templateCardContent;
}

// отрисовка карточек
function printCards() {
  initialCards.forEach(function (card) {
    gallery.prepend(renderCard(card.name, card.link));
  });
}

function closePopupEscAndOverlay() {
  // функция поиска открытого попапа
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopupEscAndOverlay();
  }
}

function closePopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopupEscAndOverlay();
  }
}

function showPopup(popupName) {
  popupName.classList.toggle('popup_opened');
  popupName.classList.toggle('popup_close'); // анимация закрытия попапа
  // событие на оверлей
  popupName.addEventListener('mousedown', closePopupOnOverlay);
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popupName) {
  popupName.classList.toggle('popup_opened');
  popupName.classList.toggle('popup_close');
  // событие на оверлей
  popupName.removeEventListener('mousedown', closePopupOnOverlay);
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Функция добавления карточки через форму.
function submitFormAddCard(evt) {
  evt.preventDefault();
  gallery.prepend(renderCard(newCardName.value, newCardLink.value));
  closePopup(popupAddCard);
}

// Копирование текста из профиля в edit input
function copyTextPopupEdit() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function submitFormEdit(evt) {
  evt.preventDefault();
  //вставка значения из input в профиль
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
}

container.querySelector('#popupEdit .popup__btn-close').addEventListener('click', function () {
  closePopup(popupEdit);
});

container.querySelector('#popupAddCard .popup__btn-close').addEventListener('click', function () {
  closePopup(popupAddCard);
});
container.querySelector('#popupCardImg .popup__btn-close').addEventListener('click', function () {
  closePopup(popupCardImg);
});

container.querySelector('.profile__btn-add').addEventListener('click', function () {
  showPopup(popupAddCard);
});
container.querySelector('.profile__btn-edit').addEventListener('click', function () {
  showPopup(popupEdit);
  copyTextPopupEdit();
});

container.querySelector('#formAdd').addEventListener('submit', submitFormAddCard);
container.querySelector('#formEdit').addEventListener('submit', submitFormEdit);
printCards();
