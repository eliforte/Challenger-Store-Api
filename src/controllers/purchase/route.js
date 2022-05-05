const express = require('express');
const Controllers = require('.');
const Authorization = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.post('/', Authorization.VerifyToken, Controllers.Create);

module.exports = router;
