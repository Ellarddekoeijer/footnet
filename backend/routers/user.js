var express = require('express');
var router = express.Router();
var multer  = require('multer')

const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})


//init upload
const upload = multer({
	storage: storage,
  //Limit file size
	limits: {
		fileSize: 1e+7,
	},
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    }
}).single("avatar");

function checkFileType(file, cb) {
  //Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;

  //check file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  //Check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error("image invalid"));
}

//import controllers
var UserController = require('../controllers/user.js');


router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// Create new user
router.post('/new', upload, UserController.create_user)

// Delete user(s)
router.delete('/delete', UserController.delete_user)

router.use(function timeLog (err, req, res, next) {
    switch(err.message) {
        case 'image invalid':
            res.status(415).send(err.message);
            break;
            res.status(400).send(err.message);
        default:
            res.status(400).send(err.message);
    }

})

module.exports = router