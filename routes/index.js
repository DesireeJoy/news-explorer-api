const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  loginUser,
  createUser,
} = require('../controllers/users');
const { auth } = require('../middleware/auth');

const article = require('./articleRoutes');
const user = require('./userRoutes');

router.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
      })
      .unknown(true),
  }),
  loginUser,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
      })
      .unknown(true),
  }),
  createUser,
);

router.use('/articles', auth, article);
router.use('/users', auth, user);

module.exports = router;