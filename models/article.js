const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,

  },
  url: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https|http?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(v);
      },
      message: 'Invalid link',
    },
  },
  urlToImage: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https|http?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(v);
      },
      message: 'Invalid link',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
});
module.exports = mongoose.model('article', articleSchema);
