const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const root = require('../controllers/root');
const error = require('../global/middlewares/error');

const app = express();

const corsOptions = {
  origins: ['http://localhost:3000/', 'http://localhost:3001/'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;
