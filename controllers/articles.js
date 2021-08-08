const Article = require('../models/article');
const {
  NotFoundError, InvalidError, AuthError,
} = require('../middleware/errorhandling');

function getSavedArticles(req, res, next) {
  Article.find({ owner: req.user._id })
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
}

function createArticle(req, res, next) {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res.send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { throw new InvalidError('Invalid Data Entered'); }
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
        throw new AuthError('This action is not authorized');
      }
      return Article.deleteOne(article)
        .then(() => {
          res.status(200).send({ message: 'Article Deleted' });
        });
    })
    .catch(next);
}
module.exports = { getSavedArticles, createArticle, deleteArticle };
