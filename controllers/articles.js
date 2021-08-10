const Article = require('../models/article');
const {
  NotFoundError, InvalidError, AuthError, handle500,
} = require('../middleware/errorhandling');

function getSavedArticles(req, res, next) {
  Article.find({ owner: req.user._id })
    .then((article) => {
      console.log(`I am ${req.user._id}`);
      res.status(200).send(article);
    })
    .catch(next);
}

function createArticle(req, res, next) {
  const {
    keyword, title, description, publishedAt, source, url, urlToImage,
  } = req.body;
  Article.create({
    keyword, title, description, publishedAt, source, url, urlToImage, owner: req.user._id,
  })
    .then((article) => {
      res.send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { throw new InvalidError('Invalid Data'); }
    })
    .catch(next);
}

function deleteArticle(req, res, next) {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Article Not Found');
      }
      if (String(article.owner) !== req.user._id) {
        throw new AuthError('You are not authorized to delete this');
      }
      return Article.deleteOne(article)
        .then(() => {
          res.send({ message: 'Article deleted' });
        });
    })
    .catch(next);
}
module.exports = { getSavedArticles, createArticle, deleteArticle };
