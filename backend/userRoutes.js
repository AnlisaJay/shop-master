// userRoutes.js

const express = require("express");
const router = express.Router();
const User = require("./models/User");

// Маршрут для получения данных о пользователе по его ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    res
      .status(500)
      .json({
        message: "Произошла ошибка при получении данных пользователя"
      });
  }
});

module.exports = router;
