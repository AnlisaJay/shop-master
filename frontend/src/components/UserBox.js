import React from 'react';
import './UserBox.css';

function UserBox(props) {
  const handleLoginClick = () => {
    props.onClick('Login'); // Устанавливаем значение 'Login' при нажатии на кнопку "Вход"
  };

  const handleRegistrationClick = () => {
    props.onClick('Registration'); // Устанавливаем значение 'Registration' при нажатии на кнопку "Регистрация"
  };

  return (
    <div className="UserBox">
      <button onClick={handleLoginClick}>Вход</button>
      <button onClick={handleRegistrationClick}>Регистрация</button>
    </div>
  );
}

export default UserBox;
