const express = require('express');
const routerUsers = require('./users/route');
const routerProducts = require('./products/route');

const root = express.Router({ mergeParams: true });

root.use('/user', routerUsers);
root.use('/products', routerProducts);
root.use('/purchase', routerPurchase);

module.exports = root;
