const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector("#element-template").content;
const cardItemTemplate = cardTemplate.querySelector('.element');
const btnClosePopups = document.querySelectorAll('.popup__close-btn');
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
const profileFormInputs = Array.from(formProfileEdit.querySelectorAll('.popup__input'));
const btnEditSave = formProfileEdit.querySelector('.popup__save-btn');
const btnCreateSave = formCardAdd.querySelector('.popup__save-btn');
const popups = document.querySelectorAll('.popup');

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

function createCard (cardData) {
    const createItem = cardItemTemplate.cloneNode(true);
    const cardDataImage = createItem.querySelector('.element__image');
    const cardDataName = createItem.querySelector('.element__name');

    cardDataName.textContent = cardData.name;
    cardDataImage.src = cardData.link;
    cardDataImage.alt = cardData.name;

    createItem.querySelector('.element__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-btn_active');
    });
    createItem.querySelector('.element__delete-btn').addEventListener('click', function() {
        createItem.remove();
    });

    cardDataImage.addEventListener('click', function() {
        openPopup(popupImageView);
        photoPopupImageView.src = cardDataImage.src;
        photoPopupImageView.alt = cardDataImage.alt;
        captionPopupImageView.textContent = cardDataName.textContent;
    });
    
    return createItem;
};

function addInitialCard(itemAdd) {
    cardsContainer.append(itemAdd);
};

initialCards.forEach(element => {
    const itemAdd = createCard(element);
    addInitialCard(itemAdd);
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
    profileFormInputs.forEach((inputElement) => {
        isValid(formProfileEdit, inputElement, validationConfig);
        enableButton(btnEditSave, validationConfig);
    });
});

btnAddElement.addEventListener('click', function () {
    openPopup(popupCardAdd);
    btnCreateSave.classList.add('popup__save-btn_disabled');
    disableButton(btnCreateSave, validationConfig);
});


formProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);
formCardAdd.addEventListener('submit', handleFormCardAddSubmit);