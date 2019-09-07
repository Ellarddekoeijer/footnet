var mongoose = require("mongoose");

var PlayerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: { 
    type: String,
    required: true
  },
  shirtNumber: {
    type: Number
  },
  coach: { 
    type: String
  },
  positions: { 
    type: [String]
  },
  avatar: {
    type: String
  },
});

var Player = mongoose.model('Player', PlayerSchema);

module.exports = {
  Player: Player
}