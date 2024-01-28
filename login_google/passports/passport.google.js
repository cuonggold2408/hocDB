const { User, Provider } = require("../models/index");
var GoogleStrategy = require("passport-google-oauth20");

module.exports = new GoogleStrategy(
  {
    clientID:
      "302375720780-e5o4m04bc8r5r2g9voqi906v53mo7kl0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ["profile", "email"],
    state: true,
  },
  async (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    const {
      displayName: name,
      emails: [{ value: email }],
    } = profile;

    // Kiểm tra xem provider đã tồn tại hay chưa
    const provider = await Provider.findOrCreate({
      where: {
        name: "google",
      },
      defaults: {
        name: "google",
      },
    });

    // console.log(provider);

    // Kiểm tra xem user đã tồn tại hay chưa
    const user = await User.findOrCreate({
      where: {
        email,
        provider_id: provider[0].id,
      },
      defaults: {
        name,
        email,
        status: true,
        provider_id: provider[0].id,
      },
    });

    cb(null, user[0]);
  }
);
