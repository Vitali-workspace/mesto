const container = document.querySelector('.root');
const profile = container.querySelector('.profile');
// Обращение к форме вставки картинки
const formAdd = container.querySelector('#formAdd');
const btnProfileEdit = container.querySelector('.profile__btn-edit');
// обращение к тексту в профиле
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
// обращение к инпутам из формы Edit
const inputName = container.querySelector('#inputEditName');
const inputDescription = container.querySelector('#inputEditText');

const templateCard = document.querySelector('#tempCard').content;
const gallery = container.querySelector('.gallery'); // место вставки карточек

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
    container.querySelector('.popup__image').src = link;
    container.querySelector('.popup__image-name').textContent = name;
    showHidePopup('popupCardImg');
  });
  return templateCardContent;
}

// отрисовка карточек
function printCards() {
  initialCards.forEach(function (card) {
    gallery.prepend(renderCard(card.name, card.link));
  });
}

// функция открытия/закрытия попапа
function showHidePopup(popupName) {
  popupName = container.querySelector('#' + popupName);
  popupName.classList.toggle('popup_opened');
  popupName.classList.toggle('popup_close');
}

// Функция добавления карточки через форму.
function submitFormAddCard(evt) {
  evt.preventDefault();
  let newCardName = container.querySelector('#inputAddName').value;
  let newCardLink = container.querySelector('#inputAddLink').value;

  // валидация
  if (!newCardName || !newCardLink) {
    submitFormAddCard(null);
  }
  gallery.prepend(renderCard(newCardName, newCardLink));
  showHidePopup('popupAddCard');
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
  showHidePopup('popupEdit');
}


container.querySelector('#popupEdit .popup__btn-close').addEventListener('click', function () {
  showHidePopup('popupEdit');
});
container.querySelector('#popupAddCard .popup__btn-close').addEventListener('click', function () {
  showHidePopup('popupAddCard');
});
container.querySelector('#popupCardImg .popup__btn-close').addEventListener('click', function () {
  showHidePopup('popupCardImg');
});
container.querySelector('.profile__btn-add').addEventListener('click', function () {
  showHidePopup('popupAddCard');
});
container.querySelector('.profile__btn-edit').addEventListener('click', function () {
  showHidePopup('popupEdit');
  copyTextPopupEdit();
});

container.querySelector('#formAdd').addEventListener('submit', submitFormAddCard);
container.querySelector('#formEdit').addEventListener('submit', submitFormEdit);
printCards();
