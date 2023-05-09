const popup = document.querySelector('.popup');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnPopupClose = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_user_name')
const jobInput = document.querySelector('.popup__input_user_about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')

//Функции открытия попапа
function opepPopup () {
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

btnProfileEdit.addEventListener('click', opepPopup);
btnPopupClose.addEventListener('click', closePopup);
popup.addEventListener('submit', handleFormSubmit); 