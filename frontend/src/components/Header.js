import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import PersonalAccountPage from './PersonalAccountPage'; // Импортируем компонент страницы личного кабинета
import Order from './Order';
import UserBox from './UserBox';
import ModalBox from './ModalBox'; // Импортируем компонент модального окна
import Login from './Login'; // Импортируем компонент Login
import Registration from './Registration'; // Импортируем компонент Registration

const showOrders = (props) => {
  let summa = 0;
  props.orders.forEach(el => summa += Number.parseFloat(el.price));
  return (
    <div>
      {props.orders.map(el => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className='summa'>Сумма: {new Intl.NumberFormat().format(summa)}p</p>
    </div>
  );
};

const showNothing = () => (
  <div className='empty'>
    <h2>Товаров нет</h2>
  </div>
);

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [modalBox, setModalBox] = useState('none');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Определяем, вошел ли пользователь

  const handleUserBoxClick = (modalType) => {
    if (modalType === 'PersonalAccount') {
      setModalBox('PersonalAccount'); // Изменяем состояние для отображения PersonalAccountPage
    } else {
      setModalBox(modalType); // Открываем модальное окно для других действий
    }
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setModalBox('none');
  };

  // Функция для выхода пользователя
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    setModalBox('none'); // Закрываем модальное окно после выхода
    // Также можно добавить дополнительные действия, например, перенаправление на главную страницу
  };

  return (
    <header>
      <div>
        <span className='logo'>Tea connoisseur</span>
        <ul className='nav'>
          <li>Про нас</li> 
          <li>Контакты</li> 
          {isLoggedIn ? ( // Показываем кнопку "Личный кабинет" только если пользователь вошел
            <>
              <li><button className="UserBox-button" onClick={() => setModalBox('PersonalAccount')}>Личный кабинет</button></li>
              <li><button className="UserBox-button" onClick={handleLogout}>Выйти</button></li>
            </>
          ) : (
            <UserBox onClick={handleUserBoxClick} />
          )}
        </ul>
        <FaShoppingCart onClick={() => setCartOpen(!cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`} />
        {cartOpen && (
          <div className='shop-cart'>
            {props.orders.length > 0 ? showOrders(props) : showNothing()}
          </div>
        )}
        {/* Рендерим модальное окно с соответствующим содержимым */}
        {modalBox !== 'none' && (
          <ModalBox onClose={handleCloseModal}>
            {modalBox === 'Login' && <Login setModalBox={setModalBox} />}
            {modalBox === 'Registration' && <Registration />}
            {modalBox === 'PersonalAccount' && <PersonalAccountPage />}
          </ModalBox>
        )}
      </div>
      <div className='presentation'></div>
    </header>
  );
}

