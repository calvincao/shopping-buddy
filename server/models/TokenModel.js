const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model('Token', schema);

module.exports = Token;
