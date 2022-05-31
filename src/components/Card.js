function Card(props) {

    const handleCardClick = () => {
        props.onCardClick(props.cardLink);
    }  

    return (
        <>
            <div className="element" >
                <img
                    className="element__image" style={{ backgroundImage: `url(${props.cardLink})` }}
                    onClick={handleCardClick}
                />
                <button className="element__trash-btn" type="button" aria-label="Удалить карточку"></button>
                <div className="element__mesto-container">
                    <h2 className="element__title">{props.cardName}</h2>
                    <div className="element__like-container">
                        <button className="element__like-btn" type="button" aria-label="Поставить Лайк карточке"></button>
                        <p className="element__like-counter">{props.cardLikes}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
