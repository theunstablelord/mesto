//Находим кнопки и попап
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const btnPopupClose = document.querySelector('.popup__close-btn');

// Открытие и закрытие попапа при помощи метода toggle
const togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened')

btnProfileEdit.addEventListener('click', () => togglePopupState(popup));

btnPopupClose.addEventListener('click', () => togglePopupState(popup));

popup.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget) {
        togglePopupState(popup);
    }
})

// Находим форму в DOM
let formElement = document.querySelector('.popup')
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_about')

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
formElement.addEventListener('submit', handleFormSubmit); 