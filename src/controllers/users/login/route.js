const express = require('express');
const { Login } = require('.');

const router = express.Router({ mergeParams: true });

router.post('/', Login);

module.exports = router;