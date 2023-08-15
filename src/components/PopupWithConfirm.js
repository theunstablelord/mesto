import Popup from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
  }

  handleFormSubmit(newHandleFormSubmit) {
    this._handleFormSubmit = newHandleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
  }
}