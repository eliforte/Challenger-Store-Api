const express = require('express');
const Controllers = require('.');
const Validation = require('../../middlewares/validation');

const router = express.Router({ mergeParams: true });

router.get('/', Controllers.GetAll);
router.post('/', Validation.CreateProduct, Controllers.Create);
router.put('/:id',Validation.EditProduct, Controllers.Edit);
router.delete('/:id', Controllers.Delete);

module.exports = router;
