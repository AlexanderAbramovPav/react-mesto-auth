function Card(props) {

    const handleCardClick = () => {
        props.onCardClick(props.item);
    }

    return (
        <>
            <div className="element" >
                <img
                    className="element__image" style={{ backgroundImage: `url(${props.link})` }}
                    onClick={handleCardClick}
                />
                <button className="element__trash-btn" type="button" aria-label="Удалить карточку"></button>
                <div className="element__mesto-container">
                    <h2 className="element__title">{props.name}</h2>
                    <div className="element__like-container">
                        <button className="element__like-btn" type="button" aria-label="Поставить Лайк карточке"></button>
                        <p className="element__like-counter">{props.likes}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
