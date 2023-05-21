const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector("#element-template").content;
const elementItemTemplate = elementTemplate.querySelector('.element');
const btnClosePopups = document.querySelectorAll('.popup__close-btn');
const btnEditProfile = document.querySelector('.profile__edit-btn');
const btnAddElement = document.querySelector('.profile__add-btn');
const popupProfileEdit = document.querySelector('.popup_form_profile-edit');
const popupElementAdd = document.querySelector('.popup_form_element-add');
const popupImageView = document.querySelector('.popup_image-view');
const photoPopupImageView = document.querySelector('.popup__image');
const captionPopupImageView = document.querySelector('.popup__caption');
const formProfileEdit = document.querySelector('.popup__form_profile_edit');
const formElementAdd = document.querySelector('.popup__form_element_add');
const nameInputProfileEdit = document.querySelector('.popup__input_user_name');
const nameInputElementAdd = document.querySelector('.popup__input_element_name');
const jobInput = document.querySelector('.popup__input_user_about');
const urlInput = document.querySelector('.popup__input_element_link');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function openPopup(item) {
    item.classList.add('popup_opened');
};

function closePopup(item) {
    item.classList.remove('popup_opened');
};

function createElement (element) {
    const createItem = elementItemTemplate.cloneNode(true);
    const elementImage = createItem.querySelector('.element__image');
    const elementName = createItem.querySelector('.element__name');

    elementName.textContent = element.name;
    elementImage.src = element.link;
    elementImage.alt = element.name;

    createItem.querySelector('.element__like-btn').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-btn_active');
    });
    createItem.querySelector('.element__delete-btn').addEventListener('click', function() {
        createItem.remove();
    });

    elementImage.addEventListener('click', function() {
        openPopup(popupImageView);
        photoPopupImageView.src = elementImage.src;
        photoPopupImageView.alt = elementImage.alt;
        captionPopupImageView.textContent = elementName.textContent;
    });
    
    return createItem;
};

function addInitialElement(itemAdd) {
    elementsList.append(itemAdd);
};

initialCards.forEach(element => {
    const itemAdd = createElement(element);
    addInitialElement(itemAdd);
});

function handleFormProfileEditSubmit (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInputProfileEdit.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfileEdit);
};

function handleFormElementAddSubmit (evt) {
    evt.preventDefault(); 
    
    elementsList.prepend(createElement({ 
        name: nameInputElementAdd.value,
        link: urlInput.value 
    }));
    formElementAdd.reset();
    closePopup(popupElementAdd);
};

btnEditProfile.addEventListener('click', function () {
    openPopup(popupProfileEdit);
    nameInputProfileEdit.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
});

btnAddElement.addEventListener('click', function () {
    openPopup(popupElementAdd);
});

btnClosePopups.forEach(element => {
    element.addEventListener('click', function (evt) {
     const popup = evt.target.closest('.popup');
     closePopup(popup);
    });
});

formProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);
formElementAdd.addEventListener('submit', handleFormElementAddSubmit);