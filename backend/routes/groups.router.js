let express = require('express');
var router = express.Router();
const groupsController = require('../controllers/groups.controller');

// join group
router.post('/join', groupsController.joinGroup);

// leave group
router.post('/leave', groupsController.leaveGroup);

// create group
router.get('/create', groupsController.createGroup);

//get group code
router.get('/getGroup', groupsController.getGroup);

//get array of users in the same group
router.get('/getGroupUsers', groupsController.getGroupUsers);
module.exports = router;
