const container = document.querySelector('.root');
const profile = container.querySelector('.profile');
const formEdit = container.querySelector('#formEdit');
const btnClose = container.querySelectorAll('.popup__btn-close');
const popupAddCard = container.querySelector('#popupAddCard');
const btnAddCard = container.querySelector('.profile__btn-add');
const popupEdit = container.querySelector('#popupEdit');

// Обращение к форме вставки картинки
const formAdd = container.querySelector('#formAdd');
const btnProfileEdit = container.querySelector('.profile__btn-edit');
// обращение к тексту в профиле
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
// обращение к инпутам из формы Edit
const inputName = container.querySelector('#inputEditName');
const inputDescription = container.querySelector('#inputEditText');

let initialCards = [
  {
    name: 'Сиди-Бель-Аббес',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Вашингтон',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Луанда',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Соломоновы Острова',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Шанхай',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Тегеран',
    link: 'https://cdn.pixabay.com/photo/2022/02/17/07/51/church-7018154_960_720.jpg'
  }
];

const templateCard = document.querySelector('#tempCard').content;
const gallery = container.querySelector('.gallery'); // место вставки карточек

// для открытие картинки в попап
const popupCardImg = container.querySelector('#popupCardImg');
const cardImg = container.querySelector('.popup__image');
const cardImgCaption = container.querySelector('.popup__image-name');
// Обращение для формы submitFormAddCard
const inputAddName = container.querySelector('#inputAddName');
const inputAddLink = container.querySelector('#inputAddLink');

// функция вставки шаблона карточки из темплейта
function renderCard(name, link) {
  let templateCardContent = templateCard.querySelector('.gallery__card').cloneNode(true);

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
    popupCardImg.classList.add('popup_opened');
    cardImg.src = link;
    cardImgCaption.textContent = name;
  });
  return templateCardContent;
}

// перебор объектов в массиве
function printCards() {
  gallery.innerHTML = "";
  initialCards.forEach(function (card) {
    gallery.prepend(renderCard(card.name, card.link));
  });
}
printCards();

function closePopup() {
  popupAddCard.classList.add('popup_close');
  popupEdit.classList.add('popup_close');
  popupCardImg.classList.add('popup_close');

  setTimeout(function () {
    popupEdit.classList.remove('popup_opened');
    popupAddCard.classList.remove('popup_opened');
    popupCardImg.classList.remove('popup_opened');
    // удаление модификатора с анимацией
    popupEdit.classList.remove('popup_close');
    popupAddCard.classList.remove('popup_close');
    popupCardImg.classList.remove('popup_close');
  }, 300);
}

// Функция добавления карточки через форму.
function submitFormAddCard(evt) {
  evt.preventDefault();
  let newCard = {
    name: inputAddName.value,
    link: inputAddLink.value
  };
  initialCards.push(newCard);
  printCards();
  closePopup();
}

btnClose.forEach(btnClose => {
  btnClose.addEventListener('click', closePopup);
});

// Копирование текста из профиля в edit input
function CopyTextPopupEdit() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function submitForm(evt) {
  evt.preventDefault();
  // вставка значения из input в профиль
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

btnAddCard.addEventListener('click', function () {
  popupAddCard.classList.toggle('popup_opened');
});

btnProfileEdit.addEventListener('click', function () {
  popupEdit.classList.add('popup_opened');
  CopyTextPopupEdit();
});

formAdd.addEventListener('submit', submitFormAddCard);
formEdit.addEventListener('submit', submitForm);
