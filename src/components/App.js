import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React, { useState, useEffect } from 'react'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function CloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };


  return (
    <div className="page page_preload">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard}/>
      <Footer />
      <PopupWithForm onClose={CloseAllPopups} isOpen={isEditAvatarPopupOpen} name="avatar" title="Обновить аватар" submit="Сохранить"
      children=
        {<label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_type-avatar-link"
            placeholder="Ссылка на аватар"
            name="avatar-link"
            required
            id="url-avatar-input"
          />
          <span className="popup__error url-avatar-input-error"></span>
        </label>}
      />

      <PopupWithForm onClose={CloseAllPopups} isOpen={isEditProfilePopupOpen} name="edit-profile" title="Редактировать профиль" submit="Сохранить"
      children=
        {<><label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_type_name"
          placeholder="Как зовут?"
          name="author-name"
          required
          minLength="2"
          maxLength="40"
          id="text-name-input" />
        <span className="popup__error text-name-input-error"></span>
      </label><label className="popup__field">
          <input
            type="text"
            className="popup__input popup__input_type_about"
            placeholder="Коротко о себе"
            name="author-about"
            required
            minLength="2"
            maxLength="200"
            id="text-about-input" />
          <span className="popup__error text-about-input-error"></span>
        </label></>}
      />
      
      <PopupWithForm onClose={CloseAllPopups} isOpen={isAddPlacePopupOpen} name="add-card" title="Новое место" submit="Создать"
      children=
        {<><label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_type_place"
          placeholder="Название места"
          name="place-name"
          required
          minLength="2"
          maxLength="30"
          id="text-input" />  
        <span className="popup__error text-input-error"></span>
      </label><label className="popup__field">
          <input
            type="url"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            name="place-link"
            required
            id="url-input" />
          <span className="popup__error url-input-error"></span>
        </label></>}
      />

      <ImagePopup onClose={CloseAllPopups} card={selectedCard} />

    </div>
  );
}

export default App;
