const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./config/passport");
const authRoute = require("./routes/auth");
const coursesRoute = require("./routes/course");
const categoryRoute = require("./routes/category");
const quizRoute = require("./routes/quiz");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(
  cookieSession({
    name: "session",
    keys: ["assignment"],
    maxAge: 24 * 60 * 60 * 100
  })
);
app.use("/health", (req, res) => {
  return res.status(200).json({ status: "UP", p: process.env });
});
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  })
);
app.use("/auth", authRoute);
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.status(401);
};
app.use("/api/v1/courses", isLoggedIn, coursesRoute);
app.use("/api/v1/category", isLoggedIn, categoryRoute);
app.use("/api/v1/quiz", isLoggedIn, quizRoute);
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
