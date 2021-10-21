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
  // celebrate({
  //   body: Joi.object()
  //     .keys({
  //       email: Joi.string().required().email().messages({ 'any.required': '"I" am an asshole' }),
  //       password: Joi.string().required().min(8),
  //       name: Joi.string().required().min(2).max(30),
  //     })
  //     .unknown(true),
  // }),
  createUser,
);
router.get(
  '/signin', (req, res) => {
    res.send('message: No');
  },
);
router.use('/articles', auth, article);
router.use('/users', auth, user);

module.exports = router;
