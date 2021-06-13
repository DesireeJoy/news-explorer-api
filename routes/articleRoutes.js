// articleRoutes


const router = require('express').Router();
const bodyParser = require('body-parser');

const { getSavedArticles, deleteArticle, createArticle } = require('../controllers/articles');

router.use(bodyParser.json());
router.get('/me', getSavedArticles);
router.delete('/me', deleteArticle);
router.post('/me', createArticle);

module.exports = router;