const objElements = {
  formSelector: '.form',
  inputSelector: '.popup__edit-input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup_btn-disable',
  inputErrorSelector: '.popup__input-error',
  errorClass: 'popup__input-error_active'
}

const showInputError = (form, input, objElements) => {
  const errorInput = form.querySelector(`#${input.id}-error`);
  errorInput.classList.add(objElements.errorClass);
};

const hideInputError = (form, input, objElements) => {
  const errorInput = form.querySelector(`#${input.id}-error`);
  errorInput.classList.remove(objElements.errorClass);
};

const checkInputValidity = (form, input, objElements) => {
  // проверка на валидность поля инпута
  const noValid = !input.validity.valid;

  if (noValid) {
    showInputError(form, input, objElements);
  } else {
    hideInputError(form, input, objElements);
  }
};

const setEventListeners = (form, objElements) => {
  const submitBtn = form.querySelector(objElements.submitButtonSelector);
  const inputsList = Array.from(form.querySelectorAll(objElements.inputSelector));

  inputsList.forEach((input) => {
    //обработчик на ввод данных в input
    input.addEventListener('input', () => {
      checkInputValidity(form, input, objElements);
      toggleButtonState(inputsList, submitBtn, objElements);
    });
  });
  // устанавка состояния сабмита на момент первого открытия попапа
  toggleButtonState(inputsList, submitBtn, objElements);
};

// Функция запуска валидации
function enableValidation(objElements) {
  const forms = document.querySelectorAll(objElements.formSelector);
  const formListHandler = (form) => {
    setEventListeners(form, objElements);
  }
  forms.forEach(formListHandler);
}

enableValidation(objElements);

function toggleButtonState(inputsList, submitBtn, objElements) {
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
