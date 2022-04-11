const userService = require('../services/user.service');

module.exports = { register, authenticate };

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
  console.log('here');
  console.log(req.body);

  try {
    await userService.register(req.body);
    res.json();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
