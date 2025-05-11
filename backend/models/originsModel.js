const mongoose = require('mongoose');

const originSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Origin', originSchema, 'origins');