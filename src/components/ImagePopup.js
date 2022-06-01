function ImagePopup(props) {

  console.log(props.card)

  return (
    <>
        <div className={props.card ? `popup popup-img popup_opened` : `popup popup-img`} tabIndex={-1}>
          <div className="popup__img-container">
            <img
                src={props.card === null ? "#" : props.card.link} // не понимаю, как сделать так, чтобы движок при монтировании игнорил null значение
                alt={props.card === null ? "" : props.card.name} // не понимаю, как сделать так, чтобы движок при монтировании игнорил null значение
                className="popup__image"
              />
              <p className="popup__img-title">{props.card === null ? "" : props.card.name}</p>
              <button className="popup__close-btn popup-img-close-btn" type="button" aria-label="Закрыть карточку" onClick={props.onClose}></button>
          </div>
        </div>
    </>
  );
}

export default ImagePopup;