export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._imageName = data.name;
    this._imageLink = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
    });
  }
};