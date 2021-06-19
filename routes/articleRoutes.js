// articleRoutes
const router = require('express').Router();
const bodyParser = require('body-parser');

const { getSavedArticles, deleteArticle, createArticle } = require('../controllers/articles');

router.use(bodyParser.json());

router.get('/', getSavedArticles);
router.post('/', createArticle);
router.delete('/:articleId', deleteArticle);
module.exports = router;