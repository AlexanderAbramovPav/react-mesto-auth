import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import * as auth from './Auth.js';
import Header from './Header';
import Footer from './Footer';
import SignForm from './SignForm';
import InfoTooltip from './InfoTooltip';
import errorIcon from '../images/icon-error.svg';

function Login (props) {
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setLoginData({
      ...loginData,
      [name]: value 
    });
  }

  function handleSubmit(e) {
    e.preventDefault()
    auth.authorize(loginData.password, loginData.email)
    .then((res) => {
      if (res) {
          props.onLogin(loginData.email)
          setLoginData({
            email: '',
            password: ''
          })
          props.history.push('/');
        } else {
          props.onSubmitPopup({
            icon: errorIcon,
            tipTitle: "Что-то пошло не так! Попробуйте ещё раз."
          })
      }
    })
  }


  return (
    <>
      <Header actionButton={"Регистрация"} onSignChange={props.onSignChange}/>
      <SignForm title={"Вход"} button={"Войти"} registrationCheck={false} onSubmitSign={handleSubmit} onChange={handleChange} data={loginData}/>
      <Footer />
      <InfoTooltip onClose={props.onClose} isOpen={props.isOpen} selectedTooltip={props.selectedTooltip}/>
    </>
  );
  
}

export default withRouter(Login); 