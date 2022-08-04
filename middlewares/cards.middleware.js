require('dotenv').config();
const jwt = require('../modules/jwt.module');

const { env } = process;

const middlewareCheckHeaderAuth = async (req, res, next) => {
  try {
    if (req.headers[env.HEADER_AUTH]) {
      const token = jwt.decryptJWT(req.headers[env.HEADER_AUTH])
      if (token.valid) {
        next()
      } else {
        return res.status(400).json({
          status: false,
          message: 'header auth is not valid',
        })
      }
    } else {
      return res.status(400).json({
        status: false,
        message: 'header auth not found',
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    })
  }
}

module.exports = {
  middlewareCheckHeaderAuth,
}