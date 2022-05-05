const { CREATED, ACCEPTED, OK, NO_CONTENT } = require('http-status-codes').StatusCodes;
const ProductsService = require('../../services/products');

module.exports.Create = async (req, res, next) => {
  try {
    const { name, price, description, quantity } = req.body;
    const createdProduct = await ProductsService.Create({ name, price, description, quantity });
    return res.status(CREATED).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

module.exports.GetAll = async (_req, res, next) => {
  try {
    const products = await ProductsService.GetAll();
    return res.status(OK).json(products);
  } catch (err) {
    next(err);
  }
};

module.exports.Edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, quantity } = req.body;
    const editedProduct = await ProductsService.Edit(id, { name, price, description, quantity });
    return res.status(ACCEPTED).json(editedProduct);
  } catch (err) {
    next(err);
  }
};

module.exports.Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductsService.Delete(id);
    return res.status(NO_CONTENT).json(deletedProduct);
  } catch (err) {
    next(err);
  }
};
