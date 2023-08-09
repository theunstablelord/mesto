import { validationConfig } from "../utils/initialData.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "./index.css";


const cardsContainer = '.elements__list';
const btnEditProfile = document.querySelector('.profile__edit-btn');
const btnAddElement = document.querySelector('.profile__add-btn');
const btnAvatarEdit = document.querySelector('.profile__avatar-edit-btn');
const formProfileEdit = document.querySelector('.popup__form_profile_edit');
const formCardAdd = document.querySelector('.popup__form_element_add');
const formAvatarEdit = document.querySelector('.popup__form_avatar_edit');
const nameInputProfileEdit = document.querySelector('.popup__input_user_name');
const jobInput = document.querySelector('.popup__input_user_about');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
    headers: {
        authorization: 'b83c0f38-537a-4791-a02a-4e6faf45e99a',
        'Content-Type': 'application/json'
    }
});

let myId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([res, cards]) => {
        myId = res._id;
        userInfo.setUserInfo(res.name, res.about);
        userInfo.setUserAvatar(res.avatar);
        cards.renderItems(cardsList);
    })
    .catch((err) => {
        console.log(err);
    })

const formPopupCardAdd = new FormValidator(validationConfig, formCardAdd);
formPopupCardAdd.enableValidation();

const formPopupProfileEdit = new FormValidator(validationConfig, formProfileEdit);
formPopupProfileEdit.enableValidation();

const formPopupAvatarEdit = new FormValidator(validationConfig, formAvatarEdit);
formPopupAvatarEdit.enableValidation();

const popupWithImage = new PopupWithImage('.popup_image-view');
popupWithImage.setEventListeners();

const popupDeleteCard = new PopupWithConfirm('.popup_form_delete-confirm');
popupDeleteCard.setEventListeners();

const userInfo = new UserInfo({ name:'.profile__name', job:'.profile__about', avatar:'.profile__avatar' });

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
}

function createCard(item) {
    const card = new Card(item, '#element-template', handleCardClick, (id) => {
        popupDeleteCard.open();
        popupDeleteCard.handleFormSubmit(() => {
            api.deleteCard(id)
                .then((res) => {
                    card.deleteCard(res);
                    popupDeleteCard.close();
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }, (id) => {
        if(card.checkUserLike()) {
            api.deleteCardLike(id)
                .then((res) => {
                    card.showLikesCount(res.likes);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            api.addCardLike(id)
                .then((res) => {
                    card.showLikesCount(res.likes);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, myId);
    return card.generateCard();
};


const cardsList = new Section({
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    }
}, cardsContainer);


const popupProfileEdit = new PopupWithForm('.popup_form_profile-edit', (data) => {
    api.editProfile(data.name, data.info)
        .then((res) => {
            popupProfileEdit.renderLoading(true);
            userInfo.setUserInfo(res.name, res.about);
            popupProfileEdit.close();
        })
        .catch((err) => {
            console.log(err);
        })
});

popupProfileEdit.setEventListeners();

const popupCardAdd = new PopupWithForm('.popup_form_element-add', (data) => {
    api.addCard(data.name, data.link)
        .then((res) => {
            popupCardAdd.renderLoading(true);
            cardsList.addItem(createCard(res));
            popupCardAdd.close();
        })
        .catch((err) => {
            console.log(err);
        }) 
});

popupCardAdd.setEventListeners();

const popupAvatarEdit = new PopupWithForm('.popup_form_avatar-edit', (data) => {
    api.updateProfileAvatar(data.link)
        .then((res) => {
            popupAvatarEdit.renderLoading(true);
            userInfo.setUserAvatar(res.avatar);
            popupAvatarEdit.close();
        })
        .catch((err) => {
            console.log(err);
        }) 
});

popupAvatarEdit.setEventListeners();


btnEditProfile.addEventListener('click', function () {
    popupProfileEdit.open();
    const { name, job } = userInfo.getUserInfo();
    nameInputProfileEdit.value = name;
    jobInput.value = job;
    formPopupProfileEdit.cleanFormErrors();
    popupProfileEdit.renderLoading(false);
});

btnAddElement.addEventListener('click', function () {
    popupCardAdd.open();
    formPopupCardAdd.cleanFormErrors();
    popupCardAdd.renderLoading(false);
});

btnAvatarEdit.addEventListener('click', function () {
    popupAvatarEdit.open();
    formPopupAvatarEdit.cleanFormErrors();
    popupAvatarEdit.renderLoading(false);
})
