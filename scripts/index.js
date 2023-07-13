// Декларируем константы
const popupEditProfile = document.querySelector('.popup__edit-profile');
const closePopupButton = document.querySelector('.popup__close-button');

const popupEditForm = document.querySelector('.popup__edit-form');
const saveEditFormButton = popupEditForm.querySelector('.popup__save-button');
const nameInput = popupEditForm.querySelector('.name');
const jobInput = popupEditForm.querySelector('.profession');

const profile = document.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const editProfileButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const popupAdd = document.querySelector('.popup-add');
const createButton = popupAdd.querySelector('.popup-add__save-button');
const popupAddPlaceName = popupAdd.querySelector('.popup-add__place-name');
const popupAddPlaceLink = popupAdd.querySelector('.popup-add__place-link');
const popupAddForm = popupAdd.querySelector('.popup-add__add-form');

const popupImage = document.querySelector('.popup-image');
const popupImageImg = popupImage.querySelector('.popup-image__img');
const popupImageTitle = popupImage.querySelector('.popup-image__title');

const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#elements").content;


// Открытие модального окна
function openPopup(popup) {
    popup.classList.add('popup_opened');
};


editProfileButton.addEventListener('click', () => {
  //При открытии формы редактирования профиля поля «Имя» и «О себе» 
  //заполняются текущими значениями, которые отображаются на странице.
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});


// Закрытие модального окна
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};


// Универсальный обработчик всех кнопок закрытия
// находим все кнопки закрытия проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к кнопке закрытия попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на кнопку
  button.addEventListener('click', () => closePopup(popup));
});


// Обработчик «отправки» формы
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    evt.target.reset();
};

// Сохранение измененных данных о пользователе 
popupEditForm.addEventListener('submit', (evt) =>{
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value; 
  handleProfileFormSubmit (evt);
  closePopup(popupEditProfile);
});


// Открытие модального окна добавления карточки пользователем
profileAddButton.addEventListener('click', () => openPopup(popupAdd));


// Создание карточки
function createCard (pname, link) {
  const card = placeTemplate.querySelector(".element").cloneNode(true);

  card.querySelector('.element__place-name').textContent = pname;
  card.querySelector('.element__image').src = link;
  card.querySelector('.element__image').alt = pname;

  // Установливаем слушателей для клонированного элемента 
  card.querySelector('.element__delete-button').addEventListener('click', function() {
    const deleteItem = card.querySelector('.element__delete-button').closest('.element');
    deleteItem.remove();
  });
  card.querySelector('.element__like-button').addEventListener('click', function() {
    card.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  });
  card.querySelector('.element__image').addEventListener('click', function() {
    openPopup(popupImage);
    popupImageImg.src = card.querySelector('.element__image').src;
    popupImageTitle.textContent = card.querySelector('.element__place-name').textContent;
    popupImageImg.alt = card.querySelector('.element__place-name').textContent;
  });
  
  return card;
};

popupAddForm.addEventListener('submit', (evt) =>{
  placesContainer.prepend(createCard(popupAddPlaceName.value, popupAddPlaceLink.value)); 
  handleProfileFormSubmit (evt);
  closePopup(popupAdd); 
}); 


// Добавление всех карточек "из коробки" перебором массива 
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
 

initialCards.forEach(function(item) {
  placesContainer.prepend(createCard(item.name, item.link))
});

