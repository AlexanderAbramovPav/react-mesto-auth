import {apiSettings} from '../utils/api.js'
import React from 'react';
import Card from './Card';

function Main(props) {

    const [userInfo, setUserInfo] = React.useState({ userName: "", userDescription: "", userAvatar: "", cards: [] });

    React.useEffect(() => {
        return () => {
            Promise.all([apiSettings.getUserInfo(), apiSettings.getInitialCards()])
            .then(result => {
                setUserInfo({
                    ...userInfo,
                    userName: result[0].name,
                    userDescription: result[0].about,
                    userAvatar: result[0].avatar,
                    cards: result[1]
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
                    {userInfo.cards.map((item) => (
                        <Card key={item._id} cardItem={item} cardName={item.name} cardLink={item.link} cardLikes={item.likes.length} onCardClick={props.onCardClick}/>
                    ))}
                </section>
            </main>
        </>
    );
}

export default Main;