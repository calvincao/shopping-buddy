const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const User = require('../models/UserModel');

const userController = {};

userController.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return next({
        log: 'User provided username and/or password is not valid.',
        status: 401,
        message: { err: 'User provided username and/or password is not valid.' },
      });
    const response = await User.find({ username });
    if (!response.length)
      return next({
        log: 'Username not found',
        status: 401,
        message: { err: 'Username not found' },
      });
    const hashedPassword = response[0].password;
    const passwordDoesMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordDoesMatch) {
      return next();
    } else
      return next({
        log: 'Bad password',
        status: 401,
        message: { err: 'Bad password' },
      });
  } catch (err) {
    return next({
      log: 'Error occured in userController.login middleware.',
      status: 401,
      message: { err: err.msg },
    });
  }
};

userController.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const nameCheck = await User.find({ username });
    if (nameCheck.length > 0)
      return next({
        log: 'Username already used',
        status: 401,
        message: { err: 'Username already used' },
      });
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const response = await User.create({ username: username, password: hashedPassword });
    console.log(response);
    return next();
  } catch (err) {
    console.error(err);
    return next({
      log: 'Error occured in userController.signup middleware.',
      status: 400,
      message: { err: err.msg },
    });
  }
};

module.exports = userController;
