const express = require('express');
const cors = require('cors');
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
const path = require('path');

// PORT
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
