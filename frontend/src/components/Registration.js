import React, { useState } from 'react';

function Registration({ onRegister }) {
  const api = 'http://localhost:9001/register';

  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword || password.length < 6) {
      setPasswordsMatch(false);
      return;
    }

    const data = {
      login: login,
      password: password,
      email: email
    };
  
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при отправке запроса регистрации');
      }
  
      const result = await response.json();
      console.log(result);

      // Устанавливаем сообщение о успешной регистрации
      setRegistrationMessage('Пользователь успешно зарегистрирован');
    } catch (error) {
      console.error('Ошибка при отправке запроса регистрации:', error);
    }
  };
  
  return (
    <>
      <h1>Регистрация</h1>
      <div className="registration-form">
      {registrationMessage && (
        <p className="success-message">{registrationMessage}</p>
      )}
      {!registrationMessage && (
        <>
          <input
             type='email'
             placeholder='Почта'
             value={email}
             onChange={handleEmailChange}
          />
          <input
            type='text'
            placeholder='Логин'
            value={login}
            onChange={handleLoginChange}
          />
          <input
            type='password'
            placeholder='Пароль'
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type='password'
            placeholder='Повторите пароль'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordsMatch && (
            <p style={{ color: 'red' }}>Пароли не совпадают или короче 6 символов</p>
          )}
          <button onClick={handleSubmit}>Сохранить</button>
        </>
      )}
      </div>
    </>
  );

}

export default Registration;
