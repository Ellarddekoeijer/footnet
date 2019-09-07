var fs = require('fs');
var Player = require("../models/player.js").Player;

 // Create new user
exports.create_user = function(req, res) {
	//Check if a file was given, if not, set default avatar.
	let avatarUrl;
	if (req.file === undefined){
		avatarUrl = "public\\default\\defaultImage.png";
	} else {
		avatarUrl = req.file.path;
	}

	console.log(avatarUrl);
    Player.create(
    	{
    		firstName: req.body.firstName,
    		lastName: req.body.lastName,
			shirtNumber : req.body.shirtNumber,
    		coach: req.body.coach,
			avatar: avatarUrl

    	}, function (err, player) {
	  if (err){
	  		//Error detected, send Bad request
	  		res.status(400).send(err);
	  	} else {
	  		// New resource(Player) created
	  		res.status(201).send(player);
	  	}
	});
};

// Delete user(s)
exports.delete_user = function(req, res) {
	// Delete all users in the userList array
	Player.deleteMany({_id: {$in: req.body.userList}
	}, function(err) {
		if (err){
			//Error detected, send Bad request
			res.status(400).send(err);
		} else {
			// Successful deletion, send 204
			res.status(204).send("User(s) removed");
		}
	})
};