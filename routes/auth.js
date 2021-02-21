const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// logout
router.get('/logout', (req, res) => {
  console.log('logging out');
  console.log(req.user);
  req.logout();
  res.send('Successfully logged out');
});

// register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id, password',
      [username, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      throw err;
      // return next(err);
    }
    if (!user) {
      console.log('in login no user');
      return res.status(401).send(info.message);
    }
    req.logIn(user, (err) => {
      console.log('in login');
      console.log(user);
      if (err) {
        throw err;
        // return next(err);
      }
      res.status(200).send('successfully authenticated');
    });
  })(req, res, next);
});

// get user data
router.get('/user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
