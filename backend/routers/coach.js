var express = require('express');
var router = express.Router();

//import controllers
var CoachController = require('../controllers/coach.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// Returns list of all coaches
router.get('/', CoachController.get_coaches)

// Creates a new coach
router.post('/new', CoachController.new_coach)


module.exports = router