const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/User");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"]
    },
    function (accessToken, refreshToken, profile, callback) {
      User.findOneAndUpdate(
        { email: profile.emails[0].value },
        {
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value
        },
        { new: true, upsert: true }
      )
        .then((user) => {
          console.log("user updated successfully. USER:", user);
          callback(null, profile);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
