// articleRoutes


const router = require('express').Router();
const bodyParser = require('body-parser');
const { auth } = require('../middleware/auth');

const { getSavedArticles, deleteArticle, createArticle } = require('../controllers/users');

router.use(bodyParser.json());
router.get('/me', auth, getSavedArticles);
router.delete('/me', auth, deleteArticle);
router.post('/me', auth, createArticle);

module.exports = router;