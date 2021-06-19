const jwt = require("jsonwebtoken");
require('dotenv').config();
const { AuthError } = require("./errorhandling");

const { NODE_ENV = 'production', JWT_SECRET = 'dev-secret' } = process.env;

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("token=")) {
    throw new AuthError("Authorization required!");
  }
console.log(req.headers);
  const token = authorization.replace("token=", "");

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    throw new AuthError("Authorization required.");
  }

  req.user = payload;
  next();
}

module.exports = { auth };