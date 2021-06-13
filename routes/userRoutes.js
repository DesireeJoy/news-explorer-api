// userRoutes


const router = require('express').Router();
const bodyParser = require('body-parser');
const { auth } = require('../middleware/auth');

const { getUserInfo } = require('../controllers/users');

router.use(bodyParser.json());
router.get('/me', auth, getUserInfo);

module.exports = router;