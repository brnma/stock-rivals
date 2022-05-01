const userService = require('../services/user.service');

module.exports = { register, authenticate, getLatestUser, getAllUsers, changeUsername };

async function authenticate(req, res, next) {
  try {
    const user = await userService.authenticate(req.body);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function register(req, res, next) {
  try {
    await userService.register(req.body);
    res.json();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getLatestUser(req, res, next) {
  try {
    console.log(req.user.sub);
    const latest = await userService.getLatestUser(req.user.sub);

    res.json(latest);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function changeUsername(req, res, next) {
  try {
    const { newUsername } = req.body;
    await userService.changeUsername(newUsername, req.user.sub);
    res.json();
  } catch (e) {
    res.status(400).json(e);
  }
}
