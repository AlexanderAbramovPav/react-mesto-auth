function ImagePopup(props) {

console.log(props)

  return (
    <>
        <div className={props.card ? `popup popup-img popup_opened` : `popup popup-img`} onKeyDown={props.onClose} tabIndex={-1}>
          <div className="popup__img-container">
            <img
                src={props.card}
                alt=""
                className="popup__image"
              />
              <p className="popup__img-title"></p>
              <button className="popup__close-btn popup-img-close-btn" type="button" aria-label="Закрыть карточку" onClick={props.onClose}></button>
          </div>
        </div>
    </>
  );
}

export default ImagePopup;