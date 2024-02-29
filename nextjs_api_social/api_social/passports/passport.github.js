require("dotenv").config();

const GitHubStrategy = require("passport-github2").Strategy;

module.exports = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ["user:email", "read:user"],
  },
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, { profile: profile });
  }
);
