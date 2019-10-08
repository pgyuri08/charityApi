const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  userID: {
    type: Number
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  gender: {
    type: String
  },
  birthOfDate: {
    type: Date
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }
});

module.exports = mongoose.model('Userdetail', PostSchema); //we give the param1:name and the parschema that we will use in our mongodb
