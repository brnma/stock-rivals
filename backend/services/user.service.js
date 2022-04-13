const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Users = db.Users;

module.exports = {
  authenticate,
  getAllUsers,
  register
};

// Esekia's implementation of authenticate and the rest
async function authenticate({ username, password }) {
  const user = await Users.findOne({ username: username });

  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.SECRET);
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAllUsers() {
  //Returning the result of the promise.
  return await Users.find().select('-hash');
}

async function register(userParam) {
  // validate
  if (await Users.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  } else if (await Users.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }

  const user = new Users(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();

  return user;
}
