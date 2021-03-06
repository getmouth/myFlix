const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/User');


const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new LocalStrategy({
  usernameField: 'Email',
  passwordField: 'Password'
},(username, password, done) => {
  Users.findOne({Email: username}, (err, user) => {
    if(err) {
      return done(err)
    }
    if(!user) {
      return done(null, false, {message: 'Incorrect username.'});
    }
    if(!user.validatePassword(password)) {
      return done(null, false, {message: 'Incorrect password.'})
    }
    return done(null, user);
  })
}));


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},(jwtPaylaod, done) => {
  return Users.findById(jwtPaylaod._id)
  .then(user => {
    return done(null, user);
  })
  .catch(err => done(err))
}));

