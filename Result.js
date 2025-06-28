
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  game: String,
  result: String,
  day: Number,
  month: Number,
  year: Number
});

module.exports = mongoose.model('Result', resultSchema);
