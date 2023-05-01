const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
  })
);

router.get("/login/failed", (req, res) => {
  return res.status(401).json({
    error: true,
    message: "Login failed"
  });
});

router.get("/login/success", (req, res) => {
  console.log(req);
  if (!req.user) {
    return res.status(403).json({
      error: true,
      message: "Not Authorized"
    });
  }
  return res.status(200).json({
    success: true,
    message: "Login success",
    user: req.user
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
