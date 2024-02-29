require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth2").Strategy;

module.exports = new GoogleStrategy(
  {
    clientID:
      "302375720780-e5o4m04bc8r5r2g9voqi906v53mo7kl0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google",
    scope: ["profile", "email"],
  },
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, { profile: profile });
  }
);
