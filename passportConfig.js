const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db');
const bcrypt = require('bcrypt');

function initialize(passport) {
  const authenticateUser = (username, password, done) => {
    pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username],
      (err, results) => {
        if (err) {
          // throw err;
          return done(err);
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            return isMatch
              ? done(null, user)
              : done(null, false, { message: 'Password is not correct' });
          });
        } else {
          return done(null, false, { message: 'Username does not exist' });
        }
      }
    );
  };

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done) => {
    pool.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id],
      (err, results) => {
        if (err) {
          throw err;
        }
        return done(null, results.rows[0]);
      }
    );
  });
}

module.exports = initialize;
