import { initialCards, validationConfig } from "../scripts/initialData.js";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";

export { popupImageView, photoPopupImageView, captionPopupImageView, openPopup };

const cardsContainer = document.querySelector('.elements__list');

const btnEditProfile = document.querySelector('.profile__edit-btn');
const btnAddElement = document.querySelector('.profile__add-btn');
const popupProfileEdit = document.querySelector('.popup_form_profile-edit');
const popupCardAdd = document.querySelector('.popup_form_element-add');
const popupImageView = document.querySelector('.popup_image-view');
const photoPopupImageView = document.querySelector('.popup__image');
const captionPopupImageView = document.querySelector('.popup__caption');
const formProfileEdit = document.querySelector('.popup__form_profile_edit');
const formCardAdd = document.querySelector('.popup__form_element_add');
const nameInputProfileEdit = document.querySelector('.popup__input_user_name');
const nameInputElementAdd = document.querySelector('.popup__input_element_name');
const jobInput = document.querySelector('.popup__input_user_about');
const urlInput = document.querySelector('.popup__input_element_link');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popups = document.querySelectorAll('.popup');

const formPopupCardAdd = new FormValidator(validationConfig, popupCardAdd);
formPopupCardAdd.enableValidation();

const formPopupProfileEdit = new FormValidator(validationConfig, popupProfileEdit);
formPopupProfileEdit.enableValidation();

function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupKey);
};

function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupKey);
};

function closePopupKey(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};

popups.forEach((popupOpened) => {
    popupOpened.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popupOpened);
        };
        if (evt.target.classList.contains('popup__close-btn')) {
            closePopup(popupOpened);
        };
    });
});

function createCard (data) {
    const card = new Card(data, '#element-template');
    const cardElement = card.generateCard();
    return cardElement;
};

function addInitialCard(card) {
    cardsContainer.append(card);
};

initialCards.forEach(element => {
    const card = createCard(element);
    addInitialCard(card);
});

function handleFormProfileEditSubmit (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInputProfileEdit.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfileEdit);
};

function handleFormCardAddSubmit (evt) {
    evt.preventDefault(); 
    
    cardsContainer.prepend(createCard({ 
        name: nameInputElementAdd.value,
        link: urlInput.value 
    }));
    formCardAdd.reset();
    closePopup(popupCardAdd);
};



btnEditProfile.addEventListener('click', function () {
    openPopup(popupProfileEdit);
    nameInputProfileEdit.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    formPopupProfileEdit.cleanFormErrors();
});

btnAddElement.addEventListener('click', function () {
    openPopup(popupCardAdd);
    formPopupCardAdd.cleanFormErrors();
});


formProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);
formCardAdd.addEventListener('submit', handleFormCardAddSubmit);