const db = require('../_helpers/db');
const Users = db.Users;

module.exports = {
  joinGroup,
  leaveGroup,
  createGroup,
  generateGroupCode,
  getGroup,
  getGroupUsers
};

async function joinGroup(userId, code) {
  if (code === '') throw 'no group code';
  let user = await Users.findOne({ _id: userId });
  // console.log(user);
  await user.updateOne({ groupCode: code });
  return 'joined group successfully';
}

async function leaveGroup(userId) {
  let user = await Users.findOne({ _id: userId });
  await user.updateOne({ groupCode: null });
  return 'left group successfully';
}

async function createGroup(userId) {
  console.log('my USER ID: ', userId);
  let user = await Users.findOne({ _id: userId });
  const code = await generateGroupCode();
  // update user with new group code
  await user.updateOne({ groupCode: code });
  return code;
}

async function getGroup(userId) {
  let user = await Users.findOne({ _id: userId });
  const code = await user.groupCode;
  return code == null ? '' : code;
}

async function getGroupUsers(userId) {
  let user = await Users.findOne({ _id: userId });
  const users = await Users.find({ groupCode: user.groupCode });
  return user.groupCode == null ? [] : users;
}

async function generateGroupCode() {
  // create unique group code for new user
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  do {
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (await Users.findOne({ groupCode: code }));
  return code;
}
