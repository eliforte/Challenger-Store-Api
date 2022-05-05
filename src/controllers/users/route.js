const express = require('express');
const Controllers = require('.');
const Validation = require('../../middlewares/validation');

const router = express.Router({ mergeParams: true });

router.post('/login', Validation.Login, Controllers.Login);
router.post('/register', Validation.Register, Controllers.Register);

module.exports = router;
