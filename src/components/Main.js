import React, {useContext } from 'react'
import {CurrentUserContext} from '../context/CurrentUserContext';


function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <main className="main">
                    <section className="profile">
                        <div className="profile__avatar-container">
                            <img 
                                src={currentUser?.avatar}
                                className="profile__avatar"
                                alt="Логотип Пользователя"
                            />
                            <button className="profile__avatar-overlay" type="button" aria-label="Обновление аватара" onClick={props.onEditAvatar}></button>
                        </div>

                        <div className="profile__info-container">
                            <h1 className="profile__name">{currentUser?.name}</h1>
                            <button className="profile__edit-btn" type="button" aria-label="Изменение информации о себе" onClick={props.onEditProfile}></button>
                            <p className="profile__about">{currentUser?.about}</p>
                        </div>
                        <button className="profile__add-btn" type="button" aria-label="Добаление новой карточки" onClick={props.onAddPlace}></button>
                    </section>
                </main>
            </CurrentUserContext.Provider>
        </>
    );
}

export default Main;