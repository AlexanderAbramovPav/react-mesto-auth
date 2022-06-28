import React, {useState} from 'react';
import * as auth from './Auth.js';
import Header from './Header';
import Footer from './Footer';
import SignForm from './SignForm';
import InfoTooltip from './InfoTooltip';
import {withRouter} from 'react-router-dom';
import okIcon from '../images/icon-ok.svg';
import errorIcon from '../images/icon-error.svg';

function Register (props) {
  
  const [registerData, setRegisterData] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setRegisterData({
      ...registerData,
      [name]: value 
    });
  }

  function handleSubmit(e) {
    e.preventDefault()
    auth.register(registerData.password, registerData.email).then((res) => {
      if (res) {
          props.onSubmitPopup({
            icon: okIcon, 
            tipTitle: "Вы успешно зарегистрировались!"
          });
          props.history.push('/sign-in');
          setRegisterData({
            email: '',
            password: ''
          })
        } else {
          props.onSubmitPopup({
            icon: errorIcon,
            tipTitle: "Что-то пошло не так! Попробуйте ещё раз."
          })
      }
    });
  }


  return (
    <>
      <Header actionButton={"Вход"} onSignChange={props.onSignChange}/>
      <SignForm title={"Регистрация"} button={"Зерегистрироваться"} registrationCheck={true} onSubmitSign={handleSubmit} onChange={handleChange}/>
      <Footer />
      <InfoTooltip onClose={props.onClose}  isOpen={props.isOpen} selectedTooltip={props.selectedTooltip}/>
    </>
  );
  
}

export default withRouter(Register); 