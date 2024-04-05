import React, { createContext, useState } from 'react';

// Создаем контекст пользователя
export const UserContext = createContext();

// Создаем провайдер контекста пользователя
export const UserProvider = ({ children }) => {
  // Состояние пользователя
  const [user, setUser] = useState(null);

  // Функция для установки пользователя после входа
  const setUserAfterLogin = userData => {
    setUser(userData);
  };

  return (
    // Предоставляем состояние пользователя всем дочерним компонентам
    <UserContext.Provider value={{ user, setUserAfterLogin }}>
      {children}
    </UserContext.Provider>
  );
};
