const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const tokenController = require('./controllers/tokenController');
const recipeController = require('./controllers/recipeController');
const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error(err));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.post('/recipes', recipeController.getRecipes, (req, res) => {
  return res.status(200).json({ recipes: res.locals.recipes });
});

app.get('/stuff', tokenController.authenticate, tokenController.refresh, (req, res) => {
  if (res.locals.refreshToken === true) res.cookie('accessToken', res.locals.tokens.accessToken);
  return res.status(200).send('success!');
});

app.post('/login', userController.login, tokenController.create, (req, res) => {
  res
    .cookie('accessToken', res.locals.tokens.accessToken)
    .cookie('refreshToken', res.locals.tokens.refreshToken)
    .sendStatus(200);
});

app.get('/logout', tokenController.remove, (req, res) => {
  res.clearCookie('accessToken').clearCookie('refreshToken').sendStatus(200);
});

app.post('/signup', userController.signup, tokenController.create, (req, res) => {
  res
    .cookie('accessToken', res.locals.tokens.accessToken)
    .cookie('refreshToken', res.locals.tokens.refreshToken)
    .sendStatus(200);
});

// route error handling
app.use((req, res) => {
  return res.status(404).send("Looks like you're lost...");
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`listening on port ${port}`));
