let express = require('express');
var router = express.Router();
const groupsController = require('../controllers/groups.controller');

// join group
router.post('/join', groupsController.joinGroup);

// leave group
router.post('/leave', groupsController.leaveGroup);

// create group
router.get('/create', groupsController.createGroup);
// create group

router.get('/getGroup', groupsController.getGroup);

module.exports = router;
