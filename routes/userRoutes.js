// userRoutes
const router = require('express').Router();
const bodyParser = require('body-parser');

const { getUserInfo } = require('../controllers/users');

router.use(bodyParser.json());
router.get('/me', getUserInfo);

module.exports = router;
