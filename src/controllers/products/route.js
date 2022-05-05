const express = require('express');
const { Create, Delete, Edit, GetAll } = require('.');

const router = express.Router({ mergeParams: true });

router.get('/', GetAll);
router.post('/', Create);
router.put('/:id', Edit);
router.delete('/:id', Delete);

module.exports = router;
