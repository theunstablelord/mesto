export class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._data.inputSelector));
    this._buttonElement = formElement.querySelector(this._data.submitButtonSelector);    
  }

  _showInputError(inputElement, errorMessage) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add(this._data.errorClass);
    inputElement.classList.add(this._data.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    formError.textContent = '';
    formError.classList.remove(this._data.errorClass);
    inputElement.classList.remove(this._data.inputErrorClass);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  cleanFormErrors() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _disableButton() {
    this._buttonElement.classList.add(this._data.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  
  _enableButton () {
    this._buttonElement.classList.remove(this._data.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
};