const express = require('express');
const cors = require('cors');
const pool = require('./db');
const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const bodyParser = require('body-parser');
const initializePassport = require('./passportConfig');
const cookieParser = require('cookie-parser');
const app = express();
const authRouter = require('./routes/auth');
const gamesRouter = require('./routes/games');
const questionsRouter = require('./routes/questions');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// ROUTES
app.use('/auth', authRouter);
app.use('/games', gamesRouter);
app.use('/questions', questionsRouter);

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
