var mongoose = require("mongoose");

var GameSchema = new mongoose.Schema({
  composition: {
    type: String,
    required: true
  },
  lastName: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true,
    unique: true
  }
});

var User = mongoose.model('User', GameSchema);

module.exports = {
  User: User
}