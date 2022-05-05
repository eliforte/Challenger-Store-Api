const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const root = require('../controllers/root');
const error = require('../global/middlewares/error');

const app = express();

const corsOptions = {
  origins: [process.env.PORT],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;
