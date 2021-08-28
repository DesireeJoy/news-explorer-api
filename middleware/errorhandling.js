class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
class NoReAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class InvalidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class MongoError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
function handle500(err, req, res, next) {
  res.status(err.statusCode).send({ message: (err.statusCode === 500) ? 'Error from server' : err.message });
  next();
}

module.exports = {
  NotFoundError,
  InvalidError,
  AuthError,
  MongoError,
  NoReAuthError,
  handle500,
};
