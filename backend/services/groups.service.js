const db = require('../_helpers/db');
const Users = db.Users;

module.exports = {
  joinGroup,
  leaveGroup,
  createGroup
};

async function joinGroup(userId, code) {
  let user = await Users.findOne({ _id: userId });
  console.log(user);
  await user.updateOne({ groupCode: code });
  return 'joined group successfully';
}

async function leaveGroup(userId) {
  let user = await Users.findOne({ _id: userId });
  await user.updateOne({ groupCode: null });
  return 1;
}

async function createGroup(userId) {
  let user = await Users.findOne({ _id: userId });
  // create unique group code for new user
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  do {
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (await Users.findOne({ groupCode: code }));
  // update user with new group code
  await user.updateOne({ groupCode: code });
  return code;
}
