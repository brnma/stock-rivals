const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

const groupsService = require('./groups.service');
const fs = require('fs');
const path = require('path');
const DIR = __dirname + '/../public/imgs';
const Users = db.Users;

module.exports = {
  authenticate,
  getAllUsers,
  register,
  getLatestUser,
  changeUsername
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

  throw "Incorrect password"
}

async function getAllUsers() {
  //Returning the result of the promise.
  return await Users.find().select('-hash');
}

async function register(userParam) {
  console.log(userParam);
  // validate
  if (await Users.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  } else if (await Users.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }

  const gCode = await groupsService.generateGroupCode();

  const user = new Users({ ...userParam, groupCode: gCode });

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();

  // console.log(user);

  return user;
}

async function getLatestUser(userId) {
  if (!userId) throw 'No user ID given';
  console.log(userId);
  const user = await Users.findOne({ _id: userId });
  const { prevValue, currValue, buyingPower, profileImage, username } = user;
  console.log(user);
  return {
    prevValue: prevValue,
    currValue: currValue,
    buyingPower: buyingPower,
    profileImage: profileImage,
    username: username
  };
}

async function changeUsername(newUsername, userId) {
  if (!userId) throw 'No user ID given';

  if (await Users.findOne({ username: newUsername })) throw 'Username already taken';

  const user = await Users.findOne({ _id: userId });

  console.log('changeUsername happened');
  const oldUsername = user.username;
  const fileType = user.profileImage.split('.')[1];

  await Users.updateOne(
    { _id: userId },
    {
      username: newUsername,
      profileImage: `${newUsername}.${fileType}`
    }
  );

  const oldFile = path.join(`${DIR}/${oldUsername}.${fileType}`);
  const newFile = path.join(`${DIR}/${newUsername}.${fileType}`);

  // console.log(newFile);
  // console.log(oldFile);
  fs.renameSync(oldFile, newFile);
}
