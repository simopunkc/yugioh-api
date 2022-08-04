const jwt = require('../modules/jwt.module');

function generateToken() {
  return jwt.encryptJWT({
    valid: true
  })
}

module.exports = {
  generateToken,
};
