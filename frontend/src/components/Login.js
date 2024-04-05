import React, { useState } from 'react';

function Login({ setModalBox }) {
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const data = { login, password };
  
    try {
      const response = await fetch('http://localhost:9001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Неправильный логин или пароль');
      }
  
      const responseData = await response.json();
      const { token, user } = responseData;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Сохраняем данные пользователя
  
      // Закрываем модальное окно после успешного входа
      setModalBox('none');
      // Обновляем страницу
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <>
      <h1>Логин</h1>
      <input type='text' id='login' placeholder='Логин' />
      <input type='password' id='password' placeholder='Пароль' />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Войти</button>
    </>
  );
}

export default Login;