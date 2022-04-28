let express = require('express');
var router = express.Router();
const groupsController = require('../controllers/groups.controller');

// join group
router.post('/join/:group', groupsController.joinGroup);

// leave group
router.post('/leave/:group', groupsController.leaveGroup);

// create group?
router.get('/create', groupsController.createGroup);

module.exports = router;
