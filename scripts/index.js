const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');

const popupEditForm = document.querySelector('.popup__edit-form');
const saveEditFormButton = popupEditForm.querySelector('.popup__save-button');
const nameInput = popupEditForm.querySelector('.name');
const jobInput = popupEditForm.querySelector('.profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

/*При открытии формы редактирования профиля поля «Имя» и «О себе» заполняются текущими значениями, которые отображаются на странице.*/
nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

/*Открытие модального окна */
function openPopup() {
    popup.classList.add('popup_opened');
};
editProfileButton.addEventListener('click', openPopup);

/*Закрытие модального окна */
function closePopup() {
    popup.classList.remove('popup_opened');
};
closePopupButton.addEventListener('click', closePopup);


/*Обработчик «отправки» формы*/
function formSubmitHandler (evt) {
    evt.preventDefault();
};


/*Сохранение измененных данных о пользователе */
saveEditFormButton.addEventListener('click', function () {
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
        
    popupEditForm.addEventListener('submit', formSubmitHandler);

    closePopup();
});


/*Открытие / закрытие модального окна добавления карточки пользователем */
document.querySelector('.profile__add-button').addEventListener('click', function(){
    document.querySelector('.popup-add').classList.add('popup_opened');
});

const popupAddCloseButton = document.querySelector('.popup-add__close-button');
function popAddClose() {
    document.querySelector('.popup-add').classList.remove('popup_opened');
};
popupAddCloseButton.addEventListener('click', popAddClose);


/*Заполнение контейнера с фотографиями массивом карточек "из коробки" */
const initialCards = [
    {
      name: 'Эльбрус',
      link: './images/elbrus.jpg'  
    },
    {
      name: 'Сейд озеро',
      link: './images/seid.jpg'  
      },
    {
      name: 'Долина Ярлу',
      link: './images/yarlu.jpg'  
    },
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Сопка Ключевская',
      link: './images/sopka_kluch.jpg'
    },
    {
      name: 'Рыбинское водохранилище',
      link: './images/rybinskoye.jpg'
    },
    {
      name: 'Аккемская стена',
      link: './images/akkem.jpg'
    }
    ];

const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#elements").content;

/*Для каждого элемента массива с карточками */
initialCards.forEach(function ({ name, link }) {

        /*Создаем клонированием свой блок с классом element */
        const placeElement = placeTemplate.querySelector(".element").cloneNode(true);
        
        /*Названию места и ссылке присваиваем значения из массива */
        placeElement.querySelector(".element__place-name").textContent = name;
        placeElement.querySelector(".element__image").src = link;
        
        /*Созданную карточку помещаем в начало контейнера */
        placesContainer.prepend(placeElement); 
    });


/*Сохранение добавленной карточки пользователем */
function createElement(placeName, placeLink) {
    placeName = document.querySelector('.popup-add__place-name').value;
    placeLink = document.querySelector('.popup-add__place-link').value;
    
    const element = placeTemplate.querySelector(".element").cloneNode(true);
    
    element.querySelector('.element__place-name').textContent = placeName;
    element.querySelector('.element__image').src = placeLink;
    placesContainer.prepend(element); 

    document.querySelector('.popup-add').addEventListener('submit', formSubmitHandler);

    popAddClose();

    /*Повторяем установку слушателей для клонированного элемента */
    element.querySelector('.element__delete-button').addEventListener('click', function() {
        const deleteItem = element.querySelector('.element__delete-button').closest('.element');
        deleteItem.remove();
    });
    element.querySelector('.element__like-button').addEventListener('click', function() {
        element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    });
    element.querySelector('.element__image').addEventListener('click', function() {
        document.querySelector('.popup-image').classList.add('popup_opened');
        document.querySelector('.popup-image__img').src = element.querySelector('.element__image').src;
        document.querySelector('.popup-image__title').textContent = element.querySelector('.element__place-name').textContent;
    });
};
const createButton = document.querySelector('.popup-add__save-button');
createButton.addEventListener('click', createElement);



/*Удаление карточки пользователем */
document.querySelectorAll('.element__delete-button').forEach((button) => {
    button.addEventListener('click', function() {
        const deleteItem = button.closest('.element');
        deleteItem.remove();
    });
});



/*Лайк фотографии и его отмена*/
/*Вешаем слушатель на все кнопки лайков в документе и переключаем в зависимости от состояния */
document.querySelectorAll('.element__like-button').forEach((button) => {  
    button.addEventListener('click', function() {
        button.classList.toggle('element__like-button_active');
    })
});


/*Открытие фотографии в модальном окне*/
document.querySelectorAll('.element').forEach((item) =>{
    item.querySelector('.element__image').addEventListener('click', function() {
        document.querySelector('.popup-image').classList.add('popup_opened');
        document.querySelector('.popup-image__img').src = item.querySelector('.element__image').src;
        document.querySelector('.popup-image__title').textContent = item.querySelector('.element__place-name').textContent;
    })
});


/*Закрытие просмотра фотографии в модальном окне */
function closePopupImage() {
    document.querySelector('.popup-image').classList.remove('popup_opened');
};
document.querySelector('.popup-image__close-button').addEventListener('click', closePopupImage);



