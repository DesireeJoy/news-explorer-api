// articleRoutes
const router = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { getSavedArticles, deleteArticle, createArticle } = require('../controllers/articles');

router.use(bodyParser.json());

router.get('/', getSavedArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    publishedAt: Joi.string().required(),
    source: Joi.string().required().min(2),
    url: Joi.string().required().uri(),
    urlToImage: Joi.string().required().uri(),
  }),
}), createArticle);
router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required(),
  }),
}), deleteArticle);
module.exports = router;
