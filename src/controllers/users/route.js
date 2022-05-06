const express = require('express');
const Controllers = require('.');
const Validation = require('../../middlewares/validation');
const Authorization = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.get('/', Authorization.VerifyIsAdmin, Controllers.GetAll);
router.post('/login', Validation.Login, Controllers.Login);
router.post('/register', Authorization.VerifyNewUser, Validation.Register, Controllers.Register);
router.post('/admin/register', Authorization.VerifyIsAdmin, Validation.Register, Controllers.Register);
router.put('/admin/balance/:id', Authorization.VerifyIsAdmin, Controllers.AddBalance);

module.exports = router;
