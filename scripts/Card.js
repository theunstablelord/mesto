import { popupImageView, photoPopupImageView, captionPopupImageView, openPopup } from '../scripts/index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._imageName = data.name;
    this._imageLink = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__name').textContent = this._name;
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = this._imageName;

    return this._element;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('.element__like-btn_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _openPopupImage() {
    openPopup(popupImageView);
    photoPopupImageView.src = this._imageLink;
    photoPopupImageView.alt = this._imageName;
    captionPopupImageView.textContent = this._name;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._deleteCard();
    });
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.addEventListener('click', () => {
      this._openPopupImage();
    });
  }
};