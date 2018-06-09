const express = require('express');
const passport = require('passport');

const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.getUserById(id, (err, user) => done(err, user)));

passport.use(new LocalStrategy((username, password, done) => {
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false, {message: 'Unknown User'});

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid Password'});
      }
    });
  });
}));

router.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  // form validator
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // check errors
  const errors = req.validationErrors();
  if (errors) {
    throw errors;
  } else {
    const newUser = new User({
      name,
      email,
      username,
      password
    });

    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      console.log(user);
      res.json({
        message: 'You are now registered!',
        user: {
          name,
          email,
          username
        }
      });
    });
  }
});

module.exports = router;
