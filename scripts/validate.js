const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__form-error_visible'
};

const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');


const showInputError = (formElement, formInput, errorMessage, validationObject) => {
  const formError = formElement.querySelector(`.popup__form-error_${formInput.id}`);
  formInput.classList.add(validationObject.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validationObject.errorClass);
};

const hideInputError = (formElement, formInput, validationObject) => {
  const formError = formElement.querySelector(`.popup__form-error_${formInput.id}`);
  formInput.classList.remove(validationObject.inputErrorClass);
  formError.textContent = '';
  formError.classList.remove(validationObject.errorClass);
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, validationObject);
  } else {
    hideInputError(formElement, formInput, validationObject);
  }
};

const setEventListener = (formElement, validationObject) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
  const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObject);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
};

const enableValidation = (validationObject) => {
  const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, validationObject);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationObject.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
  };
};

enableValidation(validationObject);