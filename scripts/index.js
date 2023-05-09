//Находим кнопки и попап
const popup = document.querySelector('.popup');
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnPopupClose = document.querySelector('.popup__close-btn');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
// Находим информацию о профиле
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__about')


// Открытие и закрытие попапа при помощи метода toggle
const togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened')

btnProfileEdit.addEventListener('click', () => 
    togglePopupState(popup),
    nameInput.value = profileName.textContent,
    jobInput.value = profileAbout.textContent);

btnPopupClose.addEventListener('click', () => togglePopupState(popup));

popup.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget) {
        togglePopupState(popup);
    }
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameInput = document.querySelector('.popup__input_name').value;
    let aboutInput = document.querySelector('.popup__input_about').value;
    // Выберите элементы, куда должны быть вставлены значения полей
    document.querySelector('.profile__name').innerHTML = nameInput;
    document.querySelector('.profile__about').innerHTML = aboutInput;
    
    // Вставьте новые значения с помощью textContent
    nameInput = profileName.textContent;
    aboutInput = profileAbout.textContent;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popup.addEventListener('submit', handleFormSubmit); 