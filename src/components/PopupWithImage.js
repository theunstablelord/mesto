import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupCaption = this._popupSelector.querySelector('.popup__caption');
  }

  open(imageLink, imageName) {
    this._popupImage.src = imageLink;
    this._popupImage.alt = imageName;
    this._popupCaption.textContent = imageName;

    super.open();
  }
}