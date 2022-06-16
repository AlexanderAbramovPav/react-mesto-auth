import PopupWithForm from './PopupWithForm';
import React, { useState, useEffect, useContext } from 'react'
import {CurrentUserContext} from '../context/CurrentUserContext';

function EditAvatarPopup(props) {

    const [avatar, setAvatar] = useState('');
    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            avatar
        });
    }

    return (
        <>
            <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit} name="avatar" title="Обновить аватар" submit="Сохранить"
                children=
                {<label className="popup__field">
                    <input
                    type="url"
                    className="popup__input popup__input_type-avatar-link"
                    placeholder="Ссылка на аватар"
                    name="avatar-link"
                    required
                    id="url-avatar-input"
                    value={avatar} 
                    onChange={handleAvatarChange}
                    />
                    <span className="popup__error url-avatar-input-error"></span>
                </label>}
            />
        </>
    );
}

export default EditAvatarPopup;