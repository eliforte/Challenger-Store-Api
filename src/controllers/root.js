const express = require('express');
const routerUsers = require('./users/route');
const routerProducts = require('./products/route');
const routerPurchase = require('./purchase/route');

const root = express.Router({ mergeParams: true });

root.use('/api/v1/user', routerUsers);
root.use('/api/v1/products', routerProducts);
root.use('/api/v1/purchase', routerPurchase);

module.exports = root;
