import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import React, { useState, useEffect } from 'react'
import {apiSettings} from '../utils/api.js'
import { CurrentUserContext} from '../context/CurrentUserContext';



function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userCards, setUserCards] = useState(null);

  useEffect(() => {
      return () => {
          apiSettings.getUserInfo()
          .then((user) => {
            setCurrentUser(user);
          })
          .catch((err) => {
              console.log(err);
          });
      };    
  },[])

  // Обработка кликов на Аватар, Профайл

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleUpdateUser(data) {
    apiSettings.patchUserInfo(data)
    .then((updateInfo) => {
      setCurrentUser(updateInfo);
      closeAllPopups();
    })
    .catch((err) => {
        console.log(err);
    });
  };

  function handleUpdateAvatar(data) {
    apiSettings.patchUserAvatar(data)
    .then((updateInfo) => {
      setCurrentUser(updateInfo);
      closeAllPopups();
    })
    .catch((err) => {
        console.log(err);
    });
  };

  // Закрыть все попапы

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };


  // Все по карточкам

  useEffect(() => {
    return () => {
        apiSettings.getInitialCards()
        .then((cards) => {
            setUserCards(cards);
        }) 
        .catch((err) => {
            console.log(err);
        });
    };    
  },[])


  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    apiSettings.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setUserCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
        console.log(err);
    });
  } 

  function handleCardDelete(card) {      

      apiSettings.deleteCard(card._id)
      .then(() => {
          setUserCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
          console.log(err);
      });
  } 

  function handleAddPlaceSubmit(data) {
    apiSettings.addNewCard(data)
    .then((newCard) => {
      setUserCards([newCard, ...userCards]);
      closeAllPopups();
    })
    .catch((err) => {
        console.log(err);
    });
  };

  // Закрытие по escape

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page page_preload">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} userCards={userCards} />
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar}/> 
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
