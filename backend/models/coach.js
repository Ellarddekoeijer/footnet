var mongoose = require("mongoose");
var TeamSchema = require("./team.js").TeamSchema;

var CoachSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: { 
    type: String,
    required: true
  },
  teams: [TeamSchema]
});

var Coach = mongoose.model('Coach', CoachSchema, 'coach');

module.exports = {
  Coach: Coach
}