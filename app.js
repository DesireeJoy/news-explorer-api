const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const routes = require('./routes/index');

const { NotFoundError } = require('./middleware/errorhandling');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
// connect to mongodb servwe
mongoose.connect('mongodb://localhost:27017/finaldb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// listen to port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/', routes);
app.use(helmet());
app.use(limiter);

app.use('*', (err) => {
  if (err.name === 'NotFound') {
    throw new NotFoundError('Requested resource not found');
  }
});
app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

app.use((err, req, res, next) => { // centralized error handling
  res.status(err.statusCode).send({
    message: err.statusCode === 500 ? 'Error from server' : err.message,
  });
  next();
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
