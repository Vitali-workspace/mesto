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

let newCardName = container.querySelector('#inputAddName');
let newCardLink = container.querySelector('#inputAddLink');

const popupEdit = container.querySelector('#popupEdit');
const popupAddCard = container.querySelector('#popupAddCard');
const popupCardImg = container.querySelector('#popupCardImg');
const popupOverlay = container.querySelectorAll('.popup__overlay');

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
    showHidePopup(popupCardImg);
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
  popupName.classList.toggle('popup_opened');
  popupName.classList.toggle('popup_close'); // анимация закрытия попапа
  listenerEscape(popupName);

}


function listenerEscape(popupName) {
  // функция подключения и отключения обработчика по Esc
  if (popupName.classList.contains('popup_opened')) {
    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        if (container.querySelector('.popup_opened')) {
          showHidePopup(container.querySelector('.popup_opened'));
        }
      }
    });
  } else {
    window.removeEventListener('keydown', this);
  }
}

// Функция добавления карточки через форму.
function submitFormAddCard(evt) {
  evt.preventDefault();
  gallery.prepend(renderCard(newCardName.value, newCardLink.value));
  showHidePopup(popupAddCard);
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
  showHidePopup(popupEdit);
}


container.querySelector('#popupEdit .popup__btn-close').addEventListener('click', function () {
  showHidePopup(popupEdit);
});

container.querySelector('#popupAddCard .popup__btn-close').addEventListener('click', function () {
  showHidePopup(popupAddCard);
});
container.querySelector('#popupCardImg .popup__btn-close').addEventListener('click', function () {
  showHidePopup(popupCardImg);
});

container.querySelector('.profile__btn-add').addEventListener('click', function () {
  showHidePopup(popupAddCard);
  // запуск валидации
  enableValidation(popupAddCard);
});
container.querySelector('.profile__btn-edit').addEventListener('click', function () {
  showHidePopup(popupEdit);
  copyTextPopupEdit();
  enableValidation(popupEdit);
});


// функция закрытия попапа по оверлею
popupOverlay.forEach((overlay) => {
  overlay.addEventListener('mousedown', function (evt) {
    if (evt.target === evt.currentTarget) {
      // ищет ближайший открытый попап
      const namePopup = evt.target.closest('.popup');
      showHidePopup(namePopup);
    }
  });
});

container.querySelector('#formAdd').addEventListener('submit', submitFormAddCard);
container.querySelector('#formEdit').addEventListener('submit', submitFormEdit);
printCards();
