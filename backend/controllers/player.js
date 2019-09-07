 var Player = require("../models/player.js").Player;

 // Get all players
exports.get_players = function(req, res) {
    Player.find({}, function (err, players) {
	  if (err){
	  	 res.status(409).send(err);
	  	} else {
	  		res.status(200).json(players);
	  	}
	});
};