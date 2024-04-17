const mongoose = require('mongoose');

const newsdatas  = new mongoose.Schema({
    "source": {
        "id": String,
        "name": String
      },
      "author": String,
      "title": String,
      "description": String,
      "url": String,
      "urlToImage": String,
      "publishedAt": Date,
      "content": String
});

module.exports = mongoose.model('newsdatas',newsdatas);