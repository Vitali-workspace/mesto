const objElements = {
  // объект пока не используется
  formSelector: '.form__section', // аналог .form
  inputSelector: '.popup__edit-input', // .popup__edit-input
  submitButtonSelector: '.popup__btn-save', // .popup__btn-save
  inactiveButtonClass: 'popup_btn-disable', // popup_btn-disable
  inputErrorSelector: '.popup__input-error', // popup__input-error
  errorClass: 'popup__input-error_active'// popup__input-error_active
}


function getErorrMessage(input) {
  // Функция поиска ближайшой формы-секции что бы от неё найти span с ошибкой
  return input.closest(objElements.formSelector).querySelector(objElements.inputErrorSelector);
}

const showInputError = (input) => {
  const errorInput = getErorrMessage(input);
  errorInput.classList.add(objElements.errorClass);
};

const hideInputError = (input) => {
  const errorInput = getErorrMessage(input);
  errorInput.classList.remove(objElements.errorClass);
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
  const submitBtn = form.querySelector(objElements.submitButtonSelector);
  const searchInputsList = form.querySelectorAll(objElements.inputSelector);
  const inputsList = Array.from(searchInputsList);

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
    submitBtn.classList.add(objElements.inactiveButtonClass);
    submitBtn.setAttribute('disabled', true);
  } else {
    submitBtn.classList.remove(objElements.inactiveButtonClass);
    submitBtn.removeAttribute('disabled');
  }
}
