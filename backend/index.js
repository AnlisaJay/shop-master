// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user) {
    return res.status(400).json({ message: "Пользователь не найден!" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res
      .status(400)
      .json({ message: "Неверный логин или пароль!" });
  }
  res.json({
    message: "Вы успешно авторизованы",
    user
  });
});

app.post("/register", async (req, res) => {
  const { login, password, email } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ login }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Пользователь с таким логином или email уже существует"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ login, password: hashedPassword, email });
    await newUser.save();

    res
      .status(201)
      .json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error("Ошибка при регистрации пользователя:", error);
    res
      .status(500)
      .json({ message: "Произошла ошибка при регистрации пользователя" });
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Ошибка при получении данных о пользователе:", error);
    res.status(500).json({ message: "Произошла ошибка при получении данных о пользователе" });
  }
});

app.post("/user/:userId/change-password", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { newPassword } = req.body;

    // Найдите пользователя по его ID и обновите пароль
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Пароль успешно изменен" });
  } catch (error) {
    console.error("Ошибка при изменении пароля пользователя:", error);
    res.status(500).json({ message: "Произошла ошибка при изменении пароля пользователя" });
  }
});



app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ data: products });
  } catch (error) {
    console.error("Ошибка при получении списка продуктов:", error);
    res
      .status(500)
      .json({ message: "Произошла ошибка при получении списка продуктов" });
  }
});

const URLDB = "mongodb://localhost:27017/database_shop";

const start = async () => {
  try {
    await mongoose.connect(URLDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Успешное подключение к базе данных");

    const PORT = 9001;
    app.listen(PORT, () =>
      console.log(`Сервер запущен на порте ${PORT}`)
    );
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error);
  }
};

start();
