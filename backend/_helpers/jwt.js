var jwt = require('express-jwt');
const config = require('../config.json');
const db = require('../_helpers/db');
const Users = db.Users;

function generateJwt() {
  const secret = config.secret;
  return new jwt({ secret, isRevoked }).unless({
    path: ['/']
  });
}

async function isRevoked(req, payload, done) {
  const user = await Users.findOne({ username: payload.sub });

  if (!user) return done(null, true);

  done();
}

module.exports = generateJwt();
