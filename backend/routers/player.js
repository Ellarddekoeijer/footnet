var express = require('express');
var router = express.Router();

//import controllers
var PlayerController = require('../controllers/player.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the create route
router.get('/', PlayerController.get_players)


module.exports = router