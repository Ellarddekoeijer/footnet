var mongoose = require("mongoose");

var TeamSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: { 
    type: String,
    required: true
  }
});

var Team = mongoose.model('Team', TeamSchema);

module.exports = {
  Team: Team,
  TeamSchema: TeamSchema
}