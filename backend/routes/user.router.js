var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const DIR = path.join(__dirname + '/../public/imgs');
const userController = require('../controllers/user.controller');
const db = require('../_helpers/db');
const Users = db.Users;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(DIR);
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const newFileName = file.originalname.toLowerCase().split(' ').join('-');
    console.log(newFileName);
    cb(null, newFileName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image/')) cb(null, true);
    else {
      cb(null, false);
      return cb(new Error('Please only upload image files'));
    }
  },
  onError: (err) => {
    console.log(err);
  }
});

router.post('/uploadpic', upload.any('image'), async function (req, res, next) {
  // console.log(req.user);
  console.log(req.user);
  console.log(req.files[0].originalname);

  // BUGGY
  if (req.files[0]) {
    await Users.updateOne(
      { _id: req.user.sub },
      {
        profileImage: req.files[0].originalname
      }
    );
    res.json();
  } else res.status(400).json();
});

router.get('/allusers', userController.getAllUsers);

// for app to get latest user data after any changes
router.get('/latestUser', userController.getLatestUser);

router.post('/changeusername', userController.changeUsername);

router.post('/login', userController.authenticate);

router.post('/register', userController.register);

module.exports = router;
