const express = require('express');
const Controllers = require('.');
const Validation = require('../../middlewares/validation');
const Authorization = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.post('/login', Validation.Login, Controllers.Login);
router.post('/register', Authorization.VerifyNewUser, Validation.Register, Controllers.Register);
router.post('/admin/register', Authorization.VerifyIsAdmin, Validation.Register, Controllers.Register);
router.get('/', Authorization.VerifyIsAdmin, Controllers.GetAll);

module.exports = router;
