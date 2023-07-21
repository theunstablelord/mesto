import Popup from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupSelector.querySelector('.popup__form');
    this._inputList = Arra.from(this._formElement.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('sumbit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues);
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}