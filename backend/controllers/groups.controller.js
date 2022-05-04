const groupsService = require('../services/groups.service');

module.exports = { joinGroup, leaveGroup, createGroup, getGroup, getGroupUsers };

async function joinGroup(req, res, next) {
  console.log(req.body.code);
  try {
    const data = await groupsService.joinGroup(req.user.sub, req.body.code);
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
    const data = await groupsService.createGroup(req.user.sub);
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getGroup(req, res, next) {
  try {
    const data = await groupsService.getGroup(req.user.sub);
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getGroupUsers(req, res, next) {
  try {
    const data = await groupsService.getGroupUsers(req.user.sub);
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
