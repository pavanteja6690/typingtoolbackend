const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportLocal = require("passport-local");
const User = require("./models/user");

const jwt = require("jsonwebtoken");

const LocalStrategy = passportLocal.Strategy;

const [JwtStrategy, ExtractJwt] = [
  passportJwt.Strategy,
  passportJwt.ExtractJwt,
];
require("dotenv").config();

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports.getToken = (user) => {
  return jwt.sign(user, process.env.jwtsecret, {});
};
console.log(process.env.jwtsecret, "hello");
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.jwtsecret,
    },
    (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) return done(err, false);
        else if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

module.exports.verifyUser = passport.authenticate("jwt", { session: false });
