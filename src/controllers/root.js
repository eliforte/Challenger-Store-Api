const express = require('express');
const routerLogin = require('./users/login/route');
const routerRegister = require('./users/register/route');
const { Login, Register } = require('../middlewares/validation');

const root = express.Router({ mergeParams: true });

root.use('/login', Login, routerLogin);
root.use('/register', Register, routerRegister);

module.exports = root;
