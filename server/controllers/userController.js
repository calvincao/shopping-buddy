const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const User = require('../models/UserModel');
const Token = require('../models/TokenModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {};

userController.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // missing username and/or password
    if (!username || !password) return res.sendStatus(406);
    const response = await User.find({ username });
    // user not found in db
    if (!response.length) return res.sendStatus(403);
    const hashedPassword = response[0].password;
    const passwordDoesMatch = await bcrypt.compare(password, hashedPassword);
    // password doesn't match
    if (passwordDoesMatch) return next();
    else return res.sendStatus(403);
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
    if (!username || !username.length || !password || !password.length) return res.sendStatus(401);
    const nameCheck = await User.find({ username });
    if (nameCheck.length > 0) return res.sendStatus(403);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await User.create({ username: username, password: hashedPassword });
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

// userController.createToken = async (req, res, next) => {
//   try {
//     const username = req.body.username;
//     const user = { username: username };
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
//     await Token.create({ token: refreshToken });
//     res.locals.tokens = { accessToken, refreshToken };
//     next();
//   } catch (err) {
//     console.log(err);
//     return next({
//       log: 'Error occured in userController.createToken middleware.',
//       status: 500,
//       message: { err: err.msg },
//     });
//   }
// };

// userController.authenticateToken = (req, res, next) => {
//   const { accessToken } = req.cookies;
//   if (accessToken === null) return res.sendStatus(401);
//   jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     // if token is expired, attempt to refresh
//     if (err && err.message === 'jwt expired') {
//       res.locals.refreshToken = true;
//       return next();
//     } else if (err && err.message === 'invalid signature') return res.sendStatus(403);
//     req.user = user;
//     return next();
//   });
// };

// userController.refreshToken = async (req, res, next) => {
//   if (res.locals.refreshToken === false) return next();
//   const { refreshToken } = req.cookies;
//   if (refreshToken === null) return res.sendStatus(401);
//   const response = await Token.find({ token: refreshToken });
//   if (response.length === 0) return res.sendStatus(403);
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET);
//     res.locals.tokens = { accessToken, refreshToken };
//     return next();
//   });
// };

module.exports = userController;
