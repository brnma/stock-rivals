var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const DIR = path.join(__dirname + '/../public/imgs');
const userController = require('../controllers/user.controller');
const stocksController = require('../controllers/stocks.controller');

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

router.post('/uploadpic', upload.any('image'), function (req, res, next) {
  if (req.files) res.json();
  else res.status(400).json();
});

// for app to get latest user data after any changes
router.get('/latestUser', userController.getLatestUser);

router.post('/login', userController.authenticate);

router.post('/register', userController.register);

module.exports = router;
