const express = require('express');
const Controllers = require('.');
const Validation = require('../../middlewares/validation');
const Authorization = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.get('/', Controllers.GetAll);
router.get('/:id', Controllers.FindOne);
router.put('/:id', Authorization.VerifyIsAdmin, Validation.EditProduct, Controllers.Edit);
router.post('/', Authorization.VerifyIsAdmin, Validation.CreateProduct, Controllers.Create);
router.delete('/:id', Authorization.VerifyIsAdmin, Controllers.Delete);

module.exports = router;
