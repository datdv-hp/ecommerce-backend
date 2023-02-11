const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const {
  notFound,
  errorHandler,
} = require('./api/v1/middlewares/errorHandler.middleware');

const app = express();

//init database
require('./api/v1/databases/init.mongodb');
// setup static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(morgan('dev'));

// add body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/v1', require('./api/v1/routes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
