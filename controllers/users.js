// User Controller
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const {
  NotFoundError, InvalidError, AuthError, MongoError,
} = require('../middleware/errorhandling');

function getUserInfo(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User Not Found');
      } else {
        return res.status(200).send({ email: user.email, name: user.name });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { throw new InvalidError('Invalid Data Entered'); }
      if (err.name === 'NotFound') { throw new NotFoundError('User Not Found'); }
    })
    .catch(next);
}

// creates/registers user

function createUser(req, res, next) {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(() => res.send({
      email, name,
    }))
    .catch((err) => {
      if (err.code === 11000 && err.name === 'MongoError') { throw new MongoError('Duplicate User'); }
      if (err.name === 'ValidationError') { throw new InvalidError('Invalid Data'); }
    })
    .catch(next);
}

function loginUser(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new InvalidError('Incorrect password or email'));
      }

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return Promise.reject(
            new InvalidError('Incorrect password or email'),
          );
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );

        res.send({ token });
      });
    })
    .catch(() => {
      throw new AuthError('Authorization Error');
    })
    .catch(next);
}

module.exports = { getUserInfo, createUser, loginUser };
