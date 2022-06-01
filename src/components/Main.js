import {apiSettings} from '../utils/api.js'
import React, { useState, useEffect } from 'react'
import Card from './Card';

function Main(props) {

    const [userInfo, setUserInfo] = useState({ userName: "", userDescription: "", userAvatar: ""});
    const [userCards, setUserCards] = useState({cards: []});

    useEffect(() => {
        return () => {
            Promise.all([apiSettings.getUserInfo(), apiSettings.getInitialCards()])
            .then(([user, cards]) => {
                setUserInfo({
                    ...userInfo,
                    userName: user.name,
                    userDescription: user.about,
                    userAvatar: user.avatar
                  });
                  setUserCards({
                    ...userCards,
                    cards: cards
                  });
            }) 
            .catch((err) => {
                console.log(err);
            });
        };    
    },[])

    return (
        <>
            <main className="main">
                <section className="profile">
                    <div className="profile__avatar-container">
                        <img 
                            src={userInfo.userAvatar}
                            className="profile__avatar"
                            alt="Логотип Пользователя"
                        />
                        <button className="profile__avatar-overlay" type="button" aria-label="Обновление аватара" onClick={props.onEditAvatar}></button>
                    </div>

                    <div className="profile__info-container">
                        <h1 className="profile__name">{userInfo.userName}</h1>
                        <button className="profile__edit-btn" type="button" aria-label="Изменение информации о себе" onClick={props.onEditProfile}></button>
                        <p className="profile__about">{userInfo.userDescription}</p>
                    </div>
                    <button className="profile__add-btn" type="button" aria-label="Добаление новой карточки" onClick={props.onAddPlace}></button>
                </section>

                <section className="elements">
                    {userCards.cards.map((item) => (
                        <Card key={item._id} item={item} name={item.name} link={item.link} likes={item.likes.length} onCardClick={props.onCardClick}/>
                    ))}
                </section>
            </main>
        </>
    );
}

export default Main;