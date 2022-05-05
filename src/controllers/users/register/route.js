const express = require('express');
const { Register } = require('.');

const router = express.Router({ mergeParams: true });

router.post('/', Register);

module.exports = router;