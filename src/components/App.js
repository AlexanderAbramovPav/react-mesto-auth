import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import React, { useState, useEffect } from 'react'
import {apiSettings} from '../utils/api.js'
import * as auth from './Auth.js';
import { CurrentUserContext} from '../context/CurrentUserContext';
import { Route, Switch, Redirect, Link, withRouter, useHistory} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';



function App(props) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTooltip, setSelectedTooltip] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userCards, setUserCards] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);


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
    Promise.all([setIsEditAvatarPopupOpen(false), setIsEditProfilePopupOpen(false), setIsAddPlacePopupOpen(false), setIsInfoTooltipOpen(false)])
    .then(() => {
      setTimeout(() => {
        setSelectedCard(null);
        setSelectedTooltip(null);
      }, 200)
    })
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

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoTooltipOpen

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

    // Тултипы

    function handleSignSubmitPopup(selectedTooltip) {
      setSelectedTooltip(selectedTooltip);
      setIsInfoTooltipOpen(true)
    };

    // Вход

    function handleGetContent(){
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        // проверяем токен пользователя
        auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn({
              loggedIn: true,
              email: res.data.email
            })
          }})
        .then(()=> {
            props.history.push("/")
        })
      }
    }

    useEffect(() => {
      handleGetContent()
    }, []);


    function handleLogin(res) {
      setLoggedIn({
        loggedIn: true,
        email: res
      })
    }

    // Выход

    const history = useHistory();

    function signOut(){
      localStorage.removeItem('jwt');
      setLoggedIn({
        loggedIn: false})
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={
              <div className="page page_preload">
                <Header actionButton={"Выйти"} onLogoutClick={signOut} onSignChange={'/sign-in'} loggedIn={loggedIn}/>
                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} userCards={userCards} />
                <Footer />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar}/> 
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
                <ImagePopup onClose={closeAllPopups} card={selectedCard} />
              </div>
            }
          /> 
          <Route path="/sign-in">
            <div className="loginContainer">
              <Login onClose={closeAllPopups} isOpen={isInfoTooltipOpen} onSubmitPopup={handleSignSubmitPopup} selectedTooltip={selectedTooltip} onSignChange={'/sign-up'} onLogin={handleLogin}/>
            </div>
          </Route>
          <Route path="/sign-up">   
            <div className="registerContainer">
              <Register onClose={closeAllPopups} isOpen={isInfoTooltipOpen} onSubmitPopup={handleSignSubmitPopup} selectedTooltip={selectedTooltip} onSignChange={'/sign-in'}/>
            </div>
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect exact to="/" /> : <Redirect to="/sign-in" />}
          </Route>
          <Route path="*">
            <div className="ErrorContainer">
              <h1 style={{ color: 'white' }}>УПС! Кажется по несуществующей ссылке прошли... Ну ничего, бывает :) Вот на стартовую - <Link to="/">ТЫК</Link></h1>
            </div>
          </Route>
        </Switch>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
