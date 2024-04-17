
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
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


const DataModel = mongoose.model("newsdatas",DataSchema);

module.exports = DataModel;




