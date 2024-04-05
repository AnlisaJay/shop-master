// ModalBox.js
import React from 'react';
import './ModalBox.css';
import Login from './Login'; // Импортируем компонент Login
import Registration from './Registration'; // Импортируем компонент Registration


function ModalBox({ onClose, children, modalType }) {
    return (
      <>
        <div className='echo' onClick={onClose}></div>
        <div className="ModalBox">
          {modalType === 'Login' && <Login />}
          {modalType === 'Registration' && <Registration />}
          {children}
        </div>
      </>
    );
  }

export default ModalBox;
