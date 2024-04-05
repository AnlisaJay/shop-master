import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PersonalAccountPage.css"; 

function PersonalAccountPage() {
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
          setError("Данные пользователя не найдены в localStorage");
          return;
        }
        const response = await axios.get(`http://localhost:9001/user/${user._id}`);
        setUserData(response.data.user);
      } catch (error) {
        setError("Ошибка при загрузке данных пользователя");
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Пожалуйста, заполните оба поля пароля");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        setError("Данные пользователя не найдены в localStorage");
        return;
      }
      await axios.post(`http://localhost:9001/user/${user._id}/change-password`, { newPassword });
      setSuccessMessage("Пароль успешно изменен");
    } catch (error) {
      setError("Ошибка при смене пароля");
    }
    setLoading(false);
  };

  return (
    <div className="personal-account">
      <h2>Личный кабинет</h2>
      {userData ? (
        <div className="user-info">
          <p>Логин: {userData.login}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}

      <div className="change-password-form">
        <h2>Смена пароля</h2>
        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="change-password-btn" onClick={handleChangePassword} disabled={loading}>
          {loading ? "Идет изменение..." : "Сохранить"}
        </button>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default PersonalAccountPage;