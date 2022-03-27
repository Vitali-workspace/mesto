const ObjElements = {
  // объект пока не используется
  formSelector: '.popup__form', // аналог .form
  inputSelector: '.popup__input', // .popup__edit-input
  submitButtonSelector: '.popup__button', // .popup__btn-save
  inactiveButtonClass: 'popup__button_disabled', // popup_btn-disable
  inputErrorClass: 'popup__input_type_error', // popup__input-error
  errorClass: 'popup__error_visible'// popup__input-error_active
}


function getErorrMessage(input) {
  // Функция поиска ближайшой формы-секции что бы от неё найти span с ошибкой
  return input.closest('.form__section').querySelector('.popup__input-error');
}

const showInputError = (input) => {
  const errorInput = getErorrMessage(input);
  errorInput.classList.add('popup__input-error_active');
};

const hideInputError = (input) => {
  const errorInput = getErorrMessage(input);
  errorInput.classList.remove('popup__input-error_active');
};

const checkInputValidity = (input) => {
  // проверка на валидность поля инпута
  const noValid = !input.validity.valid;

  if (noValid) {
    showInputError(input);
  } else {
    hideInputError(input);
  }
};

const setEventListeners = (form) => {
  const submitBtn = form.querySelector('.popup__btn-save');
  const newListInput = form.querySelectorAll('.popup__edit-input');
  const inputsList = Array.from(newListInput);

  inputsList.forEach((input) => {
    // обработчик на ввод данных в input
    input.addEventListener('input', function () {
      checkInputValidity(input);
      toggleButtonState(inputsList, submitBtn);
    });
  });
  // устанавка состояния сабмита на момент первого открытия попапа
  toggleButtonState(inputsList, submitBtn);
};

// Функция запуска валидации
function enableValidation(formNamePopup) {
  setEventListeners(formNamePopup);
  formNamePopup.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
}

function toggleButtonState(inputsList, submitBtn) {
  // функция включения/отключения сабмита
  const hasInvalidInput = inputsList.some((inputElement) => {
    // проверка массива инпутов на валидность полей
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    submitBtn.classList.add('popup_btn-disable');
    submitBtn.setAttribute('disabled', true);
  } else {
    submitBtn.classList.remove('popup_btn-disable');
    submitBtn.removeAttribute('disabled');
  }
}
