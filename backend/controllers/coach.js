 var Coach = require("../models/coach.js").Coach;

 // Return list of all coaches.
 exports.get_coaches = function(req, res) {
	 Coach.find({}, function (err, coaches) {
		 if (err){
			 res.status(409).send(err);
		 } else {
			 res.status(200).json(coaches);
		 }
	 });
 };

 // Add a new coach.
 exports.new_coach = function(req, res) {
	 Coach.create(
		 {
			 firstName: req.body.firstName,
			 lastName: req.body.lastName,
			 teams : req.body.teams

		 }, function (err, coach) {
			 if (err){
				 //Error detected, send Bad request
				 res.status(400).send(err);
			 } else {
				 // New resource(Player) created
				 res.status(201).send(coach);
			 }
		 });
 };