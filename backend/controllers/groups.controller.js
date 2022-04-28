const groupsService = require('../services/groups.service');

module.exports = { joinGroup, leaveGroup, createGroup };

async function joinGroup(req, res, next) {
  try {
    const data = await groupsService.joinGroup(req.user.sub, req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function leaveGroup(req, res, next) {
  try {
    const data = await groupsService.leaveGroup(req.user.sub);
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function createGroup(req, res, next) {
  try {
    const data = await groupsService.createGroup();
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
