export class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete, handleCardLike, myId) {
    this._name = data.name;
    this._imageName = data.name;
    this._imageLink = data.link;
    this._cardId = data._id;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handeCardLike = handleCardLike;
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
    this.showLikesCount(this._likes);

    if (this._ownerId !== this._myId) {
      this._element.querySelector('.element__delete-btn').remove();
    }

    return this._element;
  }

  checkUserLike() {
    return this._likes.some((data) => data._id === this._myId);
  }

  showLikesCount(likes) {
    this._likes = likes;
    this._likesCount = this._element.querySelector('.element__like-count');
    this._likesCount.textContent = this._likes.length;
    if (this.checkUserLike()) {
      this._likeButton.classList.add('element__like-btn_active');
    } else {
      this._likeButton.classList.remove('element__like-btn_active');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }


  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._likeButton.addEventListener('click', () => {
      this._handeCardLike(this._cardId);
    });

    this._deleteCardButton = this._element.querySelector('.element__delete-btn');
    this._deleteCardButton.addEventListener('click', () => {
      this._handleCardDelete(this._cardId);
    });

    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._imageLink, this._imageName);
    });
  }
};