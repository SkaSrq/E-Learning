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
app.set("trust proxy", 1);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "https://my.godaddy.subdomain");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use(
  cookieSession({
    name: "l_session",
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
app.use("/api/v1/courses", coursesRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/quiz", quizRoute);
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
