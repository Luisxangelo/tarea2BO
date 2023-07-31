const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./routes/user.route');
const transferRoutes = require('./routes/transfer.route');

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/tranfer', transferRoutes);

module.exports = app;
