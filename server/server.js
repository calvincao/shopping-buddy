const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
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

app.get('/hello', (req, res) => {
  return res.send('world');
});

app.post('/recipes', recipeController.getRecipes, (req, res) => {
  return res.status(200).json({ recipes: res.locals.recipes });
});

app.post('/login', userController.login, (req, res) => {
  res.cookie('username', req.body.username).sendStatus(200);
});

app.post('/signup', userController.signup, (req, res) => {
  res.cookie('username', req.body.username).sendStatus(200);
});

app.get('/cookie', (req, res) => {
  console.log(req.cookies);
  res.cookie('myCookie', 'Yum!').sendStatus(200);
});
app.use((req, res) => {
  return res.status(404).send("Looks like you're lost...");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`listening on port ${port}`));
