const jwt = require('jsonwebtoken');
const Token = require('../models/TokenModel');
require('dotenv').config();

const tokenController = {};

tokenController.create = async (req, res, next) => {
  try {
    const username = req.body.username;
    const user = { username: username };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    await Token.create({ token: refreshToken });
    res.locals.tokens = { accessToken, refreshToken };
    next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error occured in userController.createToken middleware.',
      status: 500,
      message: { err: err.msg },
    });
  }
};

tokenController.authenticate = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (accessToken === null) return res.sendStatus(401);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // if token is expired, attempt to refresh
    if (err && err.message === 'jwt expired') {
      res.locals.refreshToken = true;
      return next();
    } else if (err && err.message === 'invalid signature') return res.sendStatus(403);
    return next();
  });
};

tokenController.refresh = async (req, res, next) => {
  if (!res.locals.refreshToken) return next();
  const { refreshToken } = req.cookies;
  if (refreshToken === null) return res.sendStatus(401);
  const response = await Token.find({ token: refreshToken });
  if (response.length === 0) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ username: user.username });
    res.locals.tokens = { accessToken, refreshToken };
    console.log('refreshing tokens', res.locals.tokens);
    return next();
  });
};

tokenController.remove = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  await Token.findOneAndDelete({ token: refreshToken });
  next();
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
};

module.exports = tokenController;
