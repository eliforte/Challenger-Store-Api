const ModelProducts = require('../../database/products');
const { ApiError: { NewError } } = require('../../helpers/error');
const Messages = require('../../helpers/messages');

module.exports.Create = async (infoProducts) => {
  const productExist = await ModelProducts.FindByName(infoProducts.name);
  if (productExist) return NewError(Messages.PRODUCT_EXIST_409);
  const newProduct = await ModelProducts.Create(infoProducts);
  return newProduct;
};

module.exports.GetAll = async () => await ModelProducts.FindAll();

module.exports.FindOne = async (id) => {
  const product = await ModelProducts.FindById(id);
  if (!product) return NewError(Messages.PRODUCT_NOT_EXIST_404);
  return product;
};

module.exports.Edit = async (id, infoProduct) => {
  const product = await ModelProducts.Edit(id, infoProduct);
  if (!product) return NewError(Messages.PRODUCT_NOT_EXIST_404);
  return product;
};

module.exports.Delete = async (id) => await ModelProducts.Delete(id);
