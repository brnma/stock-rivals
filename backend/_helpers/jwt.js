// from esekia's implementation of jwt
var ejwt = require('express-jwt');
const db = require('../_helpers/db');
const Users = db.Users;

function jwt() {
  const secret = process.env.SECRET;
  // Ignoring paths from listed ones, imgs for public profile images
  return new ejwt({ secret: secret, isRevoked: isRevoked, algorithms: ['HS256'] }).unless({
    path: ['/user/login', '/user/register', /\/img/]
  });
}

async function isRevoked(req, payload, done) {
  const user = await Users.findOne({ _id: payload.sub });

  if (!user) return done(null, true);

  done();
}

module.exports = jwt;
