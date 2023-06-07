const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__form-error_visible'
};

const disableButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const enableButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.remove(validationConfig.errorClass);
  formError.textContent = '';
  inputElement.classList.remove(validationConfig.inputErrorClass);
};

const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  };
};

const setEventListener = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, validationConfig);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig);
  } else {
    enableButton(buttonElement, validationConfig);
  };
};

enableValidation(validationConfig);