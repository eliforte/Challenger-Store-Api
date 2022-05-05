require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const root = require('../controllers/root');
const error = require('../middlewares/error');

const app = express();

const corsOptions = {
  origins: [`http://localhost:${process.env.PORT}/`],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;
