import { initialCards, validationConfig } from "../utils/initialData.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../FormValidator.js";
import { Section } from "../Section.js";
import { PopupWithForm } from "../PopupWithForm.js";
import { PopupWithImage } from "../PopupWithImage.js";
import { UserInfo } from "../UserInfo.js";
import "./index.css";


const cardsContainer = '.elements__list';
const btnEditProfile = document.querySelector('.profile__edit-btn');
const btnAddElement = document.querySelector('.profile__add-btn');
const formProfileEdit = document.querySelector('.popup__form_profile_edit');
const formCardAdd = document.querySelector('.popup__form_element_add');
const nameInputProfileEdit = document.querySelector('.popup__input_user_name');
const jobInput = document.querySelector('.popup__input_user_about');

const formPopupCardAdd = new FormValidator(validationConfig, formCardAdd);
formPopupCardAdd.enableValidation();

const formPopupProfileEdit = new FormValidator(validationConfig, formProfileEdit);
formPopupProfileEdit.enableValidation();

const popupWithImage = new PopupWithImage('.popup_image-view');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ name:'.profile__name', job:'.profile__about' });


function createCard (data) {
    const card = new Card(data, '#element-template', (imageLink, imageName) => {
        popupWithImage.open(imageLink, imageName);
    });
    const cardElement = card.generateCard();
    return cardElement;
};

const cards = new Section({
    items: initialCards, 
    renderer: createCard
}, cardsContainer);

cards.renderItems();

const popupProfileEdit = new PopupWithForm('.popup_form_profile-edit', (data) => {
    userInfo.setUserInfo(data);
    popupProfileEdit.close();
});

popupProfileEdit.setEventListeners();
popupProfileEdit.close();

const popupCardAdd = new PopupWithForm('.popup_form_element-add', (data) => {
    createCard(data);
    popupCardAdd.close();
});

popupCardAdd.setEventListeners();
popupCardAdd.close();


btnEditProfile.addEventListener('click', function () {
    popupProfileEdit.open();
    const { name, job } = userInfo.getUserInfo();
    nameInputProfileEdit.value = name;
    jobInput.value = job;
    formPopupProfileEdit.cleanFormErrors();
});

btnAddElement.addEventListener('click', function () {
    popupCardAdd.open();
    formPopupCardAdd.cleanFormErrors();
});
