const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector("#element-template").content;
const elementItem = elementTemplate.querySelector('.element');

const popup = document.querySelector('.popup');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnPopupClose = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_user_name')
const jobInput = document.querySelector('.popup__input_user_about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')


function createElement (element) {
    const createItem = elementItem.cloneNode(true);
    const elementImage = createItem.querySelector('.element__image');
    const elementName = createItem.querySelector('.element__name');

    elementName.textContent = element.name;
    elementImage.src = element.link;
    elementImage.alt = element.name;
    
    return createItem;
};

function addInitialElement(itemAdd) {
    elementsList.append(itemAdd);
  };
  
  initialCards.forEach(element => {
    const itemAdd = createElement(element);
    addInitialElement(itemAdd);
  });
  

//Функции открытия попапа
function openPopup () {
    popup.classList.add('popup_opened');

    nameInput.value = profileName.textContent; 
    jobInput.value = profileAbout.textContent;
}

function closePopup () {
    popup.classList.remove('popup_opened');
}


function handleFormSubmit (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = `${nameInput.value}`;
    profileAbout.textContent = `${jobInput.value}`;

    closePopup();
}

btnProfileEdit.addEventListener('click', openPopup);
btnPopupClose.addEventListener('click', closePopup);
popup.addEventListener('submit', handleFormSubmit); 